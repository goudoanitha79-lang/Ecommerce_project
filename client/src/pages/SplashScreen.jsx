import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.jpg";

function SplashScreen() {

  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {

      navigate("/login");

    }, 4000);

    return () => clearTimeout(timer);

  }, [navigate]);

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        style={{
          animation: "zoomIn 2s ease"
        }}
      >

        <img
          src={logo}
          alt="Logo"
          style={{
            width: "220px",
            height: "220px",
            objectFit: "contain"
          }}
        />

      </div>

      <style>
        {`

          @keyframes zoomIn {

            0% {

              transform: scale(0.5);

              opacity: 0;

            }

            100% {

              transform: scale(1);

              opacity: 1;

            }

          }

        `}
      </style>

    </div>

  );

}

export default SplashScreen;
