import React, { createContext, useContext, useState, ReactNode } from "react";
import { Booking, BookingStatus, demoBookings } from "@/data/services";

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "status">) => void;
  updateStatus: (id: string, status: BookingStatus) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>(demoBookings);

  const addBooking = (booking: Omit<Booking, "id" | "status">) => {
    const newBooking: Booking = {
      ...booking,
      id: `BK${String(bookings.length + 1).padStart(3, "0")}`,
      status: "pending",
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const updateStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateStatus }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookings must be used within BookingProvider");
  return ctx;
};
