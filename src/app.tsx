import { Route, Routes } from "react-router";
import { AuthProvider } from "./context/auth/AuthContext";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/auth/privateRouter";
import { Login } from "./components/auth/login";

function App() {
  return (
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
    </AuthProvider>
  );
}

export default App;
