function(head, req) {
  var row;
  var count = 0;
  var ids = [];

  while (row = getRow()) {
    count = count + 1;
    var terms = JSON.parse(req.query.data)["q"];
    var match = true;
    for (var i = 0; i<terms.length; i++) {
      var re = new RegExp(terms[i],'ig');
      if (!re.test(row.value)) {
        match = false;
        break;
      }
    }
    if (match == true) {
      ids.push(row.id);
    }

  }
  send(JSON.stringify(ids));
}

