import { useOutletContext } from "react-router-dom";
import { NutritionStats } from "../../components/NutritionStats/NutritionStats";
import { MealCard } from "../../components/MealCard/MealCard";
import { MealModal } from "../../components/MealModal/MealModal";
import { AddMealModal } from "../../components/AddMealModal/AddMealModal";
import { deleteMeal } from "../../api/mealsData";
import { updateMeal } from "../../api/mealsData";
import { addMeal } from "../../api/mealsData";
import { getFoods } from "../../api/foodsData";

import "./Meals.css";
import { useEffect, useState } from "react";

export function Meals() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");
  const [calorieFilter, setCalorieFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");

  const { user, userNutrients, userWeights, userMeals, setUserMeals } =
    useOutletContext();

  useEffect(() => {
    async function getUserFoods() {
      try {
        const getAllFoods = await getFoods(user.id);
        setFoods(getAllFoods);
      } catch (e) {
        console.log(e);
      }
    }
    getUserFoods();
  }, [user]);

  async function handleDelete(mealId) {
    try {
      await deleteMeal(user.id, mealId);

      setUserMeals((prev) => prev.filter((meal) => meal.id !== mealId));

      setSelectedMeal(null);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdate(updatedMeal) {
    try {
      const updated = await updateMeal(
        user.id,
        updatedMeal.id,
        updatedMeal.amount,
      );

      setUserMeals((prev) =>
        prev.map((meal) =>
          meal.id === updated.id
            ? {
                ...meal,
                amount: Number(updated.amount),
              }
            : meal,
        ),
      );
      setSelectedMeal(null);
    } catch (e) {
      console.log(e);
    }
  }

  const filteredMeals = userMeals.filter((meal) => {
    const mealDate = new Date(meal.created_at);
    const today = new Date();

    const daysDiff = Math.floor((today - mealDate) / (1000 * 60 * 60 * 24));

    const calories = (meal.calories / 100) * meal.amount;

    let dateMatch;
    switch (dateFilter) {
      case "today":
        dateMatch = mealDate.toDateString() === today.toDateString();
        break;

      case "7days":
        dateMatch = daysDiff <= 7;
        break;

      case "30days":
        dateMatch = daysDiff <= 30;
        break;

      case "month":
        dateMatch =
          mealDate.getMonth() === today.getMonth() &&
          mealDate.getFullYear() === today.getFullYear();
        break;

      default:
        dateMatch = true;
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

    const searchMatch = meal.name.toLowerCase().includes(search.toLowerCase());

    return dateMatch && calorieMatch && searchMatch;
  });

  async function handleAddMeal(data) {
    try {
      const meal = await addMeal(user.id, data);
      setUserMeals((prev) => [meal, ...prev]);

      setShowAddModal(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="meals-page-wrapper">
        <NutritionStats
          userNutrients={userNutrients}
          userWeights={userWeights}
          user={user}
        />
        <div className="search-add-div">
          <input type="text" placeholder="Search ..." onChange={(e) => setSearch(e.target.value)} />
          <button onClick={() => setShowAddModal(true)}>+Add Meal</button>
        </div>
        <div className="filter-div">
          <p>Filters:</p>
          <select
            className="filter-select"
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="month">This Month</option>
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
        <div className="foodlogs-wrapper">
          {filteredMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} onClick={setSelectedMeal} />
          ))}
        </div>
      </div>
      <MealModal
        meal={selectedMeal}
        onClose={() => setSelectedMeal(null)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      {showAddModal && (
        <AddMealModal
          foods={foods}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddMeal}
        />
      )}
    </>
  );
}
