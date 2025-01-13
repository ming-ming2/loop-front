import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  MoreVertical,
  Star,
  Image as ImageIcon,
  Send,
  Smile,
  Clock,
  Check,
  CheckCheck,
  Paperclip,
  Coins,
  X,
} from "lucide-react";

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const chatContainerRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "text",
      content: "안녕하세요! UI/UX 디자인 교환 관련해서 문의드립니다.",
      sender: "me",
      timestamp: "오후 2:30",
      status: "read",
    },
    {
      id: 2,
      type: "text",
      content: "네, 안녕하세요! 어떤 부분이 궁금하신가요?",
      sender: "other",
      timestamp: "오후 2:31",
    },
    {
      id: 3,
      type: "text",
      content: "제가 리액트 개발을 알려드리고, UI/UX 디자인을 배우고 싶습니다.",
      sender: "me",
      timestamp: "오후 2:32",
      status: "read",
    },
    {
      id: 4,
      type: "system",
      content: "거래가 시작되었습니다.",
      timestamp: "오후 2:33",
    },
    {
      id: 5,
      type: "file",
      content: "포트폴리오.pdf",
      fileSize: "2.5MB",
      sender: "other",
      timestamp: "오후 2:34",
    },
    {
      id: 6,
      type: "token",
      content: "10 T.T 송금 완료",
      sender: "me",
      timestamp: "오후 2:35",
      status: "read",
    },
  ]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "text",
        content: message,
        sender: "me",
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        status: "sent",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const MessageBubble = ({ message }) => {
    if (message.type === "system") {
      return (
        <div className="flex justify-center my-4">
          <div className="bg-gray-100 text-gray-500 text-sm px-3 py-1 rounded-full">
            {message.content}
          </div>
        </div>
      );
    }

    const isMe = message.sender === "me";

    return (
      <div className={`flex gap-3 mb-4 ${isMe ? "flex-row-reverse" : ""}`}>
        {!isMe && (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mt-1">
            <img
              src="/loop-front/profile.png"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        )}

        <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
          {message.type === "text" && (
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                isMe
                  ? "bg-[#00d4b3] text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              {message.content}
            </div>
          )}

          {message.type === "file" && (
            <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#e6f7f4] rounded-lg flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-[#00d4b3]" />
              </div>
              <div>
                <p className="font-medium text-sm">{message.content}</p>
                <p className="text-gray-400 text-xs">{message.fileSize}</p>
              </div>
            </div>
          )}

          {message.type === "token" && (
            <div className="bg-[#e6f7f4] text-[#00d4b3] px-4 py-2 rounded-2xl flex items-center gap-2">
              <Coins className="w-4 h-4" />
              {message.content}
            </div>
          )}

          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-gray-400">{message.timestamp}</span>
            {isMe && message.status && (
              <span className="text-xs text-gray-400">
                {message.status === "sent" && <Check className="w-3 h-3" />}
                {message.status === "read" && (
                  <CheckCheck className="w-3 h-3" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto relative min-h-screen">
        {/* Header */}
        <div className="fixed top-16 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-white border-b z-20">
          <div className="h-16 px-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200">
                  <img
                    src="/loop-front/profile.png"
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h2 className="font-medium">김디자이너</h2>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-4 h-4 text-[#00d4b3] fill-current" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">UI/UX 디자인 · 진행중</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowDetailModal(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div
          ref={chatContainerRef}
          className="pt-32 pb-20 h-screen overflow-y-auto"
        >
          <div className="px-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl border-t bg-white">
          <div className="px-4 py-3">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요"
                  className="w-full bg-gray-100 rounded-2xl px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-[#00d4b3] focus:bg-white transition-colors text-sm min-h-[46px] max-h-32"
                  style={{ height: "46px" }}
                />
                <div className="absolute right-3 bottom-2.5 flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <Smile className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <Paperclip className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <Coins className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="p-2.5 bg-[#00d4b3] text-white rounded-xl hover:bg-[#00b298] disabled:opacity-50 disabled:hover:bg-[#00d4b3]"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">거래 상세</h3>
                <button onClick={() => setShowDetailModal(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-500 mb-1">거래 상태</h4>
                  <div className="flex items-center gap-2 text-[#00d4b3]">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">진행중</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 mb-1">제공 스킬</h4>
                  <p className="font-medium">UI/UX 디자인</p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 mb-1">요청 스킬</h4>
                  <p className="font-medium">React 개발</p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 mb-1">요청 일시</h4>
                  <p className="font-medium">2024년 1월 13일</p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  className="flex-1 py-2.5 border border-[#00d4b3] text-[#00d4b3] rounded-lg hover:bg-[#e6f7f4]"
                  onClick={() => setShowDetailModal(false)}
                >
                  취소
                </button>
                <button className="flex-1 py-2.5 bg-[#00d4b3] text-white rounded-lg hover:bg-[#00b298]">
                  거래 완료
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
