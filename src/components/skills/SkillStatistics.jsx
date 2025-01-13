import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Trophy } from "lucide-react";

const mockData = {
  mySkills: [
    { name: "기타 레슨", requests: 5 },
    { name: "영어 회화", requests: 8 },
  ],
  topSkills: [
    { name: "영어 회화", requests: 50 },
    { name: "기타 레슨", requests: 30 },
    { name: "요가 클래스", requests: 25 },
  ],
};

const COLORS = ["#00D4B3", "#1A202C", "#4FD1C5", "#38B2AC"];

const TopSkillBadge = ({ rank, skill }) => {
  const colors = {
    0: "bg-yellow-50 text-yellow-600 border-yellow-200",
    1: "bg-gray-50 text-gray-600 border-gray-200",
    2: "bg-orange-50 text-orange-600 border-orange-200",
  };

  const trophyColors = {
    0: "text-yellow-500",
    1: "text-gray-400",
    2: "text-orange-500",
  };

  return (
    <div className={`flex items-center p-4 rounded-lg border ${colors[rank]}`}>
      <Trophy className={`w-5 h-5 mr-3 ${trophyColors[rank]}`} />
      <div className="flex-1">
        <div className="font-medium">{skill.name}</div>
        <div className="text-sm opacity-75">{skill.requests}회 요청</div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-gray-600">{payload[0].value}회 요청</p>
      </div>
    );
  }
  return null;
};

const SkillStatistics = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-8">스킬 인기 통계</h2>

      {/* My Skills Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">내 스킬의 인기</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockData.mySkills}
                dataKey="requests"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name} (${value}회)`}
              >
                {mockData.mySkills.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Skills */}
      <div>
        <h3 className="text-lg font-bold mb-4">플랫폼 전체 인기 스킬</h3>
        <div className="space-y-4">
          {mockData.topSkills.map((skill, index) => (
            <TopSkillBadge key={index} rank={index} skill={skill} />
          ))}
        </div>
        <p className="text-mint-600 font-medium mt-6">
          💡 현재 인기 있는 스킬을 추가 등록해보세요!
        </p>
      </div>
    </div>
  );
};

export default SkillStatistics;
