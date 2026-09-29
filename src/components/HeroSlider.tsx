import { useState, useEffect, useCallback } from "react";

type Slide = {
  image: string;
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    image: "/src/assets/hero.png",
    title: "New Arrivals",
    subtitle: "Explore our latest handcrafted pieces",
  },
  {
    image: "/src/assets/hero.png",
    title: "Festive Collection",
    subtitle: "Elegant designs for every celebration",
  },
  {
    image: "/src/assets/hero.png",
    title: "Bridal Edit",
    subtitle: "Timeless jewelry for your big day",
  },
];

const AUTO_PLAY_MS = 4000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="hero-slider">
      <div className="hero-slider-track">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide${index === current ? " active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-slide-overlay">
              <h2 className="hero-slide-title">{slide.title}</h2>
              <p className="hero-slide-subtitle">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="hero-slider-arrow left" onClick={prev} aria-label="Previous slide">
        ‹
      </button>
      <button className="hero-slider-arrow right" onClick={next} aria-label="Next slide">
        ›
      </button>

      <div className="hero-slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-slider-dot${index === current ? " active" : ""}`}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}