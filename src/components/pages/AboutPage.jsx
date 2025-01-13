import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Globe,
  Users,
  Star,
} from "lucide-react";
import Layout from "../Layout";

const AboutPage = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "누구나 참여 가능한 플랫폼",
      description: "나의 재능을 교환하거나 거래할 수 있는 열린 플랫폼입니다.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "T.T 시스템",
      description: "시간 토큰(T.T)을 통해 공정하고 투명한 거래를 지원합니다.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "신뢰 시스템",
      description:
        "리뷰와 평점을 통해 안전하고 신뢰할 수 있는 거래 환경을 제공합니다.",
    },
  ];

  const timeline = [
    {
      date: "2025.01",
      title: "루프 서비스 런칭",
      description: "재능 교환 플랫폼 루프가 첫 선을 보였습니다.",
    },
    {
      date: "2025.03",
      title: "1만 명의 사용자",
      description: "런칭 3개월 만에 1만 명의 사용자가 함께하게 되었습니다.",
    },
    {
      date: "2025.06",
      title: "T.T 시스템 도입",
      description: "시간 토큰(T.T) 기반의 교환 시스템을 도입했습니다.",
    },
  ];

  const contacts = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "주소",
      content: "서울특별시 강남구 테헤란로 123 루프타워 4층",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "전화",
      content: "02-123-4567",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "이메일",
      content: "contact@loop.com",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "웹사이트",
      content: "www.loop.com",
    },
  ];

  const Container = ({ children, className = "" }) => (
    <div className={`max-w-5xl mx-auto px-4 ${className}`}>{children}</div>
  );

  const SectionTitle = ({ children, className = "" }) => (
    <h2 className={`text-2xl font-bold mb-6 ${className}`}>{children}</h2>
  );

  return (
    <Layout>
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-br from-[#00d4b3] to-[#00b298] text-white py-20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">회사 소개</h1>
          <p className="text-xl md:text-2xl opacity-90">
            시간과 재능으로 세상을 연결합니다.
          </p>
        </Container>
      </div>

      {/* 회사 개요 */}
      <Container className="py-16">
        <div className="max-w-3xl">
          <p className="text-lg text-gray-600 leading-relaxed">
            루프는 2025년에 설립된 재능 교환 플랫폼으로, 사용자의 시간과 재능을
            통해 새로운 기회를 제공합니다. 우리는 모든 사람이 가진 재능의 가치를
            믿으며, 이를 통해 더 나은 세상을 만들어가고자 합니다.
          </p>
        </div>
      </Container>

      {/* 미션과 비전 */}
      <div className="bg-gray-50 py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <SectionTitle>미션</SectionTitle>
              <p className="text-gray-600 leading-relaxed">
                모든 사람이 자신의 재능으로 새로운 기회를 만들 수 있도록
                돕습니다. 우리는 재능의 가치가 공정하게 인정받는 플랫폼을
                만들어갑니다.
              </p>
            </div>
            <div>
              <SectionTitle>비전</SectionTitle>
              <p className="text-gray-600 leading-relaxed">
                재능과 시간이 모두에게 공정하고 가치 있게 활용되는 세상을
                만듭니다. 우리는 더 많은 사람들이 자신의 재능을 발견하고 성장할
                수 있도록 지원합니다.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* 서비스 차별점 */}
      <Container className="py-16">
        <SectionTitle>서비스 차별점</SectionTitle>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="text-[#00d4b3] mb-4">{feature.icon}</div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* 주요 연혁 */}
      <div className="bg-gray-50 py-16">
        <Container>
          <SectionTitle>주요 연혁</SectionTitle>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-[#00d4b3] text-white px-4 py-2 rounded-lg text-sm font-medium shrink-0">
                  {item.date}
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* 회사 위치 및 연락처 */}
      <Container className="py-16">
        <SectionTitle>연락처</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          {/* 지도 (예시) */}
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            지도가 표시될 영역
          </div>

          {/* 연락처 정보 */}
          <div className="space-y-6">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="text-[#00d4b3]">{contact.icon}</div>
                <div>
                  <h3 className="font-medium mb-1">{contact.title}</h3>
                  <p className="text-gray-600">{contact.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* CTA 섹션 */}
      <div className="bg-[#00d4b3] text-white py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              함께 성장하는 여정에 동참하세요
            </h2>
            <p className="text-lg mb-8 opacity-90">
              지금 바로 루프와 함께 새로운 가능성을 만들어보세요.
            </p>
            <button className="bg-white text-[#00d4b3] px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors inline-flex items-center gap-2">
              시작하기
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default AboutPage;
