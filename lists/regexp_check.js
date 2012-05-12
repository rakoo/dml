function(head, req) {
  var row;
  var count = 0;
  var ids = [];

  while (row = getRow()) {
    count = count + 1;
    var queries = JSON.parse(req.query.data)["q"];
    var match = true;
    for (var i = 0; i<queries.length; i++) {
      if (row.value.indexOf('/' + queries[i] + '/i') === "-1") {
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

