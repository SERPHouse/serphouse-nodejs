"use strict";
const https = require("https");
const path = require("path");
const utils = require("./utils");
const Error = require("./Error");
const hasOwn = {}.hasOwnProperty;
const RESPONSE_CONTENT_TYPE = [
  "text/xml",
  "text/xml;charset=utf-8",
  "application/xml",
];
serphouseResource.extend = utils.protoExtend;
serphouseResource.methods = require("./SERPHouseClient");
function serphouseResource(serphouse, urlData) {
  this._serphouse = serphouse;
  this._urlData = urlData || {};
  this.basePath = utils.makeURLInterpolator(serphouse.getApiField("basePath"));
  this.path = utils.makeURLInterpolator(this.path);
  if (this.includeBasic) {
    this.includeBasic.forEach((methodName) => {
      this[methodName] = serphouseResource.methods[methodName];
    }, this);
  }
  this.initialize.apply(this, arguments);
}
serphouseResource.prototype = {
  path: "",
  requestBody: {},
  requestParamsJSON: {},
  initialize: function () {},
  requestDataProcessor: null,
  overrideHost: null,
  createFullPath: function (commandPath, urlData) {
    return path
      .join(
        this.basePath(urlData),
        this.path(urlData),
        typeof commandPath === "function" ? commandPath(urlData) : commandPath
      )
      .replace(/\\/g, "/");
  },
  replaceUrlPlaceholders(url, replacements, urlParams, callback) {
    replacements = replacements || {};
    for (const key in replacements) {
      if (replacements.hasOwnProperty(key) && urlParams?.includes(key)) {
        url += "/" + replacements[key];
      } else {
        return callback.call(
          this,
          {
            msg: utils.customErrorMsg[404],
            statusCode: 404,
          },
          null
        );
      }
    }
    url = url.replace(/\/+$/, "");
    return url;
  },
  createUrlData: function () {
    const urlData = {};
    for (const i in this._urlData) {
      if (hasOwn.call(this._urlData, i)) {
        urlData[i] = this._urlData[i];
      }
    }
    return urlData;
  },
  wrapTimeout: function (promise, callback) {
    if (callback) {
      return promise.then(
        (res) => {
          setTimeout(() => {
            callback(null, res);
          }, 0);
        },
        (err) => {
          setTimeout(() => {
            callback(err, null);
          }, 0);
        }
      );
    }
    return promise;
  },
  _timeoutHandler: function (timeout, req, callback) {
    return function () {
      const timeoutErr = new Error("ETIMEDOUT");
      timeoutErr.code = "ETIMEDOUT";
      req._isAborted = true;
      req.abort();
      callback.call(
        this,
        new Error.serphouseConnectionError({
          message:
            "Request aborted due to timeout being reached (" + timeout + "ms)",
        }),
        null
      );
    };
  },
  _responseHandler: function (userOptions, callback) {
    const self = this;

    const processResponseType = (res, responseString, callback) => {
      if (
        RESPONSE_CONTENT_TYPE.indexOf(
          res.headers["content-type"].toLowerCase()
        ) > -1
      ) {
        const xmlDoc = new DOMParser().parseFromString(
          responseString,
          "text/xml"
        );
        const response = xmlNodeToObject(xmlDoc.documentElement);
        return callback(null, response);
      } else {
        try {
          const response = JSON.parse(responseString);
          return callback(null, response);
        } catch (exception) {
          return callback.call(callback, responseString);
        }
      }
    };
    return function (res) {
      const dbgResponseBuffer = [];
      const headers = res.headers;
      const statusCode = parseInt(res.statusCode, 10);
      let charset = "";
      let content_type = "";
      let responseString = "";
      if (headers["content-type"]) {
        content_type = headers["content-type"].toLowerCase();
      }
      if (
        content_type &&
        content_type.indexOf("charset") > -1 &&
        content_type.split(";")[0] &&
        content_type.split(";")[1]
      ) {
        if (
          content_type.split(";")[1] &&
          content_type
            .split(";")[1]
            .trim()
            .match(/^((\b[^\s=]+)=(([^=]|\\=)+))*$/)[3]
        ) {
          charset = content_type
            .split(";")[1]
            .trim()
            .match(/^((\b[^\s=]+)=(([^=]|\\=)+))*$/)[3];
        }
        content_type = content_type.split(";")[0].toLowerCase();
      }
      const ResponseHeaders = headers;
      res.on("data", function (chunk) {
        dbgResponseBuffer.push(chunk);
      });
      res.on("end", () => {
        const bufferString = Buffer.concat(dbgResponseBuffer);
        if (userOptions.userRaw === true) {
          const response = { data: bufferString, Headers: ResponseHeaders };
          return callback.call(self, null, response);
        }
        if (userOptions.userCharset && userOptions.userCharset.length > 0) {
          charset = userOptions.userCharset;
          try {
            const decoder = new TextDecoder("windows-1251");
            const win1251String = decoder.decode(bufferString);

            const encoder = new TextEncoder(charset);
            responseString = encoder.encode(win1251String);
          } catch (exception) {
            return callback.call(
              self,
              new Error.serphouseAPIError({
                message:
                  "Failed to parse response received from the serphouse API",
                StatusCode: statusCode || "unknown",
              }),
              null
            );
          }
        } else {
          responseString = bufferString.toString("utf8");
        }
        try {
          if (!responseString && statusCode < 400) {
            Object.defineProperty({}, "lastResponse", {
              enumerable: false,
              writable: false,
              value: res,
            });
            return callback.call(self, null, {});
          }
          if (content_type.includes("text/html") && statusCode < 400) {
            const response = { html: responseString };
            return callback.call(self, null, response);
          }
          processResponseType(res, responseString, (error, response) => {
            if (response.status === "error") {
              return callback.call(
                self,
                {
                  msg: utils.customErrorMsg[statusCode],
                  statusCode,
                },
                null
              );
            } else if (error) {
              return callback.call(
                self,
                new Error.serphouseAPIError({
                  message:
                    "Failed to parse response received from the serphouse API",
                  StatusCode: statusCode || "unknown",
                }),
                null
              );
            }
            Object.defineProperty(response, "lastResponse", {
              enumerable: false,
              writable: false,
              value: res,
            });
            return callback.call(self, null, response);
          });
        } catch (exception) {
          return callback.call(
            self,
            callback.call(
              self,
              {
                msg: utils.customErrorMsg[statusCode],
                statusCode,
              },
              null
            ),
            null
          );
        }
      });
    };
  },
  _errorHandler: function (req, callback, makeRequest) {
    return function (error) {
      if (req._isAborted) {
        return;
      }
      if (error.code === "ECONNRESET") {
        makeRequest();
        return;
      }
      callback.call(
        this,
        {
          msg: utils.customErrorMsg[402],
          statusCode: 402,
        },
        null
      );
    };
  },
  _request: function (method, path, query, data, options, callback) {
    this.body = "";
    let userRaw = "";
    let userCharset = "";
    if (data.__RAW__) {
      userRaw = data.__RAW__;
      delete data.__RAW__;
    }
    if (data.__CHARSET__) {
      userCharset = data.__CHARSET__;
      delete data.__CHARSET__;
    }
    const headers = {};
    headers.Authorization = `Bearer ${this._serphouse.getApiField(
      "api_token"
    )}`;
    if (Object.keys(query).length) {
      const queryParams = new URLSearchParams(query).toString();
      path = path.concat("?", queryParams);
    }
    if (options.contentType && options.contentType === "application/json") {
      this.body = JSON.stringify(data);
      headers["Content-Type"] = "application/json";
      headers["Content-Length"] = this.body.length;
    }

    const makeRequest = () => {
      const timeout = this._serphouse.getApiField("timeout");
      const params = {
        hostname: this._serphouse.getApiField("host"),
        path: path,
        method: method,
        headers: headers,
      };
      const req = https.request(params);
      const userOptions = { userCharset: userCharset, userRaw: userRaw };
      req.setTimeout(timeout, this._timeoutHandler(timeout, req, callback));
      req.on("response", this._responseHandler(userOptions, callback));
      req.on("error", this._errorHandler(req, callback, makeRequest));
      req.on("socket", (socket) => {
        socket.on("secureConnect", () => {
          req.write(this.body);
          req.end();
        });
      });
    };
    makeRequest();
  },
};
module.exports = serphouseResource;
