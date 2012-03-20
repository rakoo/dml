// Apache 2.0 J Chris Anderson 2011
$(document).ready(function() {   
  $("#query").val('');
    

	// The db
	var path = unescape(document.location.pathname).split('/'),
		design = path[3],
		db = $.couch.db(path[1]);

    db.info({
      success: function(data){
        $("#sidebar").html($.mustache($("#sidebar-mustache").html(),{
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
    var terms = $("#query").val().split(' '); // simple for the moment
    fetch_from_db(terms);
  }

  // fetch ids from the dm
	function fetch_from_db(terms) {
		db.view(design + "/search_index", {
      keys: terms,
      stale: "update_after",
      reduce: false,
			success : function(data) {
        var ids = data.rows.map(function(row){
          return row.id;
        });
        display(ids);
			}
		});
	};

  // display ids
  function display(ids){
    var them = $.mustache($("#result-header-mustache").html(), {
      num: ids.length
    });
    $("#result-header").html(them);

    display_paginated(1,ids) // when pagination is called, everything is set up in place

  }

  // setup and display paginated keys for a page
  function display_paginated(page, from_ids){
      var prev_exists = true, next_exists = true;
      var last_page = Math.ceil(from_ids.length / 10);

      if (page === 1){prev_exists = false}
      if (page === last_page){next_exists = false}

      var last_id;
      if (page === last_page){
        last_id = from_ids.length
      }else{
        last_id = page * 10
      }
      paginated_keys = from_ids.slice( (page - 1) * 10, last_id);

      $("#result-footer").html($.mustache($("#result-footer-mustache").html(),{
        next: (function(){return next_exists == true}),
        page: page,
        num_page: last_page,
        prev: (function(){return prev_exists == true})
      }));


      if (next_exists){
        $("a[href=#next]").click(function(){display_paginated(page + 1, from_ids)});
      }
      if (prev_exists){
        $("a[href=#prev]").click(function(){display_paginated(page - 1, from_ids)});
      }

      fetch_and_display(paginated_keys);
  }



  // really fetch docs and display them
  function fetch_and_display(ids){
    db.allDocs({
      keys: ids,
      include_docs: true,
      success: function(data){
        var them = $.mustache($("#result-body-mustache").html(), {
          items : data.rows.map(function(r) {
            return {
              "size" : bytesToSize(r.doc.size),
              "name" : r.doc.name,
              "id" : r.doc.id,
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
