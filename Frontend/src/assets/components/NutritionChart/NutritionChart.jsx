import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { NavLink } from "react-router-dom";

import "./NutritionChart.css";

const COLORS = ["#45c486", "#fd2a2a", "#f59e0b", "#60a5fa"];

export function NutritionChart({ data, details, user }) {
  return (
    <div className="nutrition-chart">
      <div className="donut-chart">
        <h3>Today's Nutrition</h3>

        <ResponsiveContainer width="100%" height={175}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="legend-div">
        <div className="legend">
          <div className="nut-div">
            <span className="calories"></span>
            <div className="nut-text">
              <p>Calories</p>
              <p>{details.total_calories}</p>
            </div>
          </div>

          <div className="nut-div">
            <span className="protein"></span>
            <div className="nut-text">
              <p>Protein</p>
              <p>{details.total_protein}</p>
            </div>
          </div>

          <div className="nut-div">
            <span className="carbs"></span>
            <div className="nut-text">
              <p>Carbs</p>
              <p>{details.total_carbs}</p>
            </div>
          </div>

          <div className="nut-div">
            <span className="fat"></span>
            <div className="nut-text">
              <p>Fat</p>
              <p>{details.total_fat}</p>
            </div>
          </div>
        </div>
        <div className="link-div">
          <NavLink to={`/${user.username}/meals`}>More Info</NavLink>
        </div>
      </div>
    </div>
  );
}
