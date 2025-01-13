import React from "react";
import {
  Star,
  TrendingUp,
  PlusCircle,
  Edit,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
const Dashboard = () => {
  const navigate = useNavigate();

  // 더미 데이터
  const userData = {
    name: "김서연",
    profileImage: "/api/placeholder/80/80",
    rating: 4.8,
    reviewCount: 15,
    tt: {
      current: 25000,
      total: 150000,
    },
    skills: [
      {
        id: 1,
        name: "기타 레슨",
        value: 15000,
        description: "10년 경력의 기타리스트가 진행하는 1:1 맞춤 레슨",
        popularity: 85,
      },
      {
        id: 2,
        name: "영어 회화",
        value: 20000,
        description: "원어민 수준의 영어 회화 수업",
        popularity: 92,
      },
    ],
    activeDeals: [
      {
        id: 1,
        title: "영어 회화 레슨 2시간",
        partner: {
          name: "이민준",
          profileImage: "/api/placeholder/40/40",
        },
        status: "progress",
        requestDate: "2025-01-10",
        dueDate: "2025-01-15",
      },
    ],
    completedDeals: [
      {
        id: 2,
        title: "기타 레슨 1시간",
        partner: {
          name: "박지훈",
          profileImage: "/api/placeholder/40/40",
        },
        completionDate: "2025-01-05",
        hasReview: true,
      },
    ],
    reviews: [
      {
        id: 1,
        author: "이민준",
        content: "유익한 수업이었어요!",
        rating: 5,
        date: "2025-01-05",
      },
      {
        id: 2,
        author: "박지훈",
        content: "친절하고 이해하기 쉽게 설명해주셨습니다.",
        rating: 4.5,
        date: "2025-01-03",
      },
    ],
    skillStats: {
      skillShare: [
        { name: "기타 레슨", value: 45 },
        { name: "영어 회화", value: 35 },
        { name: "기타", value: 20 },
      ],
      successRate: 85,
      totalDeals: 120,
      avgRating: 4.8,
    },
  };

  // 별점 렌더링 헬퍼 함수
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-[#00d4b3] fill-current" />
        <span className="font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen pt-8 pb-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          {/* 상단 요약 섹션 */}
          <div className="bg-[#e6f7f4] p-6 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* 프로필 요약 */}
              <div className="flex items-center gap-4">
                <img
                  src={userData.profileImage}
                  alt={userData.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-white"
                />
                <div>
                  <h1 className="text-xl font-bold mb-1 text-gray-900">
                    {userData.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    {renderStars(userData.rating)}
                    <span className="text-gray-600">
                      ({userData.reviewCount} 리뷰)
                    </span>
                  </div>
                </div>
              </div>

              {/* T.T 정보 */}
              <div className="flex-1 bg-white rounded-lg p-4 md:ml-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#00d4b3]">
                      {userData.tt.current.toLocaleString()} T.T
                    </h2>
                    <p className="text-sm text-gray-500">현재 보유</p>
                  </div>
                  <button
                    onClick={() => navigate("/charge")}
                    className="px-4 py-2 bg-[#00d4b3] text-white rounded-lg hover:bg-[#00b298] transition-colors"
                  >
                    충전하기
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    총 적립 {userData.tt.total.toLocaleString()} T.T
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* 스킬 정보 섹션 */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">보유 스킬</h2>
                  <button
                    onClick={() => navigate("/skills/new")}
                    className="flex items-center gap-1 text-[#00d4b3] hover:text-[#00b298] transition-colors"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>스킬 추가</span>
                  </button>
                </div>

                {userData.skills.length > 0 ? (
                  <div className="space-y-4">
                    {userData.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-4 border rounded-lg hover:border-[#00d4b3] transition-colors group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium mb-1">{skill.name}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {skill.description}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                navigate(`/skills/${skill.id}/edit`)
                              }
                              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  window.confirm("이 스킬을 삭제하시겠습니까?")
                                ) {
                                  console.log("스킬 삭제:", skill.id);
                                }
                              }}
                              className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#00d4b3] font-medium">
                            {skill.value.toLocaleString()} T.T / 시간
                          </span>
                          <span className="text-gray-500">
                            인기도 {skill.popularity}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">등록된 스킬이 없습니다</p>
                    <button
                      onClick={() => navigate("/skills/new")}
                      className="px-4 py-2 text-[#00d4b3] border border-[#00d4b3] rounded-lg hover:bg-[#00d4b3] hover:text-white transition-colors"
                    >
                      새 스킬 추가하기
                    </button>
                  </div>
                )}
              </div>

              {/* 스킬 통계 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold mb-6">스킬 통계</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* 원형 그래프 */}
                  <div className="h-64">
                    <p className="text-sm text-gray-500 mb-2">스킬 거래 비중</p>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userData.skillStats.skillShare}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {userData.skillStats.skillShare.map(
                            (entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  index === 0
                                    ? "#00d4b3"
                                    : index === 1
                                    ? "#00b298"
                                    : "#e6f7f4"
                                }
                              />
                            )
                          )}
                        </Pie>
                        <Tooltip
                          formatter={(value) => `${value}%`}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "none",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-4 mt-2">
                      {userData.skillStats.skillShare.map((item, index) => (
                        <div
                          key={item.name}
                          className="flex items-center gap-2"
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor:
                                index === 0
                                  ? "#00d4b3"
                                  : index === 1
                                  ? "#00b298"
                                  : "#e6f7f4",
                            }}
                          />
                          <span className="text-sm text-gray-600">
                            {item.name} ({item.value}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 통계 수치 */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">
                        거래 성공률
                      </h3>
                      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full bg-[#00d4b3]"
                          style={{
                            width: `${userData.skillStats.successRate}%`,
                          }}
                        />
                      </div>
                      <p className="text-sm mt-1">
                        {userData.skillStats.successRate}% (
                        {userData.skillStats.totalDeals}건 중)
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">평균 평점</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-[#00d4b3] fill-current" />
                        <span className="font-medium">
                          {userData.skillStats.avgRating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">
                        가장 인기 있는 스킬
                      </h3>
                      <p className="font-medium">
                        {userData.skillStats.skillShare[0].name}
                      </p>
                      <p className="text-sm text-gray-500">
                        전체 거래의 {userData.skillStats.skillShare[0].value}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {/* 거래 내역 섹션 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">거래 내역</h2>
                  <Link
                    to="/reviews"
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    전체보기
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-6">
                  {/* 진행 중인 거래 */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      진행 중인 거래
                    </h3>
                    {userData.activeDeals.length > 0 ? (
                      <div className="space-y-3">
                        {userData.activeDeals.map((deal) => (
                          <div
                            key={deal.id}
                            className="p-4 border rounded-lg hover:border-[#00d4b3] transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex gap-3">
                                <img
                                  src={deal.partner.profileImage}
                                  alt={deal.partner.name}
                                  className="w-10 h-10 rounded-full"
                                />
                                <div>
                                  <h4 className="font-medium">{deal.title}</h4>
                                  <p className="text-sm text-gray-500">
                                    with {deal.partner.name}
                                  </p>
                                </div>
                              </div>
                              <span className="px-2 py-1 text-xs bg-[#e6f7f4] text-[#00d4b3] rounded-full">
                                진행중
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>요청일: {deal.requestDate}</span>
                              <span>완료 예정일: {deal.dueDate}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-4 text-gray-500">
                        진행 중인 거래가 없습니다
                      </p>
                    )}
                  </div>

                  {/* 완료된 거래 */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      완료된 거래
                    </h3>
                    {userData.completedDeals.length > 0 ? (
                      <div className="space-y-3">
                        {userData.completedDeals.map((deal) => (
                          <div key={deal.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex gap-3">
                                <img
                                  src={deal.partner.profileImage}
                                  alt={deal.partner.name}
                                  className="w-10 h-10 rounded-full"
                                />
                                <div>
                                  <h4 className="font-medium">{deal.title}</h4>
                                  <p className="text-sm text-gray-500">
                                    with {deal.partner.name}
                                  </p>
                                </div>
                              </div>
                              {deal.hasReview ? (
                                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                  리뷰 작성 완료
                                </span>
                              ) : (
                                <button
                                  onClick={() =>
                                    navigate(`/deals/${deal.id}/review`)
                                  }
                                  className="px-2 py-1 text-xs bg-[#00d4b3] text-white rounded-full hover:bg-[#00b298]"
                                >
                                  리뷰 작성하기
                                </button>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              완료일: {deal.completionDate}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-4 text-gray-500">
                        완료된 거래가 없습니다
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* 리뷰 섹션 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">받은 리뷰</h2>
                  <Link
                    to="/reviews"
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    전체보기
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#00d4b3] mb-1">
                    {userData.rating.toFixed(1)}
                  </div>
                  <div className="flex justify-center items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(userData.rating)
                            ? "text-[#00d4b3] fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-500">
                    총 {userData.reviewCount}개의 리뷰
                  </p>
                </div>

                {userData.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {userData.reviews.map((review) => (
                      <div key={review.id} className="border-t pt-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-medium">{review.author}</span>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(review.rating)}
                              <span className="text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500">
                    아직 받은 리뷰가 없습니다
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 빠른 액세스 버튼 */}
          <div className="fixed bottom-6 right-6 flex flex-col gap-3">
            <button
              onClick={() => navigate("/charge")}
              className="w-14 h-14 bg-[#00d4b3] text-white rounded-full shadow-lg hover:bg-[#00b298] transition-colors flex items-center justify-center"
              title="T.T 충전하기"
            >
              +T.T
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
