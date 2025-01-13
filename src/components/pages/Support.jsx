import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import FAQ from "./FAQ";
import SupportForm from "../support/SupportForm";
import TermsModal from "../auth/TermsModal";

const Support = () => {
  const [isTermsModalOpen, setIsTermsModalOpen] = React.useState(false);

  return (
    <div className="pt-20">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            <a
              href="#faq"
              className="text-gray-600 hover:text-mint-500 font-medium"
            >
              FAQ
            </a>
            <a
              href="#support"
              className="text-gray-600 hover:text-mint-500 font-medium"
            >
              문의하기
            </a>
            <button
              onClick={() => setIsTermsModalOpen(true)}
              className="text-gray-600 hover:text-mint-500 font-medium"
            >
              서비스 정책
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-mint text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">FAQ 및 고객 지원</h1>
          <p className="text-lg opacity-90">
            스와프 서비스 이용에 궁금한 점이 있으신가요?
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Support Form Section */}
      <SupportForm />

      {/* Terms Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-gray-600">
                <p>support@swap.com</p>
                <p>고객센터: 123-456-7890</p>
              </div>
              <div className="flex space-x-4">
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Support;
