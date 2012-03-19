function(doc) {
  if (doc.name){
    var uncamelcased = doc.name.replace(/([a-z])([A-Z])/, "$1-$2");
    var tokens = uncamelcased.split(/[^a-zA-Z0-9]/g);
    tokens.map(function(token){
      if(token && token != ""){
        emit(token.toLowerCase(),null);
      }
    });
  }
}
