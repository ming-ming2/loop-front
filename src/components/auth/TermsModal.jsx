import React, { useEffect } from "react";
import { X } from "lucide-react";

const TermsModal = ({ isOpen, onClose }) => {
  // 모달이 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    // cleanup 함수
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">이용 약관</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. 서비스 개요 */}
          <section>
            <h3 className="text-lg font-bold mb-3">1. 서비스 개요</h3>
            <p className="text-gray-600 leading-relaxed">
              Loop 서비스는 사용자들이 자신의 시간과 재능을 활용하여 새로운
              기회를 만들 수 있는 시간 기반의 재능 거래 플랫폼입니다. 본 약관은
              서비스 이용과 관련된 회사와 사용자 간의 권리, 의무, 책임사항 등을
              규정합니다.
            </p>
          </section>

          {/* 2. 사용자 의무 */}
          <section>
            <h3 className="text-lg font-bold mb-3">2. 사용자 의무</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              회원은 다음과 같은 의무를 준수해야 합니다:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>정확한 정보 제공 및 변경사항 업데이트</li>
              <li>타인의 권리나 명예 존중</li>
              <li>서비스 운영 방해 행위 금지</li>
              <li>관련 법령 및 이용약관 준수</li>
            </ul>
          </section>

          {/* 3. 금지 사항 */}
          <section>
            <h3 className="text-lg font-bold mb-3">3. 금지 사항</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>타인의 계정 무단 사용 또는 도용</li>
              <li>불법 정보 게시 또는 전송</li>
              <li>시스템 해킹 또는 바이러스 유포</li>
              <li>타인의 개인정보 수집 또는 누설</li>
              <li>서비스를 이용한 상업적 광고 행위</li>
            </ul>
          </section>

          {/* 4. 서비스 제한 및 종료 */}
          <section>
            <h3 className="text-lg font-bold mb-3">4. 서비스 제한 및 종료</h3>
            <p className="text-gray-600 leading-relaxed">
              회사는 다음과 같은 경우 서비스 이용을 제한하거나 종료할 수
              있습니다: - 회원이 약관에 위배되는 행위를 한 경우 - 서비스 운영에
              심각한 장애를 초래하는 경우 - 법령, 정부 정책 등에 따른 제한이
              필요한 경우
            </p>
          </section>

          {/* 5. 면책 조항 */}
          <section>
            <h3 className="text-lg font-bold mb-3">5. 면책 조항</h3>
            <p className="text-gray-600 leading-relaxed">
              회사는 천재지변, 기술적 결함, 기타 불가항력적 사유로 인한 서비스
              중단 또는 장애에 대해 책임을 지지 않습니다. 또한, 사용자 간 거래나
              분쟁에 대해 직접적인 책임을 지지 않습니다.
            </p>
          </section>

          {/* 6. 기타 조항 */}
          <section>
            <h3 className="text-lg font-bold mb-3">6. 기타 조항</h3>
            <p className="text-gray-600 leading-relaxed">
              본 약관은 대한민국 법률에 따라 규율되며, 회사는 필요한 경우 약관을
              변경할 수 있습니다. 약관 변경 시 공지사항을 통해 고지하며, 변경된
              약관은 고지 후 7일이 경과한 날부터 효력이 발생합니다.
            </p>
          </section>
        </div>

        {/* 모달 하단 */}
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#00d4b3] text-white rounded-lg hover:bg-[#00b298] transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
