import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout/AppLayout";
import Chat from "../pages/Chat/Chat";
import Intro from "../pages/Intro/Intro";
import KnowledgeBase from "../pages/KnowledgeBase/KnowledgeBase";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/knowledge-base" replace />} />
          <Route path="intro" element={<Intro />} />
          <Route element={<AppLayout />}>
            <Route path="knowledge-base" element={<KnowledgeBase />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;