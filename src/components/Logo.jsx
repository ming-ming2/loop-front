import React from "react";

function Logo({ light, scale = 150 }) {
  return (
    <img
      src="/loop-front/Logo.png"
      alt="루프 - Share time, Add value"
      style={{ height: `${scale / 2}px` }} // className 대신 style 사용
      className="w-auto"
    />
  );
}

export default Logo;
