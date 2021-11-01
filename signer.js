"use strict";

/**
 * For more information about this process check the following link:
 * https://www.billplz.com/api#x_signature
 */

const sha256 = require("js-sha256");

module.exports = function signObject(payload, signatureKey) {
  const id = payload.id;
  const collectionID = payload.collection_id;
  const paid = payload.paid;
  const state = payload.state;
  const amount = payload.amount;
  const paidAmount = payload.paid_amount;
  const dueAt = payload.due_at;
  const email = payload.email;
  const mobile = payload.mobile;
  const name = payload.name;
  const url = payload.url;
  const paidAt = payload.paid_at;
  const longstring =
    "amount" +
    amount +
    "|collection_id" +
    collectionID +
    "|due_at" +
    dueAt +
    "|email" +
    email +
    "|id" +
    id +
    "|mobile" +
    mobile +
    "|name" +
    name +
    "|paid_amount" +
    paidAmount +
    "|paid_at" +
    paidAt +
    "|paid" +
    paid +
    "|state" +
    state +
    "|url" +
    url;

  return sha256.hmac(signatureKey, longstring);
};
