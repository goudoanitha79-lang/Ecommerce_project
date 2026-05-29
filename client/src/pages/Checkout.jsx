import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleCheckout = () => {

    const userAddress = {
      name,
      address,
      phone
    };

    localStorage.setItem(
      "userAddress",
      JSON.stringify(userAddress)
    );

    navigate("/payment");

  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Checkout Page</h1>

      <input
        type="text"
        placeholder="Enter Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <button onClick={handleCheckout}>
        Proceed To Payment
      </button>

    </div>
  );
}

export default Checkout;