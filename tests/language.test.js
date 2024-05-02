const serphouse = require("../lib/SERPHouse")(process.env.API_KEY);

describe("Languages.list()", () => {
  test("It should get all the languages list ", async () => {
    const pathParams = { path: { type: "google" } };
    const response = await serphouse.Languages.list(pathParams);
    expect(response.status).toBe("success");
  });
});
