import React, { useState } from 'react';

const testimonials = [
  {
    image: "/person-2.jpg",
    text: "Absolutely delicious, healthy and freshly prepared food. Highly recommended!",
    name: "Divya",
  },
  {
    image: "/person-1.jpg",
    text: "It’s not just meal planning. It’s clarity. I spend less time deciding and more time actually enjoying my food.",
    name: "Ravi Nair",
  },
  {
    image: "/person-3.jpg",
    text: "Fresh ingredients and tasty dishes. A great experience!",
    name: "Amit Yadav",
  },
  {
    image: "/person-4.jpg",
    text: "Prep completely changed how I approach my week. I no longer scramble for meals — everything feels intentional and balanced.",
    name: "Ananya S",
  },
  {
    image: "/person-5.jpg",
    text: "The structure is simple, but the impact is huge. My groceries, recipes, and week all finally feel aligned.",
    name: "Meera Iyer",
  },
  {
    image: "/person-6.jpg",
    text: "I didn’t realize how much mental space food decisions were taking up. Prep gave that space back.",
    name: "Arjun P",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalTestimonials = testimonials.length;

  const goToNext = () => {
    setCurrentIndex(currentIndex === totalTestimonials - 1 ? 0 : currentIndex + 1);
  };

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? totalTestimonials - 1 : currentIndex - 1);
  };

  return (
    <div className="carousel-container">
      <div className="testimonial">
        <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} />
        <p className="text">{testimonials[currentIndex].text}</p>
        <p className="name">- {testimonials[currentIndex].name}</p>
      </div>
      <div className="navigation">
  <button className="nav-circle" onClick={goToPrev}>
    ←
  </button>
  <button className="nav-circle" onClick={goToNext}>
    →
  </button>
</div>
    </div>
  );
};

export default Carousel;