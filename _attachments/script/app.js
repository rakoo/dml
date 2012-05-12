// Apache 2.0 J Chris Anderson 2011
$(document).ready(function() {   
  $("#query").val('');


  // The db
  var path = unescape(document.location.pathname).split('/'),
  design = path[3],
  db = $.couch.db(path[1]);

  db.info({
    success: function(data){
      $("#sidebar-placeholder").html($.mustache($("#sidebar-mustache").html(),{
        num: data.doc_count
      }));
    }
  });


  // display nice human readable size
  function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    var posttxt = 0;
    if (bytes == 0) return 'n/a';
      while( bytes >= 1024 ) { 
        posttxt++;
        bytes = bytes / 1024;
      }   
      return bytes.toFixed(2) + " " + sizes[posttxt];
  }

  //search
  function search() {
    if ($("#query").val() == ""){return;}
    var terms = $("#query").val().toLowerCase().split(' '); // simple for the moment
    first_fetch_from_db(terms);
  }


  // fetch the number of ids from the db
  function first_fetch_from_db(terms) {
    db.list(design + "/regexp_check", "search_index_with_name", 
            // couchdb's list options
            {
              data: JSON.stringify({"q": terms}),
              keys: terms,
              reduce: false
            }, 
            // ajaxOptions
            {
              success: function(data) {
                console.log(data.length);

                var total_num = data.length;

                // display the number of ids
                var them = $.mustache($("#result-header-mustache").html(), {
                  num: total_num
                });
                $("#result-header").html(them);

                // pagination will start at the beginning of the results
                display_page(1, [], Math.floor(total_num/10),terms);
              }
            }
           );
  };

  // setup and display paginated keys for a page
  // @page is the number of the page we want to display
  // @page_index_arg is an array
  function display_page(page, page_index_arg, num_page, terms){

    // use a clean copy.
    var page_index = page_index_arg.slice();

    // if fetching from the first page, chances are that page_index is
    // empty. If there already is something in page_index[1], we can
    // safely remove it, instead of checking it entirely
    if (page === 1){page_index[1] = ""};


    db.list(design + "/regexp_check", "search_index_with_name", 
            {
              data: JSON.stringify({"q": terms}),
              keys: terms,
              reduce: false,
              limit: 11,
              startkey_docid: page_index[page],
            },
            {
              success: function(data) {

                var next_exists = true,
                prev_exists = true;

                if (data.length < 11){ // last page
                  next_exists = false;
                } else if(page_index.indexOf(data[10]) == -1){ // didn't click on "prev"
                  page_index.push(data[10]); // careful ! 11th element is at 10
                }
                var prev_exists = page != 1;

                // display the prev/next footer
                $("#result-footer").html($.mustache($("#result-footer-mustache").html(),{
                  next: (function(){return next_exists == true}),
                  page: page,
                  num_page: num_page,
                  prev: (function(){return prev_exists == true})
                }));

                // bind the clicks
                if (next_exists){
                  $("a[href=#next]").click(function(){
                    display_page(page + 1, page_index, num_page, terms);
                  });
                }
                if (prev_exists){
                  $("a[href=#prev]").click(function(){
                    display_page(page - 1, page_index, num_page, terms)});
                }


                // finally, display the goods
                fetch_and_display(data.slice(0,10), terms);

              }
            }
           );
  }



  // really fetch docs and display them
  function fetch_and_display(ids,terms){
    db.allDocs({
      keys: ids,
      include_docs: true,
      success: function(data){
        var them = $.mustache($("#result-body-mustache").html(), {
          items : data.rows.map(function(r) {

            // highlight the name
            var highlighted_name = terms.reduce(function(accu,cur){
              var re = new RegExp(cur,'ig');
              return accu.replace(re , function(str){
                return '<span id=\"highlight\">' + str + '</span>'
              });
            },r.doc.name);

            // return the fill-in values
            return {
              "size" : bytesToSize(r.doc.size),
              "name" : highlighted_name,
              "tpb_url" : r.doc.tpb_url,
              "hash" : r.doc.hash
            };
          })
        });
        $("#result-body").html(them);
      }
    });
  }


  $("#search-button").click(search);
  $("#query").keyup(function(event){
    if (event.which == 13) {
      search();
    }  
  });


});
