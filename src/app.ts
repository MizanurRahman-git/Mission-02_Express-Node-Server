import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
import { userRoute } from "./modules/users/user.route";
const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is Root Route",
    author: "MR",
  });
});

app.use("/api/v1/users", userRoute)

app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
        SELECT * FROM users
        `);

    res.status(200).json({
      success: true,
      message: "Users Retrived Succesfully...",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
        SELECT * FROM users WHERE id=$1
        `,
      [id],
    );

    res.status(200).json({
      success: true,
      message: "User Retrived Succesfully...",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, age, is_Active } = req.body;
    const result = await pool.query(
      `
            UPDATE users 
            SET
            name = COALESCE($1, name),
            password = COALESCE($2, password),
            age = COALESCE($3, age),
            is_Active = COALESCE($4, is_Active),
            updated_At = NOW() 
            WHERE id = $5 RETURNING *
            `,
      [name ?? null, password ?? null, age ?? null, is_Active ?? null, id],
    );

    res.status(200).json({
      success: true,
      message: "User Updated Succesfully...",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
          DELETE FROM users WHERE id = $1  
            `,
      [id],
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found...",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Deleted Succesfully...",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

export default app;
