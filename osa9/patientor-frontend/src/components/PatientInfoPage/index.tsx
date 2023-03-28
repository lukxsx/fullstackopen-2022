import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Entry, Patient } from "../../types";
import patientService from "../../services/patients";

const EntryInfo = ({ entry }: { entry: Entry }) => {
  return (
    <div>
      <h4>{entry.date}</h4>
      <i>{entry.description}</i>
      {entry.diagnosisCodes && <h5>Diagnoses</h5>}
      <ul>
        {entry.diagnosisCodes?.map((d) => (
          <li>{d}</li>
        ))}
      </ul>
    </div>
  );
};

const PatientInfoPage = () => {
  const id = useParams().id;

  const [patient, setPatient] = useState<Patient>();
  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.get(id ? id : "");
      setPatient(patient);
    };
    void fetchPatient();
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
        <EntryInfo entry={e} />
      ))}
    </div>
  );
};

export default PatientInfoPage;
