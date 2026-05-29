function ProductCard({ product, addToCart }) {

  return (

    <div
      style={{
        width: "190px",
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "12px",
        boxShadow: "0px 3px 10px rgba(0,0,0,0.08)",
        transition: "0.3s ease",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >

      <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}
        style={{
          width: "100%",
          height: "160px",
          objectFit: "cover",
          borderRadius: "12px",
          transition: "0.3s ease"
        }}
      />

      <h2
        style={{
          marginTop: "12px",
          marginBottom: "8px",
          fontSize: "18px",
          color: "#222"
        }}
      >
        {product.name}
      </h2>

      <p
        style={{
          color: "#666",
          fontSize: "14px",
          minHeight: "35px"
        }}
      >
        {product.description}
      </p>

      <h3
        style={{
          marginTop: "8px",
          marginBottom: "12px",
          color: "black",
          fontSize: "18px"
        }}
      >
        ₹ {product.price}
      </h3>

      <button
        onClick={() => addToCart(product)}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          transition: "0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Add To Cart
      </button>

    </div>

  );

}

export default ProductCard;