import { useState } from "react";
import "./add-meal-modal.css";

export function AddMealModal({ foods, onClose, onAdd }) {
  const [search, setSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [amount, setAmount] = useState("");

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase()),
  );

  function handleSubmit() {
    if (!selectedFood || !amount) return;

    onAdd({
      food_id: selectedFood.id,
      amount: Number(amount),
    });
  }

  console.log(foods);
  return (
    <div className="modal-overlay">
      <div className="add-meal-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>Add Meal</h2>

        <div className="food-search">
          <label>Food</label>

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <div className="food-dropdown">
              {filteredFoods.map((food) => (
                <div
                  key={food.id}
                  className="food-option"
                  onClick={() => {
                    setSelectedFood(food);
                    setSearch(food.name);
                  }}
                >
                  <img src={`/${food.image_url}`} />

                  <div>
                    <h4>{food.name}</h4>
                    <span>{food.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="amount-input">
          <label>Amount (grams)</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {selectedFood && (
          <div className="selected-food">
            Selected:
            <strong>{selectedFood.name}</strong>
          </div>
        )}

        <button className="add-btn" onClick={handleSubmit}>
          Add Meal
        </button>
      </div>
    </div>
  );
}
