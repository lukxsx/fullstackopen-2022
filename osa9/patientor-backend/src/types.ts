// eslint-disable-next-line @typescript-eslint/no-empty-interface

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface sickLeave {
  startDate: string;
  endDate: string;
}

interface discharge {
  date: string;
  criteria: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: sickLeave;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewPatientEntry = Omit<Patient, "id">;

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;
