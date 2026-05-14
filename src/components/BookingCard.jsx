import { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Mail,
  Ticket,
  Trash2,
  X,
} from "lucide-react";
import QRCodeDisplay from "./QRCodeDisplay.jsx";
import {
  cancelBooking,
  formatDate,
  formatNaira,
  formatTime,
} from "../utils/storage.jsx";

export default function BookingCard({ booking, onCancel }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancel = () => {
    cancelBooking(booking.reference);
    onCancel();
    setShowConfirm(false);
  };

  return (
    <>
      <div className="bg-white border border-amber-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Top banner */}
        <div className="bg-amber-950 px-5 py-3 flex items-center justify-between">
          <div>
            <p className="font-dm text-xs text-amber-100 mb-0.5">
              Booking Reference
            </p>
            <p className="font-syne font-bold text-white text-sm tracking-widest">
              {booking.reference}
            </p>
          </div>
          <span
            className={`text-xs font-dm font-semibold px-3 py-1 rounded-full ${
              booking.ticketType === "vip"
                ? "bg-amber-500 text-white"
                : "bg-green-500 text-gray-100"
            }`}
          >
            {booking.ticketType === "vip" ? " VIP" : "Regular"}
          </span>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Left — Event details */}
            <div className="md:col-span-2">
              <h3 className="font-syne font-bold text-lg text-amber-950 mb-4 leading-snug">
                {booking.eventName}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {[
                  {
                    icon: <Calendar className="w-3.5 h-3.5" />,
                    label: formatDate(booking.eventDate),
                  },
                  {
                    icon: <Clock className="w-3.5 h-3.5" />,
                    label: formatTime(booking.eventTime),
                  },
                  {
                    icon: <MapPin className="w-3.5 h-3.5" />,
                    label: booking.eventLocation,
                  },
                  {
                    icon: <Ticket className="w-3.5 h-3.5" />,
                    label: `${booking.quantity} ${booking.ticketType === "vip" ? "VIP" : "Regular"} ticket${booking.quantity > 1 ? "s" : ""}`,
                  },
                  {
                    icon: <User className="w-3.5 h-3.5" />,
                    label: booking.attendeeName,
                  },
                  {
                    icon: <Mail className="w-3.5 h-3.5" />,
                    label: booking.email,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-amber-900"
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span className="font-dm text-sm truncate">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total + booked date */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="font-dm text-xs text-amber-900">Total Paid</p>
                  <p className="font-syne font-bold text-xl text-amber-950">
                    {formatNaira(booking.totalPaid)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-dm text-xs text-amber-800">Booked on</p>
                  <p className="font-dm text-sm text-amber-950">
                    {new Date(booking.bookedAt).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Right — QR + Cancel */}
            <div className="flex flex-col items-center gap-4">
              <QRCodeDisplay booking={booking} size={120} />

              <button
                onClick={() => setShowConfirm(true)}
                className="flex items-center gap-2 w-full justify-center border border-red-200 text-red-500 font-dm text-sm font-medium px-4 py-2 rounded-xl hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cancel confirmation modal ── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-amber-950/50 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 z-10">
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <X className="w-4 h-4 text-amber-900" />
            </button>

            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>

            <h3 className="font-syne font-bold text-lg text-amber-950 mb-2">
              Cancel this booking?
            </h3>
            <p className="font-dm text-sm text-amber-900 leading-relaxed mb-6">
              You're about to cancel your tickets for{" "}
              <span className="font-semibold text-amber-950">
                {booking.eventName}
              </span>
              . This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border border-gray-200 text-amber-950 font-dm font-medium text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-red-500 text-white font-dm font-medium text-sm py-2.5 rounded-xl hover:bg-red-600 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
