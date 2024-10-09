import { Login } from "./auth/login";
import { Register } from "./auth/register";
import { Route, Routes } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "./constants/queryClient";
import { AuthProvider } from "./context/auth/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { LayoutDefault } from "./shared/layouts/layoutDefault";
import { Home } from "./pages/home";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* <Route element={<PrivateRoute />}> */}
              <Route element={<LayoutDefault />}>
                <Route path="/home" element={<Home />} />
              </Route>
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
