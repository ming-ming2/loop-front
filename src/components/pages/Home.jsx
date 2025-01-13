import React, { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import CategoryGrid from "../categories/CategoryGrid";
import PopularSkills from "../skills/PopularSkills";
import ReviewGrid from "../reviews/ReviewGrid";
import SearchBar from "../search/SearchBar";

const Home = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <main>
      {/* Main Banner */}
      <section className="pt-32 pb-20 bg-gradient-light">
        <div className="container mx-auto px-4 mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight animate-fadeInUp opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="inline-block hover-scale">당신의 재능</span>이{" "}
              <span className="inline-block hover-scale">
                세상과 연결되는 순간,
              </span>{" "}
              <span className="text-gradient font-extrabold hover-scale inline-block">
                루프
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-gray-600 mb-12 animate-fadeInUp opacity-0"
              style={{ animationDelay: "0.4s" }}
            >
              지금 바로 재능을 공유하고 새로운 가치를 만들어보세요
            </p>

            {/* Search Bar */}
            <div className="mb-8">
              <SearchBar />
            </div>

            {/* Categories */}
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">
              인기 있는 재능 교환
            </h2>
            <p className="text-gray-600 text-center mb-12">
              지금 가장 활발하게 교환되고 있는 재능을 만나보세요
            </p>
            <PopularSkills />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-gradient-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">
              신뢰할 수 있는 교환 후기
            </h2>
            <p className="text-gray-600 text-center mb-12">
              실제 사용자들의 생생한 교환 경험을 확인해보세요
            </p>
            <ReviewGrid />
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="py-20 bg-gradient-mint text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              지금 바로 재능을 교환하고
              <br />
              새로운 가치를 만들어보세요
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
              <button className="bg-white text-mint-500 px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-opacity shadow-lg flex items-center">
                재능 등록하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-mint-600 text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-opacity shadow-lg flex items-center">
                지금 루프 시작하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
