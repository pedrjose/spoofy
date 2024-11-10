import { Login } from "./auth/login";
import { Register } from "./auth/register";
import { Route, Routes } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "./constants/queryClient";
import { AuthProvider } from "./context/auth/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/home";
import CreateReviewForm from "./pages/populate";
import { LearningPage } from "./pages/learningPage";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/popular" element={<CreateReviewForm />} />

            {/* <Route element={<PrivateRoute />}> */}
            <Route path="/home" element={<Home />} />
            <Route path="/learningPage/:lyric" element={<LearningPage />} />
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
