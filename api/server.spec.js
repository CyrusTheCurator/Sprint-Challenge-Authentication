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

    it("should successfully log in ", async () => {
      let res = await request(server).post("/api/auth/login").send({
        username: "quimb",
        password: "quimble",
      });

      expect(res.body.message).toEqual("welcome, quimb");
    });

    it("should fail log in ", async () => {
      let res = await request(server).post("/api/auth/login").send({
        username: "quimb",
        password: "quimblze",
      });

      expect(res.body.message).toEqual("username or password incorrect");
    });

    it("should successfully log in and test authentication", async () => {
      let res = await request(server).post("/api/auth/login").send({
        username: "jon",
        password: "quimble",
      });

      expect(res.body.message).toEqual("welcome, jon");

      let token = "bearer " + res.body.token;
      res = await request(server)
        .get("/api/jokes")
        .set({ Authorization: token });

      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should successfully register", async () => {
      const res = await request(server).post("/api/auth/register").send({
        username: "zebra",
        password: "friend",
      });

      expect(res.body.message).toEqual("Registration successful");
    });

    it("should fail register", async () => {
      const res = await request(server).post("/api/auth/register").send({
        username: "zebra",
      });

      expect(res.status).toEqual(500);
    });
  });
});
