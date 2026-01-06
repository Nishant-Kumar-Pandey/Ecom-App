import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";

import PaymentOptionsModal from "../components/PaymentOptionsModal";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user || {});
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const processRazorpayPayment = async (method, cardDetails) => {
    setPaymentModalOpen(false); // Close modal
    setLoading(true);

    const res = await loadRazorpay();

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      // Create Order on Backend
      const result = await axios.post(`${API_URL}/payment/create-order`, {
        amount: totalAmount,
      });

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_HERE", // Fallback if env not set
        amount: amount.toString(),
        currency: currency,
        name: "ShopHub Premium",
        description: "Transaction for Order",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verifyRes = await axios.post(`${API_URL}/payment/verify-payment`, data);
            if (verifyRes.data.message === "Payment verified successfully") {
              dispatch(clearCart());
              toast.success("Payment Successful! Order Placed.");
              navigate("/");
            }
          } catch (error) {
            console.error(error);
            toast.error("Payment Verification Failed!");
          }
        },
        prefill: {
          name: user?.name || "Premium User",
          email: user?.email || "user@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Premium Address",
        },
        theme: {
          color: "#4f46e5", // Indigo-600
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Something went wrong with payment!");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (paymentMethod === "cod") {
      setLoading(true);
      dispatch(clearCart());
      toast.success("Order Placed Successfully!");
      navigate("/");
      setLoading(false);
      return;
    }

    if (paymentMethod === "card") {
      // Open the modal instead of going directly to Razorpay
      setPaymentModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Payment Options Modal */}
      <PaymentOptionsModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onPaymentComplete={processRazorpayPayment}
        user={user}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16 px-4">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">Checkout Flow</h1>
          <span className="h-2 w-2 rounded-full bg-indigo-600 mt-4"></span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
          {/* Billing Details */}
          <div className="flex-1 glass p-10 rounded-[3.5rem] shadow-indigo-premium animate-in delay-1">
            <h2 className="text-3xl font-black text-gray-950 dark:text-white mb-10 flex items-center gap-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              Delivery Intelligence
            </h2>

            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">First Identity</label>
                  <input type="text" required className="input-premium w-full py-4 px-6 text-sm font-bold text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-700" placeholder="John" />
                </div>
                <div className="group">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">Last Identity</label>
                  <input type="text" required className="input-premium w-full py-4 px-6 text-sm font-bold text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-700" placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">Digital Mail</label>
                  <input type="email" required className="input-premium w-full py-4 px-6 text-sm font-bold text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-700" placeholder="john.doe@premium.com" />
                </div>
                <div className="group">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">Contact Signal</label>
                  <input type="tel" required className="input-premium w-full py-4 px-6 text-sm font-bold text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-700" placeholder="+12 98765 43210" />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">Shipment Destination</label>
                <textarea required className="input-premium w-full py-4 px-6 text-sm font-bold text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-700 min-h-[120px]" rows="3" placeholder="Enter your premium location detail..."></textarea>
              </div>

              <div className="pt-6">
                <h2 className="text-2xl font-black text-gray-950 dark:text-white mb-8 flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  Payment Selection
                </h2>

                <div className="pt-6">
                  <h2 className="text-xl font-black text-gray-950 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                    Payment Method
                  </h2>

                  <div className="flex gap-6 overflow-x-auto pb-4">
                    {/* Card / UPI Option */}
                    <div
                      onClick={() => {
                        setPaymentMethod('card');
                        setPaymentModalOpen(true);
                      }}
                      className={`relative min-w-[280px] flex-1 p-8 rounded-[2rem] cursor-pointer transition-all duration-300 border-2 group ${paymentMethod === 'card' ? 'bg-[#0F172A] border-[#0F172A] dark:bg-indigo-900 dark:border-indigo-800 shadow-2xl scale-[1.02]' : 'bg-white dark:bg-gray-800 border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-xl'}`}
                    >
                      <div className="flex justify-between items-start mb-12">
                        <div className={`p-3 rounded-2xl ${paymentMethod === 'card' ? 'bg-white/10 text-yellow-400' : 'bg-orange-50 text-orange-500'}`}>
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                        </div>
                        {paymentMethod === 'card' && (
                          <span className="bg-[#10B981] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20">Fast</span>
                        )}
                      </div>

                      <div>
                        <h3 className={`text-xl font-black uppercase tracking-wider mb-1 ${paymentMethod === 'card' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>Cards / UPI</h3>
                        <p className={`text-xs font-bold ${paymentMethod === 'card' ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>Secure one-tap checkout</p>
                      </div>
                    </div>

                    {/* Net Banking Option */}
                    <div
                      onClick={() => setPaymentMethod('cod')}
                      className={`relative min-w-[280px] flex-1 p-8 rounded-[2rem] cursor-pointer transition-all duration-300 border-2 group ${paymentMethod === 'cod' ? 'bg-[#0F172A] border-[#0F172A] dark:bg-indigo-900 dark:border-indigo-800 shadow-2xl scale-[1.02]' : 'bg-white dark:bg-gray-800 border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-xl'}`}
                    >
                      <div className="flex justify-between items-start mb-12">
                        <div className={`p-3 rounded-2xl ${paymentMethod === 'cod' ? 'bg-white/10 text-blue-400' : 'bg-blue-50 text-blue-500'}`}>
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-xl font-black uppercase tracking-wider mb-1 ${paymentMethod === 'cod' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>Net Banking</h3>
                        <p className={`text-xs font-bold ${paymentMethod === 'cod' ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>Secure direct transfer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[450px] animate-in delay-2">
            <div className="glass p-10 rounded-[3.5rem] shadow-indigo-premium">
              <h2 className="text-3xl font-black text-gray-950 dark:text-white mb-10 tracking-tight">Order Insight</h2>

              <ul className="space-y-8 mb-10 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-indigo-100">
                {cart.map((item) => (
                  <li key={item.id} className="flex gap-6 group">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xl">{item.quantity}</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-sm font-black text-gray-900 dark:text-white line-clamp-2 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                      <p className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-widest mt-1">₹{item.price} each</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-lg font-black text-gray-950 dark:text-white">₹{item.price * item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="space-y-6 pt-10 border-t border-gray-100/50 dark:border-gray-800">
                <div className="flex justify-between text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-gray-900 dark:text-white font-black">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  <span>Shipment</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-black">Free</span>
                </div>
                <div className="h-px bg-gray-100 dark:bg-gray-800 mt-6"></div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xl font-black text-gray-950 dark:text-white tracking-tight">Total Payment</span>
                  <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">₹{totalAmount}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className={`w-full mt-12 flex justify-center items-center gap-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white py-6 rounded-[2rem] font-black text-xl btn-premium shadow-2xl-dark hover-lift ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {loading ? "Processing..." : (paymentMethod === 'cod' ? "Place Final Order" : "Pay Now with Razorpay")}
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </button>

              <p className="text-[10px] text-center font-bold text-gray-400 mt-8 uppercase tracking-[0.2em] leading-relaxed">
                Protected by 256-bit <br /> military grade encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;