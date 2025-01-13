import React, { useState } from "react";
import { Upload, X, Check } from "lucide-react";

const categories = ["레슨/교육", "IT/기술", "예술/창작", "생활 도움", "기타"];

const SkillForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    hourlyRate: "",
    description: "",
    image: null,
  });
  const [success, setSuccess] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [descCount, setDescCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "title") setTitleCount(value.length);
    if (name === "description") setDescCount(value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement skill registration logic
    console.log("Form submitted:", formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">새로운 스킬 등록하기</h2>

      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg flex items-center">
          <Check className="w-5 h-5 mr-2" />
          스킬이 성공적으로 등록되었습니다!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            카테고리
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mint-500"
          >
            <option value="">카테고리 선택</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            스킬 제목
          </label>
          <div className="relative">
            <input
              type="text"
              name="title"
              maxLength={50}
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mint-500"
              placeholder="예: 기타 레슨 초급반"
            />
            <span className="absolute right-3 top-3 text-sm text-gray-400">
              {titleCount}/50
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            시간당 가치
          </label>
          <div className="relative">
            <input
              type="number"
              name="hourlyRate"
              min="10000"
              max="100000"
              step="1000"
              value={formData.hourlyRate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mint-500"
              placeholder="예: 10000"
            />
            <span className="absolute right-3 top-3 text-gray-500">
              원/시간
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            최소 10,000원 ~ 최대 100,000원까지 설정 가능
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            설명
          </label>
          <div className="relative">
            <textarea
              name="description"
              maxLength={200}
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mint-500"
              placeholder="스킬에 대한 자세한 설명을 입력하세요"
            />
            <span className="absolute right-3 bottom-3 text-sm text-gray-400">
              {descCount}/200
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이미지 첨부
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md font-medium text-mint-500 hover:text-mint-600">
                  <span>이미지 업로드</span>
                  <input type="file" className="sr-only" accept="image/*" />
                </label>
                <p className="pl-1">또는 드래그 앤 드롭</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-mint text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          스킬 등록하기
        </button>
      </form>
    </div>
  );
};

export default SkillForm;
