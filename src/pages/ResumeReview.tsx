import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { mockApiService } from '../services/mockData';
import { Resume } from '../services/api';

export default function ResumeReview() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await mockApiService.getResumes();
      setResumes(data);
    } catch (error) {
      console.error('Failed to fetch resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (resumeId: string, newStatus: Resume['status']) => {
    try {
      await mockApiService.updateResumeStatus(resumeId, newStatus);
      setResumes(resumes.map(resume => 
        resume.id === resumeId ? { ...resume, status: newStatus } : resume
      ));
      if (selectedResume && selectedResume.id === resumeId) {
        setSelectedResume({ ...selectedResume, status: newStatus });
      }
    } catch (error) {
      console.error('Failed to update resume status:', error);
    }
  };

  const handleViewDetails = (resume: Resume) => {
    setSelectedResume(resume);
    setDialogOpen(true);
  };

  const getStatusColor = (status: Resume['status']) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'reviewing': return 'info';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: Resume['status']) => {
    switch (status) {
      case 'pending': return '대기';
      case 'reviewing': return '검토 중';
      case 'approved': return '승인';
      case 'rejected': return '거절';
      default: return status;
    }
  };

  if (loading) {
    return <Typography>로딩 중...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        이력서 검토
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell>지원 직무</TableCell>
              <TableCell>장애 유형</TableCell>
              <TableCell>장애 등급</TableCell>
              <TableCell>지원일</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>액션</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resumes.map((resume) => (
              <TableRow key={resume.id}>
                <TableCell>{resume.name}</TableCell>
                <TableCell>{resume.appliedPosition}</TableCell>
                <TableCell>{resume.disabilityType}</TableCell>
                <TableCell>{resume.disabilityGrade}</TableCell>
                <TableCell>{resume.appliedDate}</TableCell>
                <TableCell>
                  <Chip 
                    label={getStatusText(resume.status)} 
                    color={getStatusColor(resume.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => handleViewDetails(resume)}
                    size="small"
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>이력서 상세 정보</DialogTitle>
        <DialogContent>
          {selectedResume && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>기본 정보</Typography>
                    <Typography><strong>이름:</strong> {selectedResume.name}</Typography>
                    <Typography><strong>이메일:</strong> {selectedResume.email}</Typography>
                    <Typography><strong>전화번호:</strong> {selectedResume.phone}</Typography>
                    <Typography><strong>지원 직무:</strong> {selectedResume.appliedPosition}</Typography>
                    <Typography><strong>지원일:</strong> {selectedResume.appliedDate}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>장애 정보</Typography>
                    <Typography><strong>장애 유형:</strong> {selectedResume.disabilityType}</Typography>
                    <Typography><strong>장애 등급:</strong> {selectedResume.disabilityGrade}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>경력 및 교육</Typography>
                    <Typography><strong>경력:</strong> {selectedResume.experience}</Typography>
                    <Typography><strong>학력:</strong> {selectedResume.education}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>기술 스택</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedResume.skills.map((skill, index) => (
                        <Chip key={index} label={skill} variant="outlined" size="small" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>첨부 서류</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedResume.documents.map((doc, index) => (
                        <Button key={index} variant="outlined" size="small">
                          {doc}
                        </Button>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>상태 변경</Typography>
                    <FormControl fullWidth>
                      <InputLabel>상태 변경</InputLabel>
                      <Select
                        value={selectedResume.status}
                        onChange={(e) => handleStatusChange(selectedResume.id, e.target.value as Resume['status'])}
                      >
                        <MenuItem value="pending">대기</MenuItem>
                        <MenuItem value="reviewing">검토 중</MenuItem>
                        <MenuItem value="approved">승인</MenuItem>
                        <MenuItem value="rejected">거절</MenuItem>
                      </Select>
                    </FormControl>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}