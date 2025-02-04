import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const CardSlider = (props) => {
  

  // Add ref to store Swiper instance
  const [swiperRef, setSwiperRef] = useState(null);

  // Handler to advance to next slide
  const handleCardClick = () => {
    if (swiperRef) {
      swiperRef.slideNext();
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto", padding: "2rem 0" }}>
      <Swiper
        grabCursor={true}
        onSwiper={setSwiperRef} 
        effect={"cards"}
        modules={[EffectCards]}
        className="mySwiper"
        loop={true}
        onSlideChangeTransitionStart={() => props.onSlideChange((prev) => prev + 1)}
        cardsEffect={{
          slideShadows: false,
          perSlideRotate: 3,
          perSlideOffset: 3,
          perSlideRotate: 3,
        }}
      >
        {props.cards.map((card) => (
          <SwiperSlide
            key={card.id}
            style={{ display: "flex", justifyContent: "center" }}
            onClick={handleCardClick} // Add click handler
          >
            <div
              style={{
                width: "300px",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "grey",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.15)",
              }}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSlider;
