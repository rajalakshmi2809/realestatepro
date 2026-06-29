import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    price: "",
    type: "HOUSE",
    bhk: "",
    sqft: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing =
      JSON.parse(localStorage.getItem("properties")) || [];

    const newProperty = {
      id: existing.length + 1,
      ...formData,
      status: "READY TO MOVE",
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
      ]
    };

    localStorage.setItem(
      "properties",
      JSON.stringify([...existing, newProperty])
    );

    navigate("/dashboard/properties");
  };

  return (

    <div className="p-10 bg-gray-50 min-h-screen">

      <div className="bg-white p-8 rounded-2xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Add New Property
        </h1>

        <form 
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input
            name="name"
            placeholder="Property Name"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="bhk"
            placeholder="BHK"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            name="sqft"
            placeholder="Sq.ft"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <select
            name="type"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option>HOUSE</option>
            <option>VILLA</option>
            <option>APARTMENT</option>
          </select>

          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-3 rounded-xl font-bold"
          >
            Save Property
          </button>

        </form>

      </div>

    </div>

  );

};

export default AddProperty;