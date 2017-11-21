import { Response } from "express";

export enum EEndpoint {
  primary = ""
}

export function expectedResponse(endPoint: EEndpoint): {} {
  switch (endPoint) {
    case EEndpoint.primary: {
      const res: {} = { status: 200, message: "Welcome To Our Website!" };
      return res;
    }
  }
}
