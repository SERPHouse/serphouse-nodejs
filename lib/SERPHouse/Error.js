"use strict";

const utils = require("./utils");
module.exports = _Error;

function _Error() {
  this.populate.apply(this, arguments);
}

_Error.prototype = Object.create(Error.prototype);
_Error.prototype.type = "GenericError";

_Error.prototype.populate = function (type, message) {
  this.Type = type;
  this.Message = message;
};

_Error.extend = utils.protoExtend;

const serphouseError = (_Error.serphouseError = _Error.extend({
  Type: "serphouseError",
  Message: "",
  populate: function (raw) {
    this.Type = this.type || "unknown";
    this.Code = raw.Code || "GenericError";
    this.Message = raw.message || raw.error || "unknown";
    this.StatusCode = raw.StatusCode || "unknown";
  },
}));

serphouseError.generate = function () {
  return new _Error("Generic", "Unknown Error");
};

_Error.serphouseAPIError = serphouseError.extend({ type: "serphouseAPIError" });
_Error.serphouseConnectionError = serphouseError.extend({
  type: "serphouseConnectionError",
});
