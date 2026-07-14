import { useEffect, useState } from "react";
import "./food-modal.css";

export function MealModal({ meal, onClose, onUpdate, onDelete }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (meal) {
      setFormData({
        amount: meal.amount,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fat: meal.fat,
      });
    }
  }, [meal]);

  if (!meal || !formData) return null;

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit() {
    const changed =
      JSON.stringify(formData) !==
      JSON.stringify({
        amount: meal.amount,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fat: meal.fat,
      });

    if (!changed) {
      onClose();
      return;
    }

    onUpdate({
      id: meal.id,
      ...formData,
    });
  }

  return (
    <div className="modal-overlay">
      <div className="meal-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <img src={`/${meal.image_url}`} className="modal-image" />

        <h2>{meal.name}</h2>

        <p>{meal.category}</p>

        <div className="form-group">
          <div className="input-wrapper">
            <label>Amount (g)</label>

            <input
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="input-wrapper">
            <label>Calories /100g</label>

            <input
              name="calories"
              value={formData.calories}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label>Protein /100g</label>

            <input
              name="protein"
              value={formData.protein}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label>Carbs /100g</label>
            <input
              name="carbs"
              value={formData.carbs}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label>Fat /100g</label>
            <input name="fat" value={formData.fat} onChange={handleChange} />
          </div>
        </div>

        <div className="modal-actions">
          <button className="update-btn" onClick={handleSubmit}>
            Update
          </button>

          <button className="delete-btn" onClick={() => onDelete(meal.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
