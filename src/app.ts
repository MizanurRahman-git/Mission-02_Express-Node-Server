import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";

const app: Application = express();

app.use(express.json());
// app.use(express.text())
// app.use(express.urlencoded({extended: true})) //! হয়তো Express Middleware এর কোনো কাজে দিবে এটা but আমাদের এখন কোনো প্রয়োজন নাই। পরে লাগলে Uncomment করে দিবো। 

app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is Root Route",
    author: "MR",
  });
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/users/:id", userRoute);
app.use("/api/v1/users/:id", userRoute);
app.use("/api/v1/users/:id", userRoute)

app.use("/api/v1/profile", profileRoute)

app.use("/api/v1/auth", authRoute)

export default app;
