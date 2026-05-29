import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function AddProduct() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);

    formData.append("price", price);

    formData.append("description", description);

    formData.append("image", image);

    try {

      const response = await axios.post(

        "http://ecommerce-project-qvh0.onrender.com/add-product",

        formData

      );

      alert(response.data);

      navigate("/admin/products");

    } catch(error) {

      console.log(error);

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px"
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "40px"
        }}
      >

        <button
          onClick={() => navigate("/admin")}
          style={{
            padding: "10px 16px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ← Back
        </button>

        <h1
          style={{
            flex: 1,
            textAlign: "center",
            margin: 0,
            marginRight: "90px",
            color: "#222"
          }}
        >
          Add Product
        </h1>

      </div>

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
          transition: "0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.01)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >

        <form
          onSubmit={handleSubmit}
        >

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px"
            }}
          >

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "15px"
              }}
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "15px"
              }}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "15px",
                height: "120px",
                resize: "none"
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px dashed #bbb",
                borderRadius: "10px",
                padding: "20px"
              }}
            >

              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />

            </div>

          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Add Product
          </button>

        </form>

      </div>

    </div>

  );

}

export default AddProduct;
