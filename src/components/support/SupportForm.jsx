import React, { useState } from "react";
import { Upload, X, CheckCircle } from "lucide-react";

const SupportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
    file: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      file: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-mint-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">문의가 접수되었습니다</h3>
        <p className="text-gray-600">
          빠른 시일 내에 답변드리겠습니다.
          <br />
          접수하신 이메일로 답변이 발송됩니다.
        </p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white" id="support">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">문의하기</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mint-500"
                onChange={handleChange}
                value={formData.name}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mint-500"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                문의 유형
              </label>
              <select
                id="type"
                name="type"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mint-500"
                onChange={handleChange}
                value={formData.type}
              >
                <option value="">선택해주세요</option>
                <option value="trade">거래 관련 문의</option>
                <option value="time">시간 적립 문제</option>
                <option value="other">기타</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                문의 내용
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mint-500"
                onChange={handleChange}
                value={formData.message}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                첨부 파일
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-mint-500 hover:text-mint-600"
                    >
                      <span>파일 업로드</span>
                      <input
                        id="file-upload"
                        name="file"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">또는 여기로 드래그 앤 드롭</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF 최대 10MB
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-mint text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              문의 보내기
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SupportForm;
