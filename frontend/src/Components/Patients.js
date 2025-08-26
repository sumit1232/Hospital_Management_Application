import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Patients.css';
import PatientCard from './PatientCard';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '' });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch patients when component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/patients')
      .then((response) => setPatients(response.data))
      .catch((error) => console.error('Error fetching patients:', error));
  }, []);

  // Add patient
  const handleAddPatient = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/patients/add', newPatient)
      .then((response) => {
        setPatients([...patients, response.data]);
        setNewPatient({ name: '', age: '', gender: '' }); // reset form
      })
      .catch((error) => console.error('Error adding patient:', error));
  };

  // Update patient
  const handleUpdatePatient = (id, e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/patients/update/${id}`, selectedPatient)
      .then(() => {
        const updatedPat = { ...selectedPatient, _id: id };
        setPatients(patients.map((p) => (p._id === id ? updatedPat : p)));
        setSelectedPatient(null);
        setIsEditMode(false);
      })
      .catch((error) => console.error('Error updating patient:', error));
  };

  // Delete patient
  const handleDeletePatient = (id) => {
    axios
      .delete(`http://localhost:5000/patients/delete/${id}`)
      .then(() => {
        setPatients(patients.filter((p) => p._id !== id));
        setSelectedPatient(null);
      })
      .catch((error) => console.error('Error deleting patient:', error));
  };

  // Edit patient
  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsEditMode(true);
  };

  return (
    <div className="patient-main">
      <div className="form-sections">
        <h4>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</h4>

        <form
          onSubmit={
            isEditMode
              ? (e) => handleUpdatePatient(selectedPatient._id, e)
              : handleAddPatient
          }
        >
          <label>Name: </label>
          <input
            type="text"
            value={isEditMode && selectedPatient ? selectedPatient.name : newPatient.name}
            onChange={(e) =>
              isEditMode
                ? setSelectedPatient({ ...selectedPatient, name: e.target.value })
                : setNewPatient({ ...newPatient, name: e.target.value })
            }
          />
          <br />

          <label>Age: </label>
          <input
            type="number"
            value={isEditMode && selectedPatient ? selectedPatient.age : newPatient.age}
            onChange={(e) =>
              isEditMode
                ? setSelectedPatient({ ...selectedPatient, age: e.target.value })
                : setNewPatient({ ...newPatient, age: e.target.value })
            }
          />
          <br />

          <label>Gender: </label>
          <input
            type="text"
            value={isEditMode && selectedPatient ? selectedPatient.gender : newPatient.gender}
            onChange={(e) =>
              isEditMode
                ? setSelectedPatient({ ...selectedPatient, gender: e.target.value })
                : setNewPatient({ ...newPatient, gender: e.target.value })
            }
          />
          <br />

          <button type="submit">{isEditMode ? 'Update Patient' : 'Add Patient'}</button>
        </form>
      </div>

      <div className="patients-section">
        <h3 style={{ textAlign: 'center' }}>
          Patients ({patients.length})
        </h3>

        <div className="patient-list">
          {patients.map((patient) => (
            <PatientCard
              key={patient._id}
              patient={patient}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patients;
