import { QRCode } from "react-qr-code";

export default function QRCodeDisplay({ booking, size = 128 }) {
  // Pack all key info into the QR value
  const value = [
    booking.reference,
    booking.eventName,
    booking.eventDate,
    booking.attendeeName,
    booking.ticketType.toUpperCase(),
    booking.quantity,
  ].join("|");

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white border border-amber-900 rounded-2xl p-4 shadow-sm">
        <QRCode
          value={value}
          size={size}
          bgColor="#ffffff"
          fgColor="#301a02"
          level="M"
        />
      </div>
      <p className="font-dm text-xs text-amber-900 text-center">
        Present this QR code at the venue
      </p>
    </div>
  );
}
