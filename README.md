# @serphouse/serphouse-nodejs

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/SERPHouse/serphouse-nodejs/run-tests.yml?logo=githubactions&label=Tests%20with%20Jest)](https://github.com/SERPHouse/serphouse-nodejs/actions/workflows/run-tests.yml)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/SERPHouse/serphouse-nodejs/linter.yml?logo=githubactions&label=Code%20Quality)](https://github.com/SERPHouse/serphouse-nodejs/actions/workflows/linter.yml)
[![NPM Version](https://img.shields.io/npm/v/%40serphouse%2Fserphouse-nodejs)](https://www.npmjs.com/package/@serphouse/serphouse-nodejs)

SERPHouse API is the starting point on your journey towards building a powerful SEO software. With SERPHouse you can get all the data you’d need to build an efficient application while also saving your time and your budget.

This comprehensive document designed to provide you with all the technical information as well as product information you need to interact with our API and harness its full potential. Whether you're a software developer integrating SERPHouse SERP API services into your application or a curious user exploring the possibilities, this API documentation will serve as your go-to resource.

High Volume SERP API for SEO professionals and data scientist. We built reliable, accurate and cost efficient solution, We take cares of resolving captcha, managing proxy to ensure you get reliable Structured JSON data.

This API supported Serphouse's standard REST API that accepts/returns JSON requests. Here is the [API reference](https://docs.serphouse.com/)

##### It does supports EcmaScript 5, EcmaScript 6, EcmaScript 8, TypeScript, async-await, Promises, Callback!!!

##### It supports pure JSON response.

##### All methods support Promise and Callback both.

## Get started

Using the Serphouse API wrapper for Node.js is really simple.
Follow these steps to integrate it into your project:

## Documentation

Documentation of Serphouse's API and their usage is available at [https://docs.serphouse.com/](https://docs.serphouse.com/)

## Prerequisites

node >= 14.21.3

## Installation

```bash
npm install @serphouse/serphouse-nodejs --save
```

## Configuration Using JavaScript

```bash

var serphouse = require("@serphouse/serphouse-nodejs")("YOUR_API_KEY");

OR

var SerphouseAPI = require("@serphouse/serphouse-nodejs");
var serphouse = new SerphouseAPI("YOUR_API_KEY");

OR

var SerphouseAPI = require("@serphouse/serphouse-nodejs");
var serphouse = new SerphouseAPI();
serphouse.setApiToken("YOUR_API_KEY");
```

## Configuration Using TypeScript

```js
import * as SerphouseAPI from "@serphouse/serphouse-nodejs";
var serphouse = new SerphouseAPI();
serphouse.setApiToken("YOUR_API_KEY");
```

## Get API Key

You can obtain an API key by registering at [https://app.serphouse.com/register](https://app.serphouse.com/register). This key will be required for accessing the API.

## Examples

1. [Serp Api](#serp_api)

2. [Domains List](#domains)

3. [Language List](#language)

4. [Locations List](#location)

5. [Account Info](#account)

6. [Trends Api](#trends)

---

> ### [Serp Api](#examples)

1. SERP Live

```js
/** Performing a realtime search  */
var payload = {
  data: {
    q: "Coffee",
    domain: "google.com",
    lang: "en",
    device: "desktop",
    serp_type: "web",
    loc: "Alba,Texas,United States",
    verbatim: 0,
    postback_url: "https://webhook.site/8f885f1f-c38a-4a10-8506-335441213208",
    page: 1,
    num_result: 10,
  },
  path: { responseType: "json" },
};

try {
  var response = await serphouse.SerpApi.live(payload);
} catch (error) {
  return;
}
```

If you need to get response by responseType HTML or Json then you can use Like Below Example:

```js
serphouse.SerpApi.live("DATA_ARRAY", "responseType"); // default responseType is Json
```

2. SERP Schedule

```js
/** Create a new schedule */
var payload = {
  data: [
    {
      q: "Coffee",
      domain: "google.com",
      lang: "en",
      device: "desktop",
      serp_type: "web",
      loc: "Alba,Texas,United States",
      verbatim: 0,
      postback_url: "https://webhook.site/8f885f1f-c38a-4a10-8506-335441213208",
      page: 1,
      num_result: 10,
    },
  ],
};

try {
  var response = await serphouse.SerpApi.schedule(payload);
} catch (error) {
  return;
}
```

3. SERP Check

```js
/** You will get a status of your serp task */
var payload = { query: { id: 127105618 } };
try {
  var response = await serphouse.SerpApi.check(payload);
} catch (error) {
  return;
}
```

4. SERP Get

```js
/** you will receive an json array containing a result of your serp query */
var payload = {
  query: { id: 127673427 },
  path: { responseType: "html" }, // path is optional default get json
};
try {
  var response = await serphouse.SerpApi.get(payload);
} catch (error) {
  return;
}
```

If you need to get response by responseType HTML or Json then you can use like below example:

```js
serphouse.SerpApi.get("SERP_ID", "responseType"); // default responseType is Json
```

---

> ### [Domains List](#examples)

1. Get Domains List

```js
/** Get domains list  */
try {
  var response = await serphouse.Domains.list();
} catch (error) {
  return;
}
```

---

> ### [Language List](#examples)

1. Get Languages List

```js
/** Get list of languages by Google, Bing and Yahoo  */
try {
  const payload = { path: { type: "google" } };
  var response = await serphouse.Languages.list(payload);
} catch (error) {
  return;
}
```

If you need to get Languages List by google, bing and yahoo then you can use like below example:

```js
serphouse.Languages.list({ type: "bing" }); // default type is google
```

---

> ### [Locations List](#examples)

1. Get Locations List

```js
/** Get locations available for our SERP API  */
try {
  const payload = {
    query: {
      q: "india",
      type: "google",
    },
  };
  var response = await serphouse.Location.search(payload);
} catch (error) {
  return;
}
```

---

> ### [Account Info](#examples)

1. Get Account Information

```js
/** Get your account information */
try {
  var response = await serphouse.Account.fetch();
} catch (error) {
  return;
}
```

> ### [Trends Api](#examples)

1. Trend Search

```js
/** Performing a realtime google trends search  */
try {
  var payload = {
    time_zone_offset: -330,
    keywords: "google,youtube",
    time: "now 1-d",
  };
  var response = await serphouse.Trends.search(payload);
} catch (error) {
  return;
}
```

2. Trend Schedule

```js
/** Create trend schedule  */
try {
  var payload = {
    data: [
      {
        time_zone_offset: -330,
        keywords: "google,youtube",
        time: "now 1-d",
      },
    ],
  };
  var response = await serphouse.Trends.schedule(payload);
} catch (error) {
  return;
}
```

3. Get TimeZone List

```js
/** Retrieve full list of timezone and its offset value  */
try {
  var response = await serphouse.Trends.timeZoneList();
} catch (error) {
  return;
}
```

4. Get Categories List

```js
/** Retrieve full list of categories and sub category  */
try {
  var response = await serphouse.Trends.categoryList();
} catch (error) {
  return;
}
```

5. Get Country and State List

```js
/** Retrieve full list of country and state */
try {
  var response = await serphouse.Trends.countryStateList();
} catch (error) {
  return;
}
```

6. Get Language List

```js
/** Retrieve full list of language. */
try {
  var response = await serphouse.Trends.languageList();
} catch (error) {
  return;
}
```

7. Trends Check

```js
/** Check search status. */
try {
  var payload = { query: { id: 127105618 } };
  var response = await serphouse.Trends.check(payload);
} catch (error) {
  return;
}
```

8. Trends Get

```js
/** Get result of your trend search query. */
try {
  var payload = { query: { id: 127105618 } };
  var response = await serphouse.Trends.get(payload);
} catch (error) {
  return;
}
```

## Response

Example of success response.

```js
{Response : {"status":"success","msg":"Completed","search_metadata":{"id":128078258,"status":"success","created_at":"2024-05-04T06:20:10.000000Z","processed_at":"2024-05-04 06:20:10"},"search_parameters":{"langauge_code":"en-US","geo":"US","keywords":"google,youtube","time_zone_offset":"-330","time":"now 1-d","category":0,"property":"youtube"},"results":{"TIMESERIES":[{"time":"1714716960","formattedTime":"May 3, 2024 at 11:46 AM","formattedAxisTime":"May 3 at 11:46 AM","value":[19,72],"hasData":[true,true],"formattedValue":["19","72"]}],"GEO_MAP":{"google":{"default":{"geoMapData":[{"geoCode":"US-VT","geoName":"Vermont","value":[100],"formattedValue":["100"],"maxValueIndex":0,"hasData":[true]}]}},"youtube":{"default":{"geoMapData":[{"geoCode":"US-NH","geoName":"New Hampshire","value":[100],"formattedValue":["100"],"maxValueIndex":0,"hasData":[true]}]}}},"RELATED_QUERIES":{"google":{"default":{"rankedList":[{"rankedKeyword":[{"query":"google link","value":100,"formattedValue":"100","hasData":true,"link":"/trends/explore?q=google+link&date=now+1-d&geo=US"}]},{"rankedKeyword":[{"query":"the man who killed google search","value":1650,"formattedValue":"+1,650%","link":"/trends/explore?q=the+man+who+killed+google+search&date=now+1-d&geo=US"}]}]}},"youtube":{"default":{"rankedList":[{"rankedKeyword":[{"query":"on youtube","value":100,"formattedValue":"100","hasData":true,"link":"/trends/explore?q=on+youtube&date=now+1-d&geo=US"}]},{"rankedKeyword":[{"query":"jayson tatum youtube channel","value":5300,"formattedValue":"Breakout","link":"/trends/explore?q=jayson+tatum+youtube+channel&date=now+1-d&geo=US"}]}]}}}}}}

```

Example of validation errors response.

```js
  {"status":"error","msg":"validation_error","error":{"time_zone_offset":["The time zone offset field is required."]}}
```
