import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card.jsx';
import Badge from '../../components/Badge.jsx';
import Button from '../../components/Button.jsx';
import useAuthStore from '../../stores/authStore.js';
import './admin-dashboard.css';

const AdminDashboard = () => {
  const { user } = useAuthStore();

  // Mock data - replace with real API calls
  const stats = [
    {
      id: 1,
      title: 'Tổng Đề Tài',
      value: '156',
      change: '+12',
      changePercent: '+8.5%',
      trend: 'up',
      icon: '📚',
      color: 'blue',
    },
    {
      id: 2,
      title: 'Đang Chờ Duyệt',
      value: '23',
      change: '+5',
      changePercent: '+27.8%',
      trend: 'up',
      icon: '⏳',
      color: 'yellow',
    },
    {
      id: 3,
      title: 'Đã Phê Duyệt',
      value: '118',
      change: '+8',
      changePercent: '+7.3%',
      trend: 'up',
      icon: '✅',
      color: 'green',
    },
    {
      id: 4,
      title: 'Bị Từ Chối',
      value: '15',
      change: '-2',
      changePercent: '-11.8%',
      trend: 'down',
      icon: '❌',
      color: 'red',
    },
  ];

  const recentTheses = [
    {
      id: 1,
      title: 'Ứng dụng Machine Learning trong phân tích dữ liệu',
      studentName: 'Nguyễn Văn A',
      studentCode: 'SV001',
      supervisorName: 'TS. Trần Thị B',
      submittedDate: '2024-01-30',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Xây dựng hệ thống quản lý bằng Blockchain',
      studentName: 'Lê Thị C',
      studentCode: 'SV002',
      supervisorName: 'PGS.TS. Phạm Văn D',
      submittedDate: '2024-01-29',
      status: 'approved',
    },
    {
      id: 3,
      title: 'Phát triển ứng dụng IoT cho Smart Home',
      studentName: 'Hoàng Văn E',
      studentCode: 'SV003',
      supervisorName: 'TS. Võ Thị F',
      submittedDate: '2024-01-28',
      status: 'approved',
    },
    {
      id: 4,
      title: 'Nghiên cứu thuật toán tối ưu hóa',
      studentName: 'Trần Thị G',
      studentCode: 'SV004',
      supervisorName: 'TS. Nguyễn Văn H',
      submittedDate: '2024-01-27',
      status: 'rejected',
    },
  ];

  const periodStats = [
    {
      id: 1,
      name: 'Học kỳ 1 - 2023/2024',
      status: 'closed',
      totalTheses: 145,
      approved: 132,
      pending: 0,
      rejected: 13,
    },
    {
      id: 2,
      name: 'Học kỳ 2 - 2023/2024',
      status: 'open',
      totalTheses: 156,
      approved: 118,
      pending: 23,
      rejected: 15,
    },
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      case 'open':
        return 'success';
      case 'closed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Đã duyệt';
      case 'pending':
        return 'Chờ duyệt';
      case 'rejected':
        return 'Từ chối';
      case 'open':
        return 'Đang mở';
      case 'closed':
        return 'Đã đóng';
      default:
        return status;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard Quản Lý Đề Tài</h1>
          <p className="dashboard-subtitle">
            Tổng quan hệ thống quản lý đề tài tốt nghiệp
          </p>
        </div>
        <div className="header-actions">
          <Link to="/admin/theses">
            <Button variant="primary" size="md">
              Quản lý đề tài
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <Card key={stat.id} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <p className="stat-label">{stat.title}</p>
                <h2 className="stat-value">{stat.value}</h2>
                <div className="stat-change">
                  <span className={`change-badge ${stat.trend}`}>
                    {stat.trend === 'up' ? '↑' : '↓'} {stat.changePercent}
                  </span>
                  <span className="change-text">
                    {stat.change} so với tháng trước
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Theses Table */}
      <div className="dashboard-section">
        <Card>
          <div className="section-header">
            <h3>Đề Tài Mới Nhất</h3>
            <Link to="/admin/theses" className="view-all-link">
              Xem tất cả →
            </Link>
          </div>
          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Mã SV</th>
                  <th>Tên Đề Tài</th>
                  <th>Sinh Viên</th>
                  <th>Giảng Viên HD</th>
                  <th>Ngày Nộp</th>
                  <th>Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {recentTheses.map((thesis) => (
                  <tr key={thesis.id}>
                    <td>
                      <span className="student-code">{thesis.studentCode}</span>
                    </td>
                    <td>
                      <div className="thesis-title">{thesis.title}</div>
                    </td>
                    <td>{thesis.studentName}</td>
                    <td>{thesis.supervisorName}</td>
                    <td>{thesis.submittedDate}</td>
                    <td>
                      <Badge variant={getStatusVariant(thesis.status)}>
                        {getStatusText(thesis.status)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Period Statistics */}
      <div className="dashboard-grid">
        <Card className="period-card">
          <h3>Thống Kê Đợt Nộp</h3>
          <div className="period-list">
            {periodStats.map((period) => (
              <div key={period.id} className="period-item">
                <div className="period-header">
                  <span className="period-name">{period.name}</span>
                  <Badge variant={getStatusVariant(period.status)}>
                    {getStatusText(period.status)}
                  </Badge>
                </div>
                <div className="period-stats">
                  <div className="period-stat">
                    <span className="stat-number">{period.totalTheses}</span>
                    <span className="stat-text">Tổng đề tài</span>
                  </div>
                  <div className="period-stat success">
                    <span className="stat-number">{period.approved}</span>
                    <span className="stat-text">Đã duyệt</span>
                  </div>
                  <div className="period-stat warning">
                    <span className="stat-number">{period.pending}</span>
                    <span className="stat-text">Chờ duyệt</span>
                  </div>
                  <div className="period-stat error">
                    <span className="stat-number">{period.rejected}</span>
                    <span className="stat-text">Từ chối</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/admin/periods">
            <Button variant="outline" size="md" className="full-width-btn">
              Quản lý đợt nộp
            </Button>
          </Link>
        </Card>

        <Card className="quick-actions-card">
          <h3>Thao Tác Nhanh</h3>
          <div className="quick-actions">
            <Link to="/admin/theses">
              <button className="quick-action-btn">
                <span className="action-icon">📝</span>
                <span className="action-text">Duyệt đề tài</span>
              </button>
            </Link>
            <Link to="/admin/periods">
              <button className="quick-action-btn">
                <span className="action-icon">📅</span>
                <span className="action-text">Tạo đợt nộp mới</span>
              </button>
            </Link>
            <Link to="/admin/theses">
              <button className="quick-action-btn">
                <span className="action-icon">📧</span>
                <span className="action-text">Gửi email GV</span>
              </button>
            </Link>
            <button className="quick-action-btn">
              <span className="action-icon">📊</span>
              <span className="action-text">Xuất báo cáo</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

