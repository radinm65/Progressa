import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./Charts.css";


export function WeightChart({ data }) {

  return (
    <div className="chart-container">

      <h3>Weight Progress</h3>

      <ResponsiveContainer width="100%" height={250}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="weight"
            stroke="#45c486"
            strokeWidth={3}
            dot={{ r: 5 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}