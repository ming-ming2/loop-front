import React from "react";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="url(#circleGradient)"
          opacity="0.1"
        />

        {/* Infinity Symbol */}
        <path
          d="M15 25C15 21.7 17.7 19 21 19C24.3 19 27 21.7 27 25C27 28.3 24.3 31 21 31C17.7 31 15 28.3 15 25Z"
          stroke="#4A90E2"
          strokeWidth="3"
          fill="none"
        >
          <animate
            attributeName="d"
            values="
              M15 25C15 21.7 17.7 19 21 19C24.3 19 27 21.7 27 25C27 28.3 24.3 31 21 31C17.7 31 15 28.3 15 25Z;
              M16 25C16 22.2 18.2 20 21 20C23.8 20 26 22.2 26 25C26 27.8 23.8 30 21 30C18.2 30 16 27.8 16 25Z;
              M15 25C15 21.7 17.7 19 21 19C24.3 19 27 21.7 27 25C27 28.3 24.3 31 21 31C17.7 31 15 28.3 15 25Z"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M35 25C35 21.7 32.3 19 29 19C25.7 19 23 21.7 23 25C23 28.3 25.7 31 29 31C32.3 31 35 28.3 35 25Z"
          stroke="#48E7B7"
          strokeWidth="3"
          fill="none"
        >
          <animate
            attributeName="d"
            values="
              M35 25C35 21.7 32.3 19 29 19C25.7 19 23 21.7 23 25C23 28.3 25.7 31 29 31C32.3 31 35 28.3 35 25Z;
              M34 25C34 22.2 31.8 20 29 20C26.2 20 24 22.2 24 25C24 27.8 26.2 30 29 30C31.8 30 34 27.8 34 25Z;
              M35 25C35 21.7 32.3 19 29 19C25.7 19 23 21.7 23 25C23 28.3 25.7 31 29 31C32.3 31 35 28.3 35 25Z"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>

        {/* Clock Hand */}
        <line
          x1="25"
          y1="25"
          x2="25"
          y2="15"
          stroke="#4A90E2"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="4s"
            repeatCount="indefinite"
          />
        </line>

        <defs>
          <linearGradient id="circleGradient" x1="5" y1="5" x2="45" y2="45">
            <stop stopColor="#4A90E2" />
            <stop offset="1" stopColor="#48E7B7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col relative">
        <div className="relative">
          <span
            className="absolute text-3xl font-black opacity-10 blur-[1px]"
            style={{
              fontFamily: "SUITE, sans-serif",
              transform: "translate(-2px, -2px)",
              background: "linear-gradient(to right, #4568DC, #B06AB3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            스와핑
          </span>
          <span
            className="text-3xl font-black relative"
            style={{
              fontFamily: "SUITE, sans-serif",
              background: "linear-gradient(to right, #4A90E2, #48E7B7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            스와핑
          </span>
        </div>
        <span
          className="text-sm font-medium text-gray-500 ml-1 tracking-wide"
          style={{
            fontFamily: "SUITE, sans-serif",
          }}
        >
          Share time, Add value
        </span>
      </div>
    </div>
  );
}

export default Logo;
