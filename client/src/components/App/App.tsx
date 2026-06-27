import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";
import Chat from "../../pages/Chat/Chat";
import Intro from "../../pages/Intro/Intro";
import KnowledgeBase from "../../pages/KnowledgeBase/KnowledgeBase";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { ProtectedRoute, PublicRoute } from "../ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/knowledge" element={<KnowledgeBase />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;