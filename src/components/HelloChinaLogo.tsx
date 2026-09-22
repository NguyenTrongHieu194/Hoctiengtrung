import React from "react";

interface LogoProps {
  size?: number | string;
  className?: string;
  variant?: "icon" | "horizontal" | "vertical" | "badge" | "app-icon-square";
  showSlogan?: boolean;
}

/**
 * High-definition Vector Graphic for Hello China Icon
 * Features:
 * - Speech bubble with #2563EB -> #F97316 vibrant gradient
 * - Stylized "中" character with a joyful friendly smile
 * - 3 energy accent rays in royal blue
 */
export const HelloChinaAppIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = ""
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        {/* Main Brand Gradient: Deep Blue to Vibrant Orange */}
        <linearGradient id="hcBrandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="45%" stopColor="#3B82F6" />
          <stop offset="85%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        <linearGradient id="hcChinaTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="60%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>

        {/* Soft shadow filter */}
        <filter id="hcDropShadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2563EB" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* 3 Radiating Energy Accents on Top Right */}
      <g>
        {/* Top spark ray */}
        <path
          d="M 94 16 L 98 8"
          stroke="#2563EB"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Middle spark ray */}
        <path
          d="M 104 26 L 112 21"
          stroke="#2563EB"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Bottom spark ray */}
        <path
          d="M 107 38 L 116 39"
          stroke="#3B82F6"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>

      {/* Main Speech Bubble Shape */}
      <path
        d="M 54 18 
           C 76.5 18, 95 35.5, 95 57 
           C 95 78.5, 76.5 96, 54 96 
           C 47.5 96, 41.5 94.5, 36 91.8
           C 27.5 97.5, 18 97, 18 97
           C 22.5 90.5, 23 85, 21.5 81
           C 16 74.5, 13 66, 13 57
           C 13 35.5, 31.5 18, 54 18 Z"
        fill="url(#hcBrandGradient)"
        filter="url(#hcDropShadow)"
      />

      {/* Inner Stylized "中" Character with Smile */}
      <g transform="translate(54, 57)">
        {/* Central Vertical Stroke (Sổ) of "中" */}
        <rect
          x="-4.5"
          y="-24"
          width="9"
          height="48"
          rx="4.5"
          fill="#FFFFFF"
        />

        {/* Outer Rectangular Box of "中" */}
        <rect
          x="-24"
          y="-16"
          width="48"
          height="24"
          rx="7"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinejoin="round"
        />

        {/* Friendly Joyful Smile Arc below the box */}
        <path
          d="M -11 13 Q 0 24 11 13"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
};

/**
 * Square App Icon variant with squircle background container
 */
export const HelloChinaSquareAppIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = ""
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-3xl bg-white shadow-xl shadow-blue-500/10 border-2 border-slate-100 flex items-center justify-center p-1 relative overflow-hidden shrink-0 ${className}`}
    >
      <HelloChinaAppIcon size={typeof size === "number" ? size * 0.85 : 54} />
    </div>
  );
};

/**
 * Horizontal Full Brand Logo with Wordmark & Slogan
 */
export const HelloChinaHorizontalLogo: React.FC<{
  iconSize?: number;
  showSlogan?: boolean;
  className?: string;
}> = ({
  iconSize = 42,
  showSlogan = true,
  className = ""
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <HelloChinaAppIcon size={iconSize} />
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-baseline tracking-tight font-black leading-none">
          <span className="text-slate-900 text-xl sm:text-2xl font-black">Hello&nbsp;</span>
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent text-xl sm:text-2xl font-black">
            China
          </span>
        </div>
        {showSlogan && (
          <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-tight mt-1 whitespace-nowrap">
            Học tiếng Trung – Hiểu văn hóa – <span className="font-bold text-orange-600">Kết nối tương lai</span>
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Brand Slogan Highlight Banner
 */
export const HelloChinaSloganBanner: React.FC<{ className?: string }> = ({
  className = ""
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-orange-50/90 border border-orange-200/80 shadow-xs ${className}`}
    >
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-orange-500 text-white text-xs shadow-xs">
        ✨
      </span>
      <p className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">
        Học tiếng Trung – Hiểu văn hóa –{" "}
        <span className="font-extrabold text-orange-600">Kết nối tương lai</span>
      </p>
    </div>
  );
};

export const HelloChinaLogo: React.FC<LogoProps> = ({
  size = 48,
  className = "",
  variant = "horizontal",
  showSlogan = true
}) => {
  if (variant === "icon") {
    return <HelloChinaAppIcon size={typeof size === "number" ? size : 48} className={className} />;
  }

  if (variant === "app-icon-square") {
    return <HelloChinaSquareAppIcon size={typeof size === "number" ? size : 64} className={className} />;
  }

  return (
    <HelloChinaHorizontalLogo
      iconSize={typeof size === "number" ? size : 42}
      showSlogan={showSlogan}
      className={className}
    />
  );
};
