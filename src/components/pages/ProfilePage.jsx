import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  MessageCircle,
  Clock,
  TrendingUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Layout from "../Layout";

// 임시 데이터
const userData = {
  name: "김서연",
  profileImage: "/loop-front/profile.png",
  shortBio: "여행을 좋아하는 개발자, 사람들과 연결되는 걸 좋아합니다.",
  tags: [
    { name: "React", color: "#E8F5FF" },
    { name: "TypeScript", color: "#EBF8FF" },
    { name: "프론트엔드", color: "#E6F7F4" },
    { name: "UI/UX", color: "#F0FFF4" },
    { name: "여행", color: "#FFF5F5" },
    { name: "독서", color: "#F7FAFC" },
  ],
  introduction: `안녕하세요, 저는 3년차 프론트엔드 개발자입니다. 새로운 도전을 좋아하며, 사람들과 연결되는 경험을 즐깁니다. 
  React와 TypeScript를 주로 사용하며, 유지보수 가능한 코드를 작성하는 데 초점을 맞춥니다.
  평소 여행과 독서를 즐기며, 다양한 경험을 통해 시야를 넓히고 있습니다.`,
  skills: [
    {
      id: 1,
      name: "React 개발 멘토링",
      price: 15000,
      description:
        "리액트 기초부터 실전까지, 프로젝트 경험을 바탕으로 진행하는 1:1 멘토링입니다.",
      rating: 4.9,
      reviewCount: 8,
      successRate: 95,
      responseRate: 98,
      popularTimes: ["주말 오전", "평일 저녁"],
      availability: [
        { day: "월-금", time: "19:00-22:00" },
        { day: "주말", time: "10:00-18:00" },
      ],
    },
    {
      id: 2,
      name: "UI/UX 디자인 리뷰",
      price: 20000,
      description: "사용자 경험을 고려한 UI/UX 디자인 피드백을 제공합니다.",
      rating: 4.7,
      reviewCount: 5,
      successRate: 90,
      responseRate: 95,
      popularTimes: ["평일 오후"],
      availability: [{ day: "월-금", time: "13:00-18:00" }],
    },
    {
      id: 3,
      name: "TypeScript 프로젝트 리뷰",
      price: 18000,
      description:
        "타입스크립트 프로젝트의 구조와 코드를 리뷰하고 개선점을 제안해드립니다.",
      rating: 4.8,
      reviewCount: 6,
      successRate: 92,
      responseRate: 96,
      popularTimes: ["평일 오전", "주말 저녁"],
      availability: [
        { day: "월-금", time: "10:00-13:00" },
        { day: "주말", time: "18:00-22:00" },
      ],
    },
    {
      id: 4,
      name: "포트폴리오 웹사이트 제작",
      price: 25000,
      description:
        "개발자를 위한 맞춤형 포트폴리오 웹사이트를 제작해드립니다. React와 Next.js 사용.",
      rating: 5.0,
      reviewCount: 4,
      successRate: 100,
      responseRate: 97,
      popularTimes: ["주말"],
      availability: [{ day: "주말", time: "13:00-20:00" }],
    },
    {
      id: 5,
      name: "Figma 사용법 강의",
      price: 16000,
      description:
        "Figma를 활용한 UI/UX 디자인 기초부터 프로토타이핑까지 알려드립니다.",
      rating: 4.7,
      reviewCount: 7,
      successRate: 93,
      responseRate: 94,
      popularTimes: ["평일 저녁", "주말 오후"],
      availability: [
        { day: "월-금", time: "19:00-22:00" },
        { day: "주말", time: "14:00-18:00" },
      ],
    },
  ],
  stats: {
    totalDeals: 45,
    successRate: 92,
    responseRate: 97,
    averageResponseTime: "30분 이내",
  },
  rating: 4.8,
  reviewCount: 15,
  recentActivities: [
    {
      id: 1,
      type: "deal",
      content: "React 개발 멘토링 진행",
      date: "2024.01.12",
    },
    {
      id: 2,
      type: "review",
      content: "새로운 리뷰를 받았습니다",
      date: "2024.01.10",
    },
    {
      id: 3,
      type: "skill",
      content: "새로운 스킬을 등록했습니다",
      date: "2024.01.08",
    },
  ],
  reviews: [
    {
      id: 1,
      author: "이민준",
      authorImage: "/api/placeholder/40/40",
      content: "정말 유익한 수업이었어요! 친절하고 상세히 설명해주셨습니다.",
      rating: 5,
      date: "2024.01.05",
    },
    {
      id: 2,
      author: "박지훈",
      authorImage: "/api/placeholder/40/40",
      content: "시간 약속을 잘 지키고 유익한 수업이었습니다.",
      rating: 4,
      date: "2024.01.03",
    },
  ],
};

// 별점을 표시하는 컴포넌트
const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= Math.round(rating)
              ? "text-[#00d4b3] fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

// 통계 차트 컴포넌트
const StatsChart = ({ data }) => {
  return (
    <div className="h-[100px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[
              { name: "Success", value: data.successRate },
              { name: "Rest", value: 100 - data.successRate },
            ]}
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={40}
            startAngle={90}
            endAngle={-270}
          >
            <Cell fill="#00d4b3" />
            <Cell fill="#e6f7f4" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  // ProfilePage 컴포넌트 내부에 상태 추가
  const [currentSkillPage, setCurrentSkillPage] = React.useState(1);
  const PAGE_SIZE = 2; // 한 페이지당 보여줄 스킬 수

  // 페이지네이션 계산
  const totalSkillPages = Math.ceil(userData.skills.length / PAGE_SIZE);
  const currentSkills = userData.skills.slice(
    (currentSkillPage - 1) * PAGE_SIZE,
    currentSkillPage * PAGE_SIZE
  );

  return (
    <Layout>
      <div className="min-h-screen pt-4 pb-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          {/* 상단 프로필 섹션 */}
          <div className="bg-gradient-to-b from-[#e6f7f4] to-white rounded-lg shadow-sm px-6 pt-12 pb-8 text-center relative overflow-hidden">
            {/* 물결 패턴 배경 */}
            <div className="absolute inset-0 opacity-50">
              <svg width="100%" height="100%" className="absolute inset-0">
                <pattern
                  id="wave"
                  x="0"
                  y="0"
                  width="100"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10"
                    stroke="#00d4b3"
                    strokeWidth="1"
                    fill="none"
                    className="opacity-10"
                  />
                </pattern>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#wave)"
                />
              </svg>
            </div>

            {/* 프로필 내용 */}
            <div className="relative">
              <div className="mb-6">
                <img
                  src={userData.profileImage}
                  alt={userData.name}
                  className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-md"
                />
                <div className="absolute top-0 right-0 bg-[#00d4b3] text-white px-3 py-1 rounded-full text-sm font-medium">
                  <span className="mr-1">✨</span>
                  빠른 응답
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
              <div className="flex items-center justify-center gap-2 mb-3">
                <RatingStars rating={userData.rating} />
                <span className="font-medium">{userData.rating}</span>
                <span className="text-gray-500">
                  ({userData.reviewCount} 리뷰)
                </span>
              </div>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                {userData.shortBio}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {userData.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="px-3 py-1 text-sm rounded-full transition-all hover:transform hover:scale-105"
                    style={{
                      backgroundColor: tag.color,
                      color: "#00b298",
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* 자기소개 섹션 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-lg font-bold mb-4">자기소개</h2>
            <p className="text-gray-600 whitespace-pre-line">
              {userData.introduction}
            </p>
          </div>
          {/* 스킬 및 통계 섹션 */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {/* 주요 통계 */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold mb-4">활동 통계</h3>
                <div className="space-y-4">
                  <div>
                    <StatsChart data={userData.stats} />
                    <div className="text-center mt-2">
                      <div className="text-2xl font-bold text-[#00d4b3]">
                        {userData.stats.successRate}%
                      </div>
                      <div className="text-sm text-gray-500">거래 성공률</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">총 거래 수</span>
                      <span className="font-medium">
                        {userData.stats.totalDeals}건
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">응답률</span>
                      <span className="font-medium">
                        {userData.stats.responseRate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">평균 응답 시간</span>
                      <span className="font-medium">
                        {userData.stats.averageResponseTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 최근 활동 */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold mb-4">최근 활동</h3>
                <div className="space-y-4">
                  {userData.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#00d4b3] mt-2" />
                      <div>
                        <div className="text-sm">{activity.content}</div>
                        <div className="text-xs text-gray-500">
                          {activity.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 스킬 목록 */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">보유 스킬</h2>
                {totalSkillPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentSkillPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentSkillPage === 1}
                      className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-600">
                      {currentSkillPage} / {totalSkillPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentSkillPage((prev) =>
                          Math.min(totalSkillPages, prev + 1)
                        )
                      }
                      disabled={currentSkillPage === totalSkillPages}
                      className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {currentSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{skill.name}</h3>
                        {skill.responseRate >= 95 && (
                          <span className="px-2 py-0.5 bg-[#e6f7f4] text-[#00d4b3] text-xs rounded-full">
                            빠른 응답
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {skill.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <RatingStars rating={skill.rating} />
                          <span className="font-medium">{skill.rating}</span>
                        </div>
                        <span className="text-gray-500">
                          ({skill.reviewCount} 리뷰)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#00d4b3] font-medium mb-2">
                        {skill.price.toLocaleString()} T.T
                        <span className="text-gray-500 font-normal">/시간</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        성공률 {skill.successRate}%
                      </div>
                    </div>
                  </div>

                  {/* 예약 가능 시간 */}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <div className="text-sm font-medium mb-2">
                          예약 가능 시간
                        </div>
                        <div className="space-y-1">
                          {skill.availability.map((time, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>{time.day}</span>
                              <span>{time.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">
                          인기 시간대
                        </div>
                        <div className="space-y-1">
                          {skill.popularTimes.map((time, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 text-sm text-[#00d4b3]"
                            >
                              <TrendingUp className="w-4 h-4" />
                              <span>{time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 리뷰 섹션 */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">받은 리뷰</h2>
              <button
                onClick={() => navigate("/reviews")}
                className="text-[#00d4b3] hover:text-[#00b298] transition-colors flex items-center gap-1"
              >
                전체보기
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {userData.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.authorImage}
                        alt={review.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{review.author}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <RatingStars rating={review.rating} />
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 메시지 보내기 버튼 (플로팅) */}
          <button
            className="fixed right-6 bottom-6 bg-[#00d4b3] text-white rounded-full shadow-lg hover:bg-[#00b298] hover:scale-105 transition-all p-4"
            style={{
              boxShadow: "0 4px 20px rgba(0, 212, 179, 0.3)",
            }}
          >
            <MessageCircle className="w-6 h-6" />
          </button>

          {/* 모바일 하단 여백 */}
          <div className="h-20" />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
