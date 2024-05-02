"use strict";

const serphouseResource = require("../Resource");
const serphouseMethod = serphouseResource.methods.serphouseMethod;

module.exports = serphouseResource.extend({
  search: serphouseMethod({
    method: "POST",
    path: "/trends/search",
    contentType: "application/json",
  }),

  schedule: serphouseMethod({
    method: "POST",
    path: "/trends/schedule",
    contentType: "application/json",
  }),

  timeZoneList: serphouseMethod({
    method: "GET",
    path: "/trends/offset/list",
  }),

  categoryList: serphouseMethod({
    method: "GET",
    path: "/trends/categories/list",
  }),

  countryStateList: serphouseMethod({
    method: "GET",
    path: "/trends/country/list",
  }),

  languageList: serphouseMethod({
    method: "GET",
    path: "/trends/language/list",
  }),

  get: serphouseMethod({
    method: "GET",
    path: "/trends/get",
  }),

  check: serphouseMethod({
    method: "GET",
    path: "/trends/check",
  }),
});
