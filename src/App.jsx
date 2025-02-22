import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreatePost from "./pages/CreatePost";
import { Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="relative min-h-screen ">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
      <div className="absolute bottom-0 w-full">
        <Navbar />
      </div>
    </div>
  );
}
