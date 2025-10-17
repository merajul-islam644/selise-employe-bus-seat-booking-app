import React from "react";

export default function Seat({ seat, onClick }) {
  return (
    <div
      onClick={() => onClick(seat)}
      style={{
        width: "60px",
        height: "60px",
        margin: "5px",
        border: "2px solid #333",
        borderRadius: "5px",
        backgroundColor: seat.booked ? "grey" : "white",
        cursor: seat.booked ? "not-allowed" : "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      {seat.number}
    </div>
  );
}
