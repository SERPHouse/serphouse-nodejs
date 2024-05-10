const serphouse = require("../lib/SERPHouse")(process.env.API_KEY);

describe("Location.search()", () => {
  test("It should get locations list ", async () => {
    const payload = { query: { q: "india", type: "google" } };
    const response = await serphouse.Location.search(payload);
    expect(response.status).toBe("success");
  });
});
