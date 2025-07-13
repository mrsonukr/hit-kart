import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { validateImageUrl } from "../../utils/securityUtils";

const ProductCard = ({
  href,
  image,
  title,
  brand = "",
  discountPercent,
  oldPrice,
  newPrice,
  badgeText,
  rating = 0,
  deliveryText,
  assuredImg = "/assets/images/svg/assured_new.png",
}) => {
  // More authentic badge styling based on content
  const getBadgeStyle = (text) => {
    if (!text) return "";
    
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("top discount") || lowerText.includes("lowest price") || lowerText.includes("steal")) {
      return "text-[#26a541] bg-[rgba(38,165,65,0.084)] text-[11px] font-medium px-[6px] py-[3px] rounded-sm";
    }
    if (lowerText.includes("left") || lowerText.includes("few")) {
      return "text-[#ae001d] bg-transparent text-[11px] font-normal px-0 py-0";
    }
    if (lowerText.includes("bank") || lowerText.includes("offer")) {
      return "text-[#26a541] bg-[rgba(38,165,65,0.084)] text-[11px] font-medium px-[6px] py-[3px] rounded-sm";
    }
    if (lowerText.includes("hot") || lowerText.includes("deal") || lowerText.includes("limited")) {
      return "text-[#26a541] bg-[rgba(38,165,65,0.084)] text-[11px] font-medium px-[6px] py-[3px] rounded-sm";
    }
    if (lowerText.includes("new") || lowerText.includes("arrival")) {
      return "text-[#2874f0] bg-[rgba(40,116,240,0.084)] text-[11px] font-medium px-[6px] py-[3px] rounded-sm";
    }
    
    // Default green badge
    return "text-[#26a541] bg-[rgba(38,165,65,0.084)] text-[11px] font-medium px-[6px] py-[3px] rounded-sm";
  };

  return (
    <Link
      to={href}
      className="flex flex-col relative box-border border-b border-r border-gray-200 bg-white"
    >
      <div className="relative p-2 h-[200px] bg-white w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-contain"
          onError={(e) => {
            console.log('Image failed to load:', image);
          }}
        />
        <div className="absolute top-3 right-3 flex justify-center items-center">
          <svg width="24" height="24" viewBox="0 0 256 256">
            <path fill="none" d="M0 0h256v256H0z" />
            <path
              d="M128 216S28 160 28 92a52 52 0 0 1 100-20h0a52 52 0 0 1 100 20c0 68-100 124-100 124Z"
              fill="#fff"
              stroke="#B8BBBF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
            />
          </svg>
        </div>
      </div>

      <div className="w-full px-3 py-2">
        <h2 className="font-semibold text-sm min-h-[20px] text-black">
          {brand || <span>&nbsp;</span>}
        </h2>

        <h3 className="text-xs leading-[18px] font-normal text-gray-500 line-clamp-2 text-left">
          {title}
        </h3>

        <div className="flex items-center my-1 text-[14px] font-semibold leading-tight">
          <span className="text-green-500 mr-2 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              className="-ml-1"
            >
              <path
                fill="currentColor"
                d="M11 4.5v11.586l-4.5-4.5L5.086 13L12 19.914L18.914 13L17.5 11.586l-4.5 4.5V4.5z"
              />
            </svg>
            <span className="-ml-1">{discountPercent}</span>
          </span>
          <span className="text-gray-500 line-through mr-2">{oldPrice}</span>
          <span className="text-gray-800 font-semibold">{newPrice}</span>
        </div>

        {badgeText && (
          <div className={`inline-block mb-2 ${getBadgeStyle(badgeText)}`}>
            {badgeText}
          </div>
        )}

        <div className="flex justify-between items-center pt-1 pb-1">
          <div className="flex text-lg space-x-[2px]">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < rating ? "text-green-600" : "text-gray-300"}
              />
            ))}
          </div>
          <img className="h-4" src={assuredImg} alt="assured" />
        </div>

        <div className="text-xs font-medium py-1 rounded">{deliveryText}</div>
      </div>
    </Link>
  );
};

export default ProductCard;