"use strict";
const utils = require("./utils");
module.exports = {
  serphouseMethod: function (spec) {
    const urlParams = spec.urlParams || null;
    return function () {
      const args = [].slice.call(arguments);
      const pathData = args[0];
      const encode = (data) => data;
      return this.wrapTimeout(
        new Promise(
          function (resolve, reject) {
            const opts = utils.getOptionsFromArgs(args);
            let query = {},
              data = {};
            if (pathData && utils.isQuery(pathData)) {
              query = utils.getQueryFromArgs(args);
            } else if (pathData) {
              data = encode(utils.getDataFromArgs(args));
            }
            const requestCallback = (err, response) => {
              err
                ? reject(err)
                : resolve(
                    spec.transformResponseData
                      ? spec.transformResponseData(response)
                      : response
                  );
            };

            const requestPath = this.replaceUrlPlaceholders(
              spec.path,
              pathData?.path,
              urlParams,
              requestCallback
            );

            const options = {
              headers: Object.assign(opts.headers, spec.headers),
              useBody: spec.useBody || false,
              authorization: opts.auth || "",
              contentType: spec.contentType || "",
            };
            this._request(
              spec.method || "GET",
              requestPath,
              query,
              data,
              options,
              requestCallback
            );
          }.bind(this)
        ),
        false
      );
    };
  },
  setMetadata: (id, key, value, auth, cb) => {
    const data = key;
    const isObject =
      typeof key === "object" && key !== null && key.constructor === Object;
    const isNull = data === null || (isObject && !Object.keys(data).length);
    if ((isNull || isObject) && typeof value === "string") {
      auth = value;
    } else if (typeof auth !== "string") {
      if (!cb && typeof auth === "function") {
        cb = auth;
      }
      auth = null;
    }
    const urlData = this.createUrlData();
    const path = this.createFullPath("/" + id, urlData);
    return this.wrapTimeout(
      new Promise(
        function (resolve, reject) {
          if (isNull) {
            sendMetadata(null, auth);
          } else if (!isObject) {
            const metadata = {};
            metadata[key] = value;
            sendMetadata(metadata, auth);
          } else {
            this._request(
              "POST",
              path,
              {},
              {
                metadata: null,
              },
              auth,
              {},
              (err) => {
                if (err) {
                  return reject(err);
                }
                sendMetadata(data, auth);
              }
            );
          }
          function sendMetadata(metadata, auth) {
            this._request(
              "POST",
              path,
              {},
              {
                metadata: metadata,
              },
              auth,
              {},
              (err, response) => {
                err ? reject(err) : resolve(response.metadata);
              }
            );
          }
        }.bind(this)
      ),
      cb
    );
  },
  getMetadata: (id, auth, cb) => {
    if (!cb && typeof auth === "function") {
      cb = auth;
      auth = null;
    }
    const urlData = this.createUrlData();
    const path = this.createFullPath("/" + id, urlData);
    return this.wrapTimeout(
      new Promise(
        function (resolve, reject) {
          this._request("GET", path, {}, {}, auth, {}, (err, response) => {
            err ? reject(err) : resolve(response.metadata);
          });
        }.bind(this)
      ),
      cb
    );
  },
};
