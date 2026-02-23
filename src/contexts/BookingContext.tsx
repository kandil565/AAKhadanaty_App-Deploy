import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Booking, BookingStatus } from "@/data/services";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface BookingContextType {
  bookings: Booking[];
  allBookings: Booking[];
  loading: boolean;
  addBooking: (booking: Omit<Booking, "id" | "status">) => Promise<boolean>;
  updateStatus: (id: string, status: BookingStatus) => Promise<boolean>;
  fetchMyBookings: () => Promise<void>;
  fetchAllBookings: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const getToken = () => localStorage.getItem("a5adamaty_token");

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyBookings = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/bookings/my-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.bookings) {
        const mapped: Booking[] = data.bookings.map((b: any) => ({
          id: b._id,
          serviceId: b.serviceType || "",
          serviceName: b.serviceName,
          customerName: "",
          customerPhone: "",
          customerEmail: "",
          date: b.date ? new Date(b.date).toLocaleDateString("ar-EG") : "",
          time: b.time,
          status: b.status === "cancelled" ? "canceled" : b.status,
          price: b.price,
          notes: b.notes || "",
        }));
        setBookings(mapped);
      }
    } catch (err) {
      console.error("Error fetching my bookings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllBookings = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.bookings) {
        const mapped: Booking[] = data.bookings.map((b: any) => ({
          id: b._id,
          serviceId: b.serviceType || "",
          serviceName: b.serviceName,
          customerName: b.userId?.name || "غير معروف",
          customerPhone: b.userId?.phone || "",
          customerEmail: b.userId?.email || "",
          date: b.date ? new Date(b.date).toLocaleDateString("ar-EG") : "",
          time: b.time,
          status: b.status === "cancelled" ? "canceled" : b.status,
          price: b.price,
          notes: b.notes || "",
        }));
        setAllBookings(mapped);
      }
    } catch (err) {
      console.error("Error fetching all bookings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addBooking = async (booking: Omit<Booking, "id" | "status">): Promise<boolean> => {
    const token = getToken();
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceName: booking.serviceName,
          serviceType: booking.serviceId || "consultation",
          date: booking.date,
          time: booking.time,
          price: booking.price,
          notes: booking.notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchMyBookings();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error creating booking:", err);
      return false;
    }
  };

  const updateStatus = async (id: string, status: BookingStatus): Promise<boolean> => {
    const token = getToken();
    if (!token) return false;
    try {
      const backendStatus = status === "canceled" ? "cancelled" : status;
      const res = await fetch(`${API_BASE}/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: backendStatus }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchAllBookings();
        await fetchMyBookings();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error updating booking status:", err);
      return false;
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchMyBookings();
    }
  }, [fetchMyBookings]);

  return (
    <BookingContext.Provider value={{ bookings, allBookings, loading, addBooking, updateStatus, fetchMyBookings, fetchAllBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookings must be used within BookingProvider");
  return ctx;
};
