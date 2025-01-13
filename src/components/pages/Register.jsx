import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Layout from "../Layout";
import TermsModal from "../auth/TermsModal";
import PrivacyModal from "../auth/PrivacyModal";
const Register = () => {
  const navigate = useNavigate();
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
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

  // 폼 유효성 검사
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    } else if (formData.name.length < 2) {
      newErrors.name = "이름은 2자 이상이어야 합니다";
    }

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호를 다시 입력해주세요";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    if (
      formData.phone &&
      !/^[0-9]{10,11}$/.test(formData.phone.replace(/-/g, ""))
    ) {
      newErrors.phone = "올바른 전화번호 형식이 아닙니다";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "이용약관에 동의해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // API 호출을 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 시 처리
      alert("회원가입이 완료되었습니다!");
      navigate("/dashboard");
    } catch (error) {
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen pt-8 pb-20 bg-gray-50">
        <div className="max-w-md mx-auto px-4">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">회원가입</h1>
            <p className="text-gray-600">
              이미 계정이 있으신가요?{" "}
              <Link to="/login" className="text-[#00d4b3] hover:underline">
                로그인
              </Link>
            </p>
          </div>

          {/* 회원가입 폼 */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-sm space-y-6"
          >
            {/* 이름 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-1 focus:ring-[#00d4b3]`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                실명 또는 닉네임을 사용하실 수 있습니다
              </p>
            </div>

            {/* 이메일 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일
                <span className="text-red-500">*</span>
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
                <span className="text-red-500">*</span>
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
              <p className="mt-1 text-xs text-gray-500">
                8자 이상, 영문/숫자/특수문자를 포함해야 합니다
              </p>
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호 확인
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="비밀번호를 다시 입력하세요"
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-1 focus:ring-[#00d4b3]`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* 휴대폰 번호 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                휴대폰 번호
                <span className="text-gray-400 text-xs ml-1">(선택)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="휴대폰 번호를 입력하세요"
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-1 focus:ring-[#00d4b3]`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                계정 복구에 사용됩니다
              </p>
            </div>

            {/* 약관 동의 */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#00d4b3] focus:ring-[#00d4b3]"
                />
                <span className="text-sm text-gray-600">
                  <button
                    type="button"
                    onClick={() => setIsTermsModalOpen(true)}
                    className="text-[#00d4b3] hover:underline"
                  >
                    이용약관
                  </button>{" "}
                  및{" "}
                  <button
                    type="button"
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="text-[#00d4b3] hover:underline"
                  >
                    개인정보 처리방침
                  </button>
                  에 동의합니다
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.agreeToTerms}
                </p>
              )}
            </div>
            <TermsModal
              isOpen={isTermsModalOpen}
              onClose={() => setIsTermsModalOpen(false)}
            />
            <PrivacyModal
              isOpen={isPrivacyModalOpen}
              onClose={() => setIsPrivacyModalOpen(false)}
            />
            {/* 버튼 */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-[#00d4b3] text-white rounded-lg hover:bg-[#00b298] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "처리중..." : "회원가입"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
