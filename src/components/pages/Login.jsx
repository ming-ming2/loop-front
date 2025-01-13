import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Layout from "../Layout";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  };

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // 유효성 검사
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 로그인 처리
    setIsLoading(true);
    try {
      // API 호출을 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 시 대시보드로 이동
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        submit: "이메일 또는 비밀번호가 일치하지 않습니다",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 소셜 로그인 핸들러
  const handleSocialLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
    // 소셜 로그인 구현
  };

  return (
    <Layout>
      <div className="min-h-screen pt-8 pb-20 bg-gray-50">
        <div className="max-w-md mx-auto px-4">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">로그인</h1>
            <p className="text-gray-600">
              계정이 없으신가요?{" "}
              <Link to="/register" className="text-[#00d4b3] hover:underline">
                회원가입
              </Link>
            </p>
          </div>

          {/* 로그인 폼 */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-sm space-y-6"
          >
            {/* 이메일 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-1 focus:ring-[#00d4b3]`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 입력하세요"
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-1 focus:ring-[#00d4b3]`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* 자동 로그인 & 비밀번호 찾기 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#00d4b3] focus:ring-[#00d4b3]"
                />
                <span className="text-sm text-gray-600">자동 로그인</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:text-[#00d4b3]"
              >
                비밀번호 찾기
              </Link>
            </div>

            {/* 로그인 에러 메시지 */}
            {errors.submit && (
              <p className="text-sm text-red-500 text-center">
                {errors.submit}
              </p>
            )}

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-[#00d4b3] text-white rounded-lg hover:bg-[#00b298] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "로그인"
              )}
            </button>

            {/* 소셜 로그인 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">
                  간편 로그인
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src="/api/placeholder/24/24"
                  alt="Google"
                  className="w-6 h-6"
                />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("kakao")}
                className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src="/api/placeholder/24/24"
                  alt="Kakao"
                  className="w-6 h-6"
                />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("apple")}
                className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src="/api/placeholder/24/24"
                  alt="Apple"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
