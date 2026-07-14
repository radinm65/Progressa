import { useEffect, useState } from "react";
import "./Workouts.css";

import { WorkoutModal } from "../../components/WorkoutsModal/WorkoutsModal";
import { getWorkouts } from "../../api/workoutsData";
import { addWorkout } from "../../api/workoutsData";
import { useOutletContext } from "react-router-dom";

const muscleImages = {
  Chest: "/chest.jpg",
  Back: "/back.jpg",
  Legs: "/legs.jpg",
  Shoulders: "/shoulders.jpg",
  Arms: "/arms.jpg",
};

export function Workouts() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [muscleGroupFilter, setMuscleGroupFilter] = useState("all");
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  const { user } = useOutletContext();

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

  const filteredWorkouts = workouts.filter((workout) => {
    const workoutDate = new Date(workout.created_at);
    const today = new Date();

    const daysDiff = Math.floor((today - workoutDate) / (1000 * 60 * 60 * 24));

    let muscleGroupMatch;

    switch (muscleGroupFilter) {
      case "arms":
        muscleGroupMatch = workout.muscle_group === "Arms";
        break;

      case "back":
        muscleGroupMatch = workout.muscle_group === "Back";
        break;

      case "chest":
        muscleGroupMatch = workout.muscle_group === "Chest";
        break;

      case "shoulders":
        muscleGroupMatch = workout.muscle_group === "Shoulders";
        break;

      case "legs":
        muscleGroupMatch = workout.muscle_group === "Legs";
        break;

      default:
        muscleGroupMatch = true;
    }

    let dateMatch;
    switch (dateFilter) {
      case "today":
        dateMatch = workoutDate.toDateString() === today.toDateString();
        break;

      case "7days":
        dateMatch = daysDiff <= 7;
        break;

      case "30days":
        dateMatch = daysDiff <= 30;
        break;

      case "month":
        dateMatch =
          workoutDate.getMonth() === today.getMonth() &&
          workoutDate.getFullYear() === today.getFullYear();
        break;

      default:
        dateMatch = true;
    }

    const searchMatch = workout.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return muscleGroupMatch && dateMatch && searchMatch;
  });

  const weeklyWorkouts = workouts.filter((workout) => {
    const workoutDate = new Date(workout.created_at);
    const today = new Date();

    const daysDiff = Math.floor((today - workoutDate) / (1000 * 60 * 60 * 24));

    return daysDiff <= 7;
  });

  const workoutCount = weeklyWorkouts.length;

  const totalDuration = weeklyWorkouts.reduce(
    (sum, workout) => sum + workout.duration,
    0,
  );

  const totalCalories = weeklyWorkouts.reduce(
    (sum, workout) => sum + workout.calories_burned,
    0,
  );

  const averageTime = workoutCount
    ? Math.round(totalDuration / workoutCount)
    : 0;

  async function handleAddWorkout(data) {
    try {
      const newWorkout = await addWorkout(user.id, data);

      setWorkouts((prev) => [newWorkout, ...prev]);

      setShowWorkoutModal(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="workout-wrapper">
        <h3>Weekly Summary</h3>
        <div className="workout-stats">
          <div className="workout-stat-div">
            <h4>Workouts</h4>

            <p>
              {workoutCount}
              <span> / 5 Times</span>
            </p>

            <progress value={Math.min(workoutCount, 5)} max="5" />
          </div>
          <div className="workout-stat-div">
            <h4>Duration</h4>

            <p>
              {totalDuration}
              <span> / 300 Minutes</span>
            </p>

            <progress value={Math.min(totalDuration, 300)} max="300" />
          </div>
          <div className="workout-stat-div">
            <h4>Calories</h4>

            <p>
              {totalCalories}
              <span> Kcal</span>
            </p>

            <progress value={Math.min(totalCalories, 3000)} max="3000" />
          </div>
          <div className="workout-stat-div">
            <h4>Average Time</h4>

            <p>
              {averageTime}
              <span> Mins</span>
            </p>

            <progress value={Math.min(averageTime, 60)} max="60" />
          </div>
        </div>
        <div className="search-add-div">
          <input
            type="text"
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={() => setShowWorkoutModal(true)}>
            +Add workout
          </button>
        </div>
        <div className="filter-div">
          <p>Filters:</p>

          <select
            className="filter-select"
            onChange={(e) => setMuscleGroupFilter(e.target.value)}
          >
            <option value="all">All Muscle Groups</option>
            <option value="arms">Arms</option>
            <option value="back">Back</option>
            <option value="chest">Chest</option>
            <option value="shoulders">Shoulders</option>
            <option value="legs">Legs</option>
          </select>

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
        </div>
        <div className="workouts-container">
          {filteredWorkouts.map((workout) => (
            <div
              className="workout-card"
              key={workout.id}
              style={{
                backgroundImage: `url(${muscleImages[workout.muscle_group]})`,
              }}
            >
              <h3>{workout.name}</h3>
              <p>{workout.muscle_group}</p>
              <span>{workout.duration} min</span>
            </div>
          ))}
        </div>
      </div>
      {showWorkoutModal && (
        <WorkoutModal
          onClose={() => setShowWorkoutModal(false)}
          onAdd={handleAddWorkout}
        />
      )}
    </>
  );
}
