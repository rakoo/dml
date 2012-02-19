function(doc) {
	if (doc.name){
		var tokens;
		if (doc.name) {
			tokens = doc.name.split(/[^a-zA-Z0-9_]+/i);
			tokens.map(function(token) {
				if (token && token != ""){
					emit(token, doc.name);
				}
			});
		}


	}

}
