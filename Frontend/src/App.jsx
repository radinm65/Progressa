import { useParams, Outlet, useMatches } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sidebar } from "./assets/components/Sidebar/Sidebar.jsx";
import { PageHeader } from "./assets/components/PageHeader/PageHeader.jsx";

import { getUser } from "./assets/api/usersData";
import { getUserWeights } from "./assets/api/usersData";
import { getNutrients, getMeals } from "./assets/api/mealsData.js";

import CircularIndeterminate from "./assets/components/CircularLoading/circularLoading.jsx";
import "./App.css";

export default function App() {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userWeights, setUserWeights] = useState([]);

  const matches = useMatches();

  const currentRoute = matches[matches.length - 1];

  const pageTitle = currentRoute.handle?.title || "Dashboard";

  const [userNutrients, setUserNutrients] = useState({
    total_calories: 0,
    total_protein: 0,
    total_carbs: 0,
    total_fat: 0,
  });

  const [userMeals, setUserMeals] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUser(username);
        setUser(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  useEffect(() => {
    if (!user) return;

    async function fetchWeights() {
      try {
        const weights = await getUserWeights(user.id);
        setUserWeights(weights);
      } catch (e) {
        console.log(e);
      }
    }

    fetchWeights();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    async function fetchNutrients() {
      try {
        const nutrients = await getNutrients(user.id);
        if (nutrients.total_calories === null) {
          return
        }
        setUserNutrients(nutrients);
      } catch (e) {
        console.log(e);
      }
    }

    fetchNutrients();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    async function fetchMeals() {
      try {
        const meals = await getMeals(user.id);
        setUserMeals(meals);
      } catch (e) {
        console.log(e);
      }
    }

    fetchMeals();
  }, [user]);

  return (
    <div className="page-layout">
      <aside className="sidebar">
        <Sidebar />
      </aside>

      <main className="page-content">
        {loading ? (
          <CircularIndeterminate />
        ) : (
          <>
            <PageHeader user={user} pageTitle={pageTitle} />

            <Outlet
              context={{
                user,
                setUser,
                userWeights,
                userNutrients,
                userMeals,
                setUserMeals,
                setUserWeights
              }}
            />
          </>
        )}
      </main>
    </div>
  );
}
