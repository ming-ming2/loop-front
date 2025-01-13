import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-light pt-32 px-4 pb-16">
      {" "}
      {/* pt-16을 pt-32로 변경 */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Form Section */}
            <div className="md:w-1/2 px-8 py-12 md:px-12">
              <h2 className="text-3xl font-bold mb-2">{title}</h2>
              <p className="text-gray-600 mb-8">{subtitle}</p>
              {children}
            </div>

            {/* Image Section */}
            <div className="hidden md:block md:w-1/2 bg-gradient-mint p-12">
              <div className="h-full flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    시간과 재능의 가치있는 교환
                  </h3>
                  <p className="mb-6">
                    스와핑에서 당신의 재능을 나누고,
                    <br />
                    새로운 가치를 만들어보세요.
                  </p>
                  <img
                    src="/api/placeholder/400/300"
                    alt="Time Exchange Illustration"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
