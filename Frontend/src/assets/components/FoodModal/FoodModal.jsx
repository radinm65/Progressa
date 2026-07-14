import { useEffect, useState } from "react";
import "./food-modal.css";

export function FoodModal({
  mode = "edit",
  food,
  onClose,
  onUpdate,
  onDelete,
  onAdd,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Protein",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  useEffect(() => {
    if (mode === "edit" && food) {
      setFormData({
        name: food.name,
        category: food.category,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
      });
    }
  }, [food, mode]);

  if (mode === "edit" && !food) return null;

  function handleSubmit() {
    if (mode === "add") {
      onAdd({
        ...formData,
        calories: Number(formData.calories),
        protein: Number(formData.protein),
        carbs: Number(formData.carbs),
        fat: Number(formData.fat),
      });

      return;
    }

    const changed =
      formData.name !== food.name ||
      formData.category !== food.category ||
      Number(formData.calories) !== Number(food.calories) ||
      Number(formData.protein) !== Number(food.protein) ||
      Number(formData.carbs) !== Number(food.carbs) ||
      Number(formData.fat) !== Number(food.fat);

    if (!changed) {
      onClose();
      return;
    }

    onUpdate({
      id: food.id,
      ...formData,
      calories: Number(formData.calories),
      protein: Number(formData.protein),
      carbs: Number(formData.carbs),
      fat: Number(formData.fat),
    });

    onClose();
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="modal-overlay">
      <div className="food-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>{mode === "add" ? "Add New Food" : "Edit Food"}</h2>

        {mode === "edit" && (
          <>
            <img src={`/${food.image_url}`} className="modal-image" />

            <h2>{food.name}</h2>

            <p>{food.category}</p>
          </>
        )}

        <div className="form-group">
          <div className="input-wrapper">
            <label>Name</label>

            <input name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="input-wrapper">
            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Protein">Protein</option>

              <option value="Carbs">Carbs</option>

              <option value="Fruits">Fruits</option>

              <option value="Vegetables">Vegetables</option>
            </select>
          </div>

          <div className="input-wrapper">
            <label>Calories /100g</label>

            <input
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              type="number"
            />
          </div>

          <div className="input-wrapper">
            <label>Protein /100g</label>

            <input
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              type="number"
            />
          </div>

          <div className="input-wrapper">
            <label>Carbs /100g</label>

            <input
              name="carbs"
              value={formData.carbs}
              onChange={handleChange}
              type="number"
            />
          </div>

          <div className="input-wrapper">
            <label>Fat /100g</label>

            <input
              name="fat"
              value={formData.fat}
              onChange={handleChange}
              type="number"
            />
          </div>
        </div>

        <div className="buttons-wrapper">
          {mode === "edit" ? (
            <>
              <button className="update-btn" onClick={handleSubmit}>
                Update
              </button>

              <button className="delete-btn" onClick={() => onDelete(food.id)}>
                Delete
              </button>
            </>
          ) : (
            <button className="update-btn" onClick={handleSubmit}>
              Add Food
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
