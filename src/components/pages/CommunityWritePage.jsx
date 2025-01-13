import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Image as ImageIcon, X, AlertCircle } from "lucide-react";
import Layout from "../Layout";

const CommunityWritePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("question");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [images, setImages] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  const categories = [
    { id: "question", name: "질문" },
    { id: "tips", name: "팁/노하우" },
    { id: "recommend", name: "추천" },
    { id: "free", name: "자유 게시판" },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert("이미지는 최대 5장까지 업로드할 수 있습니다.");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleBack = () => {
    if (title || content || images.length > 0) {
      setShowWarning(true);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    // Validation
    if (title.length < 5) {
      alert("제목은 5자 이상 입력해주세요.");
      return;
    }
    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }

    // Submit logic here
    console.log({
      title,
      content,
      category,
      isAnonymous,
      images,
    });

    // Navigate back after successful submission
    navigate("/community");
  };

  return (
    <Layout>
      {/* 상단 헤더 */}
      <div className="sticky top-[var(--header-height)] bg-white z-20 border-b">
        <div className="max-w-3xl mx-auto px-4">
          <div className="h-14 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold">글쓰기</h1>
            <div className="w-9" /> {/* 좌우 균형을 위한 더미 div */}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="space-y-6">
          {/* 제목 입력 */}
          <div>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full px-4 py-3 text-lg border-b focus:outline-none focus:border-[#00d4b3]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 카테고리 선택 */}
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  category === cat.id
                    ? "bg-[#00d4b3] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* 본문 입력 */}
          <div>
            <textarea
              placeholder="내용을 입력하세요"
              className="w-full min-h-[300px] px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00d4b3] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* 이미지 업로드 */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border"
                >
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-0.5 right-0.5 p-1 bg-black bg-opacity-50 rounded-full"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="w-20 h-20 flex items-center justify-center border border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-500">
              이미지는 최대 5장까지 업로드할 수 있습니다.
            </p>
          </div>

          {/* 익명 체크박스 */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#00d4b3] focus:ring-[#00d4b3]"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-600">
              익명으로 작성하기
            </label>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-3">
          <button
            onClick={handleBack}
            className="flex-1 px-4 py-2.5 border rounded-lg hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 bg-[#00d4b3] text-white rounded-lg hover:bg-[#00b298]"
          >
            등록
          </button>
        </div>
      </div>

      {/* 경고 모달 */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h3 className="font-bold">작성을 취소하시겠습니까?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              작성 중인 내용이 모두 삭제됩니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowWarning(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                계속 작성
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                나가기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 하단 여백 */}
      <div className="h-20" />
    </Layout>
  );
};

export default CommunityWritePage;
