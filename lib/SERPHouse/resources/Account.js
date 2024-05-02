"use strict";

const serphouseResource = require("../Resource");
const serphouseMethod = serphouseResource.methods.serphouseMethod;

module.exports = serphouseResource.extend({
  fetch: serphouseMethod({
    method: "GET",
    path: "/account/info",
  }),
});
