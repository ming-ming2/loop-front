import React, { createContext, useContext, useState } from "react";

const TabsContext = createContext({});

export const Tabs = ({ defaultValue, children, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className = "" }) => {
  return (
    <div className={`flex border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors
        ${
          activeTab === value
            ? "border-green-500 text-green-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }) => {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== value) return null;

  return <div className="py-4">{children}</div>;
};
