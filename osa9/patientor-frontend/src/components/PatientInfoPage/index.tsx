import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";

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
      <ul>
        <li>Date of birth: {patient.dateOfBirth}</li>
        <li>SSN: {patient.ssn}</li>
        <li>Occupation: {patient.occupation}</li>
        <li>Gender: {patient.gender}</li>
      </ul>
    </div>
  );
};

export default PatientInfoPage;
