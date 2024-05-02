const serphouse = require("../lib/SERPHouse")(process.env.API_KEY);
var id_key = "";
describe("SerpApi.live()", () => {
  test("Performing a realtime search ", async () => {
    const payload = {
      data: {
        q: "Coffee",
        domain: "google.com",
        lang: "en",
        device: "desktop",
        serp_type: "web",
        loc: "Alba,Texas,United States",
        verbatim: 0,
        postback_url:
          "https://webhook.site/8f885f1f-c38a-4a10-8506-335441213208",
        page: 1,
        num_result: 10,
      },
      path: { responseType: "json" },
    };
    const response = await serphouse.SerpApi.live(payload);
    id_key = response.results.search_metadata.id;
    expect(response.status).toBe("success");
  });
});

describe("SerpApi.schedule()", () => {
  test("Create the new serp schedule ", async () => {
    const payload = {
      data: [
        {
          q: "Coffee",
          domain: "google.com",
          lang: "en",
          device: "desktop",
          serp_type: "web",
          loc: "Alba,Texas,United States",
          verbatim: 0,
          postback_url:
            "https://webhook.site/8f885f1f-c38a-4a10-8506-335441213208",
          page: 1,
          num_result: 10,
        },
      ],
    };
    const response = await serphouse.SerpApi.schedule(payload);
    expect(response.status).toBe("success");
  });
});

describe("SerpApi.get()", () => {
  test("You will receive result of serp query ", async () => {
    const payload = {
      query: { id: id_key },
      path: { responseType: "json" },
    };
    const response = await serphouse.SerpApi.get(payload);
    expect(response.status).toBe("success");
  });
});

describe("SerpApi.check()", () => {
  test("You will get a status of your task ", async () => {
    const payload = { query: { id: id_key } };
    const response = await serphouse.SerpApi.check(payload);
    expect(response.status).toBe("success");
  });
});
