import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  ChevronDown,
  MessageCircle,
  Heart,
  Share2,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

const CommunityPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [sortOption, setSortOption] = useState("latest");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const observerRef = useRef();
  const loadingRef = useRef(null);

  const tabs = [
    { id: "all", name: "전체" },
    { id: "question", name: "질문" },
    { id: "tips", name: "팁/노하우" },
    { id: "recommend", name: "추천" },
    { id: "free", name: "자유" },
  ];

  const sortOptions = [
    { id: "latest", name: "최신순" },
    { id: "popular", name: "인기순" },
    { id: "comments", name: "댓글많은순" },
  ];

  // 무한 스크롤을 위한 observer callback
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, isLoading]
  );

  // Observer 설정
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(handleObserver, option);
    if (loadingRef.current) observerRef.current.observe(loadingRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver]);

  // 데이터 불러오기
  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);

      // API 호출을 시뮬레이션 (실제로는 여기서 API를 호출합니다)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 더미 데이터 생성
      const newPosts = Array.from({ length: 6 }, (_, index) => ({
        id: page * 6 + index,
        title: `게시물 제목 ${page * 6 + index}`,
        content:
          "React와 Tailwind CSS를 활용하여 모던한 커뮤니티 페이지를 만드는 방법을 공유합니다.",
        user: {
          name: `사용자 ${page * 6 + index}`,
          image: "/loop-front/profile.png",
          rating: 4.5,
          reviews: 15,
          location: "서울 강남구",
        },
        createdAt: "2시간 전",
        likes: 28,
        comments: 12,
        tags: ["React", "개발팁"],
      }));

      setPosts((prev) => [...prev, ...newPosts]);

      // 예시: 총 30개의 게시물만 불러오도록 설정
      if (page * 6 >= 30) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  // 페이지 변경시 데이터 로드
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 필터 변경시 데이터 리셋
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [activeTab, sortOption, searchQuery]);

  return (
    <Layout>
      {/* 상단 고정 영역 */}
      <div className="sticky top-[var(--header-height)] bg-white z-10 border-b">
        <div className="max-w-3xl mx-auto px-4">
          {/* 검색바 */}
          <div className="py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="관심있는 내용을 검색해보세요"
                className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00d4b3] focus:bg-white transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* 카테고리 탭 */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors text-sm
                  ${
                    activeTab === tab.id
                      ? "bg-[#00d4b3] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* 정렬 옵션 */}
        <div className="flex gap-2 mb-4">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSortOption(option.id)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                sortOption === option.id
                  ? "bg-[#00d4b3] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>

        {/* 게시물 리스트 */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border"
            >
              {/* 게시물 헤더 */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e6f7f4] overflow-hidden">
                    <img
                      src={post.user.image}
                      alt={post.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{post.user.name}</h3>
                    <span className="text-sm text-gray-500">
                      {post.createdAt}
                    </span>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* 게시물 내용 */}
              <div className="mb-3">
                <h2 className="text-lg font-medium mb-2">{post.title}</h2>
                <p className="text-gray-600 line-clamp-3">{post.content}</p>
              </div>

              {/* 태그 */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 게시물 푸터 */}
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <button className="flex items-center gap-1 hover:text-[#00d4b3]">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-[#00d4b3]">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-[#00d4b3]">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* 로딩 표시기 */}
          {isLoading && (
            <div className="py-4 text-center">
              <div className="inline-block w-6 h-6 border-2 border-[#00d4b3] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Observer를 위한 타겟 요소 */}
          <div ref={loadingRef} className="h-4" />

          {/* 더 이상 불러올 데이터가 없을 때 */}
          {!hasMore && posts.length > 0 && (
            <div className="text-center py-4 text-gray-500">
              마지막 게시물입니다
            </div>
          )}
        </div>
      </div>

      {/* 플로팅 작성 버튼 */}
      <button
        onClick={() => navigate("/community/write")}
        className="fixed right-4 bottom-4 w-14 h-14 bg-[#00d4b3] text-white rounded-full shadow-lg hover:bg-[#00b298] transition-colors flex items-center justify-center"
        style={{ boxShadow: "0 4px 12px rgba(0, 212, 179, 0.3)" }}
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* 스타일 */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Layout>
  );
};

export default CommunityPage;
