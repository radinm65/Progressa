import { useState } from "react";
import "./workouts-modal.css";

export function WorkoutModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    muscle_group: "Chest",
    duration: "",
    calories_burned: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit() {
    onAdd({
      ...formData,
      duration: Number(formData.duration),
      calories_burned: Number(formData.calories_burned),
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="workout-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>Add Workout</h2>

        <div className="form-group">
          <div className="input-wrapper">
            <label>Name</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Workout name"
            />
          </div>

          <div className="input-wrapper">
            <label>Muscle Group</label>

            <select
              name="muscle_group"
              value={formData.muscle_group}
              onChange={handleChange}
            >
              <option value="Chest">Chest</option>

              <option value="Back">Back</option>

              <option value="Legs">Legs</option>

              <option value="Shoulders">Shoulders</option>

              <option value="Arms">Arms</option>
            </select>
          </div>

          <div className="input-wrapper">
            <label>Duration (min)</label>

            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          <div className="input-wrapper">
            <label>Calories Burned</label>

            <input
              type="number"
              name="calories_burned"
              value={formData.calories_burned}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="add-workout-btn" onClick={handleSubmit}>
          Add Workout
        </button>
      </div>
    </div>
  );
}
