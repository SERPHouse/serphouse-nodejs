"use strict";
const SERPHouseResource = require("../Resource");
const serphouseMethod = SERPHouseResource.methods.serphouseMethod;

module.exports = SERPHouseResource.extend({
  list: serphouseMethod({
    method: "GET",
    path: "/domain/list",
  }),
});
