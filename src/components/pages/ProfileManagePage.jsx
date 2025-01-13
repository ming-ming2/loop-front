import React, { useState, useRef, useEffect } from "react";
import { Camera, X, Eye, EyeOff, Loader2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

// 추천 태그 목록
const RECOMMENDED_TAGS = [
  "프론트엔드",
  "백엔드",
  "UI/UX",
  "디자인",
  "마케팅",
  "영상편집",
  "React",
  "Node.js",
  "Python",
  "JavaScript",
  "HTML/CSS",
  "Adobe XD",
  "Figma",
  "Photoshop",
  "Illustrator",
  "브랜딩",
  "콘텐츠 기획",
  "SNS 마케팅",
  "데이터 분석",
  "3D 모델링",
  "영상촬영",
  "사진촬영",
  "음악제작",
];

const ProfileManagePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "홍길동",
    shortBio: "안녕하세요! 재능 교환을 통해 새로운 경험을 만들어가고 있습니다.",
    introduction:
      "7년차 프리랜서 디자이너입니다. UI/UX 디자인을 전문으로 하고 있으며, 다양한 프로젝트 경험이 있습니다.",
    email: "example@loop.com",
    phone: "010-1234-5678",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [profileImage, setProfileImage] = useState("/loop-front/profile.png");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // 태그 관련 상태
  const [tags, setTags] = useState(["프론트엔드", "UI/UX", "디자인"]);
  const [tagInput, setTagInput] = useState("");
  const [tagError, setTagError] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fileInputRef = useRef(null);
  const tagInputRef = useRef(null);

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  // 태그 자동완성 및 추천
  useEffect(() => {
    if (tagInput.trim()) {
      const filtered = RECOMMENDED_TAGS.filter(
        (tag) =>
          tag.toLowerCase().includes(tagInput.toLowerCase()) &&
          !tags.includes(tag)
      );
      setSuggestedTags(filtered.slice(0, 5));
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestedTags([]);
      setShowSuggestions(false);
    }
  }, [tagInput, tags]);

  // 태그 입력 처리
  const handleTagInputChange = (e) => {
    const value = e.target.value;
    setTagInput(value);
    setTagError("");
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    } else if (e.key === "ArrowDown" && showSuggestions) {
      e.preventDefault();
      const firstSuggestion = document.querySelector("[data-tag-suggestion]");
      firstSuggestion?.focus();
    }
  };

  const addTag = (newTag) => {
    const trimmedTag = newTag.trim();
    if (trimmedTag) {
      if (tags.length >= 10) {
        setTagError("태그는 최대 10개까지만 추가할 수 있습니다");
        return;
      }
      if (trimmedTag.length > 20) {
        setTagError("태그는 20자를 초과할 수 없습니다");
        return;
      }
      if (tags.includes(trimmedTag)) {
        setTagError("이미 추가된 태그입니다");
        return;
      }
      setTags([...tags, trimmedTag]);
      setTagInput("");
      setTagError("");
      setShowSuggestions(false);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
    setTagError("");
  };

  // 추천 태그 클릭 처리
  const handleSuggestionClick = (tag) => {
    addTag(tag);
    tagInputRef.current?.focus();
  };

  // 추천 태그 키보드 네비게이션
  const handleSuggestionKeyDown = (e, tag) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSuggestionClick(tag);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = e.target.previousElementSibling;
      if (prev) {
        prev.focus();
      } else {
        tagInputRef.current?.focus();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = e.target.nextElementSibling;
      if (next) {
        next.focus();
      }
    }
  };

  // Click outside handler for suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tagInputRef.current && !tagInputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // 프로필 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Za-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // 유효성 검사
    const newErrors = {};

    if (formData.nickname.trim().length < 2) {
      newErrors.nickname = "닉네임은 2자 이상이어야 합니다";
    }

    if (formData.shortBio.length > 50) {
      newErrors.shortBio = "한 줄 소개는 50자를 초과할 수 없습니다";
    }

    if (formData.introduction.length > 500) {
      newErrors.introduction = "자기소개는 500자를 초과할 수 없습니다";
    }

    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "현재 비밀번호를 입력해주세요";
      }
      if (!validatePassword(formData.newPassword)) {
        newErrors.newPassword =
          "비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다";
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        newErrors.confirmNewPassword = "새 비밀번호가 일치하지 않습니다";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 저장 처리
    setIsLoading(true);
    try {
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsEditing(false);
      // 성공 메시지 표시 로직 추가
    } catch (error) {
      setErrors({ submit: "저장 중 오류가 발생했습니다" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <div className="min-h-screen pt-8 pb-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 프로필 사진 섹션 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">프로필 사진</h2>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md border flex items-center justify-center hover:bg-gray-50"
                    disabled={!isEditing}
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    권장 이미지 크기: 500x500px
                    <br />
                    최대 파일 크기: 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* 기본 정보 섹션 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">기본 정보</h2>
              <div className="space-y-4">
                {/* 닉네임 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    닉네임
                  </label>
                  <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.nickname ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-[#00d4b3] disabled:bg-gray-50`}
                  />
                  {errors.nickname && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nickname}
                    </p>
                  )}
                </div>

                {/* 한 줄 소개 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    한 줄 소개
                  </label>
                  <input
                    type="text"
                    name="shortBio"
                    value={formData.shortBio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="자신을 한 줄로 소개해보세요"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.shortBio ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-[#00d4b3] disabled:bg-gray-50`}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.shortBio.length}/50자
                  </p>
                  {errors.shortBio && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.shortBio}
                    </p>
                  )}
                </div>

                {/* 자기소개 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    자기소개
                  </label>
                  <textarea
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="자신의 이력, 성격, 흥미 등을 소개해보세요"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.introduction ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-1 focus:ring-[#00d4b3] disabled:bg-gray-50`}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.introduction.length}/500자
                  </p>
                  {errors.introduction && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.introduction}
                    </p>
                  )}
                </div>
                {/* 연락처 정보 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    이메일은 변경할 수 없습니다
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    휴대폰 번호
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00d4b3] disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* 태그 섹션 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">전문분야 및 관심사</h2>
              <div className="relative">
                <div className="border rounded-lg p-2 focus-within:ring-1 focus-within:ring-[#00d4b3] focus-within:border-[#00d4b3]">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-lg bg-[#00d4b3] text-white text-sm group"
                      >
                        {tag}
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-1.5 opacity-75 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex items-center">
                      <Search className="w-4 h-4 text-gray-400 mr-2" />
                      <input
                        ref={tagInputRef}
                        type="text"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyDown={handleTagInputKeyDown}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="태그를 입력하고 엔터를 눌러 추가하세요"
                        className="w-full outline-none text-sm"
                        maxLength={20}
                        disabled={!isEditing}
                      />
                    </div>
                  )}
                </div>

                {/* 태그 추천 */}
                {isEditing && showSuggestions && suggestedTags.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white rounded-lg border shadow-lg">
                    <div className="p-2">
                      <div className="text-xs font-medium text-gray-500 mb-2">
                        추천 태그
                      </div>
                      {suggestedTags.map((tag) => (
                        <button
                          key={tag}
                          data-tag-suggestion
                          onClick={() => handleSuggestionClick(tag)}
                          onKeyDown={(e) => handleSuggestionKeyDown(e, tag)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded focus:outline-none focus:bg-gray-100"
                          tabIndex={0}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {tagError && (
                <p className="mt-1 text-sm text-red-500">{tagError}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                최대 10개의 태그를 추가할 수 있습니다
              </p>
            </div>
            {/* 비밀번호 변경 섹션 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">비밀번호 변경</h2>
              <div className="space-y-4">
                {/* 현재 비밀번호 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    현재 비밀번호
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.currentPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-1 focus:ring-[#00d4b3] disabled:bg-gray-50`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          current: !prev.current,
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                      disabled={!isEditing}
                    >
                      {showPassword.current ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                {/* 새 비밀번호 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    새 비밀번호
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.newPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-1 focus:ring-[#00d4b3] disabled:bg-gray-50`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                      disabled={!isEditing}
                    >
                      {showPassword.new ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.newPassword}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    8자 이상, 영문/숫자/특수문자를 포함해야 합니다
                  </p>
                </div>

                {/* 새 비밀번호 확인 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    새 비밀번호 확인
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      name="confirmNewPassword"
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2.5 rounded-lg border ${
                        errors.confirmNewPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-1 focus:ring-[#00d4b3] disabled:bg-gray-50`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          confirm: !prev.confirm,
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                      disabled={!isEditing}
                    >
                      {showPassword.confirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmNewPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmNewPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 계정 삭제 섹션 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-red-600 mb-2">
                계정 삭제
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수
                없습니다.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      "정말 계정을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다."
                    )
                  ) {
                    console.log("계정 삭제");
                  }
                }}
                className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
              >
                계정 삭제
              </button>
            </div>

            {/* 하단 버튼 */}
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex-1 px-4 py-3 bg-[#00d4b3] text-white rounded-lg hover:bg-[#00b298] transition-colors"
                >
                  프로필 수정
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      // 폼 초기화 로직
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                    disabled={isLoading}
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-[#00d4b3] text-white rounded-lg hover:bg-[#00b298] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        저장 중...
                      </div>
                    ) : (
                      "저장"
                    )}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileManagePage;
