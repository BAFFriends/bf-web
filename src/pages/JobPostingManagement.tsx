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
  Grid,
  Card,
  CardContent,
  IconButton,
  Fab,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Visibility as VisibilityIcon 
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
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    benefits: '',
    salary: '',
    location: '',
    workType: 'full-time' as JobPosting['workType'],
    disabilityFriendly: true,
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
      description: '',
      requirements: '',
      benefits: '',
      salary: '',
      location: '',
      workType: 'full-time',
      disabilityFriendly: true,
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
      description: posting.description,
      requirements: posting.requirements.join('\n'),
      benefits: posting.benefits.join('\n'),
      salary: posting.salary,
      location: posting.location,
      workType: posting.workType,
      disabilityFriendly: posting.disabilityFriendly,
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
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        benefits: formData.benefits.split('\n').filter(b => b.trim()),
      };

      if (selectedPosting) {
        const updatedPosting = await mockApiService.updateJobPosting(selectedPosting.id, postingData);
        setJobPostings(jobPostings.map(posting =>
          posting.id === selectedPosting.id ? updatedPosting : posting
        ));
      } else {
        const newPosting = await mockApiService.createJobPosting(postingData);
        await fetchJobPostings(); // Fetch fresh data to avoid duplicates
      }
      
      setDialogOpen(false);
      setEditMode(false);
      setViewMode(false);
      setSelectedPosting(null);
    } catch (error) {
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

  const getWorkTypeText = (workType: JobPosting['workType']) => {
    switch (workType) {
      case 'full-time': return '정규직';
      case 'part-time': return '파트타임';
      case 'contract': return '계약직';
      default: return workType;
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
              <TableCell>근무 형태</TableCell>
              <TableCell>위치</TableCell>
              <TableCell>장애인 친화</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>액션</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobPostings.map((posting) => (
              <TableRow key={posting.id}>
                <TableCell>{posting.title}</TableCell>
                <TableCell>{getWorkTypeText(posting.workType)}</TableCell>
                <TableCell>{posting.location}</TableCell>
                <TableCell>
                  <Chip 
                    label={posting.disabilityFriendly ? '예' : '아니오'} 
                    color={posting.disabilityFriendly ? 'success' : 'default'}
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
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {selectedPosting.description}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>요구사항</Typography>
                    <ul>
                      {selectedPosting.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                    <Typography variant="subtitle1" gutterBottom>혜택</Typography>
                    <ul>
                      {selectedPosting.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                    <Typography><strong>급여:</strong> {selectedPosting.salary}</Typography>
                    <Typography><strong>위치:</strong> {selectedPosting.location}</Typography>
                    <Typography><strong>근무 형태:</strong> {getWorkTypeText(selectedPosting.workType)}</Typography>
                    <Typography><strong>장애인 친화:</strong> {selectedPosting.disabilityFriendly ? '예' : '아니오'}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : editMode ? (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="제목"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="설명"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="요구사항 (한 줄씩 입력)"
                  multiline
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="혜택 (한 줄씩 입력)"
                  multiline
                  rows={4}
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="급여"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="위치"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>근무 형태</InputLabel>
                  <Select
                    value={formData.workType}
                    onChange={(e) => setFormData({ ...formData, workType: e.target.value as JobPosting['workType'] })}
                  >
                    <MenuItem value="full-time">정규직</MenuItem>
                    <MenuItem value="part-time">파트타임</MenuItem>
                    <MenuItem value="contract">계약직</MenuItem>
                  </Select>
                </FormControl>
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
              <Button onClick={() => setDialogOpen(false)}>취소</Button>
              <Button onClick={handleSave} variant="contained">저장</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}