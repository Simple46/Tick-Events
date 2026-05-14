import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { formatDate, formatNaira, formatTime } from "../utils/storage";

export default function EventCard({ event }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-amber-950 text-white text-xs font-syne font-semibold px-3 py-1 rounded-full">
          {event.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-syne font-bold text-lg text-amber-950 leading-snug mb-3">
          {event.name}
        </h3>

        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-amber-800 text-sm font-dm">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>
              {formatDate(event.date)} · {formatTime(event.time)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-amber-800 text-sm font-dm">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-amber-800">
          <div>
            <p className="text-xs text-amber-800 font-dm">From</p>
            <p className="font-syne font-bold text-amber-950 text-base">
              {formatNaira(event.regularPrice)}
            </p>
          </div>
          <Link
            to={`/events/${event.id}`}
            className="flex items-center gap-1.5 bg-amber-950 text-white text-sm font-dm font-medium px-4 py-2 rounded-xl hover:bg-amber-900 transition-colors"
          >
            Get Tickets
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
