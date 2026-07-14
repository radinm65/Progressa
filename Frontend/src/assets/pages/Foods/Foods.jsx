import { useEffect, useState } from "react";
import { getFoods } from "../../api/foodsData";
import { addFood } from "../../api/foodsData";
import { updateFood } from "../../api/foodsData";
import { deleteFood } from "../../api/foodsData";
import "./Foods.css";
import { FoodModal } from "../../components/FoodModal/FoodModal";

export function Foods() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [calorieFilter, setCalorieFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState([]);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);

  useEffect(() => {
    async function getAllFoods() {
      try {
        const foodsData = await getFoods();
        setFoods(foodsData);
      } catch (e) {
        console.log(e);
      }
    }

    getAllFoods();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const calories = food.calories;

    let categoryMatch;

    switch (categoryFilter) {
      case "protein":
        categoryMatch = food.category === "Protein";
        break;

      case "carbs":
        categoryMatch = food.category === "Carbs";
        break;

      case "fruits":
        categoryMatch = food.category === "Fruits";
        break;

      case "vegetables":
        categoryMatch = food.category === "Vegetables";
        break;

      default:
        categoryMatch = true;
    }

    let calorieMatch;

    switch (calorieFilter) {
      case "0-500":
        calorieMatch = calories <= 500;
        break;

      case "500-1000":
        calorieMatch = calories > 500 && calories <= 1000;
        break;

      case "1000-2000":
        calorieMatch = calories > 1000 && calories <= 2000;
        break;

      case "2000+":
        calorieMatch = calories > 2000;
        break;

      default:
        calorieMatch = true;
    }

    const searchMatch = food.name.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && calorieMatch && searchMatch;
  });

  async function handleAddFood(data) {
    try {
      const newFood = await addFood(data);

      if (newFood) {
        setFoods((prev) => [newFood, ...prev]);
        setShowAddFoodModal(false);
      }

      setShowAddFoodModal(false);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdateFood(foodData) {
    try {
      const updatedFood = await updateFood(foodData.id, foodData);

      setFoods((prev) =>
        prev.map((food) => (food.id === updatedFood.id ? updatedFood : food)),
      );

      setShowFoodModal(false);
      setSelectedFood(null);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDeleteFood(foodId) {
    try {
      await deleteFood(foodId);
      setFoods((prev) => prev.filter((food) => food.id !== foodId));

      setShowFoodModal(false);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="food-wrapper">
      <div className="search-add-div">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setShowAddFoodModal(true)}>+Add Food</button>
      </div>

      <div className="filter-div">
        <p>Filters:</p>

        <select
          className="filter-select"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="protein">Protein</option>
          <option value="carbs">Carbs</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
        </select>

        <select
          className="filter-select"
          onChange={(e) => setCalorieFilter(e.target.value)}
        >
          <option value="all">All Calories</option>
          <option value="0-500">0 - 500 kcal</option>
          <option value="500-1000">500 - 1000 kcal</option>
          <option value="1000-2000">1000 - 2000 kcal</option>
          <option value="2000+">2000+ kcal</option>
        </select>
      </div>

      <div className="foods-container">
        {filteredFoods.map((food) => (
          <div
            className="food-card"
            key={food.id}
            style={{
              backgroundImage: `url(/${food.image_url})`,
            }}
            onClick={() => {
              setSelectedFood(food);
              setShowFoodModal(true);
            }}
          >
            <h3>{food.name}</h3>
            <p>{food.category}</p>
            <span>{food.calories} kcal</span>
          </div>
        ))}
      </div>

      {showFoodModal && (
        <FoodModal
          mode="edit"
          food={selectedFood}
          onClose={() => {
            setShowFoodModal(false);
            setSelectedFood(null);
          }}
          onUpdate={handleUpdateFood}
          onDelete={handleDeleteFood}
        />
      )}

      {showAddFoodModal && (
        <FoodModal
          mode="add"
          onClose={() => setShowAddFoodModal(false)}
          onAdd={handleAddFood}
        />
      )}
    </div>
  );
}
