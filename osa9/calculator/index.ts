import express from "express";
import qs from "qs";
import { calculateBmi } from "./bmiCalculator";
import { isNotNumber } from "./utils";


const app = express();
app.set('query parser',
(str: string) => qs.parse(str, { /* custom options */ }))

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const query = req.query;
    if (query.height && query.weight) {
        if (!isNotNumber(query.height) && !isNotNumber(query.weight)) {
            const bmi = calculateBmi(Number(query.height), Number(query.weight));
            res.json({
                weight: query.weight,
                height: query.height,
                bmi: bmi,
            })
        } else {
            res.status(400).json({ error: "parameters are not numbers" });
        }
    } else {
        res.status(400).json({ error: "malformatted parameters"})
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
