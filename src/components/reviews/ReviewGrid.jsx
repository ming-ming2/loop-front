import React from "react";
import { Clock } from "lucide-react";

const reviews = [
  {
    name: "김서연",
    skill: "기타 레슨",
    review:
      "처음 기타를 배우는데도 쉽게 이해할 수 있게 설명해주셔서 좋았어요! 기초부터 차근차근 알려주셔서 2시간이 정말 알차게 느껴졌습니다.",
    rating: 5,
    avatar: "/api/placeholder/40/40",
    exchangeTime: "2시간",
    date: "2024.01.03",
  },
  {
    name: "이민준",
    skill: "영어 번역",
    review:
      "급하게 필요했던 문서 번역을 깔끔하게 도와주셨어요. 전문용어도 정확하게 번역해주셔서 정말 감사했습니다!",
    rating: 5,
    avatar: "/api/placeholder/40/40",
    exchangeTime: "1시간",
    date: "2024.01.05",
  },
];

const ReviewGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-sm card-hover"
        >
          <div className="flex items-center mb-4">
            <img
              src={review.avatar}
              alt={review.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-bold">{review.name}</h3>
              <div className="flex items-center space-x-2">
                <div className="text-yellow-400">
                  {"★".repeat(review.rating)}
                </div>
                <span className="text-gray-400">·</span>
                <span className="text-sm text-gray-600">{review.skill}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{review.review}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              교환 시간: {review.exchangeTime}
            </div>
            <div>{review.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewGrid;
