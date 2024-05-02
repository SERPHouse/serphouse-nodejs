serphouse.DEFAULT_HOST = "api.serphouse.com";
serphouse.DEFAULT_BASE_PATH = "https://api.serphouse.com/";
serphouse.DEFAULT_RESPONSE_FORMAT = ".json";
serphouse.DEFAULT_API_VERSION = 1.0;
serphouse.DEFAULT_TIMEOUT = require("http").createServer().timeout;
serphouse.PACKAGE_VERSION = require("../../package.json").version;
const resource = {
  SerpApi: require("./resources/SerpApi"),
  Domains: require("./resources/Domains"),
  Languages: require("./resources/Language"),
  Location: require("./resources/Location"),
  Account: require("./resources/Account"),
  Trends: require("./resources/Trends"),
};

serphouse.serphouseResource = require("./Resource");
serphouse.resources = resource;

function serphouse(api_token) {
  if (!(this instanceof serphouse)) {
    return new serphouse(api_token);
  }

  this._api = {
    host: serphouse.DEFAULT_HOST,
    basePath: serphouse.DEFAULT_BASE_PATH,
    version: serphouse.DEFAULT_API_VERSION,
    timeout: serphouse.DEFAULT_TIMEOUT,
  };

  this._prepResources();
  this.setApiToken(api_token);
  this.setResponseFormat(serphouse.DEFAULT_RESPONSE_FORMAT);
}

serphouse.prototype = {
  setResponseFormat: function (format) {
    this._setApiField("format", format);
  },

  setApiToken: function (token) {
    token && this._setApiField("api_token", token);
  },

  setTimeout: function (timeout) {
    this._setApiField(
      "timeout",
      timeout === null ? serphouse.DEFAULT_TIMEOUT : timeout
    );
  },

  _setApiField: function (key, value) {
    this._api[key] = value;
  },

  getApiField: function (key) {
    return this._api[key];
  },

  _prepResources: function () {
    for (const name in resource) {
      this[name[0] + name.substring(1)] = new resource[name](this);
    }
  },
};

module.exports = serphouse;
module.exports.serphouse = serphouse;
