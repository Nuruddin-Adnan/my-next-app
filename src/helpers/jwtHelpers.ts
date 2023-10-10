import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const verifyToken = (token: string, secret: Secret): JwtPayload | null => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const jwtHelpers = {
  verifyToken,
};
