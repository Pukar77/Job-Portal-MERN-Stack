import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login-signup/Login.jsx";
import Signup from "./components/login-signup/Signup.jsx";
import Home from "./components/Home.jsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Jobs from "./components/Jobs.jsx";
import Browse from "./components/Browse.jsx";
import Profile from "./components/Profile.jsx";
import JobDescription from "./components/JobDescription.jsx";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Companies from "./components/Admin/Companies.jsx";
import CompanyCreate from "./components/Admin/CompanyCreate.jsx";
import CompanySetup from "./components/Admin/CompanySetup.jsx";
import AdminJobs from "./components/Admin/AdminJobs.jsx";
import PostJob from "./components/Admin/PostJob.jsx";
import Applicants from "./components/Admin/Applicants.jsx";
import RecommendJob from "./components/RecommendJob.jsx";
import ProtectedRoute from "./components/Admin/ProtectedRoute.jsx";
import Chatbot from "./Chatbot.jsx";

const persister = persistStore(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/recommend",
    element: <RecommendJob />,
  },
  {
    path: "/chatbot",
    element: <Chatbot />,
  },

  //for admin

  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/companies/:id",
    element: <CompanySetup />,
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/jobs/:id/applicants",
    element: <Applicants />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <App />
      </PersistGate>
      <RouterProvider router={router} />
    </Provider>
    <Toaster />
  </StrictMode>
);
