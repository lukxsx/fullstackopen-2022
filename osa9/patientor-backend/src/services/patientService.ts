import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import { Patient } from "../types";
import { NewPatientEntry, NonSensitivePatientEntry } from "../types";

const getPatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatient: Patient = {
    id,
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (patient) return patient;
  return undefined;
};

export default {
  getPatients,
  getPatient,
  addPatient,
};
