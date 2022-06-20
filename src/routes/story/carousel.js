import React, { Component } from 'react';
import ReactCardCarousel from 'react-card-carousel';
import { Link } from 'react-router-dom';
import './../../static/card.css'
import Slider from "react-slick";
class MyCarousel extends Component {

  


render() {
  const programs = ['Traslado','Cambio de grupo','Inscripción de asignaturas','Cursar menos de la carga mínima','Cancelación de asignaturas','Reserva de cupo adicional','Cancelación periodo académico', 'Cambio tipologia','Reembolso'];
  /*var settings = {
    dots: false,
    infinite: false,    slidesToShow: 1,
    slidesToScroll: 1
  };*/ 
  return (
      <ReactCardCarousel autoplay={true} autoplay_speed={5000}>
        {programs.map(function (object, i) {
            return <Link to={{
              pathname: '/create',
              state: {object: object}
            }}>
            <a  class="card"> </a>
            <a href="https://imgur.com/mqbiUcx"><img src="https://i.imgur.com/mqbiUcxl.png" title="source: imgur.com"  class="card__image" alt="" />
            <div class="card__overlay"></div>
            
            <div class="card__overlay">
              <div class="card__header">
                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                <img class="card__thumb" src="https://i.imgur.com/TUH0Oh6s.jpg" alt="" />
                <div class="card__header-text">
                  <h3 class="card__title">{object}</h3>            
                  
                </div>
              </div>
              <p class="card__description">Escoge la solicitud que deseas realizar. </p>
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