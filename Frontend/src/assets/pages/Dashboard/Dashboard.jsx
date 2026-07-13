import { PageHeader } from "../../components/PageHeader/PageHeader";
import { WeightChart } from "../../components/WeightChart/WeightChart";
import { NutritionChart } from "../../components/NutritionChart/NutritionChart";
import { NutritionStats } from "../../components/NutritionStats/NutritionStats";
import { getUserWeights } from "../../api/usersData";
import { getNutrients } from "../../api/foodsData";
import { getMeals } from "../../api/foodsData";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import "./Dashboard.css";

export function Dashboard() {
  const { user, setPageTitle } = useOutletContext();
  const [userweights, setUserWeights] = useState([]);
  const [getUsersMeals, setUserMeals] = useState([]);
  const [userNutrients, setUserNutrients] = useState({
    total_calories: 0,
    total_protein: 0,
    total_carbs: 0,
    total_fat: 0,
  });

  useEffect(() => {
    async function getWeights() {
      try {
        const weights = await getUserWeights(user.id);
        setUserWeights(weights);
      } catch (e) {
        console.log(e);
      }
    }
    getWeights();
  }, [user]);

  useEffect(() => {
    setPageTitle("Dashboard");
  }, [setPageTitle]);

  useEffect(() => {
    async function getNutrientsData() {
      try {
        const nutrients = await getNutrients(user.id);
        setUserNutrients(nutrients);
      } catch (e) {
        console.log(e);
      }
    }
    getNutrientsData();
  }, [user]);

  useEffect(() => {
    async function getUserMeals() {
      try {
        const meals = await getMeals(user.id);
        setUserMeals(meals);
      } catch (e) {
        console.log(e);
      }
    }
    getUserMeals();
  }, [user]);

  const weightData = userweights.map((w) => {
    const date = new Date(w.created_at);
    const monthName = date.toLocaleString("en-US", {
      month: "long",
    });
    return { month: monthName, weight: w.weight };
  });

  const nutritionData = [
    {
      name: "Calories",
      value: Math.round(userNutrients.total_calories / 10),
    },
    {
      name: "Protein",
      value: userNutrients.total_protein,
    },
    {
      name: "Carbs",
      value: userNutrients.total_carbs,
    },
    {
      name: "Fat",
      value: userNutrients.total_fat,
    },
  ];

  return (
    <>
      <div className="dashboard-content">
        <NutritionStats
          userNutrients={userNutrients}
          userweights={userweights}
          user={user}
        />

        <WeightChart data={weightData} />

        <div className="main-data">
          <NutritionChart
            data={nutritionData}
            details={userNutrients}
            user={user}
          />
          <div className="meals-div">
            <h3>Todays Meals</h3>
            {getUsersMeals.slice(0, 3).map((meal) => (
              <div className="meal-card" key={meal.id}>
                <img src={`/${meal.image_url}`} alt={meal.name} />
                <h4>{meal.name}</h4>
                <p>{meal.category}</p>
                <span>Amount: {meal.amount}</span>
              </div>
            ))}
            <div className="nav-wrapper">
              <NavLink to={`/${user.username}/meals`}>+ Add Meal</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
