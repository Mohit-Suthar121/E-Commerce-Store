import React, { useState, useEffect } from 'react';

const OrderDetailsDrawer = ({
  isOpen = true,
  onClose = () => {},
  order = {
    _id: "6a76e05f962a3149dfae4cce",
    createdAt: "2026-08-08T10:30:00.000Z",
    orderStatus: "Processing",
    subtotal: 42116,
    totalGst: 6424.47,
    shippingCost: 0,
    totalAmount: 42116,
    paymentInfo: {
      status: "paid", // Schema enum: ["pending", "paid", "failed"]
      razorpayOrderId: "order_N1x89asdf234",
      razorpayPaymentId: "pay_P2z99qwerty123",
      razorpaySignature: "c7b8e...",
      paidAt: "2026-08-08T10:32:15.000Z",
    },
    shippingAddress: {
      name: "Mohit Suthar",
      phoneNo: "9785648900",
      email: "mohitsuthar7665@gmail.com",
      street: "Naya Baas, Kaalo Ki Dhaani",
      city: "Kolkata",
      state: "West Bengal",
      zipCode: "700001",
    },
    orderedItems: [
      {
        _id: "item_1",
        product: "64a76e05f962a3149dfae4c1",
        name: "Cyberpunk Mechanical Keyboard - RGB Edition",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80",
        price: 22000,
        quantity: 1,
        gstRate: 18,
        gstAmount: 3355.93,
      },
      {
        _id: "item_2",
        product: "64a76e05f962a3149dfae4c2",
        name: "Wireless ANC Gaming Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
        price: 20116,
        quantity: 1,
        gstRate: 18,
        gstAmount: 3068.54,
      },
    ],
  },
}) => {
  const [selectedStatus, setSelectedStatus] = useState(order?.orderStatus || "Processing");

  useEffect(() => {
    if (order?.orderStatus) {
      setSelectedStatus(order.orderStatus);
    }
  }, [order?.orderStatus]);

  if (!isOpen || !order) return null;

  const paymentStatus = order.paymentInfo?.status?.toLowerCase() || "pending";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-[#0a0a0a] border-l border-neutral-800/80 text-gray-100 flex flex-col shadow-2xl">
          
          {/* Top Header */}
          <div className="p-6 border-b border-neutral-800/80 flex items-center justify-between bg-[#0f0f0f]/50">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold tracking-tight text-white">Order Details</h2>
                
                {/* Payment Status Pill matching schema enum ["pending", "paid", "failed"] */}
                <span className={`px-2.5 py-0.5 rounded-md font-mono text-[11px] uppercase font-semibold border ${
                  paymentStatus === "paid"
                    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                    : paymentStatus === "pending"
                    ? "text-amber-400 bg-amber-500/10 border-amber-500/30"
                    : "text-rose-400 bg-rose-500/10 border-rose-500/30"
                }`}>
                  {paymentStatus}
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                ID: #{order._id}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            
            {/* 1. Fulfillment Controls */}
            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.03)] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Fulfillment Status
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-xs text-neutral-400 font-medium mb-1.5 block">Update orderStatus</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full bg-[#050505] border border-neutral-800 focus:border-emerald-500/50 rounded-xl px-3 py-2 text-xs text-neutral-200 outline-none transition-all cursor-pointer"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="self-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] active:scale-[0.98] cursor-pointer"
                  >
                    Save Status
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Customer & Shipping Address */}
            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-neutral-800/80 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Shipping Address
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <p className="text-sm font-semibold text-neutral-100">{order.shippingAddress?.name}</p>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">+91 {order.shippingAddress?.phoneNo}</p>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">{order.shippingAddress?.email}</p>
                </div>

                <div className="text-xs text-neutral-300 space-y-1 font-normal leading-relaxed border-t sm:border-t-0 sm:border-l border-neutral-900 pt-2 sm:pt-0 sm:pl-4">
                  <p>{order.shippingAddress?.street}</p>
                  <p>{order.shippingAddress?.city}{order.shippingAddress?.state ? `, ${order.shippingAddress.state}` : ''}</p>
                  <p className="font-mono text-emerald-400">{order.shippingAddress?.zipCode}</p>
                </div>
              </div>
            </div>

            {/* 3. Ordered Items */}
            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-neutral-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  Ordered Items ({order.orderedItems?.length || 0})
                </h3>
              </div>

              <div className="divide-y divide-neutral-900">
                {order.orderedItems?.map((item) => (
                  <div key={item._id || item.product} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-neutral-800 bg-neutral-950 shrink-0"
                      />
                      <div>
                        <p className="text-xs font-medium text-neutral-200 line-clamp-1">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-mono text-neutral-500">
                            ₹{item.price?.toLocaleString("en-IN")} × {item.quantity}
                          </span>
                          {item.gstRate > 0 && (
                            <span className="text-[10px] font-mono text-neutral-600 bg-neutral-900 px-1.5 py-0.5 rounded">
                              GST {item.gstRate}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xs font-mono font-semibold text-emerald-400">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                      {item.gstAmount > 0 && (
                        <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
                          GST: ₹{item.gstAmount?.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Payment Info (Razorpay Meta) */}
            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-neutral-800/80 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Payment Info (Razorpay)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#050505] p-2.5 rounded-xl border border-neutral-900">
                  <span className="text-[10px] text-neutral-500 block uppercase">Razorpay Order ID</span>
                  <span className="text-neutral-300 font-medium truncate block mt-0.5 select-all">
                    {order.paymentInfo?.razorpayOrderId}
                  </span>
                </div>

                <div className="bg-[#050505] p-2.5 rounded-xl border border-neutral-900">
                  <span className="text-[10px] text-neutral-500 block uppercase">Payment ID</span>
                  <span className="text-emerald-400 font-medium truncate block mt-0.5 select-all">
                    {order.paymentInfo?.razorpayPaymentId || "Pending"}
                  </span>
                </div>
              </div>
            </div>

            {/* 5. Pricing Breakdown */}
            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-neutral-800/80 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>₹{order.subtotal?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Total GST</span>
                <span>₹{order.totalGst?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Shipping Cost</span>
                <span>{order.shippingCost === 0 ? "FREE" : `₹${order.shippingCost}`}</span>
              </div>

              <div className="border-t border-neutral-800/80 pt-2.5 mt-2 flex justify-between text-sm font-bold text-white">
                <span>Total Amount</span>
                <span className="text-emerald-400 text-base">
                  ₹{order.totalAmount?.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

          </div>

          {/* Footer Close Button */}
          <div className="p-4 border-t border-neutral-800/80 bg-[#0f0f0f]/50 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium rounded-xl transition-all cursor-pointer"
            >
              Close Drawer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetailsDrawer;