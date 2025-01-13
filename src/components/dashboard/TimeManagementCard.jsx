import React from "react";
import { Clock, BarChart2 } from "lucide-react";
import { DashboardCard } from "./DashboardCard";

const TimeManagementCard = ({ timeBalance, totalAccumulated }) => {
  return (
    <DashboardCard title="내 시간 관리">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-mint-500" />
            <span className="text-2xl font-bold">{timeBalance}시간</span>
          </div>
          <p className="text-gray-500">총 적립: {totalAccumulated}시간</p>
        </div>
        <div className="w-24 h-24">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <BarChart2 className="w-8 h-8 text-mint-500" />
            </div>
          </div>
        </div>
      </div>
      <button className="w-full bg-gradient-mint text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
        시간 충전하기
      </button>
    </DashboardCard>
  );
};

export default TimeManagementCard;
