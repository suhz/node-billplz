# node-billplz
[![license img](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Billplz API](https://www.billplz.com/api) wrapper for nodejs. This module supports only Billplz API V3.

API Reference: https://www.billplz.com/api

[![NPM](https://nodei.co/npm/billplz.png)](https://nodei.co/npm/billplz/)

## Usage
### Install
```
npm install billplz
```


### Create a client
```javascript
const Billplz = require('billplz')
const billplz = new Billplz('your-api-key')
```

###### Optional parameter (if needed)
```javascript
const billplz = new Billplz({
  'key': 'your-api-key',
  'endpoint': 'https://www.billplz.com/api/v3/',
  'sandbox': true
})
```


### Create a collection
```javascript
billplz.create_collection({
  'title': 'My Noodle Shop'
}, function(err, res) {
  if (err) {
    //handle http client error
  }

  //success, do your stuff here
  console.log(res)
})
```

### Create an open collection
```javascript
billplz.create_collectionOpen({
  'title': 'Noodle Exhibition Ticket',
  'description': 'VVIP Ticket to Noodle Exhibition!',
  'amount': 25550, //RM255.50
  'reference_1_label': 'MyKAD',
  'reference_2_label': 'First Name'
}, function(err, res) {
  console.log(res)
})
```

### Create a bill
```javascript
billplz.create_bill({
  'collection_id': 'your-collection-id',
  'description': 'Mee Segera Sedap 200g',
  'email': 'sukamakan@meesegera.com',
  'name': 'Ahmad Segera',
  'amount': 550, //RM5.50
  'callback_url': "http://example.com/webhook/",
  'redirect_url': "http://example.com/thank-you",
  'due_at': '2016-08-31'
}, function(err, res) {
  console.log(res)
})
```

### Retrieve a bill
```javascript
billplz.get_bill('your-bill-id', function(err, res) {
  console.log(res)
})
```

### Delete a bill
```javascript
billplz.delete_bill('your-bill-id', function(err, res) {
  console.log(res)
})
```

### Change a collection status
```javascript
// activate or deactivate
billplz.change_collection_status('your-collection-id', 'status-here', function(err, res) {
  console.log(err);
})
```

### Registration check
```javascript
billplz.registration_check('your-bank-account-number', function(err, res) {
  console.log(res.name);
});
```
