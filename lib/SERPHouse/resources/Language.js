"use strict";

const serphouseResource = require("../Resource");
const serphouseMethod = serphouseResource.methods.serphouseMethod;

module.exports = serphouseResource.extend({
  list: serphouseMethod({
    method: "GET",
    path: "/language/list",
    urlParams: ["type"],
  }),
});
