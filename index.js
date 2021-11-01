/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
const signer = require("./signer");
const Wreck = require("wreck");
let wreck;

class Billplz {
  constructor(options) {
    this._apiEndpoint = "https://www.billplz.com/api/v3/";
    this._sandboxApiEndpoint = "https://www.billplz-sandbox.com/api/v3/";

    this._apiKey = options.key;
    this._isSandbox = options.sandbox;
    this._xSignatureKey = options.xSignatureKey;

    if (this._isSandbox === true) {
      this._apiEndpoint = this._sandboxApiEndpoint;
      console.log("Sandbox Mode On");
    }

    this._authentication = `Basic ${Buffer.from(this._apiKey).toString("base64")}`; 
    wreck = Wreck.defaults({
      headers: {"Authorization": authentication },
    });
  }

  request(method, params, callback) {
    console.log("authentication", this.authentication);
    wreck.post(this._apiEndpoint + method, {
      payload: params,
    }, (err, res, payload) => {
      try {
        callback(err, JSON.parse(payload.toString()));
      } catch (e) {
        throw (`${e} ${payload.toString()}`);
      }
    });
  }

  // create collection
  create_collection(params, callback) {
    return this.request("collections", params, callback);
  }

  // create open collection
  create_collectionOpen(params, callback) {
    return this.request("open_collections", params, callback);
  }

  // create bill
  create_bill(params, callback) {
    return this.request("bills", params, callback);
  }

  // get bill
  get_bill(billId, callback) {
    wreck.get(this._apiEndpoint + "bills/" + billId, (err, res, payload) => {
      callback(err, JSON.parse(payload.toString()));
    });
  }

  // delete bill
  delete_bill(billId, callback) {
    wreck.delete(this._apiEndpoint + "bills/" + billId, (err, res, payload) => {
      callback(err, JSON.parse(payload.toString()));
    });
  }

  // change collection status
  change_collection_status(collectionId, status, callback) {
    wreck.post(this._apiEndpoint + "collections/" + collectionId + "/" + status, (err, res, payload) => {
      callback(err, JSON.parse(payload.toString()));
    });
  }

  // registration check
  registration_check(bankAccountNumber, callback) {
    wreck.get(this._apiEndpoint + "check/bank_account_number/" + bankAccountNumber, (err, res, payload) => {
      callback(err, JSON.parse(payload.toString()));
    });
  }

  verifySignature(object, signature) {
    const objectSignature = signer(object, this._xSignatureKey);
    return objectSignature === signature;
  }
}

module.exports = Billplz;
