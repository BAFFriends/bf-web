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
    description: 'React 기반 웹 서비스 개발 및 유지보수',
    requirements: ['React 3년 이상 경험', 'TypeScript 활용 가능', '웹 접근성 이해'],
    benefits: ['4대보험', '유연근무제', '장애인 편의시설 완비'],
    salary: '연봉 3,000~4,500만원',
    location: '서울시 강남구',
    workType: 'full-time',
    disabilityFriendly: true,
    status: 'published',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: '2',
    title: '백엔드 개발자 (장애인 채용)',
    description: 'Spring Boot 기반 API 개발 및 데이터베이스 관리',
    requirements: ['Java/Spring 5년 이상 경험', 'MySQL 활용 가능', '클라우드 경험 우대'],
    benefits: ['성과급', '교육비 지원', '장애인 콜택시 지원'],
    salary: '연봉 3,500~5,000만원',
    location: '서울시 서초구',
    workType: 'full-time',
    disabilityFriendly: true,
    status: 'published',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-15',
  },
  {
    id: '3',
    title: '데이터 분석가 (시각장애인 채용)',
    description: 'Python을 활용한 데이터 분석 및 시각화',
    requirements: ['Python 3년 이상 경험', 'SQL 활용 가능', '통계학 기초 지식'],
    benefits: ['재택근무 가능', '스크린리더 지원', '점자 자료 제공'],
    salary: '연봉 2,800~4,000만원',
    location: '서울시 마포구',
    workType: 'part-time',
    disabilityFriendly: true,
    status: 'draft',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
  },
];

class MockApiService {
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
      setTimeout(() => {
        const newPosting: JobPosting = {
          ...jobPosting,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockJobPostings.push(newPosting);
        resolve(newPosting);
      }, 300);
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