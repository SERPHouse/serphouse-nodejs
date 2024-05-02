"use strict";
const SERPHouseResource = require("../Resource");
const serphouseMethod = SERPHouseResource.methods.serphouseMethod;

module.exports = SERPHouseResource.extend({
  live: serphouseMethod({
    method: "POST",
    path: "/serp/live",
    contentType: "application/json",
    urlParams: ["responseType"],
  }),

  schedule: serphouseMethod({
    method: "POST",
    path: "/serp/schedule",
    contentType: "application/json",
  }),

  check: serphouseMethod({
    method: "GET",
    path: "/serp/check",
  }),

  get: serphouseMethod({
    method: "GET",
    path: "/serp/get",
    urlParams: ["responseType"],
  }),
});
