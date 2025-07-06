import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockApiService } from '../services/mockData';
import { Incentive } from '../services/api';

export default function IncentiveVisualization() {
  const [incentives, setIncentives] = useState<Incentive[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncentives();
  }, []);

  const fetchIncentives = async () => {
    try {
      const data = await mockApiService.getIncentives();
      setIncentives(data);
    } catch (error) {
      console.error('Failed to fetch incentives:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Incentive['status']) => {
    switch (status) {
      case 'available': return 'success';
      case 'applied': return 'info';
      case 'approved': return 'primary';
      case 'expired': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: Incentive['status']) => {
    switch (status) {
      case 'available': return '지원 가능';
      case 'applied': return '신청 완료';
      case 'approved': return '승인됨';
      case 'expired': return '만료됨';
      default: return status;
    }
  };

  const getCategoryText = (category: Incentive['category']) => {
    switch (category) {
      case 'hiring': return '채용';
      case 'training': return '교육';
      case 'facility': return '시설';
      case 'other': return '기타';
      default: return category;
    }
  };

  const statusData = [
    { name: '지원 가능', value: incentives.filter(i => i.status === 'available').length, color: '#4caf50' },
    { name: '신청 완료', value: incentives.filter(i => i.status === 'applied').length, color: '#2196f3' },
    { name: '승인됨', value: incentives.filter(i => i.status === 'approved').length, color: '#1976d2' },
    { name: '만료됨', value: incentives.filter(i => i.status === 'expired').length, color: '#f44336' },
  ];

  const categoryData = [
    { name: '채용', value: incentives.filter(i => i.category === 'hiring').length },
    { name: '교육', value: incentives.filter(i => i.category === 'training').length },
    { name: '시설', value: incentives.filter(i => i.category === 'facility').length },
    { name: '기타', value: incentives.filter(i => i.category === 'other').length },
  ];

  const amountData = incentives.map(incentive => ({
    name: incentive.name,
    amount: incentive.amount,
    category: getCategoryText(incentive.category),
  }));

  const totalAmount = incentives.reduce((sum, incentive) => sum + incentive.amount, 0);
  const availableAmount = incentives
    .filter(i => i.status === 'available')
    .reduce((sum, incentive) => sum + incentive.amount, 0);

  if (loading) {
    return <Typography>로딩 중...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        고용 장려금 현황
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                총 장려금 개수
              </Typography>
              <Typography variant="h3" component="div" color="primary">
                {incentives.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                총 장려금 금액
              </Typography>
              <Typography variant="h3" component="div" color="primary">
                {(totalAmount / 10000).toFixed(0)}만원
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                지원 가능 금액
              </Typography>
              <Typography variant="h3" component="div" color="success.main">
                {(availableAmount / 10000).toFixed(0)}만원
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              상태별 분포
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              카테고리별 분포
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              장려금별 지원 금액
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={amountData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${(Number(value) / 10000).toFixed(0)}만원`, '지원 금액']} />
                <Bar dataKey="amount" fill="#ff9800" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          장려금 목록
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>이름</TableCell>
                <TableCell>카테고리</TableCell>
                <TableCell>지원 금액</TableCell>
                <TableCell>신청 마감일</TableCell>
                <TableCell>상태</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incentives.map((incentive) => (
                <TableRow key={incentive.id}>
                  <TableCell>{incentive.name}</TableCell>
                  <TableCell>{getCategoryText(incentive.category)}</TableCell>
                  <TableCell>{(incentive.amount / 10000).toFixed(0)}만원</TableCell>
                  <TableCell>{incentive.applicationDeadline}</TableCell>
                  <TableCell>
                    <Chip 
                      label={getStatusText(incentive.status)} 
                      color={getStatusColor(incentive.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}