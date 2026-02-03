import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card.jsx';
import Badge from '../../components/Badge.jsx';
import Button from '../../components/Button.jsx';
import useAuthStore from '../../stores/authStore.js';
import './reviewer-dashboard.css';

const ReviewerDashboard = () => {
  const { user } = useAuthStore();

  // Mock data
  const stats = [
    {
      id: 1,
      title: 'Chờ Review',
      value: '6',
      icon: '⏳',
      color: 'yellow',
      description: 'Cần đánh giá',
    },
    {
      id: 2,
      title: 'Đã Review',
      value: '12',
      icon: '✅',
      color: 'green',
      description: 'Hoàn thành',
    },
    {
      id: 3,
      title: 'Chờ Reviewer Khác',
      value: '4',
      icon: '👥',
      color: 'blue',
      description: 'Đang chờ',
    },
    {
      id: 4,
      title: 'Cần Reviewer 3',
      value: '2',
      icon: '🔄',
      color: 'purple',
      description: 'Ý kiến khác nhau',
    },
  ];

  const recentTheses = [
    {
      id: 1,
      code: 'DT2024001',
      title: 'Ứng dụng Machine Learning trong phân tích dữ liệu',
      studentName: 'Nguyễn Văn A',
      assignedDate: '2024-01-30',
      status: 'pending_review',
      myReview: null,
      otherReviews: [],
    },
    {
      id: 2,
      code: 'DT2024002',
      title: 'Xây dựng hệ thống quản lý bằng Blockchain',
      studentName: 'Lê Thị C',
      assignedDate: '2024-01-29',
      status: 'reviewed',
      myReview: 'approve',
      otherReviews: [{ reviewer: 'TS. Trần Văn X', decision: 'approve' }],
    },
    {
      id: 3,
      code: 'DT2024003',
      title: 'Phát triển ứng dụng IoT cho Smart Home',
      studentName: 'Hoàng Văn E',
      assignedDate: '2024-01-28',
      status: 'conflict',
      myReview: 'approve',
      otherReviews: [{ reviewer: 'PGS.TS. Lê Thị Y', decision: 'reject' }],
    },
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending_review':
        return 'warning';
      case 'reviewed':
        return 'success';
      case 'waiting_other':
        return 'info';
      case 'conflict':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending_review':
        return 'Chờ review';
      case 'reviewed':
        return 'Đã review';
      case 'waiting_other':
        return 'Chờ reviewer khác';
      case 'conflict':
        return 'Cần reviewer 3';
      default:
        return status;
    }
  };

  return (
    <div className="reviewer-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Xin chào, {user?.name || 'Reviewer'}! 👋</h1>
          <p className="dashboard-subtitle">
            Quản lý đề tài được phân công review
          </p>
        </div>
        <Link to="/reviewer/theses">
          <Button variant="primary" size="md">
            Xem tất cả đề tài
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <Card key={stat.id} className="stat-card">
            <div className="stat-content">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <p className="stat-label">{stat.title}</p>
                <h2 className="stat-value">{stat.value}</h2>
                <p className="stat-description">{stat.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Review Process */}
      <Card className="process-card">
        <h3>📋 Quy Trình Review</h3>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Nhận đề tài</h4>
              <p>Được phân công từ người điều phối</p>
            </div>
          </div>
          <div className="process-arrow">→</div>
          <div className="process-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Đánh giá</h4>
              <p>Review và vote Approve/Reject</p>
            </div>
          </div>
          <div className="process-arrow">→</div>
          <div className="process-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Kết quả</h4>
              <p>✅ 2 Approve → Pass<br/>❌ 2 Reject → Fail<br/>🔄 Khác nhau → Reviewer 3</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Theses */}
      <Card>
        <div className="section-header">
          <h3>Đề Tài Gần Đây</h3>
          <Link to="/reviewer/theses" className="view-all-link">
            Xem tất cả →
          </Link>
        </div>
        <div className="theses-list">
          {recentTheses.map((thesis) => (
            <div key={thesis.id} className="thesis-item">
              <div className="thesis-main">
                <div className="thesis-code-badge">{thesis.code}</div>
                <div className="thesis-info">
                  <h4 className="thesis-title">{thesis.title}</h4>
                  <div className="thesis-meta">
                    <span>👤 {thesis.studentName}</span>
                    <span>📅 {thesis.assignedDate}</span>
                    {thesis.myReview && (
                      <span className={`my-vote ${thesis.myReview}`}>
                        {thesis.myReview === 'approve' ? '✅ Tôi: Approve' : '❌ Tôi: Reject'}
                      </span>
                    )}
                  </div>
                </div>
                <Badge variant={getStatusVariant(thesis.status)}>
                  {getStatusText(thesis.status)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ReviewerDashboard;
