import React from 'react';
import Layout from '../../components/Layout.jsx';
import Card from '../../components/Card.jsx';
import Button from '../../components/Button.jsx';
import useAuthStore from '../../stores/authStore.js';
import './home.css';

const HomePage = () => {
  const { user } = useAuthStore();

  const stats = [
    { label: 'Đề tài đã nộp', value: '3', icon: '📄' },
    { label: 'Đang chờ duyệt', value: '1', icon: '⏳' },
    { label: 'Đã được duyệt', value: '2', icon: '✅' },
    { label: 'Deadline sắp tới', value: '5 ngày', icon: '⏰' },
  ];

  const recentSubmissions = [
    {
      id: 1,
      title: 'Ứng dụng AI trong giáo dục',
      status: 'approved',
      date: '2026-01-25',
      supervisor: 'TS. Nguyễn Văn A',
    },
    {
      id: 2,
      title: 'Hệ thống quản lý thư viện thông minh',
      status: 'pending',
      date: '2026-01-28',
      supervisor: 'PGS. Trần Thị B',
    },
    {
      id: 3,
      title: 'Phân tích dữ liệu lớn với Machine Learning',
      status: 'approved',
      date: '2026-01-20',
      supervisor: 'TS. Lê Văn C',
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      approved: { text: 'Đã duyệt', class: 'status-approved' },
      pending: { text: 'Chờ duyệt', class: 'status-pending' },
      rejected: { text: 'Từ chối', class: 'status-rejected' },
    };
    return badges[status] || badges.pending;
  };

  return (
    <Layout>
      <div className="homepage">
        <div className="homepage-header">
          <div>
            <h1 className="homepage-title">
              Xin chào, {user?.name || 'User'}! 👋
            </h1>
            <p className="homepage-subtitle">
              Chào mừng bạn đến với hệ thống quản lý đề tài tốt nghiệp
            </p>
          </div>
          <Button variant="primary" size="md">
            + Nộp đề tài mới
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <Card key={index} hover className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="quick-actions">
          <h2 className="section-title">Thao tác nhanh</h2>
          <div className="actions-grid">
            <button className="action-item">
              <div className="action-icon">📝</div>
              <div className="action-text">
                <div className="action-title">Nộp đề tài</div>
                <div className="action-desc">Tạo đề tài mới</div>
              </div>
            </button>
            <button className="action-item">
              <div className="action-icon">📋</div>
              <div className="action-text">
                <div className="action-title">Xem đề tài</div>
                <div className="action-desc">Danh sách đề tài</div>
              </div>
            </button>
            <button className="action-item">
              <div className="action-icon">👨‍🏫</div>
              <div className="action-text">
                <div className="action-title">Giảng viên</div>
                <div className="action-desc">Danh sách GVHD</div>
              </div>
            </button>
            <button className="action-item">
              <div className="action-icon">📊</div>
              <div className="action-text">
                <div className="action-title">Thống kê</div>
                <div className="action-desc">Báo cáo chi tiết</div>
              </div>
            </button>
          </div>
        </Card>

        {/* Recent Submissions */}
        <Card className="recent-submissions">
          <h2 className="section-title">Đề tài gần đây</h2>
          <div className="submissions-list">
            {recentSubmissions.map((submission) => {
              const statusBadge = getStatusBadge(submission.status);
              return (
                <div key={submission.id} className="submission-item">
                  <div className="submission-main">
                    <h3 className="submission-title">{submission.title}</h3>
                    <p className="submission-supervisor">
                      GVHD: {submission.supervisor}
                    </p>
                  </div>
                  <div className="submission-meta">
                    <span className={`submission-status ${statusBadge.class}`}>
                      {statusBadge.text}
                    </span>
                    <span className="submission-date">{submission.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default HomePage;
