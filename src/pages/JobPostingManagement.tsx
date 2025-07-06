import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { mockApiService } from '../services/mockData';
import { JobPosting } from '../services/api';

export default function JobPostingManagement() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [selectedPosting, setSelectedPosting] = useState<JobPosting | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [llmAnalyzing, setLlmAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    jobPosition: '',
    jobDescription: '',
    recruitmentCount: 1,
    location: '',
    employmentType: 'full-time' as JobPosting['employmentType'],
    workingHours: '',
    workingDays: '',
    monthlySalary: '',
    educationLevel: 'none' as JobPosting['educationLevel'],
    experienceLevel: 'none' as JobPosting['experienceLevel'],
    disabilityType: 'all' as JobPosting['disabilityType'],
    gender: 'any' as JobPosting['gender'],
    ageRange: '',
    image: '',
    status: 'draft' as JobPosting['status'],
  });

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const data = await mockApiService.getJobPostings();
      setJobPostings(data);
    } catch (error) {
      console.error('Failed to fetch job postings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setFormData({
      title: '',
      companyName: '',
      jobPosition: '',
      jobDescription: '',
      recruitmentCount: 1,
      location: '',
      employmentType: 'full-time',
      workingHours: '',
      workingDays: '',
      monthlySalary: '',
      educationLevel: 'none',
      experienceLevel: 'none',
      disabilityType: 'all',
      gender: 'any',
      ageRange: '',
      image: '',
      status: 'draft',
    });
    setEditMode(true);
    setViewMode(false);
    setSelectedPosting(null);
    setDialogOpen(true);
  };

  const handleEdit = (posting: JobPosting) => {
    setFormData({
      title: posting.title,
      companyName: posting.companyName,
      jobPosition: posting.jobPosition,
      jobDescription: posting.jobDescription,
      recruitmentCount: posting.recruitmentCount,
      location: posting.location,
      employmentType: posting.employmentType,
      workingHours: posting.workingHours,
      workingDays: posting.workingDays,
      monthlySalary: posting.monthlySalary,
      educationLevel: posting.educationLevel,
      experienceLevel: posting.experienceLevel,
      disabilityType: posting.disabilityType,
      gender: posting.gender,
      ageRange: posting.ageRange,
      image: posting.image || '',
      status: posting.status,
    });
    setSelectedPosting(posting);
    setEditMode(true);
    setViewMode(false);
    setDialogOpen(true);
  };

  const handleView = (posting: JobPosting) => {
    setSelectedPosting(posting);
    setViewMode(true);
    setEditMode(false);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const postingData = {
        ...formData,
        recruitmentCount: Number(formData.recruitmentCount),
      };

      if (selectedPosting) {
        const updatedPosting = await mockApiService.updateJobPosting(selectedPosting.id, postingData);
        setJobPostings(jobPostings.map(posting =>
          posting.id === selectedPosting.id ? updatedPosting : posting
        ));
      } else {
        // 새 채용공고 생성 시 LLM 분석 과정 표시
        setLlmAnalyzing(true);
        const newPosting = await mockApiService.createJobPosting(postingData);
        setLlmAnalyzing(false);
        await fetchJobPostings();
      }
      
      setDialogOpen(false);
      setEditMode(false);
      setViewMode(false);
      setSelectedPosting(null);
    } catch (error) {
      setLlmAnalyzing(false);
      console.error('Failed to save job posting:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('정말로 이 채용 공고를 삭제하시겠습니까?')) {
      try {
        await mockApiService.deleteJobPosting(id);
        setJobPostings(jobPostings.filter(posting => posting.id !== id));
      } catch (error) {
        console.error('Failed to delete job posting:', error);
      }
    }
  };

  const getStatusColor = (status: JobPosting['status']) => {
    switch (status) {
      case 'draft': return 'warning';
      case 'published': return 'success';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: JobPosting['status']) => {
    switch (status) {
      case 'draft': return '임시저장';
      case 'published': return '게시됨';
      case 'closed': return '마감됨';
      default: return status;
    }
  };

  const getEmploymentTypeText = (employmentType: JobPosting['employmentType']) => {
    switch (employmentType) {
      case 'full-time': return '정규직';
      case 'part-time': return '파트타임';
      case 'contract': return '계약직';
      case 'internship': return '인턴';
      default: return employmentType;
    }
  };

  const getEducationLevelText = (educationLevel: JobPosting['educationLevel']) => {
    switch (educationLevel) {
      case 'none': return '무관';
      case 'elementary': return '초등학교';
      case 'middle': return '중학교';
      case 'high': return '고등학교';
      case 'college': return '전문대학';
      case 'university': return '대학교';
      case 'graduate': return '대학원';
      default: return educationLevel;
    }
  };

  const getExperienceLevelText = (experienceLevel: JobPosting['experienceLevel']) => {
    switch (experienceLevel) {
      case 'none': return '무관';
      case 'entry': return '신입';
      case '1-3': return '1-3년';
      case '3-5': return '3-5년';
      case '5-10': return '5-10년';
      case '10+': return '10년 이상';
      default: return experienceLevel;
    }
  };

  const getDisabilityTypeText = (disabilityType: JobPosting['disabilityType']) => {
    switch (disabilityType) {
      case 'all': return '전체';
      case 'physical': return '지체';
      case 'visual': return '시각';
      case 'hearing': return '청각';
      case 'intellectual': return '지적';
      case 'mental': return '정신';
      case 'multiple': return '중복';
      default: return disabilityType;
    }
  };

  const getGenderText = (gender: JobPosting['gender']) => {
    switch (gender) {
      case 'male': return '남성';
      case 'female': return '여성';
      case 'any': return '무관';
      default: return gender;
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <Typography>로딩 중...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          채용 공고 관리
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          새 채용 공고 작성
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>제목</TableCell>
              <TableCell>회사명</TableCell>
              <TableCell>직무</TableCell>
              <TableCell>고용형태</TableCell>
              <TableCell>지역</TableCell>
              <TableCell>장애유형</TableCell>
              <TableCell>LLM 분석</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>액션</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobPostings.map((posting) => (
              <TableRow key={posting.id}>
                <TableCell>{posting.title}</TableCell>
                <TableCell>{posting.companyName}</TableCell>
                <TableCell>{posting.jobPosition}</TableCell>
                <TableCell>{getEmploymentTypeText(posting.employmentType)}</TableCell>
                <TableCell>{posting.location}</TableCell>
                <TableCell>
                  <Chip 
                    label={getDisabilityTypeText(posting.disabilityType)} 
                    color="primary"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={posting.llmAnalyzed ? 'LLM 분석 완료' : '분석 대기'} 
                    color={posting.llmAnalyzed ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={getStatusText(posting.status)} 
                    color={getStatusColor(posting.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{posting.createdAt}</TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => handleView(posting)}
                    size="small"
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleEdit(posting)}
                    size="small"
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(posting.id)}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {viewMode ? '채용 공고 상세' : editMode && selectedPosting ? '채용 공고 수정' : '새 채용 공고 작성'}
        </DialogTitle>
        <DialogContent>
          {viewMode && selectedPosting ? (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{selectedPosting.title}</Typography>
                    
                    {selectedPosting.llmAnalyzed ? (
                      <>
                        <Alert severity="success" sx={{ mb: 2 }}>
                          LLM 분석이 완료되었습니다
                        </Alert>
                        
                        <TableContainer component={Paper} sx={{ mb: 3 }}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell><strong>분류</strong></TableCell>
                                <TableCell><strong>LLM 전(수동입력)</strong></TableCell>
                                <TableCell><strong>LLM 후</strong></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>직무</TableCell>
                                <TableCell>{selectedPosting.beforeLlm?.jobPosition || '-'}</TableCell>
                                <TableCell>{selectedPosting.afterLlm?.jobPosition || '-'}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>업무</TableCell>
                                <TableCell>{selectedPosting.beforeLlm?.jobDescription || '-'}</TableCell>
                                <TableCell>{selectedPosting.afterLlm?.jobDescription || '-'}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>채용인원</TableCell>
                                <TableCell>{selectedPosting.beforeLlm?.recruitmentCount || 0}명</TableCell>
                                <TableCell>{selectedPosting.afterLlm?.recruitmentCount || 0}명</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>지역</TableCell>
                                <TableCell>{selectedPosting.beforeLlm?.location || '-'}</TableCell>
                                <TableCell>{selectedPosting.afterLlm?.location || '-'}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>고용형태</TableCell>
                                <TableCell>{getEmploymentTypeText(selectedPosting.employmentType)}</TableCell>
                                <TableCell>{getEmploymentTypeText(selectedPosting.employmentType)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>근무시간</TableCell>
                                <TableCell>{selectedPosting.workingHours || 'null'}</TableCell>
                                <TableCell>{selectedPosting.workingHours || 'null'}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>근무일</TableCell>
                                <TableCell>{selectedPosting.workingDays || 'null'}</TableCell>
                                <TableCell>{selectedPosting.workingDays || 'null'}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>월급</TableCell>
                                <TableCell>{selectedPosting.monthlySalary || 'null'}</TableCell>
                                <TableCell>{selectedPosting.monthlySalary || 'null'}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>학력사항</TableCell>
                                <TableCell>{getEducationLevelText(selectedPosting.educationLevel)}</TableCell>
                                <TableCell>{getEducationLevelText(selectedPosting.educationLevel)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>경력사항</TableCell>
                                <TableCell>{getExperienceLevelText(selectedPosting.experienceLevel)}</TableCell>
                                <TableCell>{getExperienceLevelText(selectedPosting.experienceLevel)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>장애유형</TableCell>
                                <TableCell>{selectedPosting.beforeLlm?.disabilityType || '-'}</TableCell>
                                <TableCell>{selectedPosting.afterLlm?.disabilityType || '-'}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>성별</TableCell>
                                <TableCell>{getGenderText(selectedPosting.gender)}</TableCell>
                                <TableCell>{getGenderText(selectedPosting.gender)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>연령</TableCell>
                                <TableCell>{selectedPosting.ageRange || '무관'}</TableCell>
                                <TableCell>{selectedPosting.ageRange || '무관'}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>직종</TableCell>
                                <TableCell>x 자동임</TableCell>
                                <TableCell>{selectedPosting.afterLlm?.category || '-'}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>

                        {selectedPosting.afterLlm?.detailedDescription && (
                          <>
                            <Typography variant="h6" gutterBottom>상세 분석 결과</Typography>
                            <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                              <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                                {selectedPosting.afterLlm.detailedDescription}
                              </Typography>
                            </Paper>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Typography variant="body2" color="textSecondary" paragraph>
                          {selectedPosting.jobDescription}
                        </Typography>
                        <Typography><strong>회사명:</strong> {selectedPosting.companyName}</Typography>
                        <Typography><strong>직무:</strong> {selectedPosting.jobPosition}</Typography>
                        <Typography><strong>채용인원:</strong> {selectedPosting.recruitmentCount}명</Typography>
                        <Typography><strong>지역:</strong> {selectedPosting.location}</Typography>
                        <Typography><strong>고용형태:</strong> {getEmploymentTypeText(selectedPosting.employmentType)}</Typography>
                        <Typography><strong>근무시간:</strong> {selectedPosting.workingHours}</Typography>
                        <Typography><strong>근무일:</strong> {selectedPosting.workingDays}</Typography>
                        <Typography><strong>월급:</strong> {selectedPosting.monthlySalary}</Typography>
                        <Typography><strong>학력사항:</strong> {getEducationLevelText(selectedPosting.educationLevel)}</Typography>
                        <Typography><strong>경력사항:</strong> {getExperienceLevelText(selectedPosting.experienceLevel)}</Typography>
                        <Typography><strong>장애유형:</strong> {getDisabilityTypeText(selectedPosting.disabilityType)}</Typography>
                        <Typography><strong>성별:</strong> {getGenderText(selectedPosting.gender)}</Typography>
                        <Typography><strong>연령:</strong> {selectedPosting.ageRange}</Typography>
                      </>
                    )}

                    {selectedPosting.image && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>이미지</Typography>
                        <img src={selectedPosting.image} alt="채용공고 이미지" style={{ maxWidth: '100%', height: 'auto' }} />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : editMode ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="제목"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="회사명"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="직무"
                  value={formData.jobPosition}
                  onChange={(e) => setFormData({ ...formData, jobPosition: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="채용인원"
                  type="number"
                  value={formData.recruitmentCount}
                  onChange={(e) => setFormData({ ...formData, recruitmentCount: Number(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="업무 내용"
                  multiline
                  rows={4}
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="지역"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>고용형태</InputLabel>
                  <Select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as JobPosting['employmentType'] })}
                  >
                    <MenuItem value="full-time">정규직</MenuItem>
                    <MenuItem value="part-time">파트타임</MenuItem>
                    <MenuItem value="contract">계약직</MenuItem>
                    <MenuItem value="internship">인턴</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="근무시간"
                  placeholder="예: 09:00 - 18:00"
                  value={formData.workingHours}
                  onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="근무일"
                  placeholder="예: 월-금"
                  value={formData.workingDays}
                  onChange={(e) => setFormData({ ...formData, workingDays: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="월급"
                  placeholder="예: 250만원"
                  value={formData.monthlySalary}
                  onChange={(e) => setFormData({ ...formData, monthlySalary: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>학력사항</InputLabel>
                  <Select
                    value={formData.educationLevel}
                    onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value as JobPosting['educationLevel'] })}
                  >
                    <MenuItem value="none">무관</MenuItem>
                    <MenuItem value="elementary">초등학교</MenuItem>
                    <MenuItem value="middle">중학교</MenuItem>
                    <MenuItem value="high">고등학교</MenuItem>
                    <MenuItem value="college">전문대학</MenuItem>
                    <MenuItem value="university">대학교</MenuItem>
                    <MenuItem value="graduate">대학원</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>경력사항</InputLabel>
                  <Select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as JobPosting['experienceLevel'] })}
                  >
                    <MenuItem value="none">무관</MenuItem>
                    <MenuItem value="entry">신입</MenuItem>
                    <MenuItem value="1-3">1-3년</MenuItem>
                    <MenuItem value="3-5">3-5년</MenuItem>
                    <MenuItem value="5-10">5-10년</MenuItem>
                    <MenuItem value="10+">10년 이상</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>장애유형</InputLabel>
                  <Select
                    value={formData.disabilityType}
                    onChange={(e) => setFormData({ ...formData, disabilityType: e.target.value as JobPosting['disabilityType'] })}
                  >
                    <MenuItem value="all">전체</MenuItem>
                    <MenuItem value="physical">지체</MenuItem>
                    <MenuItem value="visual">시각</MenuItem>
                    <MenuItem value="hearing">청각</MenuItem>
                    <MenuItem value="intellectual">지적</MenuItem>
                    <MenuItem value="mental">정신</MenuItem>
                    <MenuItem value="multiple">중복</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>성별</InputLabel>
                  <Select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as JobPosting['gender'] })}
                  >
                    <MenuItem value="any">무관</MenuItem>
                    <MenuItem value="male">남성</MenuItem>
                    <MenuItem value="female">여성</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="연령"
                  placeholder="예: 20-40세"
                  value={formData.ageRange}
                  onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="subtitle1">이미지</Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mb: 2 }}
                  >
                    이미지 업로드
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </Button>
                  {formData.image && (
                    <Box sx={{ mt: 2 }}>
                      <img src={formData.image} alt="미리보기" style={{ maxWidth: '200px', height: 'auto' }} />
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>상태</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as JobPosting['status'] })}
                  >
                    <MenuItem value="draft">임시저장</MenuItem>
                    <MenuItem value="published">게시</MenuItem>
                    <MenuItem value="closed">마감</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ) : null}
        </DialogContent>
        <DialogActions>
          {viewMode ? (
            <Button onClick={() => setDialogOpen(false)}>닫기</Button>
          ) : (
            <>
              <Button onClick={() => setDialogOpen(false)} disabled={llmAnalyzing}>취소</Button>
              <Button onClick={handleSave} variant="contained" disabled={llmAnalyzing}>
                {llmAnalyzing ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    LLM이 분석중입니다...
                  </>
                ) : (
                  '저장'
                )}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}