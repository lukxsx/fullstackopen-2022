const target = 2;

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: number[]): Result => {
  let res = {} as Result;
  res.periodLength = hours.length;
  res.trainingDays = hours.filter(x => x !== 0).length;
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
  return res
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]))