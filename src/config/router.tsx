import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ScrollToTop from "./ScrollToTop";
import NotFound from "../pages/NotFound";
import RouterError from "./RouterError";

const lazyRetry = (importFn: () => Promise<any>) =>
  lazy(() =>
    importFn().catch(() => {
      if (!sessionStorage.getItem("chunk-retry")) {
        sessionStorage.setItem("chunk-retry", "true");
        window.location.reload();
      }
      return Promise.reject();
    }),
  );

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Patients = lazy(() => import("../pages/Patients"));
const PatientDetails = lazy(() => import("../pages/PatientDetails"));
const MedicalRecords = lazy(() => import("../pages/MedicalRecords"));
const Appointments = lazy(() => import("../pages/Appointments"));
const Visits = lazy(() => import("../pages/Visits"));
const Admissions = lazy(() => import("../pages/Admissions"));
const Laboratory = lazy(() => import("../pages/Laboratory"));
const Pharmacy = lazy(() => import("../pages/Pharmacy"));
const Billing = lazy(() => import("../pages/Billing"));
const Insurance = lazy(() => import("../pages/Insurance"));
const Inventory = lazy(() => import("../pages/Inventory"));
const Staff = lazyRetry(() => import("../pages/Staff"));
const Departments = lazyRetry(() => import("../pages/Departments"));
const Notifications = lazy(() => import("../pages/Notification"));
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));

// ✨ Fade-in wrapper for better transitions
const FadeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={` transform transition-transform duration-500 ease-in-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
};

// 🔹 Type-safe Suspense wrapper
const withSuspense = (Component: React.ComponentType<any>) => (
  <Suspense fallback={<div className="text-center p-3">Loading...</div>}>
    <ScrollToTop />
    <FadeWrapper>
      <Component />
    </FadeWrapper>
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouterError />,
    children: [
      { index: true, handle: {title: "dashboard"}, element: withSuspense(Dashboard) },
      { path: "signIn", element: withSuspense(SignIn) },
      { path: "signUp", element: withSuspense(SignUp) },
      {
        path: "patients",
        children: [
          { index: true, handle: {title: "patients"}, element: withSuspense(Patients) },
          { path: ":patientId", handle: { title: "Patient Details" }, element: withSuspense(PatientDetails) },
        ],
      },
      { path: "medical-records", handle: {title: "medical records"}, element: withSuspense(MedicalRecords) },
      { path: "appointments", handle: {title: "appointments"}, element: withSuspense(Appointments) },
      { path: "visits", handle: {title: "visits"}, element: withSuspense(Visits) },
      { path: "admissions", handle: {title: "admissions"}, element: withSuspense(Admissions) },
      { path: "laboratory", handle: {title: "laboratory"}, element: withSuspense(Laboratory) },
      { path: "pharmacy", handle: {title: "pharmacy"}, element: withSuspense(Pharmacy) },
      { path: "billing", handle: {title: "billing & payments"}, element: withSuspense(Billing) },
      { path: "insurance", handle: {title: "insurance"}, element: withSuspense(Insurance) },
      { path: "inventory", handle: {title: "inventory"}, element: withSuspense(Inventory) },
      { path: "staff", handle: {title: "staff"}, element: withSuspense(Staff) },
      { path: "departments", handle: {title: "departments"}, element: withSuspense(Departments) },
      { path: "notifications", handle: {title: "notifications"}, element: withSuspense(Notifications) },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
