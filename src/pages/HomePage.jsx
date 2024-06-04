import React, { useEffect } from "react";
import Hero from "../components/Hero/Hero";
import { Programs } from "../components/Programs/Programs";
import Reasons from "../components/Reasons/Reasons";
import Plans from "../components/Plans/Plans";
import Testimonial from "../components/Testimonials/Testimonial";

import Footer from "../components/Footer/Footer";
import TelegramButton from "../components/TelegramButton/TelegramButton";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <TelegramButton />

      <Programs />
      <Reasons />
      <Plans />
      <Testimonial />

      <Footer />
    </div>
  );
};

export default HomePage;
