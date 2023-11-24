/*!

=========================================================
* Argon Dashboard PRO React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import ReactDOM from "react-dom/client";
// react library for routing
import { BrowserRouter } from "react-router-dom";

// plugins styles from node_modules
import "@fortawesome/fontawesome-free/css/all.min.css";
import "quill/dist/quill.core.css";
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "select2/dist/css/select2.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
// plugins styles downloaded
import "assets/vendor/nucleo/css/nucleo.css";
// core styles
import "assets/scss/argon-dashboard-pro-react.scss?v1.2.1";
import "assets/css/react-paginate.css";
import "assets/css/global.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "context/authContext";

//React Toast
import AnimatedRoutes from "AnimatedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider
    clientId="124038751321-heq9tk8j8mvutq9o8rmspsm8omjr7r5v.apps.googleusercontent.com"
    auto_select={false}
  >
    <ToastContainer autoClose={2000} />
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  </GoogleOAuthProvider>
);
