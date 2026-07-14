import { useEffect, useState } from "react";
import "./meal-modal.css";

export function MealModal({ meal, onClose, onUpdate, onDelete }) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (meal) {
      setAmount(meal.amount);
    }
  }, [meal]);

  if (!meal) return null;

  function handleSubmit() {
    if (Number(amount) === Number(meal.amount)) {
      onClose();
      return;
    }

    onUpdate({
      id: meal.id,
      amount: Number(amount),
    });
  }

  return (
    <div className="modal-overlay">
      <div className="meal-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <img src={`/${meal.image_url}`} alt={meal.name} className="modal-image" />

        <h2>{meal.name}</h2>

        <p className="modal-category">{meal.category}</p>

        <div className="meal-info">
          <div>
            <span>Calories</span>
            <strong>
              {Math.round((meal.calories / 100) * meal.amount)}
              kcal
            </strong>
          </div>

          <div>
            <span>Protein</span>
            <strong>{Math.round((meal.protein / 100) * meal.amount)}g</strong>
          </div>

          <div>
            <span>Carbs</span>
            <strong>{Math.round((meal.carbs / 100) * meal.amount)}g</strong>
          </div>

          <div>
            <span>Fat</span>
            <strong>{Math.round((meal.fat / 100) * meal.amount)}g</strong>
          </div>
        </div>

        <div className="amount-box">
          <label>Amount (grams)</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
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
