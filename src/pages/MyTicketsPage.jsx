import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Ticket, ArrowRight, CalendarX } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BookingCard from "../components/BookingCard.jsx";
import { getBookings } from "../utils/storage";

export default function MyTicketsPage() {
  const [bookings, setBookings] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadBookings = () => {
    setBookings(getBookings());
    setLoaded(true);
  };

  // Load on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadBookings();
  }, []);

  // Stay in sync with any booking changes (from other tabs or components)
  useEffect(() => {
    window.addEventListener("bookingsUpdated", loadBookings);
    return () => window.removeEventListener("bookingsUpdated", loadBookings);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* Page header */}
          <div className="mb-8">
            <p className="text-xs font-syne font-semibold uppercase tracking-widest text-amber-900 mb-1">
              Your Account
            </p>
            <div className="flex items-end justify-between">
              <h1 className="font-syne font-extrabold text-3xl text-amber-950">
                My Tickets
              </h1>
              {bookings.length > 0 && (
                <span className="font-dm text-sm text-amber-900">
                  {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          {!loaded ? (
            /* Loading state */
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-amber-950 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : bookings.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-5">
                <CalendarX className="w-9 h-9 text-amber-900" />
              </div>
              <h2 className="font-syne font-bold text-xl text-amber-950 mb-2">
                No tickets yet
              </h2>
              <p className="font-dm text-amber-900 text-sm max-w-xs mb-8 leading-relaxed">
                You haven't booked any events yet. Browse our lineup and grab
                your first ticket.
              </p>
              <Link
                to="/events"
                className="flex items-center gap-2 bg-amber-950 text-white font-dm font-semibold px-6 py-3 rounded-xl hover:bg-amber-900 transition-colors"
              >
                Browse Events
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* Bookings list */
            <div className="flex flex-col gap-5">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.reference}
                  booking={booking}
                  onCancel={loadBookings}
                />
              ))}

              {/* Bottom CTA */}
              <div className="mt-4 pt-6 border-t border-amber-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-dm text-sm text-amber-900">
                  Want to attend more events?
                </p>
                <Link
                  to="/events"
                  className="flex items-center gap-2 border border-amber-800 bg-white text-amber-950 font-dm font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-amber-50 transition-colors"
                >
                  <Ticket className="w-4 h-4" />
                  Browse More Events
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
