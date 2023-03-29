import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Diagnosis, Entry, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

const EntryInfo = ({
  entry,
  diagnoseData,
}: {
  entry: Entry;
  diagnoseData: Diagnosis[];
}) => {
  const nameByCode = (code: string): string | undefined => {
    const diag = diagnoseData.find((d) => d.code === code);
    return diag?.name;
  };
  return (
    <div>
      <h4>{entry.date}</h4>
      <i>{entry.description}</i>
      {entry.diagnosisCodes && <h5>Diagnoses</h5>}
      <ul>
        {entry.diagnosisCodes?.map((d) => (
          <li>
            {d}
            {nameByCode(d) ? ": " + nameByCode(d) : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PatientInfoPage = () => {
  const [diagnoseData, setDiagnoseData] = useState<Diagnosis[]>([]);
  const id = useParams().id;

  const [patient, setPatient] = useState<Patient>();
  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.get(id ? id : "");
      setPatient(patient);
    };
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoseData(diagnoses);
    };
    void fetchPatient();
    void fetchDiagnoses();
  }, [id]);

  if (!patient) return <h2>Patient not found!</h2>;
  return (
    <div>
      <h2>{patient.name}</h2>
      <h3>Details</h3>
      <ul>
        <li>Date of birth: {patient.dateOfBirth}</li>
        <li>SSN: {patient.ssn}</li>
        <li>Occupation: {patient.occupation}</li>
        <li>Gender: {patient.gender}</li>
      </ul>
      <h3>Entries</h3>
      {patient.entries.map((e) => (
        <EntryInfo diagnoseData={diagnoseData} entry={e} />
      ))}
    </div>
  );
};

export default PatientInfoPage;
