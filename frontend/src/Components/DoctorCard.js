import React from 'react';

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  if (!doctor) return null; // safeguard

  const { _id, name, specialty } = doctor;

  return (
    <div className="doctor-card">
      <p>
        <strong>{name}</strong> - {specialty}
      </p>

      <div className="btn-container">
        <button onClick={() => onEdit(doctor)}>Edit</button>
        <button onClick={() => onDelete(_id)}>Delete</button>
      </div>
    </div>
  );
};

export default DoctorCard;
