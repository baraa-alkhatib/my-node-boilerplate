import * as chai from "chai";
import chaiHttp = require("chai-http");

import app from "./../src/app";
import { EEndpoint, expectedResponse } from "./helpers/app.spec.helper";

// ref for expect func
const expect = chai.expect;

// use the http plugin of the assertion library chai
chai.use(chaiHttp);

// ********************************************************** //
// ********************************************************** //
// ****************** Start Testing ************************* //
// ********************************************************** //
// ********************************************************** //

describe("GET /", () => {
  it("should return a message wrapped in a json object", () => {
    const endPoint = EEndpoint.primary;
    return chai
      .request(app)
      .get(endPoint)
      .then((res: any) => {
        expect(res.body).to.contain(expectedResponse(endPoint));
      });
  });
});

