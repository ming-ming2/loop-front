// src/mocks/categoriesData.js

export const CATEGORIES_DATA = {
  lesson: {
    id: "lesson",
    name: "레슨/교육",
    icon: "📚",
    subCategories: {
      language: {
        name: "외국어",
        skills: [
          "영어 회화",
          "토익/토플",
          "중국어",
          "일본어",
          "프랑스어",
          "기타",
        ],
      },
      music: {
        name: "음악",
        skills: [
          "피아노",
          "기타 연주",
          "바이올린",
          "드럼",
          "보컬 트레이닝",
          "기타",
        ],
      },
      sports: {
        name: "스포츠",
        skills: [
          "요가",
          "필라테스",
          "헬스/퍼스널 트레이닝",
          "골프",
          "축구",
          "기타",
        ],
      },
      art: {
        name: "미술/디자인",
        skills: ["드로잉/스케치", "회화", "캘리그라피", "만화/웹툰", "기타"],
      },
      hobby: {
        name: "취미/자격증",
        skills: ["요리", "플라워 디자인", "DIY/공예", "바리스타", "기타"],
      },
      etc: {
        name: "기타",
        skills: ["기타"],
      },
    },
  },
  it: {
    id: "it",
    name: "IT/기술",
    icon: "💻",
    subCategories: {
      programming: {
        name: "프로그래밍",
        skills: [
          "웹 개발(HTML/CSS, JavaScript)",
          "앱 개발(Android/iOS)",
          "데이터 분석",
          "기타",
        ],
      },
      design: {
        name: "디자인",
        skills: ["UI/UX 디자인", "영상 편집", "애니메이션", "기타"],
      },
      support: {
        name: "기술 지원",
        skills: ["컴퓨터 조립/수리", "네트워크 설치", "기타"],
      },
      etc: {
        name: "기타",
        skills: ["기타"],
      },
    },
  },
  life: {
    id: "life",
    name: "생활 도움",
    icon: "🏠",
    subCategories: {
      cleaning: {
        name: "청소/정리",
        skills: ["집 청소", "정리/수납", "기타"],
      },
      pet: {
        name: "반려동물",
        skills: ["강아지 산책", "펫 시팅", "기타"],
      },
      cooking: {
        name: "요리/음식 준비",
        skills: ["맞춤형 요리", "도시락 준비", "기타"],
      },
      etc: {
        name: "기타",
        skills: ["기타"],
      },
    },
  },
  art: {
    id: "art",
    name: "예술/창작",
    icon: "🎨",
    subCategories: {
      photo: {
        name: "사진/영상",
        skills: ["프로필 촬영", "웨딩 촬영", "영상 편집", "기타"],
      },
      writing: {
        name: "글쓰기",
        skills: ["에세이 작성", "블로그 콘텐츠 제작", "기타"],
      },
      performance: {
        name: "공연",
        skills: ["연기/스피치", "마술", "춤/댄스", "기타"],
      },
      etc: {
        name: "기타",
        skills: ["기타"],
      },
    },
  },
  moving: {
    id: "moving",
    name: "이사/설치",
    icon: "🚛",
    subCategories: {
      transport: {
        name: "운송",
        skills: ["소형 이사", "가구 이동", "기타"],
      },
      installation: {
        name: "설치",
        skills: ["가구 조립", "전자제품 설치", "기타"],
      },
      etc: {
        name: "기타",
        skills: ["기타"],
      },
    },
  },
  career: {
    id: "career",
    name: "취업/직무",
    icon: "💼",
    subCategories: {
      jobprep: {
        name: "취업 준비",
        skills: ["이력서/자소서 작성", "모의 면접", "기타"],
      },
      workskill: {
        name: "업무 스킬",
        skills: ["엑셀/파워포인트", "데이터 정리", "기타"],
      },
      etc: {
        name: "기타",
        skills: ["기타"],
      },
    },
  },
  tutoring: {
    id: "tutoring",
    name: "과외",
    icon: "📖",
    subCategories: {
      math: {
        name: "수학",
        skills: ["초등/중등/고등 수학", "기타"],
      },
      science: {
        name: "과학",
        skills: ["물리", "화학", "기타"],
      },
      social: {
        name: "사회",
        skills: ["역사", "경제", "기타"],
      },
      language: {
        name: "언어",
        skills: ["국어/논술", "영어", "기타"],
      },
      etc: {
        name: "기타",
        skills: ["기타"],
      },
    },
  },
  beauty: {
    id: "beauty",
    name: "이벤트/뷰티",
    icon: "💅",
    subCategories: {
      event: {
        name: "이벤트 준비",
        skills: ["파티 플래닝", "웨딩 플래닝", "기타"],
      },
      beauty: {
        name: "뷰티",
        skills: ["메이크업", "헤어 스타일링", "네일아트", "기타"],
      },
      etc: {
        name: "기타",
        skills: ["기타"],
      },
    },
  },
  car: {
    id: "car",
    name: "자동차",
    icon: "🚗",
    subCategories: {
      maintenance: {
        name: "정비/수리",
        skills: ["차량 점검", "기타"],
      },
      driving: {
        name: "운전 대행",
        skills: ["장거리 운전", "대리 운전", "기타"],
      },
      etc: {
        name: "기타",
        skills: ["기타"],
      },
    },
  },
  etc: {
    id: "etc",
    name: "기타",
    icon: "✨",
    subCategories: {
      lifeservice: {
        name: "기타 생활 서비스",
        skills: ["꽃배달", "의류 수선", "기타"],
      },
      general: {
        name: "전문적이지 않은 스킬",
        skills: ["지역 안내", "심부름", "기타"],
      },
      etc: {
        name: "기타",
        skills: ["기타"],
      },
    },
  },
};

// 더미 스킬 데이터 생성 함수
const generateDummySkills = (count = 50) => {
  const locations = [
    "서울 강남구",
    "서울 서초구",
    "서울 마포구",
    "서울 송파구",
    "경기 성남시",
    "경기 수원시",
  ];
  const availabilities = [
    "평일 종일",
    "주말만",
    "평일 저녁",
    "시간 협의",
    "즉시 가능",
  ];
  const ratings = [4.5, 4.6, 4.7, 4.8, 4.9, 5.0];

  return Array.from({ length: count }, (_, i) => {
    // 랜덤하게 카테고리 선택
    const categoryKeys = Object.keys(CATEGORIES_DATA);
    const randomCategory =
      CATEGORIES_DATA[
        categoryKeys[Math.floor(Math.random() * categoryKeys.length)]
      ];
    const subCategoryKeys = Object.keys(randomCategory.subCategories);
    const randomSubCategory =
      randomCategory.subCategories[
        subCategoryKeys[Math.floor(Math.random() * subCategoryKeys.length)]
      ];

    // 랜덤하게 스킬 선택
    const randomSkill =
      randomSubCategory.skills[
        Math.floor(Math.random() * randomSubCategory.skills.length)
      ];

    return {
      id: i + 1,
      title: `${randomSkill} 전문 강사`,
      user: {
        name: `User${i + 1}`,
        image: `/api/placeholder/48/48`,
        rating: ratings[Math.floor(Math.random() * ratings.length)],
        reviews: Math.floor(Math.random() * 200) + 1,
        location: locations[Math.floor(Math.random() * locations.length)],
      },
      category: randomCategory.id,
      subCategory: randomSubCategory.name,
      skill: randomSkill,
      price: `${(Math.floor(Math.random() * 10) + 1) * 10000} T.T`,
      availability:
        availabilities[Math.floor(Math.random() * availabilities.length)],
      tags: [
        randomSkill,
        randomSubCategory.name,
        `${Math.floor(Math.random() * 5) + 1}년 경력`,
      ],
      description: `${randomSkill} 관련 전문 강의를 제공합니다. ${
        Math.floor(Math.random() * 10) + 1
      }년 경력을 바탕으로 맞춤형 수업을 진행합니다.`,
    };
  });
};

export const DUMMY_SKILLS = generateDummySkills(50);
