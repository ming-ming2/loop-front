import React, { useState } from "react";
import { Edit, Trash2, AlertCircle } from "lucide-react";

const mockSkills = [
  {
    id: 1,
    title: "기타 레슨 초급반",
    category: "레슨/교육",
    hourlyRate: 10000,
    description: "초급자를 대상으로 기타 연주법을 1시간 동안 지도합니다.",
    requestCount: 5,
  },
  {
    id: 2,
    title: "영어 회화 수업",
    category: "레슨/교육",
    hourlyRate: 15000,
    description: "비즈니스 영어 회화를 원어민 수준으로 가르쳐드립니다.",
    requestCount: 8,
  },
];

const SkillCard = ({ skill, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-mint-500 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div>
        <span className="bg-mint-50 text-mint-600 text-sm px-3 py-1 rounded-full">
          {skill.category}
        </span>
        <h3 className="text-lg font-bold mt-2">{skill.title}</h3>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(skill)}
          className="p-2 text-gray-400 hover:text-mint-500 transition-colors"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(skill)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
      {skill.description}
    </p>
    <div className="flex justify-between items-center text-sm">
      <span className="font-medium text-gray-900">
        {skill.hourlyRate.toLocaleString()}원/시간
      </span>
      <span className="text-gray-500">총 {skill.requestCount}번 요청됨</span>
    </div>
  </div>
);

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 max-w-sm w-full m-4">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
          <h3 className="text-lg font-bold">스킬 삭제</h3>
        </div>
        <p className="text-gray-600 mb-6">정말 이 스킬을 삭제하시겠습니까?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

const SkillList = () => {
  const [skills] = useState(mockSkills);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    skill: null,
  });

  const handleEdit = (skill) => {
    console.log("Edit skill:", skill);
    // TODO: Implement edit functionality
  };

  const handleDelete = (skill) => {
    setDeleteModal({ isOpen: true, skill });
  };

  const confirmDelete = () => {
    console.log("Delete skill:", deleteModal.skill);
    // TODO: Implement delete functionality
    setDeleteModal({ isOpen: false, skill: null });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">내 스킬 관리</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, skill: null })}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default SkillList;
