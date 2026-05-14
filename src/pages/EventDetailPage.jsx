import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Calendar, MapPin, Clock, Tag } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import TicketForm from "../components/TicketForm.jsx";
import { events } from "../data/events.js";
import { formatDate, formatNaira, formatTime } from "../utils/storage.jsx";

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === Number(id));

  // Redirect to /events if event not found
  useEffect(() => {
    if (!event) navigate("/events", { replace: true });
  }, [event, navigate]);

  if (!event) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-white">
        {/* ── Hero Image Banner ── */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-amber-950/50" />
          {/* Category badge on image */}
          <div className="absolute bottom-5 left-5 md:left-10">
            <span className="bg-white text-amber-950 text-xs font-syne font-bold px-3 py-1.5 rounded-full">
              {event.category}
            </span>
            <h1 className="font-syne font-extrabold text-3xl md:text-4xl text-white mt-3 leading-tight">
              {event.name}
            </h1>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left — Event Details (3/5) */}
            <div className="lg:col-span-3">
              {/* Info pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    icon: <Calendar className="w-4 h-4" />,
                    label: "Date",
                    value: formatDate(event.date),
                  },
                  {
                    icon: <Clock className="w-4 h-4" />,
                    label: "Time",
                    value: formatTime(event.time),
                  },
                  {
                    icon: <MapPin className="w-4 h-4" />,
                    label: "Location",
                    value: event.location,
                  },
                  {
                    icon: <Tag className="w-4 h-4" />,
                    label: "Price Range",
                    value: `${formatNaira(event.regularPrice)} — ${formatNaira(event.vipPrice)}`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 bg-amber-50 border border-gray-100 rounded-xl px-4 py-3"
                  >
                    <div className="w-8 h-8 bg-amber-950 text-white rounded-lg flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-dm text-xs text-amber-800">
                        {item.label}
                      </p>
                      <p className="font-dm text-sm font-medium text-amber-950 leading-snug">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-syne font-bold text-xl text-amber-950 mb-3">
                  About this Event
                </h2>
                <p className="font-dm text-amber-950 text-base leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Ticket pricing breakdown */}
              <div className="mt-8">
                <h2 className="font-syne font-bold text-xl text-amber-950 mb-4">
                  Ticket Pricing
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      type: "Regular",
                      price: event.regularPrice,
                      perks: "General admission, standard seating",
                    },
                    {
                      type: "VIP",
                      price: event.vipPrice,
                      perks:
                        "Priority entry, reserved seating, exclusive lounge",
                    },
                  ].map((t) => (
                    <div
                      key={t.type}
                      className="border border-amber-700 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-syne font-bold text-sm text-amber-950">
                          {t.type}
                        </span>
                        {t.type === "VIP" && (
                          <span className="bg-amber-950 text-white text-xs font-dm px-2 py-0.5 rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="font-syne font-extrabold text-2xl text-amber-950 mb-1">
                        {formatNaira(t.price)}
                      </p>
                      <p className="font-dm text-xs text-amber-900">
                        {t.perks}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Ticket Form (2/5) — sticky */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <TicketForm event={event} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
