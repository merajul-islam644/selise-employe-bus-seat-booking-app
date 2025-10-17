import React, { useState, useEffect } from "react";
import SeatBookingForm from "../components/SeatBookingForm";

export default function SeatUI() {
  const selectedBus = JSON.parse(localStorage.getItem("selectedBus")) || {
    id: 0,
    number: "Bus",
  };

  const initialSeats = Array.from({ length: 32 }, (_, i) => ({
    number: i + 1,
    booked: false,
  }));

  const [seats, setSeats] = useState(() => {
    const saved = localStorage.getItem(`seats_bus_${selectedBus.id}`);
    return saved ? JSON.parse(saved) : initialSeats;
  });

  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    localStorage.setItem(`seats_bus_${selectedBus.id}`, JSON.stringify(seats));
  }, [seats, selectedBus.id]);

  const handleSeatClick = (seat) => setSelectedSeat(seat);

  const rows = [];
  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4));
  }

  return (
    <div
      style={{
        padding: "10px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ marginBottom: "10px", fontSize: "20px" }}>
        {selectedBus.number}
      </h2>

      {/* Bus container */}
      <div
        style={{
          width: "360px",
          backgroundColor: "#f3f4f6",
          padding: "10px",
          borderRadius: "15px",
          position: "relative",
        }}
      >
        {/* Driver seat */}
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#f87171",
            borderRadius: "50%",
            position: "absolute",
            top: "8px",
            right: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            color: "white",
            fontSize: "14px",
          }}
        >
          D
        </div>

        {/* Seats rows */}
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0 5px",
              }}
            >
              {/* Left seats */}
              <div style={{ display: "flex", gap: "6px" }}>
                {row.slice(0, 2).map((seat) => (
                  <div
                    key={seat.number}
                    onClick={() => handleSeatClick(seat)}
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: seat.booked ? "grey" : "white",
                      border: "2px solid #333",
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      cursor: seat.booked ? "not-allowed" : "pointer",
                      fontSize: "12px",
                    }}
                  >
                    {seat.number}
                  </div>
                ))}
              </div>

              {/* Aisle */}
              <div style={{ width: "30px" }}></div>

              {/* Right seats */}
              <div style={{ display: "flex", gap: "6px" }}>
                {row.slice(2, 4).map((seat) => (
                  <div
                    key={seat.number}
                    onClick={() => handleSeatClick(seat)}
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: seat.booked ? "grey" : "white",
                      border: "2px solid #333",
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      cursor: seat.booked ? "not-allowed" : "pointer",
                      fontSize: "12px",
                    }}
                  >
                    {seat.number}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal booking form */}
      {selectedSeat && (
        <SeatBookingForm
          seat={selectedSeat}
          seats={seats}
          setSeats={setSeats}
          onClose={() => setSelectedSeat(null)}
        />
      )}
    </div>
  );
}
