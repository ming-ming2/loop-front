import React from "react";
import { Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardCard } from "./DashboardCard";

const RatingCard = ({ rating, reviewCount, reviews }) => {
  return (
    <DashboardCard
      title={
        <div className="flex justify-between items-center">
          <span>내 리뷰 및 평점</span>
          <Link
            to="/reviews"
            className="text-sm text-mint-500 hover:text-mint-600 flex items-center"
          >
            전체보기
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      }
    >
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-2xl font-bold">{rating}</span>
            <span className="text-gray-500">/ 5.0 ({reviewCount} 리뷰)</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <img
                  src={review.fromImage}
                  alt={review.from}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{review.from}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{review.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-2">{review.content}</p>
            <div className="text-xs text-gray-500 flex justify-between">
              <span>{review.service}</span>
              <span>{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default RatingCard;
