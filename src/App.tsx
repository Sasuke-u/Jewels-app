import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ color: "green", textAlign: "center" }}>
        Santhosh's Jewels
      </h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}