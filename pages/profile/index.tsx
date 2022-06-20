import { useRouter } from "next/router";
import React from "react";
import LayoutComp from "../../components/Layout/Layout";
import useAuth from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <LayoutComp title="Perfil">
      <div className="profileContainer">
        <div className="row">
          <p className="bold">Nombre:</p>
          <p>{user.name}</p>
        </div>

        <div className="row">
          <p className="bold">Email:</p>
          <p>{user.email}</p>
        </div>

        <div className="row">
          <p className="bold">Rol:</p>
          <p>{user.privilege}</p>
        </div>

        {user.privilege !== "admin" && (
          <div className="row">
            <p className="bold">Pregrado:</p>
            <p>{user.academic_degree}</p>
          </div>
        )}
      </div>
    </LayoutComp>
  );
};

export default Profile;
