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
        src={`https://ecommerce-project-qvh0.onrender.com/uploads/data:image/jpeg;base64,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`}
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
