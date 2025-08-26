import React from 'react';

const PatientCard = ({ patient, onEdit, onDelete }) => {
  if (!patient) return null; // safeguard

  const { _id, name, age, gender } = patient;

  return (
    <div className="patient-card">
      <p>
        <strong>{name}</strong> ({gender}, {age} years old)
      </p>

      <div className="btn-container">
        <button onClick={() => onEdit(patient)}>Edit</button>
        <button onClick={() => onDelete(_id)}>Delete</button>
      </div>
    </div>
  );
};

export default PatientCard;
