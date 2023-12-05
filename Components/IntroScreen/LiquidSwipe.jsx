import { useState } from "react";
import Slider from "./Slider";
import Slide from "./Slide";

const slides = [
  {
    color: "#228B22",
    title: "Sorting Made Easy",
    description:
      "Effortlessly and intelligently sort your waste with EcoSorter's cutting-edge machine learning technology.",
    picture: require("../../assets/lotties/1.json"),
    button: false,
  },
  {
    color: "#87CEEB",
    title: "Community Interaction",
    description:
      "Join our community of eco-conscious individuals and collaborate to keep your neighborhood clean and green",
    picture: require("../../assets/lotties/2.json"),
    button: false,
  },
  {
    color: "#8B4513",
    title: "Interactive Map",
    description:
      "Discover nearby garbage collection points on our map, making it convenient to dispose of waste responsibly",
    picture: require("../../assets/lotties/3.json"),
    button: false,
  },
  {
    color: "#008080",
    title: "Eight Waste Categories",
    description:
      "EcoSorter can identify and segregate waste into eight distinct categories, making recycling and disposal hassle-free",
    picture: require("../../assets/lotties/4.json"),
    button: false,
  },
  {
    color: "#800080",
    title: "Educational Resources",
    description:
      "Access video tutorials and informative content to learn more about waste management and environmental conservation",
    picture: require("../../assets/lotties/5.json"),
    button: true,
  },
];

export const assets = slides.map(({ picture }) => picture);

const LiquidSwipe = () => {
  const [index, setIndex] = useState(0);
  const prev = slides[index - 1];
  const next = slides[index + 1];
  return (
    <Slider
      key={index}
      index={index}
      setIndex={setIndex}
      prev={prev && <Slide slide={prev} />}
      next={next && <Slide slide={next} />}
    >
      <Slide slide={slides[index]} />
    </Slider>
  );
};

export default LiquidSwipe;
