export const isNotNumber = (argument: any): boolean =>
  isNaN(Number(argument));

interface BMIValues {
    height: number,
    weight: number
}

interface exerciseValues {
    target: number,
    hours: number[]
}