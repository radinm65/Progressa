import { useState } from "react";
import "./weight-modal.css";

export function WeightModal({ onClose, onAdd }) {
  const [weight, setWeight] = useState("");

  function handleSubmit() {
    if (!weight) return;

    onAdd({
      weight: Number(weight),
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="weight-modal">

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>Add New Weight</h2>

        <div className="input-wrapper">
          <label>Weight (kg)</label>

          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
          />
        </div>


        <button 
          className="add-weight-btn"
          onClick={handleSubmit}
        >
          Add Weight
        </button>

      </div>
    </div>
  );
}