export interface Resume {
  id: string;
  name: string;
  email: string;
  phone: string;
  disabilityType: string;
  disabilityGrade: string;
  experience: string;
  education: string;
  skills: string[];
  appliedPosition: string;
  appliedDate: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  documents: string[];
}

export interface Incentive {
  id: string;
  name: string;
  description: string;
  amount: number;
  eligibleConditions: string[];
  applicationDeadline: string;
  status: 'available' | 'applied' | 'approved' | 'expired';
  category: 'hiring' | 'training' | 'facility' | 'other';
}

export interface JobPosting {
  id: string;
  title: string;
  companyName: string;
  jobPosition: string;
  jobDescription: string;
  recruitmentCount: number;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  workingHours: string;
  workingDays: string;
  monthlySalary: string;
  educationLevel: 'elementary' | 'middle' | 'high' | 'college' | 'university' | 'graduate' | 'none';
  experienceLevel: 'none' | 'entry' | '1-3' | '3-5' | '5-10' | '10+';
  disabilityType: 'physical' | 'visual' | 'hearing' | 'intellectual' | 'mental' | 'multiple' | 'all';
  gender: 'male' | 'female' | 'any';
  ageRange: string;
  image?: string;
  status: 'draft' | 'published' | 'closed';
  createdAt: string;
  updatedAt: string;
  // LLM 분석 결과
  llmAnalyzed?: boolean;
  beforeLlm?: {
    jobPosition?: string;
    jobDescription?: string;
    recruitmentCount?: number;
    location?: string;
    disabilityType?: string;
  };
  afterLlm?: {
    jobPosition?: string;
    jobDescription?: string;
    recruitmentCount?: number;
    location?: string;
    disabilityType?: string;
    category?: string;
    detailedDescription?: string;
  };
}

class ApiService {
  private baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  async getResumes(): Promise<Resume[]> {
    return this.request<Resume[]>('/api/resumes');
  }

  async getResume(id: string): Promise<Resume> {
    return this.request<Resume>(`/api/resumes/${id}`);
  }

  async updateResumeStatus(id: string, status: Resume['status']): Promise<Resume> {
    return this.request<Resume>(`/api/resumes/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async getIncentives(): Promise<Incentive[]> {
    return this.request<Incentive[]>('/api/incentives');
  }

  async getJobPostings(): Promise<JobPosting[]> {
    return this.request<JobPosting[]>('/api/job-postings');
  }

  async createJobPosting(jobPosting: Omit<JobPosting, 'id' | 'createdAt' | 'updatedAt'>): Promise<JobPosting> {
    return this.request<JobPosting>('/api/job-postings', {
      method: 'POST',
      body: JSON.stringify(jobPosting),
    });
  }

  async updateJobPosting(id: string, jobPosting: Partial<JobPosting>): Promise<JobPosting> {
    return this.request<JobPosting>(`/api/job-postings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jobPosting),
    });
  }

  async deleteJobPosting(id: string): Promise<void> {
    return this.request<void>(`/api/job-postings/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();