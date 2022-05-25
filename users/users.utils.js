import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const protectResolver = (user) => {
  if (!user) {
    throw new Error("You need to login.");
  }
};
