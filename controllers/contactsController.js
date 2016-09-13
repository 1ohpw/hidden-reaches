var db = require('../models');

function create(req, res) {
  console.log(req.body);
  db.Contact.create(req.body, function(err, contact) {
    if (err) { console.log('error', err); }
    console.log(contact);
    res.json(contact);
  });
}

function show(req, res) {
  console.log(req.params);
  db.Contact.findOne({name: req.params.name}, function(err, foundContact) {
    if(err) {
      res.send('Contact is not in database');
    }
    res.json(foundContact);
  });
}



module.exports = {
  // index: index,
  create: create,
  show: show,
  // destroy: destroy,
  // update: update
}
