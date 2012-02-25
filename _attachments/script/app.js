// Apache 2.0 J Chris Anderson 2011
$(document).ready(function() {   
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
		db.view(design + "/search_index", {
			startkey : $("#query").val().toLowerCase(),
			endkey : $("#query").val().toUpperCase(),
			include_docs : true,
			success : function(data) {
				console.log("here");
				var them = $.mustache($("#search-result").html(), {
					num : data.rows.length,
					items : data.rows.map(function(r) {
						return {
							"size" : bytesToSize(r.doc.size),
							"name" : r.value,
							"id" : r.doc.id,
							"hash" : r.doc.hash
						};
					})
				});
				$("#content").html(them);
			}
		});
	};
	$("#search-button").click(search());
	$("#query").keyup(function(event){
		if (event.which == 13) {
			search();
		}  
	});
	
});
