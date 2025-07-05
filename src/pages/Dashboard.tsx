import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
} from '@mui/material';
import { mockApiService } from '../services/mockData';
import { Resume, Incentive, JobPosting } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalResumes: 0,
    pendingResumes: 0,
    approvedResumes: 0,
    totalIncentives: 0,
    availableIncentives: 0,
    totalJobPostings: 0,
    publishedJobPostings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resumes, incentives, jobPostings] = await Promise.all([
          mockApiService.getResumes(),
          mockApiService.getIncentives(),
          mockApiService.getJobPostings(),
        ]);

        setStats({
          totalResumes: resumes.length,
          pendingResumes: resumes.filter(r => r.status === 'pending').length,
          approvedResumes: resumes.filter(r => r.status === 'approved').length,
          totalIncentives: incentives.length,
          availableIncentives: incentives.filter(i => i.status === 'available').length,
          totalJobPostings: jobPostings.length,
          publishedJobPostings: jobPostings.filter(j => j.status === 'published').length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: '총 이력서',
      value: stats.totalResumes,
      subtitle: `대기 중: ${stats.pendingResumes}`,
      color: '#1976d2',
    },
    {
      title: '승인된 이력서',
      value: stats.approvedResumes,
      subtitle: '최종 승인 완료',
      color: '#4caf50',
    },
    {
      title: '총 장려금',
      value: stats.totalIncentives,
      subtitle: `지원 가능: ${stats.availableIncentives}`,
      color: '#ff9800',
    },
    {
      title: '채용 공고',
      value: stats.totalJobPostings,
      subtitle: `게시됨: ${stats.publishedJobPostings}`,
      color: '#9c27b0',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        대시보드
      </Typography>
      <Grid container spacing={3}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="h3" component="div" sx={{ color: card.color }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {card.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            빠른 안내
          </Typography>
          <Typography variant="body1" paragraph>
            • 이력서 검토: 지원자의 이력서를 검토하고 상태를 업데이트할 수 있습니다.
          </Typography>
          <Typography variant="body1" paragraph>
            • 고용 장려금: 정부 지원 고용 장려금 현황을 확인할 수 있습니다.
          </Typography>
          <Typography variant="body1" paragraph>
            • 채용 공고: 새로운 채용 공고를 작성하고 관리할 수 있습니다.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}