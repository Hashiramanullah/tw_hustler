"use client";
import React, { useState, useEffect } from "react";
import { getCollectionDetails } from "@/lib/actions/actions";

const Page = ({ params }: { params: { collectionId: string } }) => {
  const categories = ["Watch", "Shoe", "Bag", "Accessories"];
  const allProducts = [
    { name: "Watch 1", category: "Watch", image: "https://via.placeholder.com/150" },
    { name: "Watch 2", category: "Watch", image: "https://via.placeholder.com/150" },
    { name: "Shoe 1", category: "Shoe", image: "https://via.placeholder.com/150" },
    { name: "Bag 1", category: "Bag", image: "https://via.placeholder.com/150" },
    { name: "Accessories 1", category: "Accessories", image: "https://via.placeholder.com/150" },
  ];

  const [breadcrumb, setBreadcrumb] = useState(["Home", "Shop"]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      const collectionDetails = await getCollectionDetails(params.collectionId);
      if (categories.includes(collectionDetails.type)) {
        handleCategoryClick(collectionDetails.type);
      }
    };

    fetchCollectionDetails();
  }, [params.collectionId]);

  const handleCategoryClick = (category: string) => {
    setBreadcrumb(["Home", "Shop", category]);
    setSelectedCategory(category);
    setFilteredProducts(allProducts.filter((product) => product.category === category));
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "10px" }}>
      {/* Breadcrumb */}
      <div style={{ padding: "16px", color: "#4b5563", fontSize: "14px" }}>
        {breadcrumb.map((crumb, index) => (
          <span key={index}>
            {index !== 0 && " / "}
            <span style={{ cursor: "pointer", color: "#2563eb" }}>{crumb}</span>
          </span>
        ))}
      </div>

      {/* Banner */}
      <div
        style={{
          width: "100%",
          height: "240px",
          backgroundImage: "url('/kid1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <h1 style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>Shop the Latest</h1>
        </div>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "10px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Categories</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category)}
              style={{
                padding: "10px 20px",
                backgroundColor: selectedCategory === category ? "#1e40af" : "#2563eb",
                color: "white",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "10px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
          {selectedCategory ? `${selectedCategory} Products` : "All Products"}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}>
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "5px" }} />
              <h3 style={{ marginTop: "8px", fontWeight: "500" }}>{product.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
