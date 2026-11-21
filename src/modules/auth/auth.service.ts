import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  const user = await pool.query(
    `
   SELECT * FROM users WHERE email=$1 
    `,
    [email],
  );

  if (user.rowCount === 0) {
    throw new Error("Invalid Credential...");
  }

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!matchPassword) {
    throw new Error("Invalid Credential...");
  }
  if (!user.rows[0].is_active) {
    throw new Error("Access Denied");
  }

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role
  };

  const accessToken = jwt.sign(jwtPayload, config.secret_string, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(jwtPayload, config.refreshSecret_string, {
    expiresIn: "10d",
  });

  delete user.rows[0].password
  return {accessToken,refreshToken, user: user.rows[0]};
};

export const authService = {
  loginUserIntoDB,
};
