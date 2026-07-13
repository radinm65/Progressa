import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "./assets/api/usersData";
import { Sidebar } from "./assets/components/Sidebar/Sidebar.jsx";
import { PageHeader } from "./assets/components/PageHeader/PageHeader.jsx";
import CircularIndeterminate from "./assets/components/CircularLoading/circularLoading.jsx";
import "./App.css";

export default function App() {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("Dashboard");


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
            <PageHeader 
              user={user}
              pageTitle={pageTitle}
            />

            <Outlet 
              context={{
                user,
                setPageTitle
              }}
            />
          </>
        )}

      </main>

    </div>
  );
}