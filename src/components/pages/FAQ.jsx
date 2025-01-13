import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "거래를 시작하려면 어떻게 해야 하나요?",
    answer:
      "회원가입 후 재능을 등록하거나, 검색을 통해 원하는 재능을 요청하세요.",
  },
  {
    question: "시간은 어떻게 적립되나요?",
    answer: "거래 완료 시, 제공한 시간만큼 적립됩니다.",
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer:
      "시간 크레딧 구매 시, 구매 후 7일 이내에 사용하지 않은 경우 환불 가능합니다.",
  },
  {
    question: "거래 중 문제가 발생했을 경우 어떻게 하나요?",
    answer: "고객 지원 요청 폼을 통해 문의해 주세요.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">자주 묻는 질문</h2>
        <div className="max-w-4xl mx-auto grid gap-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-gray-900">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "py-4 max-h-40" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
