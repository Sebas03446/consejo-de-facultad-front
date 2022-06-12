import React, { Component } from 'react';
import ReactCardCarousel from 'react-card-carousel';
import { Link } from 'react-router-dom';
import './../../static/card.css'
import Slider from "react-slick";
class MyCarousel extends Component {

  


render() {
  const programs = ['Traslado','Cambio de grupo','Inscripción de asignaturas','Cursar menos de la carga mínima','Cancelación de asignaturas','Reserva de cupo adicional','Cancelación periodo académico', 'Cambio tipologia','Reembolso'];
  /* var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }; */
  return (
      <ReactCardCarousel autoplay={true} autoplay_speed={1400}>
        {programs.map(function (object, i) {
            return <Link to={{
              pathname: '/create',
              state: {object: object}
            }}>
            <a  class="card">
            <img src="https://i.imgur.com/oYiTqum.jpg" class="card__image" alt="" />
            <div class="card__overlay">
              <div class="card__header">
                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                <img class="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
                <div class="card__header-text">
                  <h3 class="card__title">{object}</h3>            
                  <span class="card__status">1 hour ago</span>
                </div>
              </div>
              <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
            </div>
          </a>
          </Link>
          }
          )}

      </ReactCardCarousel>
  );
}
}

export default MyCarousel;