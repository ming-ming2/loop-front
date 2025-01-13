import React, { useState, useEffect } from "react";
import { Search, Filter, X, MessageCircle, ChevronDown } from "lucide-react";
import Layout from "../Layout";

// 더미 데이터
const DUMMY_CHATS = [
  {
    id: 1,
    userId: "user1",
    userName: "김철수",
    userImage: "/api/placeholder/40/40",
    skillTitle: "요가 교환 요청",
    lastMessage: "네, 내일 오후 3시에 가능해요!",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30분 전
    unreadCount: 2,
    status: "ongoing", // ongoing, completed
    tags: ["요가", "피트니스"],
  },
  {
    id: 2,
    userId: "user2",
    userName: "이영희",
    userImage: "/api/placeholder/40/40",
    skillTitle: "영어회화 교환",
    lastMessage: "수업은 어떠셨나요?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전
    unreadCount: 0,
    status: "completed",
    tags: ["영어", "회화"],
  },
  // ... 더 많은 더미 데이터 추가
];

const ChatListPage = () => {
  const [chats, setChats] = useState(DUMMY_CHATS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, ongoing, completed
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // 검색 및 필터링된 채팅 목록
  const filteredChats = chats.filter((chat) => {
    // 검색어 필터링
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      chat.userName.toLowerCase().includes(searchLower) ||
      chat.skillTitle.toLowerCase().includes(searchLower) ||
      chat.tags.some((tag) => tag.toLowerCase().includes(searchLower));

    // 상태 필터링
    const matchesStatus =
      filterStatus === "all" || chat.status === filterStatus;

    // 읽지 않은 메시지 필터링
    const matchesUnread = !showUnreadOnly || chat.unreadCount > 0;

    return matchesSearch && matchesStatus && matchesUnread;
  });

  // 타임스탬프 포맷팅 함수
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else if (days === 1) {
      return "어제";
    } else if (days < 7) {
      return `${days}일 전`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  // 필터 모달
  const FilterModal = () => (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => setShowFilterModal(false)}
      />
      <div className="relative bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold">필터</h3>
            <button
              onClick={() => setShowFilterModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* 상태 필터 */}
          <div>
            <h4 className="font-medium mb-2">상태</h4>
            <div className="space-y-2">
              {[
                { id: "all", label: "모두 보기" },
                { id: "ongoing", label: "진행 중" },
                { id: "completed", label: "완료됨" },
              ].map((option) => (
                <button
                  key={option.id}
                  className={`w-full px-4 py-2 rounded-lg text-left transition-colors
                            ${
                              filterStatus === option.id
                                ? "bg-[#00d4b3] text-white"
                                : "hover:bg-gray-100"
                            }`}
                  onClick={() => {
                    setFilterStatus(option.id);
                    setShowFilterModal(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 읽지 않은 메시지 필터 */}
          <div>
            <label className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={showUnreadOnly}
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#00d4b3] focus:ring-[#00d4b3]"
              />
              <span>읽지 않은 메시지만 보기</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Layout>
      {/* 검색 및 필터 영역 */}
      <div className="sticky top-[var(--header-height)] bg-white z-10 border-b">
        <div className="max-w-3xl mx-auto px-4">
          <div className="py-4">
            <div className="flex items-center gap-3">
              {/* 검색바 */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="대화 또는 사용자 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4b3] focus:bg-white transition-colors"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* 필터 버튼 */}
              <button
                className="px-4 py-2.5 border rounded-lg flex items-center gap-2 hover:border-[#00d4b3] min-w-[120px]"
                onClick={() => setShowFilterModal(true)}
              >
                <span className="text-gray-700">
                  {filterStatus === "all"
                    ? "전체"
                    : filterStatus === "ongoing"
                    ? "진행 중"
                    : "완료됨"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 채팅 목록 */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="space-y-2">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className="bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="p-4 flex gap-4">
                {/* 프로필 이미지 */}
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={chat.userImage}
                    alt={chat.userName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 채팅 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium">{chat.userName}</h3>
                      <p className="text-sm text-gray-500">{chat.skillTitle}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-gray-400">
                        {formatTimestamp(chat.timestamp)}
                      </span>
                      {chat.unreadCount > 0 && (
                        <span className="px-2 py-0.5 bg-[#00d4b3] text-white text-xs rounded-full">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 최근 메시지 */}
                  <p
                    className={`text-sm mt-1 line-clamp-1 ${
                      chat.unreadCount > 0 ? "font-medium" : "text-gray-600"
                    }`}
                  >
                    {chat.lastMessage}
                  </p>

                  {/* 태그 */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {chat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredChats.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">대화 내역이 없습니다</p>
          </div>
        )}
      </div>

      {/* 필터 모달 */}
      {showFilterModal && <FilterModal />}
    </Layout>
  );
};

export default ChatListPage;
