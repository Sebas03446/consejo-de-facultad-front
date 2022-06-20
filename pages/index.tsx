import type { NextPage } from "next";
import CarrouselCard from "../components/CarouselCard";
import LayoutComp from "../components/Layout/Layout";
import useAuth from "../context/AuthContext";

const Home: NextPage = () => {
  const { user } = useAuth();
  return (
    <LayoutComp title="Home">
      <div className="indexContainer">
        <div className="info">
          <h2 className="mainTitle">Hola {user.name}!</h2>
          <h2>
            SFC fue creada para gestionar las solicitudes de manera más
            eficiente
          </h2>
        </div>
        <div className="carouselContainer">
          <CarrouselCard />
        </div>
      </div>
    </LayoutComp>
  );
};

export default Home;
