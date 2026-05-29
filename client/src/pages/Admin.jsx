import { useEffect, useState } from "react";

import axios from "axios";

function Admin() {

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);

  const [products, setProducts] = useState([]);

  const fetchProducts = () => {

    axios
      .get("http://https://ecommerce-project-qvh0.onrender.com/products")

      .then((response) => {

        setProducts(response.data);

      })

      .catch((error) => {

        console.log(error);

      });

  };

  useEffect(() => {

    fetchProducts();

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);

    formData.append("price", price);

    formData.append("description", description);

    formData.append("image", image);

    try {

      const response = await axios.post(

        "http://https://ecommerce-project-qvh0.onrender.com/add-product",

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }

      );

      alert(response.data);

      fetchProducts();

    } catch(error) {

      console.log(error);

      alert("Error Adding Product");

    }

  };

  const deleteProduct = async (id) => {

    try {

      const response = await axios.delete(

        `http://https://ecommerce-project-qvh0.onrender.com/delete-product/${id}`

      );

      alert(response.data);

      fetchProducts();

    } catch(error) {

      console.log(error);

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1 style={{ textAlign: "center" }}>
        Admin Dashboard
      </h1>

      <div
        style={{
          maxWidth: "400px",
          margin: "auto",
          marginBottom: "40px"
        }}
      >

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px"
            }}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px"
            }}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px"
            }}
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={{
              marginBottom: "10px"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Add Product
          </button>

        </form>

      </div>

      <h2 style={{ textAlign: "center" }}>
        All Products
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center"
        }}
      >

        {
          products.map((product) => (

            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                width: "180px",
                borderRadius: "10px",
                textAlign: "center",
                backgroundColor: "white",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
              }}
            >

              <img
                src={`http://https://ecommerce-project-qvh0.onrender.com/uploads/${product.image}`}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "10px"
                }}
              />

              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <h4>₹ {product.price}</h4>

              <button
                onClick={() => deleteProduct(product.id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "8px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>

            </div>

          ))
        }

      </div>

    </div>

  );
}

export default Admin;
