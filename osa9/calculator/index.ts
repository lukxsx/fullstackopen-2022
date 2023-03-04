import express from "express";
import qs from "qs";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { isNotNumber } from "./utils";

const app = express();
app.set("query parser", (str: string) =>
  qs.parse(str, {
    /* custom options */
  })
);
app.use(express.json());

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
      });
    } else {
      res.status(400).json({ error: "parameters are not numbers" });
      return;
    }
  } else {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (isNotNumber(target) || !Array.isArray(daily_exercises)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const target_ = target as number;
  const hours = daily_exercises as number[];

  for (let i = 0; i < hours.length; i++) {
    if (isNotNumber(hours[i])) {
      res.status(400).json({ error: "malformatted parameters" });
      return;
    }
  }

  const exercises = calculateExercises(target_, hours);
  res.json(exercises);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
