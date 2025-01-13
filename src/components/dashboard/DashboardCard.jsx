import React from "react";

export const DashboardCard = ({ title, children, className }) => (
  <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
    <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
    {children}
  </div>
);
