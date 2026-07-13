import { CaloriesIcon } from "../../components/svg components/CaloriesIcon";
import { ProteinIcon } from "../../components/svg components/ProteinIcon";
import { WeightIcon } from "../../components/svg components/WeightIcon";
import { WorkoutsIcon } from "../../components/svg components/WorkoutsIcon";

import "./nutrition-stats.css";

export function NutritionStats({ userNutrients, userweights, user }) {
  return (
    <>
      <div className="stats">
        <div className="stat-div">
          <div className="stats-heads">
            <CaloriesIcon className="stat-icon" pathClass="icon-path-class" />
            Calories
          </div>
          <p className="text-current">
            {userNutrients.total_calories}
            <span className="text-desired">/ {user.desired_calories} kcal</span>
          </p>
          <progress value="70" max="100"></progress>
        </div>
        <div className="stat-div">
          <div className="stats-heads">
            <ProteinIcon className="stat-icon" />
            Protein
          </div>
          <p className="text-current">
            {userNutrients.total_protein}
            <span className="text-desired">/ {user.desired_protein} g</span>
          </p>
          <progress value="70" max="100"></progress>
        </div>
        <div className="stat-div">
          <div className="stats-heads">
            <WeightIcon className="stat-icon" pathClass="icon-path-class" />
            Weight
          </div>
          <p className="text-current">
            {userweights[userweights.length - 1]?.weight}
            <span className="text-desired">/ {user.desired_weight} Kg</span>
          </p>
          <progress value="70" max="100"></progress>
        </div>
        <div className="stat-div">
          <div className="stats-heads">
            <WorkoutsIcon
              className="stat-icon"
              color="black"
              pathClass="icon-path-class"
            />
            Workouts
          </div>
          <p className="text-current">
            {userNutrients.total_calories}
            <span className="text-desired">/ {user.desired_workouts} kcal</span>
          </p>
          <progress value="70" max="100"></progress>
        </div>
      </div>
    </>
  );
}
