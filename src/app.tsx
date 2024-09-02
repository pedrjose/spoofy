import { Route, Routes } from "react-router";
import { AuthProvider } from "./context/auth/AuthContext";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/auth/privateRouter";
import { Login } from "./components/auth/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { queryClient } from "./constants/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<></>} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<></>} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
