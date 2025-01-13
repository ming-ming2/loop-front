import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  Star,
  LogOut,
  Settings,
  UserIcon,
  LineChart,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react";
import Logo from "./Logo";

const ProfileDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleNavigation = (path) => {
    onClose();
    navigate(path);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-fadeIn select-none border"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 프로필 영역 */}
      <Link to="/profile">
        <div className="p-4 bg-[#e6f7f4]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/loop-front/profile.png"
                alt="Profile"
                className="w-14 h-14 rounded-full border-2 border-white"
                draggable="false"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00d4b3] rounded-full flex items-center justify-center text-white text-xs font-medium">
                4.8
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">김서연</h3>
              <p className="text-sm text-gray-600">리뷰 12개</p>
              <p className="text-xs text-gray-500 mt-0.5">
                웹 개발 및 디자인 교육
              </p>
            </div>
          </div>
        </div>
      </Link>
      {/* 메뉴 영역 */}
      <div className="p-2">
        <button
          onClick={() => handleNavigation("/profile-manage")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left text-sm"
        >
          <Settings className="w-4 h-4 text-gray-400" />
          <span>프로필 관리</span>
        </button>
        <button
          onClick={() => handleNavigation("/dashboard")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left text-sm"
        >
          <UserIcon className="w-4 h-4 text-gray-400" />
          <span>마이페이지</span>
        </button>
        <button
          onClick={() => handleNavigation("/activity")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left text-sm"
        >
          <LineChart className="w-4 h-4 text-gray-400" />
          <span>활동 분석</span>
        </button>
      </div>

      {/* 하단 영역 */}
      <div className="border-t">
        <div className="p-2">
          <div className="text-xs text-gray-400 px-3 py-1 text-center">
            Loop v1.0
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              /* TODO: 로그아웃 처리 */
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-left text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>로그아웃</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsProfileOpen(!isProfileOpen);
    },
    [isProfileOpen]
  );

  // 페이지 이동 시 드롭다운 닫기
  useEffect(() => {
    return () => setIsProfileOpen(false);
  }, [navigate]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-20 border-b h-[var(--header-height)]">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo light scale={110} />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/register"
              className="text-gray-700 hover:text-[#00d4b3] font-medium transition-colors"
            >
              재능 등록
            </Link>
            <Link
              to="/exchange"
              className="text-gray-700 hover:text-[#00d4b3] font-medium transition-colors"
            >
              교환 찾기
            </Link>
            <Link
              to="/reviews"
              className="text-gray-700 hover:text-[#00d4b3] font-medium transition-colors"
            >
              후기/리뷰
            </Link>
            <Link
              to="/community"
              className="text-gray-700 hover:text-[#00d4b3] font-medium transition-colors"
            >
              커뮤니티
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            <Link
              to="/chats"
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <MessageCircle className="w-6 h-6" />
              {/* 읽지 않은 메시지가 있을 경우 표시할 뱃지 */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#00d4b3] rounded-full" />
            </Link>
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#00d4b3] rounded-full"></span>
            </button>
            <div className="relative">
              <div
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer select-none"
                onMouseDown={handleProfileClick}
              >
                <img
                  src="/loop-front/profile.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                  draggable="false"
                />
                {isProfileOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <ProfileDropdown
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
