"use strict";

const hasOwn = {}.hasOwnProperty;

const utils = (module.exports = {
  isAuthKey: function (key) {
    return typeof key === "string" && /^(?:[a-z]{2}_)?[A-z0-9]{32}$/.test(key);
  },

  isOptionsHash: function (o) {
    o = JSON.parse(JSON.stringify(o));
    return (
      typeof o === "object" &&
      o !== null &&
      o.constructor === Object &&
      ["api_key"].some((key) => {
        return o.hasOwnProperty(key);
      })
    );
  },

  isQuery: function (o) {
    o = JSON.parse(JSON.stringify(o));
    return (
      typeof o === "object" &&
      o !== null &&
      o.constructor === Object &&
      o.hasOwnProperty("query")
    );
  },
  makeURLInterpolator: (function () {
    const rc = {
      "\n": "\\n",
      '"': '\\"',
      "\u2028": "\\u2028",
      "\u2029": "\\u2029",
    };
    return function makeURLInterpolator(str) {
      const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0) => {
        return rc[$0];
      });
      return function (outputs) {
        return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) => {
          return encodeURIComponent(outputs[$1] || "");
        });
      };
    };
  })(),
  getDataFromArgs: function (args) {
    if (
      !args.length ||
      !(
        (typeof args[0] === "object" &&
          args[0] !== null &&
          args[0].constructor === Object) ||
        (args[0] != null &&
          typeof args[0] === "object" &&
          typeof args[0].length === "number")
      ) ||
      utils.isOptionsHash(args[0])
    ) {
      return {};
    }
    return !utils.isQuery(args[0]) ? args.shift() : {};
  },
  getQueryFromArgs: function (args) {
    if (
      !args.length ||
      (!typeof args[0] === "object" &&
        args[0] !== null &&
        args[0].constructor === Object) ||
      utils.isOptionsHash(args[0])
    ) {
      return {};
    }
    return utils.isQuery(args[0]) ? args.shift().query : {};
  },

  getOptionsFromArgs: function (args) {
    const opts = { auth: null, headers: {} };
    if (args.length > 0) {
      if (utils.isAuthKey(args[args.length - 1])) {
        opts.auth = args.pop();
      }
    }
    return opts;
  },

  protoExtend: function (sub) {
    const Super = this;
    const Constructor = hasOwn.call(sub, "constructor")
      ? sub.constructor
      : function () {
          Super.apply(this, arguments);
        };
    Constructor.prototype = Object.create(Super.prototype);
    for (const i in sub) {
      if (hasOwn.call(sub, i)) {
        Constructor.prototype[i] = sub[i];
      }
    }
    for (const i in Super) {
      if (hasOwn.call(Super, i)) {
        Constructor[i] = Super[i];
      }
    }
    return Constructor;
  },

  customErrorMsg: {
    400: "Bad request",
    401: "Unauthenticated: Access denied",
    402: "Your SERPHouse account has either run out of available credits (try upgrading your Plan), or there is a payment problem",
    404: "Not Found: Resource not found",
    429: "Rate limit exceeded",
    500: "Internal Server Error",
    405: "Method Not Allowed",
  },
});
