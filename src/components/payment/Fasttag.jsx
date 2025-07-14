// UPIPaymentOptions.jsx
import React, { useState, useEffect } from "react";
import { calculateCartTotals } from "../../utils/cartUtils";

const formatNumberWithCommas = (num) =>
  num.toLocaleString("en-IN", { maximumFractionDigits: 2 });

const upiId = "netc.RJ10CA3367@mairtel";
const payeeName = "NETC FASTag";

const UPIPaymentOptions = () => {
  const [selected, setSelected] = useState("upi");
  const [cartTotals, setCartTotals] = useState({
    finalAmount: 0,
  });

  useEffect(() => {
    updateCartTotals();

    const handleCartUpdate = () => {
      updateCartTotals();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const updateCartTotals = () => {
    const totals = calculateCartTotals();
    setCartTotals({ finalAmount: totals.finalAmount || 0 });
  };

  const generateLink = (scheme) => {
    const base = `${scheme}://pay?pa=${upiId}&pn=${encodeURIComponent(
      payeeName
    )}&cu=INR&am=${cartTotals.finalAmount}`;
    return base;
  };

  const paymentOptions = [
    {
      id: "phonePe",
      label: "PhonePe",
      img: "/assets/images/svg/phonepe.svg",
      scheme: "phonepe",
    },
    {
      id: "paytm",
      label: "Paytm",
      img: "/assets/images/svg/paytm-icon.svg",
      scheme: "paytmmp",
    },
    {
      id: "g-pay",
      label: "Google Pay",
      img: "/assets/images/svg/gpay.svg",
      scheme: "upi",
    },
    {
      id: "upi",
      label: "Other UPI Apps",
      img: "/assets/images/svg/upi-app.svg",
      scheme: "upi",
    },
  ];

  return (
    <div className="bg-gray-100 p-4 pb-0 border-y border-gray-200">
      <div className="z-10 bg-white rounded-lg mb-5 mx-auto">
        {paymentOptions.map(({ id, label, img, scheme }) => (
          <div key={id} className="border-b border-gray-200 last:border-b-0 py-2">
            <div
              className="flex items-center justify-between px-3 py-2 pr-4 cursor-pointer"
              onClick={() => setSelected(id)}
              role="radio"
              aria-checked={selected === id}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(id)}
            >
              <div className="flex items-center space-x-3 ml-4">
                <input
                  type="radio"
                  name="paymentOption"
                  id={id}
                  className="h-5 w-5 text-blue-600 accent-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={selected === id}
                  onChange={() => setSelected(id)}
                  aria-label={label}
                />
                <label htmlFor={id} className="text-sm font-medium text-gray-900">
                  {label}
                </label>
              </div>
              <img src={img} alt={`${label} Logo`} className="h-6 w-6" />
            </div>

            {selected === id && (
              <div className="ml-10 mb-2 pr-4">
                <button
                  className="w-full bg-yellow-400 mt-2 text-black font-semibold py-2 px-4 rounded text-sm"
                  onClick={() => (window.location.href = generateLink(scheme))}
                >
                  Pay ₹{formatNumberWithCommas(cartTotals.finalAmount)}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UPIPaymentOptions;
