import { NextFunction, Request, Response } from "express";
import CustomAPIError from "../errors/custom.error";

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong, try again later",
  };
  if (err instanceof CustomAPIError) {
    return res
      .status(defaultError.statusCode)
      .json({ message: defaultError.msg, succes: false });
  }
  if (err.name === "validationError") {
    defaultError.statusCode = 500;
    defaultError.msg = Object.values(err.errors)
      .map((item: { message: string }) => item?.message)
      .join(",");
  }
  if ((err.name = "CastError")) {
    defaultError.statusCode = 400;
    defaultError.msg = `Resource not found. Invalid :${err.path}`;
  }

  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be uniqe`;
  }
  res
    .status(defaultError.statusCode)
    .json({ message: defaultError.msg, succes: false });
};

export default errorHandlerMiddleware;
