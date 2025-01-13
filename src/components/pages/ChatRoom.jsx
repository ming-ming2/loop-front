import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MoreVertical,
  Image as ImageIcon,
  Send,
  Smile,
  DollarSign,
  Star,
  Check,
  CheckCheck
} from 'lucide-react';
import Layout from '../Layout';

// 임시 데이터
const chatData = {
  partner: {
    id: 1,
    name: "김서연",
    profileImage: "/api/placeholder/40/40",
    rating: 4.8,
    skill: "React 개발 멘토링",
    status: "진행 중"
  },
  messages: [
    {
      id: 1,
      type: "text",
      content: "안녕하세요, React 멘토링 문의드립니다!",
      sender: "other",
      timestamp: "2025-01-12T14:30:00",
      read: true
    },
    {
      id: 2,
      type: "text",
      content: "네, 안녕하세요! 어떤 부분에 대해 도움이 필요하신가요?",
      sender: "me",
      timestamp: "2025-01-12T14:32:00",
      read: true
    },
    {
      id: 3,
      type: "system",
      content: "거래가 시작되었습니다.",
      timestamp: "2025-01-12T14:35:00"
    },
    {
      id: 4,
      type: "tt",
      amount: 15000,
      sender: "other",
      timestamp: "2025-01-12T14:36:00",
      read: true
    },
    {
      id: 5,
      type: "image",
      content: "/api/placeholder/200/150",
      sender: "other",
      timestamp: "2025-01-12T14:38:00",
      read: true
    }
  ]
};

const ChatRoom = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // 스크롤을 항상 최하단으로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatData.messages]);

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // TODO: 메시지 전송 로직
    setMessage('');
  };

  // 키보드 이벤트 핸들러
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 날짜 포맷팅 헬퍼 함수
  const formatMessageDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Layout>
      <div className="min-h-screen pt-[var(--header-height)] flex flex-col bg-gray-50">
        {/* 채팅방 헤더 */}
        <div className="fixed top-[var(--header-height)] left-0 right-0 bg-white border-b z-10">
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                  <img
                    src={chatData.partner.profileImage}
                    alt={chatData.partner.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {chatData.partner.name}
                      </span>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-[#00d4b3] fill-current" />
                        <span>{chatData.partner.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">
                        {chatData.partner.skill}
                      </span>
                      <span className="text-[#00d4b3]">
                        {chatData.partner.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
