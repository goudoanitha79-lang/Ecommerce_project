import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [description, setDescription] = useState("");

  useEffect(() => {

    axios
      .get("http://https://ecommerce-project-qvh0.onrender.com/products")

      .then((response) => {

        const product = response.data.find(
          (item) => item.id == id
        );

        if(product) {

          setName(product.name);

          setPrice(product.price);

          setDescription(product.description);

        }

      })

      .catch((error) => {

        console.log(error);

      });

  }, []);

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.put(

        `http://https://ecommerce-project-qvh0.onrender.com/update-product/${id}`,

        {
          name,
          price,
          description
        }

      );

      alert(response.data);

      navigate("/admin/products");

    } catch(error) {

      console.log(error);

      alert("Error Updating Product");

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        style={{
          width: "380px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          transition: "0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >

        <button
          onClick={() => navigate("/admin/products")}
          style={{
            padding: "10px 15px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
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
            textAlign: "center",
            marginBottom: "30px",
            color: "#222"
          }}
        >
          Edit Product
        </h1>

        <form
          onSubmit={handleUpdate}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px"
          }}
        >

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "15px",
              height: "100px",
              resize: "none"
            }}
          />

          <button
            type="submit"
            style={{
              padding: "14px",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Update Product
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditProduct;
