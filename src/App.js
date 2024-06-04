import "./App.css";
import Hero from "./components/Hero/Hero";
import Plans from "./components/Plans/Plans";
import { Programs } from "./components/Programs/Programs";
import Reasons from "./components/Reasons/Reasons";
import Testimonial from "./components/Testimonials/Testimonial";

import Footer from "./components/Footer/Footer";
import MainRoutes from "./routes/MainRoutes";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import { CssBaseline } from "@mui/material";
function App() {
  return (
    <div className="App">
      <MainRoutes />
    </div>
  );
}

export default App;
