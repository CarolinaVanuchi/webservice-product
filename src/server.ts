import express, {json} from "express";
import { db } from "./database/db";
import { router } from "./routes/routes";
import cors from "cors";

const app = express();
app.use(json());

app.use(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    app.use(cors());
    next();
});

app.use(cors({
    origin: ['*']
}));

app.use(router);

app.get('/', (req, res) => {
    console.log(__dirname)
    res.status(200).json("Wellcome...");
});

app.listen(80, async () => {
    await db.sync();
    console.log(`Server running ${process.env.PROJECT_NAME}`)
});