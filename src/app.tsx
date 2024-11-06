import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./auth/login";
import PrivateRoute from "./auth/privateRouter";
import { Register } from "./auth/register";
import { queryClient } from "./constants/queryClient";
import { AuthProvider } from "./context/auth/AuthContext";
import { Home } from "./pages/home";
import {} from "./pages/learningPage";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route element={<PrivateRoute />}>
                            <Route path="/home" element={<Home />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                <ToastContainer />
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
