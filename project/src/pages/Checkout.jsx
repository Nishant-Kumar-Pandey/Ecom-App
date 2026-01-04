import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    alert("Order Placed Successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-24 px-4 sm:px-6 lg:px-8 animate-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16 px-4">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Checkout Flow</h1>
          <span className="h-2 w-2 rounded-full bg-indigo-600 mt-4"></span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
          {/* Billing Details */}
          <div className="flex-1 glass p-10 rounded-[3.5rem] shadow-2xl-indigo border border-white/40 animate-in delay-1">
            <h2 className="text-3xl font-black text-gray-950 mb-10 flex items-center gap-4">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              Delivery Intelligence
            </h2>

            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 transition-colors">First Identity</label>
                  <input type="text" required className="input-premium w-full py-4 px-6 text-sm font-bold text-gray-800" placeholder="John" />
                </div>
                <div className="group">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 transition-colors">Last Identity</label>
                  <input type="text" required className="input-premium w-full py-4 px-6 text-sm font-bold text-gray-800" placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 transition-colors">Digital Mail</label>
                  <input type="email" required className="input-premium w-full py-4 px-6 text-sm font-bold text-gray-800" placeholder="john.doe@premium.com" />
                </div>
                <div className="group">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 transition-colors">Contact Signal</label>
                  <input type="tel" required className="input-premium w-full py-4 px-6 text-sm font-bold text-gray-800" placeholder="+12 98765 43210" />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 group-focus-within:text-indigo-600 transition-colors">Shipment Destination</label>
                <textarea required className="input-premium w-full py-4 px-6 text-sm font-bold text-gray-800 min-h-[120px]" rows="3" placeholder="Enter your premium location detail..."></textarea>
              </div>

              <div className="pt-6">
                <h2 className="text-2xl font-black text-gray-950 mb-8 flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  Payment Selection
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { id: "cod", label: "Cash on Delivery", icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" },
                    { id: "card", label: "Premium Credit Card", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" }
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`relative flex flex-col p-6 rounded-[2rem] cursor-pointer transition-all duration-300 border-2 ${paymentMethod === method.id ? "bg-gray-900 border-gray-900 text-white shadow-2xl scale-105" : "glass border-white/40 text-gray-500 hover:border-indigo-400 hover:text-indigo-600"}`}
                    >
                      <svg className={`w-8 h-8 mb-4 ${paymentMethod === method.id ? "text-indigo-400" : "text-gray-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={method.icon} /></svg>
                      <span className="text-sm font-black uppercase tracking-wider">{method.label}</span>
                      {paymentMethod === method.id && (
                        <div className="absolute top-4 right-4 text-indigo-400">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[450px] animate-in delay-2">
            <div className="glass p-10 rounded-[3.5rem] shadow-2xl-indigo border border-white/40 sticky top-32">
              <h2 className="text-3xl font-black text-gray-950 mb-10 tracking-tight">Order Insight</h2>

              <ul className="space-y-8 mb-10 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-indigo-100">
                {cart.map((item) => (
                  <li key={item.id} className="flex gap-6 group">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xl">{item.quantity}</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-sm font-black text-gray-900 line-clamp-2 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">₹{item.price} each</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-lg font-black text-gray-950">₹{item.price * item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="space-y-6 pt-10 border-t border-gray-100/50">
                <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-black">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-widest">
                  <span>Shipment</span>
                  <span className="text-indigo-600 font-black">Free</span>
                </div>
                <div className="h-px bg-gray-100 mt-6"></div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xl font-black text-gray-950 tracking-tight">Total Payment</span>
                  <span className="text-4xl font-black text-indigo-600 tracking-tighter">₹{totalAmount}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full mt-12 flex justify-center items-center gap-4 bg-gray-900 text-white py-6 rounded-[2rem] font-black text-xl btn-premium shadow-2xl-dark"
              >
                Place Final Order
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