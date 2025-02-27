import request from "supertest";
import app from "../src/app.js";
import * as chai from 'chai';
import mongoose from "mongoose";

const { expect } = chai;

describe("Rutas de la API", function () {
  before((done) => {
    mongoose.connection.once('open', () => {
      console.log("MongoDB conectado para las pruebas");
      done();
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Error de conexión a MongoDB: ${err}`);
      done(err);
    });

    if (mongoose.connection.readyState === 0) {
      mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    }
  });

  after(async function () {
    this.timeout(5000); 
    await mongoose.connection.close();
  });

  describe("GET /api/mocks", () => {
    it("debe obtener todos los usuarios y productos", (done) => {
      request(app)
        .get("/api/mocks")
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property("users");
          expect(res.body).to.have.property("products");
          done();
        });
    });
  });

  describe("GET /api/mocks/:users/:products", () => {
    it("debe obtener 5 usuarios y 10 productos", (done) => {
      request(app)
        .get("/api/mocks/5/10")
        .expect(200)
        .end((err, res) => {
          expect(res.body.users).to.have.lengthOf(5);
          expect(res.body.products).to.have.lengthOf(10);
          done();
        });
    });

    it("debe devolver error si los parámetros no son números", (done) => {
      request(app)
        .get("/api/mocks/abc/xyz")
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal("Los parámetros deben ser números.");
          done();
        });
    });
  });

  describe("POST /api/mocks/:users/:products", () => {
    it("debe generar 5 usuarios y 10 productos", (done) => {
      request(app)
        .post("/api/mocks/5/10")
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal("Datos generados exitosamente");
          expect(res.body.users).to.have.lengthOf(5);
          expect(res.body.products).to.have.lengthOf(10);
          done();
        });
    });

    it("debe devolver error si los parámetros no son números", (done) => {
      request(app)
        .post("/api/mocks/abc/xyz")
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal("Los parámetros deben ser números.");
          done();
        });
    });
  });

  describe("DELETE /api/mocks", () => {
    it("debe eliminar todos los usuarios y productos", (done) => {
      request(app)
        .delete("/api/mocks")
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property("message").that.includes("eliminados");
          done();
        });
    });
  });
});
