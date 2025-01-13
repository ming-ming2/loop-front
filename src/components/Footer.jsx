import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div>
            <Logo light scale={110} />
            <p className="mt-4 text-gray-400 text-sm">
              시간과 재능의 가치있는 교환
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-mint-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-mint-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-mint-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg">서비스</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/register"
                  className="hover:text-white transition-colors"
                >
                  재능 등록
                </Link>
              </li>
              <li>
                <Link
                  to="/exchange"
                  className="hover:text-white transition-colors"
                >
                  교환 찾기
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="hover:text-white transition-colors"
                >
                  후기/리뷰
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="hover:text-white transition-colors"
                >
                  커뮤니티
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg">고객지원</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/support"
                  className="hover:text-white transition-colors"
                >
                  고객센터
                </Link>
              </li>
              <li>
                <Link
                  to="/support#faq"
                  className="hover:text-white transition-colors"
                >
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link
                  to="/support#support"
                  className="hover:text-white transition-colors"
                >
                  문의하기
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg">회사소개</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  회사 소개
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-white transition-colors"
                >
                  채용 정보
                </Link>
              </li>
              <li>
                <Link
                  to="/newsroom"
                  className="hover:text-white transition-colors"
                >
                  뉴스룸
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
