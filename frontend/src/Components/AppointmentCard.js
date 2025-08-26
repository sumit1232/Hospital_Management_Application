import React from 'react';
import './CSS/AppointmentCard.css';

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  if (!appointment) return null; // safeguard

  const { _id, patientName, doctorName, date } = appointment;

  return (
    <div className="appointment-card">
      <p>
        <span>Patient: </span>
        {patientName}
      </p>
      <p>
        <span>Doctor: </span>
        {doctorName}
      </p>
      <p>
        <span>Date: </span>
        {new Date(date).toLocaleDateString()}
      </p>

      <div className="btn-container">
        <button onClick={() => onEdit(appointment)}>
          Edit
        </button>
        <button onClick={() => onDelete(_id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
