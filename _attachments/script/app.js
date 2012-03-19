// Apache 2.0 J Chris Anderson 2011
$(document).ready(function() {   
  $("#query").val('');
	// The db
	var path = unescape(document.location.pathname).split('/'),
		design = path[3],
		db = $.couch.db(path[1]);

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
    console.log(ids.length);
    var them = $.mustache($("#result-header-mustache").html(), {
      num: ids.length
    });
    $("#result-header").html(them);

    // paginate
    var next_startkey, p_startkey, p_endkey;
    var paginated_keys;
    $("#result-footer").html($("#result-footer-mustache").html());
    if (ids.length > 10){
      paginated_keys = ids.slice(0, 10);

      // evently to the rescue

    }

    db.allDocs({
      keys: paginated_keys,
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
