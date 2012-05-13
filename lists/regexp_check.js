function(head, req) {
  var row;
  var set = {};

  while (row = getRow()) {
    var terms = JSON.parse(req.query.data)["q"];
    var match = true;

    // Check if all the terms match the name
    for (var i = 0; i<terms.length; i++) {
      var re = new RegExp(terms[i],'ig');
      if (!re.test(row.value)) {
        // one of the term doesn't match. We can skip next terms
        match = false;
        break;
      }
    }

    // All the terms have been tested; push if they all match
    if (match == true) {
      set[row.id] = true;
    }

  }

  var ids = [];
  for (id in set) {
    ids.push(id);
  }
  send(JSON.stringify(ids));
}

