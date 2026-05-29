import { Link } from "react-router-dom";

function Navbar() {

  return (

    <div
    >

      <h2
        style={{
          margin: "0",
          fontSize: "20px",
          lineHeight: "1"
        }}
      >
        My Store
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >

       
          Home
        </Link>

        <Link
          to="/cart"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "25px",
            lineHeight: "1"
          }}
        >
          🛒
        </Link>

      </div>

    </div>

  );
}

export default Navbar;