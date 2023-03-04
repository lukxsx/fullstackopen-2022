import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (target: number, hours: number[]): Result => {
  const res = {} as Result;
  res.periodLength = hours.length;
  res.trainingDays = hours.filter((x) => x !== 0).length;
  res.target = target;
  res.average = hours.reduce((a, b) => a + b, 0) / res.periodLength;
  if (res.average < target - 0.5) {
    res.rating = 1;
    res.ratingDescription = "not very good";
  } else if (res.average > target + 0.5) {
    res.rating = 3;
    res.ratingDescription = "pretty good";
  } else {
    res.rating = 2;
    res.ratingDescription = "not too bad but could be better";
  }
  res.success = res.average >= res.target;
  return res;
};

interface ExeValues {
  target: number;
  hours: number[];
}

const parseArguments = (args: string[]): ExeValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const hours: number[] = [];
  if (!isNotNumber(args[2])) {
    for (let i = 3; i < args.length; i++) {
      if (isNotNumber(args[i])) {
        throw new Error("Provided values were not numbers!");
      } else {
        hours.push(Number(args[i]));
      }
    }
    return {
      target: Number(args[2]),
      hours: hours,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(target, hours));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
