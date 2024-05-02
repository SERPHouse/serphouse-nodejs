const serphouse = require("../lib/SERPHouse")(process.env.API_KEY);

describe("Account.fetch()", () => {
  test("You can get your account information ", async () => {
    const response = await serphouse.Account.fetch();
    expect(response.status).toBe("success");
  });

  test("should handle 401 error for invalid API token", async () => {
    const invalidSerphouse = require("../lib/SERPHouse")("INVALID_API_TOKEN");
    try {
      await invalidSerphouse.Account.fetch();
    } catch (error) {
      expect(error.statusCode).toBe(401);
      expect(error.msg).toBe("Unauthenticated: Access denied");
    }
  });
});
