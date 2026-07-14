import "./Progress.css";
import { WeightChart } from "../../components/WeightChart/WeightChart";
import { WeightModal } from "../../components/WeightModal/WeightModal";
import { getWorkouts } from "../../api/workoutsData";
import { addWeight } from "../../api/weightData";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

export function Progress() {
  const { userWeights, setUserWeights, user } = useOutletContext();
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    async function getAllWorkouts() {
      try {
        const workouts = await getWorkouts(user.id);
        setWorkouts(workouts);
      } catch (e) {
        console.log(e);
      }
    }

    getAllWorkouts();
  }, [user.id]);

  const weightData = userWeights.map((w) => {
    const date = new Date(w.created_at);
    const monthName = date.toLocaleString("en-US", {
      month: "long",
    });

    return { month: monthName, weight: w.weight };
  });

  const workoutData = [...workouts]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map((workout) => {
      const date = new Date(workout.created_at);

      const monthName = date.toLocaleString("en-US", {
        month: "short",
      });

      return {
        month: monthName,
        workout: workout.duration,
      };
    });

  async function handleAddWeight(data) {
    try {
      const addWeightReq = await addWeight(user.id, data);

      setUserWeights((prev) => [...prev, addWeightReq]);

      setShowWeightModal(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="progress-wrapper">
        <div className="weights-wrapper">
          <WeightChart
            data={weightData}
            width={175}
            title={"Weight Progress"}
            dataKey={"weight"}
          />
          <button onClick={() => setShowWeightModal(true)}>
            +Add New &nbsp;&nbsp;&nbsp;Weight
          </button>
        </div>
        <div className="workouts-chart">
          <WeightChart
            data={workoutData}
            width={175}
            title={"Workouts Minutes Chart"}
            dataKey={"workout"}
          />
        </div>
      </div>
      {showWeightModal && (
        <WeightModal
          onClose={() => setShowWeightModal(false)}
          onAdd={handleAddWeight}
        />
      )}
    </>
  );
}
