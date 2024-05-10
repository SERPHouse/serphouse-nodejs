const serphouse = require("../lib/SERPHouse")(process.env.API_KEY);
var id_key = "";

describe("Trends.search()", () => {
  test("Performing a realtime google trends search ", async () => {
    const payload = {
      time_zone_offset: -330,
      keywords: "google,youtube",
      time: "now 1-d",
    };
    const response = await serphouse.Trends.search(payload);
    id_key = response.search_metadata.id;
    expect(response.status).toBe("success");
  });
});

describe("Trends.schedule()", () => {
  test("Create the new trend schedule ", async () => {
    const payload = {
      data: [
        {
          time_zone_offset: -330,
          keywords: "google,youtube",
          time: "now 1-d",
        },
      ],
    };
    const response = await serphouse.Trends.schedule(payload);
    expect(response.status).toBe("success");
  });
});

describe("Trends.timeZoneList()", () => {
  test("Retrieve full list of timezone and its offset value ", async () => {
    const response = await serphouse.Trends.timeZoneList();
    expect(response.status).toBe("success");
  });
});

describe("Trends.categoryList()", () => {
  test("Retrieve full list of categories and sub category ", async () => {
    const response = await serphouse.Trends.categoryList();
    expect(response.status).toBe("success");
  });
});

describe("Trends.countryStateList()", () => {
  test("Retrieve full list of country and state ", async () => {
    const response = await serphouse.Trends.countryStateList();
    expect(response.status).toBe("success");
  });
});

describe("Trends.languageList()", () => {
  test("Retrieve full list of language ", async () => {
    const response = await serphouse.Trends.languageList();
    expect(response.status).toBe("success");
  });
});

describe("Trends.get()", () => {
  test("You will receive trend search query ", async () => {
    const payload = { query: { id: id_key } };
    const response = await serphouse.Trends.get(payload);
    expect(response.status).toBe("success");
  });
});

describe("Trends.check()", () => {
  test("You will get a status of your trend search task ", async () => {
    const payload = { query: { id: id_key } };
    const response = await serphouse.Trends.check(payload);
    expect(response.status).toBe("success");
  });
});
