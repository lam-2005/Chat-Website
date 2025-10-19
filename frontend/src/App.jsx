import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import useAuthStore from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) return <PageLoader />;
  return (
    <div className="h-full w-full flex items-center justify-center gradient-color overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to={"/"} />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
