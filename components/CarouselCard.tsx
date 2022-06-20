import { Carousel } from "antd";
import React from "react";

const CarouselCard = () => {
  return (
    <Carousel>
      <div>
        <h3 className="carousel--card">1</h3>
      </div>
      <div>
        <h3 className="carousel--card">2</h3>
      </div>
      <div>
        <h3 className="carousel--card">3</h3>
      </div>
      <div>
        <h3 className="carousel--card">4</h3>
      </div>
    </Carousel>
  );
};

export default CarouselCard;
