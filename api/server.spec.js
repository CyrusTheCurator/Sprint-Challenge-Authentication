const request = require("supertest");
const server = require("./server");
const { intersect } = require("../database/dbConfig");

describe("server.js", () => {
  it("should set the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    //return code

    //return type

    it("should return 404", () => {
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(404);
        });
    });

    it("should return 500 error using async", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.status).toBe(500);
    });

    it("should return an empty obj", async () => {
      const res = await request(server).get("/");
      expect(res.body).toEqual({});
    });

    it("should successfully log in", async () => {
      const res = await request(server).post("/api/auth/login").send({
        username: "jon",
        password: "quimble",
      });

      expect(res.body.message).toEqual("welcome, jon");
    });
  });
});
