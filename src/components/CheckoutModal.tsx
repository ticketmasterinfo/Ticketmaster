import React, { useState, useEffect } from 'react';
import { X, Clock, ShieldCheck, CreditCard, CheckCircle2, Ticket, QrCode, Download, Calendar, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SelectedTicketBooking } from '../types';

interface CheckoutModalProps {
  booking: SelectedTicketBooking;
  onClose: () => void;
  onSuccessDone: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  booking,
  onClose,
  onSuccessDone,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(600); // 10:00 timer
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('Alex Rivera');
  const [email, setEmail] = useState('ticketmaster.fan@example.com');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [expiry, setExpiry] = useState('08/29');
  const [cvv, setCvv] = useState('742');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'paypal'>('card');

  // Countdown timer
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      // Trigger confetti celebration
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#024ddf', '#ffb932', '#00875a', '#d91b5c'],
      });
    }, 1200);
  };

  const confirmationNumber = `TP-${Math.floor(10000000 + Math.random() * 90000000)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white text-[#121212] w-full max-w-2xl rounded-xl shadow-2xl border border-[#bfbfbf] overflow-hidden">
        {/* Header */}
        <div className="bg-[#121212] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#024ddf]" />
            <span className="font-bold text-sm tracking-wide uppercase font-mono">
              Secure Ticketing Checkout
            </span>
          </div>

          {!isCompleted && (
            <div className="flex items-center gap-1.5 bg-[#262626] px-3 py-1 rounded-full text-xs font-mono text-[#ffb932] border border-[#333]">
              <Clock className="w-3.5 h-3.5" />
              <span>Tickets Reserved: {formatTimer(secondsRemaining)}</span>
            </div>
          )}

          <button
            onClick={onClose}
            className="p-1 text-[#a0a0a0] hover:text-white rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isCompleted ? (
          /* Checkout Step Form */
          <form onSubmit={handleCompleteOrder} className="p-6 space-y-6">
            {/* Event Summary Card */}
            <div className="bg-[#f6f6f6] rounded-lg p-4 border border-[#ebebeb] flex items-start gap-4">
              <img
                src={booking.event.image}
                alt={booking.event.title}
                className="w-20 h-20 rounded object-cover border border-[#ebebeb] shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="type-snowdon text-[#024ddf] font-bold">
                  {booking.event.category}
                </span>
                <h3 className="type-blanc text-[#121212] font-bold truncate">
                  {booking.event.title}
                </h3>
                <p className="text-xs text-[#646464] mt-0.5">{booking.event.dateInfo.fullDate}</p>
                <p className="text-xs text-[#646464]">{booking.event.venue}</p>

                <div className="mt-2 text-xs font-semibold text-[#121212] flex items-center gap-2">
                  <span className="bg-white px-2 py-0.5 rounded border border-[#bfbfbf]">
                    {booking.tier.name}
                  </span>
                  <span>Qty: {booking.quantity}</span>
                  <span className="ml-auto font-black text-sm text-[#024ddf]">
                    ${booking.grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <h4 className="type-etna font-bold text-[#121212] uppercase tracking-wider">
                1. Delivery & Contact Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#646464] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#bfbfbf] rounded text-sm focus:ring-2 focus:ring-[#024ddf] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#646464] mb-1">
                    Email (for instant e-ticket delivery)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-[#bfbfbf] rounded text-sm focus:ring-2 focus:ring-[#024ddf] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h4 className="type-etna font-bold text-[#121212] uppercase tracking-wider">
                2. Payment Method
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-3 rounded border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    paymentMethod === 'card'
                      ? 'bg-[#024ddf] text-white border-[#024ddf]'
                      : 'bg-white text-[#121212] border-[#bfbfbf] hover:bg-[#f6f6f6]'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`py-2 px-3 rounded border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    paymentMethod === 'applepay'
                      ? 'bg-[#121212] text-white border-[#121212]'
                      : 'bg-white text-[#121212] border-[#bfbfbf] hover:bg-[#f6f6f6]'
                  }`}
                >
                  <span> Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2 px-3 rounded border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    paymentMethod === 'paypal'
                      ? 'bg-[#003087] text-white border-[#003087]'
                      : 'bg-white text-[#121212] border-[#bfbfbf] hover:bg-[#f6f6f6]'
                  }`}
                >
                  <span>PayPal</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2 bg-[#fafafa] p-3 rounded-lg border border-[#ebebeb]">
                  <div>
                    <label className="block text-xs font-semibold text-[#646464] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-[#bfbfbf] rounded text-sm bg-white focus:ring-2 focus:ring-[#024ddf] focus:outline-none font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#646464] mb-1">
                        Expiration
                      </label>
                      <input
                        type="text"
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full px-3 py-2 border border-[#bfbfbf] rounded text-sm bg-white focus:ring-2 focus:ring-[#024ddf] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#646464] mb-1">
                        Security Code (CVV)
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full px-3 py-2 border border-[#bfbfbf] rounded text-sm bg-white focus:ring-2 focus:ring-[#024ddf] focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full type-fiji bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white py-4 rounded-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing Payment & Reserving Barcodes...</span>
                  </div>
                ) : (
                  <span>Place Order • ${booking.grandTotal.toFixed(2)}</span>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#646464]">
                <ShieldCheck className="w-4 h-4 text-[#00875a]" />
                <span>256-Bit SSL Encrypted • 100% Buyer Authentic Guarantee</span>
              </div>
            </div>
          </form>
        ) : (
          /* Order Confirmation Pass Screen */
          <div className="p-6 space-y-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 bg-[#00875a]/10 text-[#00875a] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="type-snowdon text-[#00875a] font-bold">
                Order Confirmed & Verified
              </span>
              <h3 className="type-everest text-[#121212] font-black mt-1">
                You&apos;re Going to the Show!
              </h3>
              <p className="type-etna text-[#646464] mt-1">
                Confirmation #{confirmationNumber} • Sent to {email}
              </p>
            </div>

            {/* Digital Ticket Pass Card */}
            <div className="bg-[#121212] text-white rounded-xl p-5 shadow-2xl border border-[#333] max-w-md mx-auto text-left relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-[#2e2e2e] pb-3">
                <div>
                  <span className="type-snowdon text-[#ffb932] font-bold">
                    Official Mobile Entry Pass
                  </span>
                  <h4 className="type-blanc font-bold text-white mt-1">
                    {booking.event.title}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#a0a0a0] block">SEATS</span>
                  <span className="font-mono font-bold text-sm text-[#024ddf] bg-[#024ddf]/20 px-2 py-0.5 rounded">
                    {booking.quantity} Pass{booking.quantity > 1 ? 'es' : ''}
                  </span>
                </div>
              </div>

              <div className="py-3 space-y-1 text-xs">
                <p className="text-[#e0e0e0] font-semibold">{booking.event.dateInfo.fullDate}</p>
                <p className="text-[#a0a0a0]">{booking.event.venue}</p>
                <p className="text-[#ffb932] font-mono font-bold pt-1">
                  Section: {booking.tier.name}
                </p>
              </div>

              {/* Animated QR Code & Scanner */}
              <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center my-2 text-center text-[#121212]">
                <div className="w-32 h-32 bg-[#121212] rounded p-2 flex items-center justify-center shadow-inner">
                  <QrCode className="w-28 h-28 text-white" />
                </div>
                <div className="mt-2 text-[10px] font-mono font-bold text-[#646464]">
                  BARCODE: {confirmationNumber}
                </div>
                <div className="text-[9px] text-[#00875a] font-bold mt-0.5 flex items-center gap-1">
                  <Smartphone className="w-3 h-3" /> Live NFC & Barcode Active
                </div>
              </div>
            </div>

            {/* Post-Purchase Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                type="button"
                onClick={() => alert(`Mobile ticket pass #${confirmationNumber} saved to Apple/Google Wallet!`)}
                className="flex-1 px-4 py-2.5 bg-[#121212] hover:bg-[#262626] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-4 h-4" /> Add to Apple Wallet
              </button>

              <button
                type="button"
                onClick={onSuccessDone}
                className="flex-1 px-4 py-2.5 bg-[#024ddf] hover:bg-[#0139a7] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                Back to Live Discovery
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
