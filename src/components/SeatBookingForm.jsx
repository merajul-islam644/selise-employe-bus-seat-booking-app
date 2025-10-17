import React, { useState, useEffect } from "react";

export default function SeatBookingForm({ seat, seats, setSeats, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const destinations = ["City A", "City B", "City C"];
  const timeSlots = ["08:00 AM", "12:00 PM", "04:00 PM", "08:00 PM"];

  useEffect(() => {
    if (!seat) {
      setName("");
      setEmail("");
      setDestination("");
      setTime("");
    } else if (seat.booked) {
      setName(seat.name);
      setEmail(seat.email);
      setDestination(seat.destination);
      setTime(seat.time);
    } else {
      setName("");
      setEmail("");
      setDestination("");
      setTime("");
    }
  }, [seat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!seat) return;

    const updatedSeats = seats.map((s) =>
      s.number === seat.number
        ? { ...s, booked: true, name, email, destination, time }
        : s
    );

    setSeats(updatedSeats);
    localStorage.setItem(`seats`, JSON.stringify(updatedSeats));
    setShowConfirmation(true); // Show modal instead of alert
  };

  if (!seat) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "350px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "25px",
            height: "25px",
            cursor: "pointer",
          }}
        >
          X
        </button>

        {/* Booking Form */}
        {!showConfirmation ? (
          seat.booked ? (
            <div>
              <h3>Seat {seat.number} Details</h3>
              <p>
                <strong>Status:</strong> Booked
              </p>
              <p>
                <strong>Name:</strong> {seat.name}
              </p>
              <p>
                <strong>Email:</strong> {seat.email}
              </p>
              <p>
                <strong>Destination:</strong> {seat.destination}
              </p>
              <p>
                <strong>Time:</strong> {seat.time}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>Book Seat {seat.number}</h3>
              <div style={{ marginBottom: "10px" }}>
                <label>Name: </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Email: </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Destination: </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  style={{ width: "100%", padding: "5px" }}
                >
                  <option value="">Select destination</option>
                  {destinations.map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Time: </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  style={{ width: "100%", padding: "5px" }}
                >
                  <option value="">Select time</option>
                  {timeSlots.map((t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Book Seat
              </button>
            </form>
          )
        ) : (
          // Confirmation modal
          <div>
            <h3>Seat {seat.number} Booked!</h3>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Destination:</strong> {destination}
            </p>
            <p>
              <strong>Time:</strong> {time}
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
