import React from "react";
import { Edit, Plus, Coins } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { Link } from "react-router-dom";

const SkillsSection = ({ skills }) => {
  return (
    <div className="lg:col-span-2">
      <DashboardCard title="내 스킬">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {skills.map((skill, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{skill.name}</h3>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">{skill.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Coins className="w-4 h-4 mr-1" />
                {skill.hourlyRate.toLocaleString()}원/시간
              </div>
            </div>
          ))}
        </div>
        <Link to="/skills" className="w-full">
          <button className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-mint-500 hover:text-mint-500 transition-colors">
            <Plus className="w-5 h-5" />
            <span>새로운 스킬 추가하기</span>
          </button>
        </Link>
      </DashboardCard>
    </div>
  );
};

export default SkillsSection;
