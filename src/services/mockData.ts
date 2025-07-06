import { Resume, Incentive, JobPosting } from './api';

export const mockResumes: Resume[] = [
  {
    id: '1',
    name: '김민수',
    email: 'kimminsu@email.com',
    phone: '010-1234-5678',
    disabilityType: '시각장애',
    disabilityGrade: '2급',
    experience: '5년',
    education: '대학교 졸업',
    skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS'],
    appliedPosition: '프론트엔드 개발자',
    appliedDate: '2024-01-15',
    status: 'pending',
    documents: ['resume.pdf', 'portfolio.pdf', 'certificate.pdf'],
  },
  {
    id: '2',
    name: '이영희',
    email: 'leeyh@email.com',
    phone: '010-9876-5432',
    disabilityType: '청각장애',
    disabilityGrade: '3급',
    experience: '3년',
    education: '대학교 졸업',
    skills: ['Java', 'Spring', 'MySQL', 'Git'],
    appliedPosition: '백엔드 개발자',
    appliedDate: '2024-01-18',
    status: 'reviewing',
    documents: ['resume.pdf', 'recommendation.pdf'],
  },
  {
    id: '3',
    name: '박지훈',
    email: 'parkjh@email.com',
    phone: '010-5555-7777',
    disabilityType: '지체장애',
    disabilityGrade: '4급',
    experience: '7년',
    education: '대학원 졸업',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    appliedPosition: '시니어 개발자',
    appliedDate: '2024-01-20',
    status: 'approved',
    documents: ['resume.pdf', 'portfolio.pdf'],
  },
];

export const mockIncentives: Incentive[] = [
  {
    id: '1',
    name: '장애인 고용 장려금',
    description: '장애인을 신규 채용한 사업주에게 지급하는 장려금',
    amount: 2400000,
    eligibleConditions: ['중증장애인 채용', '6개월 이상 계속 고용'],
    applicationDeadline: '2024-12-31',
    status: 'available',
    category: 'hiring',
  },
  {
    id: '2',
    name: '장애인 훈련수당',
    description: '장애인 직업능력개발 훈련비 지원',
    amount: 1200000,
    eligibleConditions: ['직업훈련 실시', '훈련생 80% 이상 수료'],
    applicationDeadline: '2024-06-30',
    status: 'applied',
    category: 'training',
  },
  {
    id: '3',
    name: '장애인 편의시설 설치비',
    description: '장애인 근무환경 개선을 위한 편의시설 설치비 지원',
    amount: 5000000,
    eligibleConditions: ['편의시설 설치', '장애인 근무자 3명 이상'],
    applicationDeadline: '2024-09-30',
    status: 'approved',
    category: 'facility',
  },
];

export const mockJobPostings: JobPosting[] = [
  {
    id: '1',
    title: '프론트엔드 개발자 (장애인 우대)',
    companyName: '(주)디지털소프트',
    jobPosition: '프론트엔드 개발자',
    jobDescription: 'React 기반 웹 서비스 개발 및 유지보수를 담당하게 됩니다. 접근성을 고려한 웹 애플리케이션 개발 경험이 있으신 분을 환영합니다.',
    recruitmentCount: 2,
    location: '서울시 강남구',
    employmentType: 'full-time',
    workingHours: '09:00 - 18:00',
    workingDays: '월~금',
    monthlySalary: '300만원',
    educationLevel: 'university',
    experienceLevel: '3-5',
    disabilityType: 'all',
    gender: 'any',
    ageRange: '25-40세',
    image: '',
    status: 'published',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    llmAnalyzed: false,
  },
  {
    id: '2',
    title: '백엔드 개발자 (장애인 채용)',
    companyName: '테크솔루션',
    jobPosition: '백엔드 개발자',
    jobDescription: 'Spring Boot 기반 API 개발 및 데이터베이스 관리 업무를 담당합니다. 클라우드 환경에서의 서비스 운영 경험이 있으신 분을 우대합니다.',
    recruitmentCount: 1,
    location: '서울시 서초구',
    employmentType: 'full-time',
    workingHours: '10:00 - 19:00',
    workingDays: '월~금',
    monthlySalary: '350만원',
    educationLevel: 'university',
    experienceLevel: '5-10',
    disabilityType: 'physical',
    gender: 'any',
    ageRange: '28-45세',
    image: '',
    status: 'published',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-15',
    llmAnalyzed: false,
  },
  {
    id: '3',
    title: '데이터 분석가 (시각장애인 채용)',
    companyName: '빅데이터솔루션',
    jobPosition: '데이터 분석가',
    jobDescription: 'Python을 활용한 데이터 분석 및 시각화 업무를 담당합니다. 스크린리더 사용 환경에서의 업무 수행이 가능하신 분을 모십니다.',
    recruitmentCount: 1,
    location: '서울시 마포구',
    employmentType: 'part-time',
    workingHours: '09:00 - 14:00',
    workingDays: '월~금',
    monthlySalary: '280만원',
    educationLevel: 'university',
    experienceLevel: '3-5',
    disabilityType: 'visual',
    gender: 'any',
    ageRange: '25-40세',
    image: '',
    status: 'draft',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
    llmAnalyzed: false,
  },
];

class MockApiService {
  // LLM 분석 시뮬레이션
  private simulateLLMAnalysis(posting: any): any {
    // 실제로는 LLM API를 호출하겠지만, 지금은 시뮬레이션
    const beforeData = {
      jobPosition: posting.jobPosition || '사원급',
      jobDescription: posting.jobDescription || '팀원',
      recruitmentCount: posting.recruitmentCount || 47,
      location: posting.location || '서울 강남구, 부산',
      disabilityType: posting.disabilityType === 'all' ? '장애정도 무관' : posting.disabilityType,
    };

    const afterData = {
      jobPosition: '카지노 영업지원, 카지노 안전관리',
      jobDescription: '카지노회계, 칩스, 전자게임',
      recruitmentCount: 4,
      location: '서울 강남구',
      disabilityType: '색맹, 색약 지원불가',
      category: '서비스 > 호텔·리조트·숙박, 고객상담·리서치·영업 > 영업관리·지원',
      detailedDescription: `✅ [모집 대상에 대한 명시]
• 구분: 「장애인고용촉진 및 직업재활법」 제2조 제1호에 따른 장애인
• 응시자격: 위 법령에 해당하는 등록 장애인에 한하여 지원 가능
• 우대사항:
    ◦ 장애인 제한 채용 또는 장애인 우대 채용 형태로 진행
    ◦ (공고 내 표기: 일부 직무는 "장애인만 응시 가능"으로 명시되어 있음)

✅ [모집직무 및 인원 중 장애인 대상]
• 모집직군:
    ◦ 카지노 영업지원, 카지노 안전관리 장애인만 응시 가능
• 모집인원:
    ◦ 총 4명
• 근무지역:
    ◦ 본사(서울)

✅ [전형절차 및 가점 안내 – 장애인 관련 내용]
• 서류전형 → 필기전형 → 면접전형 단계에서
    ◦ 장애인 응시자는 관련 법령에 따른 가점 부여:
        ▪ 서류전형 가점: 없음 (정량평가 기준으로 진행)
        ▪ 필기전형 가점:
            • 장애인 응시자 전원에게 만점의 10% 가점 부여
            • 단, 과락 과목 존재 시 가점 적용 불가
        ▪ 면접전형 가점:
            • 없음 (면접은 정성 평가로만 이루어짐)

✅ [장애인 응시자 편의지원 안내]
• 편의지원 제공 가능:
    ◦ 신청자에 한하여 제공되며, 신청 방법은 다음과 같음:
        1. 원서접수 시 [장애인 편의지원 요청서]를 첨부
        2. 의료기관 진단서 등 증빙서류 함께 제출
• 제공 가능한 예시:
    ◦ 휠체어 접근 가능한 시험장
    ◦ 시험 시간 연장
    ◦ 점자 문제지, 확대문제지 제공 등
• 신청기한: 원서 접수 마감일까지

✅ [기타 유의사항]
• 장애인 증빙은 필기전형 전까지 제출
• 불합격 기준:
    ◦ 지원자격 미달
    ◦ 제출서류 미비
    ◦ 허위 기재 시 불합격 처리`
    };

    return {
      ...posting,
      llmAnalyzed: true,
      beforeLlm: beforeData,
      afterLlm: afterData,
      // LLM 분석 후 기본 데이터도 업데이트
      jobPosition: afterData.jobPosition,
      jobDescription: afterData.jobDescription,
      recruitmentCount: afterData.recruitmentCount,
      location: afterData.location,
      educationLevel: 'none',
      experienceLevel: 'none',
      disabilityType: 'multiple', // 색맹, 색약은 multiple로 분류
      gender: 'any',
      ageRange: '무관',
    };
  }

  async getResumes(): Promise<Resume[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockResumes), 500);
    });
  }

  async getResume(id: string): Promise<Resume> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const resume = mockResumes.find(r => r.id === id);
        if (resume) {
          resolve(resume);
        } else {
          reject(new Error('Resume not found'));
        }
      }, 300);
    });
  }

  async updateResumeStatus(id: string, status: Resume['status']): Promise<Resume> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const resumeIndex = mockResumes.findIndex(r => r.id === id);
        if (resumeIndex !== -1) {
          mockResumes[resumeIndex].status = status;
          resolve(mockResumes[resumeIndex]);
        } else {
          reject(new Error('Resume not found'));
        }
      }, 300);
    });
  }

  async getIncentives(): Promise<Incentive[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockIncentives), 500);
    });
  }

  async getJobPostings(): Promise<JobPosting[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockJobPostings), 500);
    });
  }

  async createJobPosting(jobPosting: Omit<JobPosting, 'id' | 'createdAt' | 'updatedAt'>): Promise<JobPosting> {
    return new Promise(resolve => {
      // LLM 분석 시뮬레이션 (5초 지연)
      setTimeout(() => {
        const basePosting: JobPosting = {
          ...jobPosting,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        // LLM 분석 실행
        const analyzedPosting = this.simulateLLMAnalysis(basePosting);
        mockJobPostings.push(analyzedPosting);
        resolve(analyzedPosting);
      }, 5000); // 5초 지연
    });
  }

  // LLM 분석 진행상황을 확인하는 메서드 (선택사항)
  async checkLLMAnalysisStatus(id: string): Promise<{ analyzing: boolean; progress: number }> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ analyzing: false, progress: 100 });
      }, 100);
    });
  }

  async updateJobPosting(id: string, jobPosting: Partial<JobPosting>): Promise<JobPosting> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const postingIndex = mockJobPostings.findIndex(p => p.id === id);
        if (postingIndex !== -1) {
          mockJobPostings[postingIndex] = {
            ...mockJobPostings[postingIndex],
            ...jobPosting,
            updatedAt: new Date().toISOString(),
          };
          resolve(mockJobPostings[postingIndex]);
        } else {
          reject(new Error('Job posting not found'));
        }
      }, 300);
    });
  }

  async deleteJobPosting(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const postingIndex = mockJobPostings.findIndex(p => p.id === id);
        if (postingIndex !== -1) {
          mockJobPostings.splice(postingIndex, 1);
          resolve();
        } else {
          reject(new Error('Job posting not found'));
        }
      }, 300);
    });
  }
}

export const mockApiService = new MockApiService();