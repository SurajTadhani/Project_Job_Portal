import { Button } from "@/components/ui/button";
import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";

import Layout from "./components/shared/Layout";

import Jobs from "./components/Jobs";
import Browser from "./components/Browser";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/browser",
        element: <Browser />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/description/:id",
        element: <JobDescription />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/admin/companies",
        element: <ProtectedRoute><Companies /></ProtectedRoute>,
      },
      {
        path: "/admin/companies/create",
        element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>,
      },
      {
        path: "/admin/companies/:id",
        element: <ProtectedRoute><CompanySetup /></ProtectedRoute>,
      },
      // Admin router start

      {
        path: "/admin/jobs",
        element: <ProtectedRoute><AdminJobs /></ProtectedRoute>,
      },
      {
        path: "/admin/jobs/create",
        element: <ProtectedRoute><PostJob /></ProtectedRoute>,
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: <ProtectedRoute><Applicants /></ProtectedRoute>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
