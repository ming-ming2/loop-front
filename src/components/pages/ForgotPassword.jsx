import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, AlertCircle, CheckCircle } from "lucide-react";
import AuthLayout from "../auth/AuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }
    // TODO: Implement password recovery logic
    console.log("Password recovery requested for:", email);
    setIsSubmitted(true);
  };

  return (
    <AuthLayout
      title="비밀번호 재설정"
      subtitle="계정에 등록된 이메일 주소를 입력하세요"
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력하세요"
                className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mint-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-mint text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            비밀번호 복구 요청
          </button>

          <p className="text-sm text-gray-600 mt-4">
            비밀번호 복구 링크가 입력하신 이메일로 전송됩니다. 스팸 메일함도
            확인해주세요.
          </p>
        </form>
      ) : (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">이메일이 전송되었습니다</h3>
          <p className="text-gray-600 mb-8">
            {email}로 비밀번호 재설정 링크를 보냈습니다.
            <br />
            이메일을 확인해주세요.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-mint-500 hover:text-mint-600 font-medium"
          >
            다른 이메일로 다시 시도
          </button>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="text-mint-500 hover:text-mint-600 font-medium"
        >
          로그인 페이지로 돌아가기
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
