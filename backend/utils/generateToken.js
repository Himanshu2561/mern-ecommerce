import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // Set JWT as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    // maxAge should be in days because we are slicing the string to convert it into seconds.
    maxAge: Number(process.env.JWT_EXPIRE.slice(0, -1)) * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
