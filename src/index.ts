import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createProperty, getAllProperties, getProperty } from "./models/Property";
const cors = require("cors");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/properties", async (req: Request, res: Response) => {
    try {
        if (!!req.query.id) {
            const property = await getProperty(req.query.id as string);
            res.json(property);
        } else {
            const properties = await getAllProperties();
            res.json(properties);
        }
    } catch (e: unknown) {
        res.json((e as Error).message);
    }
});

app.listen(port, () => {
    console.log(`[server] Server is running on port ${port}`);
});
