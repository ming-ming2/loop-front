import React, { useEffect } from "react";
import { X } from "lucide-react";

const PrivacyModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-labelledby="privacy-policy-title"
    >
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 id="privacy-policy-title" className="text-xl font-bold">
            개인정보 처리방침
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. 개인정보의 수집 항목 및 수집 방법 */}
          <section>
            <h3 className="text-lg font-bold mb-3">
              1. 개인정보의 수집 항목 및 수집 방법
            </h3>
            <div className="space-y-3 text-gray-600">
              <h4 className="font-medium">필수 수집 항목</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>이메일 주소: 서비스 이용 및 계정 식별</li>
                <li>비밀번호: 계정 보안</li>
                <li>이름(닉네임): 서비스 내 식별</li>
              </ul>

              <h4 className="font-medium mt-4">선택 수집 항목</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>휴대폰 번호: 계정 복구 및 알림 서비스</li>
                <li>프로필 이미지: 서비스 내 프로필 표시</li>
              </ul>
            </div>
          </section>

          {/* 2. 개인정보의 수집 및 이용 목적 */}
          <section>
            <h3 className="text-lg font-bold mb-3">
              2. 개인정보의 수집 및 이용 목적
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>회원 관리 및 서비스 제공</li>
              <li>거래 및 교환 서비스 지원</li>
              <li>서비스 개선 및 맞춤형 서비스 제공</li>
              <li>안전한 거래 환경 조성을 위한 본인 확인</li>
            </ul>
          </section>

          {/* 3. 개인정보의 보관 및 파기 */}
          <section>
            <h3 className="text-lg font-bold mb-3">
              3. 개인정보의 보관 및 파기
            </h3>
            <div className="space-y-3 text-gray-600">
              <p>회원 탈퇴 시 즉시 파기하는 정보</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>이메일, 비밀번호, 휴대폰 번호</li>
                <li>프로필 이미지 및 기타 식별 정보</li>
              </ul>
              <p className="mt-2">법령에 따라 보관하는 정보</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>거래 기록: 5년</li>
                <li>서비스 이용 기록: 3년</li>
                <li>그 외 관련 법령에 따른 정보</li>
              </ul>
            </div>
          </section>

          {/* 4. 개인정보의 제3자 제공 */}
          <section>
            <h3 className="text-lg font-bold mb-3">4. 개인정보의 제3자 제공</h3>
            <p className="text-gray-600">
              회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
              다만, 아래와 같은 경우에는 예외로 합니다:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
              <li>이용자가 사전에 동의한 경우</li>
              <li>
                법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
                방법에 따라 수사기관의 요구가 있는 경우
              </li>
            </ul>
          </section>

          {/* 5. 개인정보 보호를 위한 기술적·관리적 조치 */}
          <section>
            <h3 className="text-lg font-bold mb-3">
              5. 개인정보 보호를 위한 기술적·관리적 조치
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                해시 암호화: 비밀번호는 복호화가 불가능한 일방향 암호화 저장
              </li>
              <li>SSL 보안 서버: 중요 데이터 암호화 전송</li>
              <li>접근 제한: 개인정보 접근 권한 최소화</li>
              <li>보안 프로그램: 백신 및 보안 프로그램 설치·운영</li>
            </ul>
          </section>

          {/* 6. 사용자의 권리 및 행사 방법 */}
          <section>
            <h3 className="text-lg font-bold mb-3">
              6. 사용자의 권리 및 행사 방법
            </h3>
            <p className="text-gray-600 mb-2">
              회원은 언제든지 마이페이지에서 자신의 개인정보를 조회하거나 수정할
              수 있으며, 동의 철회(회원탈퇴)를 요청할 수 있습니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>개인정보 열람, 정정: 마이페이지 → 계정 설정</li>
              <li>회원탈퇴: 마이페이지 → 계정 설정 → 회원탈퇴</li>
              <li>기타 문의: 고객센터를 통한 1:1 문의</li>
            </ul>
          </section>

          {/* 7. 개인정보 보호 책임자 및 문의처 */}
          <section>
            <h3 className="text-lg font-bold mb-3">
              7. 개인정보 보호 책임자 및 문의처
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>개인정보 보호 책임자</strong>
              </p>
              <ul className="list-none pl-5 space-y-1">
                <li>이름: 홍길동</li>
                <li>직위: 개인정보 보호 책임자</li>
                <li>이메일: privacy@loop.com</li>
                <li>전화: 02-123-4567</li>
              </ul>
            </div>
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

export default PrivacyModal;
