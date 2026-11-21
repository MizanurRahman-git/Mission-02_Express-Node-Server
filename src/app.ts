import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import globalErrorHandle from "./middleware/globalErrorHandling";
import cors from "cors"

const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
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

app.use(globalErrorHandle)

export default app;
