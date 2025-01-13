import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { DashboardCard } from "./DashboardCard";

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-600",
    accepted: "bg-mint-100 text-mint-600",
    completed: "bg-gray-100 text-gray-600",
  };

  const labels = {
    pending: "요청 중",
    accepted: "진행 중",
    completed: "완료",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

const TransactionsSection = ({ transactions }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="lg:col-span-2">
      <DashboardCard title="진행 중인 거래">
        <div className="flex space-x-4 mb-6">
          {["all", "pending", "accepted", "completed"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeFilter === filter
                  ? "bg-mint-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter === "all"
                ? "전체"
                : filter === "pending"
                ? "요청 중"
                : filter === "accepted"
                ? "진행 중"
                : "완료"}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {transactions
            .filter((t) => activeFilter === "all" || t.status === activeFilter)
            .map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-mint-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-2">
                    <StatusBadge status={transaction.status} />
                    <h3 className="font-bold">{transaction.title}</h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    {transaction.status === "pending" && (
                      <button className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:opacity-90">
                        수락하기
                      </button>
                    )}
                    {transaction.status === "accepted" && (
                      <button className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:opacity-90">
                        완료하기
                      </button>
                    )}
                    <button className="text-gray-400 hover:text-gray-600">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <img
                      src={transaction.partnerImage}
                      alt={transaction.partner}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{transaction.partner}</span>
                  </div>
                  <div className="flex space-x-4">
                    <span>요청일: {transaction.requestDate}</span>
                    <span>마감일: {transaction.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </DashboardCard>
    </div>
  );
};

export default TransactionsSection;
