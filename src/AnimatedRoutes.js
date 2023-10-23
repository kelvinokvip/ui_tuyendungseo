import { AnimatePresence } from "framer-motion";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import RTLLayout from "layouts/RTL.js";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/rtl/*" element={<RTLLayout />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        {/* <Route path="/" element={<IndexView />} /> */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
