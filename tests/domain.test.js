const serphouse = require("../lib/SERPHouse")(process.env.API_KEY);

describe("Domains.list()", () => {
  test("It should get all domains list ", async () => {
    const response = await serphouse.Domains.list();
    expect(response.status).toBe("success");
  });
});
