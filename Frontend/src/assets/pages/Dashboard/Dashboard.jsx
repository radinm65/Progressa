import { WeightChart } from "../../components/WeightChart/WeightChart";
import { NutritionChart } from "../../components/NutritionChart/NutritionChart";
import { NutritionStats } from "../../components/NutritionStats/NutritionStats";
import { NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import "./Dashboard.css";

export function Dashboard() {
  const { user, userWeights, userNutrients, userMeals} =
    useOutletContext();

  const weightData = userWeights.map((w) => {
    const date = new Date(w.created_at);
    const monthName = date.toLocaleString("en-US", {
      month: "long",
    });
    return { month: monthName, weight: w.weight };
  });

  const nutritionData = [
    {
      name: "Calories",
      value: Math.round((userNutrients.total_calories || 0) / 10),
    },
    {
      name: "Protein",
      value: userNutrients.total_protein || 0,
    },
    {
      name: "Carbs",
      value: userNutrients.total_carbs || 0,
    },
    {
      name: "Fat",
      value: userNutrients.total_fat || 0,
    },
  ];

  return (
    <>
      <div className="dashboard-content">
        <NutritionStats
          userNutrients={userNutrients}
          userWeights={userWeights}
          user={user}
        />

        <WeightChart data={weightData} width={250} title={"Weight Progress"} dataKey={"weight"} />

        <div className="main-data">
          <NutritionChart
            data={nutritionData}
            details={userNutrients}
            user={user}
          />
          <div className="meals-div">
            <h3>Todays Meals</h3>
            {userMeals.slice(0, 3).map((meal) => (
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
