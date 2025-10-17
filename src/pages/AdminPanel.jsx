import React from "react";
import { useNavigate } from "react-router-dom";

const buses = [
  { id: 1, number: "Bus 101" },
  { id: 2, number: "Bus 102" },
  { id: 3, number: "Bus 103" },
];

export default function AdminPanel() {
  const navigate = useNavigate();

  const handleSelectBus = (bus) => {
    // Save selected bus to localStorage
    localStorage.setItem("selectedBus", JSON.stringify(bus));

    // Initialize seats for this bus if not already present
    const existingSeats = localStorage.getItem(`seats_bus_${bus.id}`);
    if (!existingSeats) {
      const initialSeats = Array.from({ length: 32 }, (_, i) => ({
        number: i + 1,
        booked: false,
      }));
      localStorage.setItem(`seats_bus_${bus.id}`, JSON.stringify(initialSeats));
    }

    navigate("/seat-ui");
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Admin Panel
      </h2>
      <p style={{ textAlign: "center", marginBottom: "30px", color: "#555" }}>
        Select a bus to manage seats
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {buses.map((bus) => (
          <div
            key={bus.id}
            onClick={() => handleSelectBus(bus)}
            style={{
              width: "150px",
              height: "80px",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
            }}
          >
            {bus.number}
          </div>
        ))}
      </div>
    </div>
  );
}
