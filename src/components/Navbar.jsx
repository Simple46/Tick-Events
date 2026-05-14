import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Ticket, ShoppingBag, Menu, X } from "lucide-react";
import { getTotalTickets } from "../utils/storage";

const navLinks = [
  { label: "Home", to: "/", type: "route" },
  { label: "About", to: "/#about", type: "anchor" },
  { label: "How it Works", to: "/#how-it-works", type: "anchor" },
  { label: "Events", to: "/events", type: "route" },
  { label: "My Tickets", to: "/my-tickets", type: "route" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [totalTickets, setTotalTickets] = useState(getTotalTickets());
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Badge updates
  useEffect(() => {
    const update = () => setTotalTickets(getTotalTickets());
    window.addEventListener("bookingsUpdated", update);
    return () => window.removeEventListener("bookingsUpdated", update);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [location.pathname]);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle anchor links
  const handleAnchorClick = (e, hash) => {
    e.preventDefault();
    const id = hash.replace("/#", "");

    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white border-b border-amber-900 transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-950 rounded-lg flex items-center justify-center">
              <Ticket className="w-4 h-4 text-white" />
            </div>
            <span className="font-syne font-bold text-xl text-amber-950 tracking-tight">
              Tick<span className="font-light">Event</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.type === "anchor" ? (
                <NavLink
                  key={link.to}
                  href={link.to}
                  onClick={(e) => handleAnchorClick(e, link.to)}
                  className="font-dm text-sm font-medium text-amber-900 hover:text-amber-950 hover:font-bold transition-colors cursor-pointer"
                >
                  {link.label}
                </NavLink>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `font-dm text-sm font-medium transition-colors ${
                      isActive
                        ? "text-amber-950 border-b-2 border-amber-950 pb-0.5 font-bold"
                        : "text-amber-900 hover:text-amber-950"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </div>

          {/* Right — bag + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/my-tickets"
              className="relative p-2 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-amber-950" />
              {totalTickets > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-950 text-white text-xs font-syne font-bold rounded-full flex items-center justify-center">
                  {totalTickets > 99 ? "99+" : totalTickets}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg hover:bg-amber-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.type === "anchor" ? (
                <NavLink
                  key={link.to}
                  href={link.to}
                  onClick={(e) => handleAnchorClick(e, link.to)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium font-dm text-amber-900 hover:bg-amber-950 hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </NavLink>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium font-dm transition-colors ${
                      isActive
                        ? "bg-amber-950 text-white font-bold"
                        : "text-amber-900 hover:bg-amber-950 hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
