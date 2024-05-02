"use strict";

const serphouseResource = require("../Resource");
const serphouseMethod = serphouseResource.methods.serphouseMethod;

module.exports = serphouseResource.extend({
  search: serphouseMethod({
    method: "GET",
    path: "/location/search",
  }),
});
