// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.account;
ds.automigrate('Account', function(err) {
  if (err) throw err;

  var accounts = [
    {
      nom: 'Anas',
      premon: 'Amara',
      age: 23,
    },
    {
      nom: 'John',
      premon: 'Stones',
      age: 31,
    },
  ];
  var count = accounts.length;
  accounts.forEach(function(account) {
    app.models.Account.create(account, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});