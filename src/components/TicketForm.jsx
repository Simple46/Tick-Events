import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Ticket, ChevronDown } from "lucide-react";
import { saveBooking, generateReference, formatNaira } from "../utils/storage";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  quantity: 1,
};

const initialErrors = {
  name: "",
  email: "",
  phone: "",
  quantity: "",
};

export default function TicketForm({ event }) {
  const navigate = useNavigate();
  const [ticketType, setTicketType] = useState("regular");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [submitting, setSubmitting] = useState(false);

  const unitPrice = ticketType === "vip" ? event.vipPrice : event.regularPrice;
  const total = unitPrice * form.quantity;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = { ...initialErrors };
    let valid = true;

    if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      valid = false;
    }
    if (!form.email.includes("@") || !form.email.includes(".")) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      newErrors.phone = "Phone must be at least 10 digits";
      valid = false;
    }
    const qty = Number(form.quantity);
    if (qty < 1 || qty > 5) {
      newErrors.quantity = "Quantity must be between 1 and 5";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setSubmitting(true);

    const booking = {
      reference: generateReference(),
      eventId: event.id,
      eventName: event.name,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      ticketType,
      quantity: Number(form.quantity),
      attendeeName: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      totalPaid: total,
      bookedAt: new Date().toISOString(),
    };

    saveBooking(booking);

    // Navigate with booking in state
    navigate("/confirmation", { state: { booking } });
  };

  return (
    <div className="bg-white border border-amber-900 rounded-2xl p-6 shadow-sm">
      <h2 className="font-syne font-bold text-xl text-amber-950 mb-6">
        Book Tickets
      </h2>

      {/* Ticket type toggle */}
      <div className="mb-6">
        <label className="block font-dm text-sm font-medium text-amber-900 mb-2">
          Ticket Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "regular", label: "Regular", price: event.regularPrice },
            { value: "vip", label: "VIP", price: event.vipPrice },
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => setTicketType(type.value)}
              className={`flex flex-col items-start px-4 py-3 rounded-xl border-2 transition-all ${
                ticketType === type.value
                  ? "border-amber-950 bg-amber-950 text-white"
                  : "border-amber-900 bg-white text-amber-950 hover:border-amber-900"
              }`}
            >
              <span className="font-syne font-bold text-sm">{type.label}</span>
              <span
                className={`font-dm text-xs mt-0.5 ${
                  ticketType === type.value ? "text-white" : "text-amber-900"
                }`}
              >
                {formatNaira(type.price)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-5">
        <label className="block font-dm text-sm font-medium text-amber-950 mb-2">
          Quantity <span className="text-amber-900 font-normal">(max 5)</span>
        </label>
        <div className="relative">
          <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-900" />
          <select
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-2.5 border border-amber-900 rounded-xl text-sm font-dm text-amber-950 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-950 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "ticket" : "tickets"}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-90 pointer-events-none" />
        </div>
        {errors.quantity && (
          <p className="text-red-500 text-xs font-dm mt-1">{errors.quantity}</p>
        )}
      </div>

      {/* Full Name */}
      <div className="mb-5">
        <label className="block font-dm text-sm font-medium text-amber-900 mb-2">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-900" />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Simple Hissa"
            className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm font-dm text-amber-950 placeholder:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-950 focus:border-transparent ${
              errors.name ? "border-red-400" : "border-amber-900"
            }`}
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs font-dm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="block font-dm text-sm font-medium text-amber-900 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-900" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm font-dm text-amber-950 placeholder:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-950 focus:border-transparent ${
              errors.email ? "border-red-400" : "border-amber-800"
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs font-dm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-6">
        <label className="block font-dm text-sm font-medium text-amber-900 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-800" />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="080XXXXXXXX"
            className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm font-dm text-amber-950 placeholder:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-950 focus:border-transparent ${
              errors.phone ? "border-red-400" : "border-amber-900"
            }`}
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-xs font-dm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Order summary */}
      <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-100">
        <p className="font-dm text-xs font-medium text-amber-900 uppercase tracking-wide mb-3">
          Order Summary
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="font-dm text-sm text-amber-900">
            {ticketType === "vip" ? "VIP" : "Regular"} × {form.quantity}
          </span>
          <span className="font-dm text-sm text-amber-950">
            {formatNaira(unitPrice)} each
          </span>
        </div>
        <div className="border-t border-amber-900 pt-2 mt-2 flex justify-between items-center">
          <span className="font-syne font-bold text-sm text-amber-950">
            Total
          </span>
          <span className="font-syne font-bold text-xl text-amber-950">
            {formatNaira(total)}
          </span>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-amber-950 text-white font-dm font-semibold py-3 rounded-xl hover:bg-amber-900 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting
          ? "Processing..."
          : `Confirm Booking — ${formatNaira(total)}`}
      </button>

      <p className="text-center font-dm text-xs text-amber-900 mt-3">
        Secure booking. No payment required for demo.
      </p>
    </div>
  );
}
