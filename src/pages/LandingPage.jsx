import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Zap,
  Star,
  Users,
  CalendarCheck,
  TicketCheck,
  MapPin,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import EventCard from "../components/EventCard.jsx";
import { events } from "../data/events.js";

const stats = [
  { value: "9", label: "Events Listed" },
  { value: "12+", label: "Tickets Booked" },
  { value: "6", label: "Categories" },
  { value: "5+", label: "Rated Experience" },
];

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Instant Booking",
    desc: "Book your tickets in seconds. No long queues, no stress  just choose and go.",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Curated Events",
    desc: "Only the best Nigerian events — music, food, tech, sports and entertainment.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Secure Tickets",
    desc: "Every ticket gets a unique QR code. Safe, verifiable, always in your pocket.",
  },
];

const steps = [
  {
    number: "01",
    icon: <MapPin className="w-5 h-5" />,
    title: "Find an Event",
    desc: "Browse hundreds of events happening across Nigeria filtered by category or city.",
  },
  {
    number: "02",
    icon: <TicketCheck className="w-5 h-5" />,
    title: "Book Your Ticket",
    desc: "Choose Regular or VIP, fill in your details, and confirm your booking instantly.",
  },
  {
    number: "03",
    icon: <CalendarCheck className="w-5 h-5" />,
    title: "Show Up & Enjoy",
    desc: "Present your QR code at the venue and walk right in. That's all there is to it.",
  },
];

export default function LandingPage() {
  const featuredEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative min-h-[90vh] flex items-center">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://picsum.photos/seed/concertcrowd/1600/900"
              alt="Event crowd"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-amber-950/65" />
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-950 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex justify-around items-center">
            <div className="relative z-1 md:mx-23 mx-auto  px-4 sm:px-6 py-24">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-sm font-dm px-3 py-1.5 rounded-full mb-6">
                  Nigeria's favourite ticket platform
                </span>

                <h1 className=" font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight text-white mb-6">
                  Your Pass to <br />
                  <span className="font-extrabold">Unforgettable</span>
                  <br />
                  Events
                </h1>

                <p className="text-gray-300 font-dm text-lg leading-relaxed mb-10 max-w-lg">
                  Discover the best concerts, festivals, tech summits, and
                  cultural events happening across Nigeria — and book your spot
                  in seconds.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/events"
                    className="flex items-center gap-2 bg-white text-amber-950 font-dm font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Browse Events
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/my-tickets"
                    className="flex items-center gap-2 bg-transparent border border-white/40 backdrop-blur-sm text-white font-dm font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    View My Tickets
                  </Link>
                </div>
              </div>
            </div>
            <div className="z-1 w-xl md:flex hidden rounded-md">
              <img
                className="rounded-md"
                src="https://media.istockphoto.com/id/1363169212/photo/girl-holds-tickets-boarding-passes-for-a-flight.jpg?s=612x612&w=0&k=20&c=sLpjtW-G0r8jQX9HNZf2ldnlS57xJgxAIIJYCtI_AiY="
                alt="experience"
              />
            </div>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <section className="bg-amber-950 border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className=" font-extrabold text-3xl text-white mb-1">
                    {s.value}
                  </p>
                  <p className="font-dm text-sm text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About / Split section ── */}
        <section id="about" className="bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Images collage */}
              <div className="relative h-[420px]">
                {/* Main image */}
                <img
                  src="https://picsum.photos/seed/nigeriashow/700/500"
                  alt="Event experience"
                  className="absolute top-0 left-0 w-3/4 h-72 object-cover rounded-2xl shadow-lg"
                />
                {/* Overlapping smaller image */}
                <img
                  src="https://picsum.photos/seed/lagosparty/400/300"
                  alt="Lagos event"
                  className="absolute bottom-0 right-0 w-1/2 h-52 object-cover rounded-2xl shadow-xl border-4 border-white"
                />
                {/* Floating badge */}
                <div className="absolute bottom-20 left-4 bg-amber-950 text-white px-4 py-3 rounded-xl shadow-lg">
                  <p className=" font-bold text-sm">Made for Nigeria</p>
                  <p className="font-dm text-xs text-white mt-0.5">
                    Across Lagos, Abuja & more
                  </p>
                </div>
              </div>

              {/* Text */}
              <div>
                <p className="text-xs  font-semibold uppercase tracking-widest text-amber-600 mb-3">
                  About TickEvent
                </p>
                <h2 className=" font-extrabold text-4xl text-amber-950 leading-tight mb-5">
                  We bring Nigeria's best events to your fingertips
                </h2>
                <p className="font-dm text-amber-900 text-base leading-relaxed mb-5">
                  TickEvent was built for Nigerians who love great experiences.
                  From the electric energy of Afrobeats concerts to tech summits
                  shaping Africa's future — we make sure you never miss what
                  matters.
                </p>
                <p className="font-dm text-amber-900 text-base leading-relaxed mb-8">
                  Every event is handpicked. Every ticket is secure. Every
                  booking takes under two minutes.
                </p>

                <div className="flex flex-col gap-3">
                  {features.map((f) => (
                    <div key={f.title} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-950 text-white rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        {f.icon}
                      </div>
                      <div>
                        <p className=" font-bold text-amber-950 text-sm">
                          {f.title}
                        </p>
                        <p className="font-dm text-amber-900 text-sm">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured Events ── */}
        <section className="bg-amber-50 border-y border-amber-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs  font-semibold uppercase tracking-widest text-amber-600 mb-1">
                  Happening Soon
                </p>
                <h2 className=" font-extrabold text-3xl text-amber-950">
                  Featured Events
                </h2>
              </div>
              <Link
                to="/events"
                className="hidden sm:flex items-center gap-1.5 text-sm font-dm font-medium text-amber-950 hover:gap-3 transition-all"
              >
                See all events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 border border-gray-200 bg-white text-amber-950 font-dm font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                See all events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works" className="bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text side */}
              <div>
                <p className="text-sm  font-semibold uppercase tracking-widest text-amber-800 mb-3">
                  How it works
                </p>
                <h2 className=" font-extrabold text-4xl text-amber-950 leading-tight mb-10">
                  Three steps to your next great experience
                </h2>

                <div className="flex flex-col gap-8">
                  {steps.map((step, i) => (
                    <div key={step.number} className="flex items-start gap-5">
                      {/* Step number + line */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-amber-950 text-white rounded-xl flex items-center justify-center shrink-0">
                          {step.icon}
                        </div>
                        {i < steps.length - 1 && (
                          <div className="w-px h-10 bg-amber-600 mt-2" />
                        )}
                      </div>
                      <div className="pt-1.5">
                        <span className=" text-sm font-bold text-amber-600 tracking-widest">
                          {step.number}
                        </span>
                        <h3 className=" font-bold text-amber-950 text-lg mt-0.5">
                          {step.title}
                        </h3>
                        <p className="font-dm text-amber-900 text-sm leading-relaxed mt-1">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image side */}
              <div className="relative h-[460px]">
                <img
                  src="https://picsum.photos/seed/eventqueue2/600/700"
                  alt="Event queue"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl"
                />
                {/* Floating ticket card */}
                <div className="absolute -bottom-4 -left-4 bg-white border border-gray-100 shadow-xl rounded-2xl px-5 py-4 max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-amber-950" />
                    <span className=" font-bold text-sm text-amber-950">
                      Live Booking
                    </span>
                  </div>
                  <p className="font-dm text-xs text-amber-800">
                    247 people booked tickets this week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="relative overflow-hidden">
          <img
            src="https://picsum.photos/seed/festivalnight/1400/500"
            alt="Festival"
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className=" font-extrabold text-3xl md:text-4xl text-white mb-4">
                Ready to experience something great?
              </h2>
              <p className="font-dm text-gray-300 text-base mb-8 max-w-md mx-auto">
                Hundreds of events. One platform. Don't miss out.
              </p>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 bg-white text-amber-950 font-dm font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Explore All Events
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
