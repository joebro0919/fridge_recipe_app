import { StrictMode } from 'react'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import AllRoutinesPage from './Pages/AllRoutinesPage';
import NotFoundPage from './Pages/NotFoundPage';
import { useState, useEffect } from 'react';

function RootComponent({ children }) {
  const [routines, setRoutines] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/routines');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const json = await response.json();
        setRoutines(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutines();
  }, []);

  // Pass routines, loading, and error as props to children
  return children({ routines, loading, error });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootComponent>
        {({ routines, loading, error }) => (
          <HomePage routines={routines} loading={loading} error={error} />
        )}
      </RootComponent>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/allroutines",
    element: (
      <RootComponent>
        {({ routines, loading, error }) => (
          <AllRoutinesPage routines={routines} loading={loading} error={error} />
        )}
      </RootComponent>
    ),
  },
  {
    path: "/allroutines/:id",
    element: (
      <RootComponent>
        {({ routines, loading, error }) => (
          <SingleRoutinePage routines={routines} loading={loading} error={error} />
        )}
      </RootComponent>
    ),

  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
