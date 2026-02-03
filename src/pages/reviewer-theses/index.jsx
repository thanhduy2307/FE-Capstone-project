import React, { useState } from 'react';
import Card from '../../components/Card.jsx';
import Badge from '../../components/Badge.jsx';
import Button from '../../components/Button.jsx';
import Modal from '../../components/Modal.jsx';
import Table from '../../components/Table.jsx';
import useReviewerStore from '../../stores/reviewerStore.js';
import './reviewer-theses.css';

const ReviewerTheses = () => {
  const { submitReview } = useReviewerStore();
  
  const [selectedThesis, setSelectedThesis] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewDecision, setReviewDecision] = useState(null);
  const [reviewComment, setReviewComment] = useState('');

  // Mock data
  const theses = [
    {
      id: 1,
      code: 'DT2024001',
      title: 'Ứng dụng Machine Learning trong phân tích dữ liệu',
      studentName: 'Nguyễn Văn A',
      studentCode: 'SV001',
      assignedDate: '2024-01-30',
      status: 'pending_review',
      myReview: null,
      reviewers: [
        { id: 1, name: 'TS. Trần Văn X', decision: null },
        { id: 2, name: 'PGS.TS. Lê Thị Y', decision: null },
      ],
      fileName: 'detai_SV001.pdf',
    },
    {
      id: 2,
      code: 'DT2024002',
      title: 'Xây dựng hệ thống quản lý bằng Blockchain',
      studentName: 'Lê Thị C',
      studentCode: 'SV002',
      assignedDate: '2024-01-29',
      status: 'reviewed',
      myReview: 'approve',
      reviewers: [
        { id: 1, name: 'TS. Trần Văn X', decision: 'approve', isMe: true },
        { id: 2, name: 'PGS.TS. Lê Thị Y', decision: 'approve' },
      ],
      fileName: 'detai_SV002.docx',
      result: 'passed',
    },
    {
      id: 3,
      code: 'DT2024003',
      title: 'Phát triển ứng dụng IoT cho Smart Home',
      studentName: 'Hoàng Văn E',
      studentCode: 'SV003',
      assignedDate: '2024-01-28',
      status: 'conflict',
      myReview: 'approve',
      reviewers: [
        { id: 1, name: 'TS. Trần Văn X', decision: 'approve', isMe: true },
        { id: 2, name: 'PGS.TS. Lê Thị Y', decision: 'reject' },
        { id: 3, name: 'TS. Võ Văn Z', decision: null, isTieBreaker: true },
      ],
      fileName: 'detai_SV003.pdf',
      needsTieBreaker: true,
    },
  ];

  const handleViewDetail = (thesis) => {
    setSelectedThesis(thesis);
    setIsDetailModalOpen(true);
  };

  const handleOpenReview = (thesis) => {
    setSelectedThesis(thesis);
    setReviewDecision(null);
    setReviewComment('');
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!reviewDecision) {
      alert('Vui lòng chọn quyết định!');
      return;
    }

    try {
      // await submitReview(selectedThesis.id, {
      //   decision: reviewDecision,
      //   comment: reviewComment,
      // });
      
      alert(`Đã gửi review: ${reviewDecision === 'approve' ? 'APPROVE ✅' : 'REJECT ❌'}`);
      setIsReviewModalOpen(false);
    } catch (error) {
      alert('Gửi review thất bại!');
    }
  };

  const handleDownloadFile = (thesis) => {
    alert(`Đang tải file: ${thesis.fileName}`);
  };

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

  const columns = [
    {
      key: 'code',
      label: 'Mã ĐT',
      sortable: true,
    },
    {
      key: 'title',
      label: 'Tên Đề Tài',
      sortable: true,
    },
    {
      key: 'studentName',
      label: 'Sinh Viên',
      sortable: true,
    },
    {
      key: 'assignedDate',
      label: 'Ngày Nhận',
      sortable: true,
    },
    {
      key: 'myReview',
      label: 'Review Của Tôi',
      render: (value) => {
        if (!value) return <span className="no-review">Chưa review</span>;
        return (
          <Badge variant={value === 'approve' ? 'success' : 'error'}>
            {value === 'approve' ? '✅ Approve' : '❌ Reject'}
          </Badge>
        );
      },
    },
    {
      key: 'status',
      label: 'Trạng Thái',
      render: (value) => (
        <Badge variant={getStatusVariant(value)}>
          {getStatusText(value)}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Thao Tác',
      render: (_, row) => (
        <div className="action-buttons">
          <button
            className="action-btn view-btn"
            onClick={() => handleViewDetail(row)}
          >
            Xem
          </button>
          {!row.myReview && (
            <button
              className="action-btn review-btn"
              onClick={() => handleOpenReview(row)}
            >
              Review
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="reviewer-theses">
      <div className="page-header">
        <div>
          <h1>Đề Tài Review</h1>
          <p className="page-subtitle">Danh sách đề tài được phân công</p>
        </div>
        <div className="header-actions">
          <Button variant="outline" size="md">
            📊 Xuất báo cáo
          </Button>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          data={theses}
          emptyMessage="Chưa có đề tài nào"
        />
      </Card>

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Chi Tiết Đề Tài"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
              Đóng
            </Button>
            <Button
              variant="primary"
              onClick={() => handleDownloadFile(selectedThesis)}
            >
              📥 Tải File
            </Button>
          </>
        }
      >
        {selectedThesis && (
          <div className="thesis-detail">
            <div className="detail-section">
              <h4>Thông Tin Đề Tài</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Mã đề tài:</label>
                  <span>{selectedThesis.code}</span>
                </div>
                <div className="detail-item">
                  <label>Sinh viên:</label>
                  <span>{selectedThesis.studentName} ({selectedThesis.studentCode})</span>
                </div>
                <div className="detail-item">
                  <label>Tiêu đề:</label>
                  <p>{selectedThesis.title}</p>
                </div>
                <div className="detail-item">
                  <label>File:</label>
                  <span>📎 {selectedThesis.fileName}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Trạng Thái Review</h4>
              <div className="reviewers-status">
                {selectedThesis.reviewers.map((reviewer, index) => (
                  <div key={index} className="reviewer-status-item">
                    <div className="reviewer-name">
                      {reviewer.name}
                      {reviewer.isMe && <span className="me-badge">Tôi</span>}
                      {reviewer.isTieBreaker && <span className="tiebreaker-badge">Reviewer 3</span>}
                    </div>
                    <div className="reviewer-decision">
                      {reviewer.decision === null ? (
                        <Badge variant="default">Chưa review</Badge>
                      ) : reviewer.decision === 'approve' ? (
                        <Badge variant="success">✅ Approve</Badge>
                      ) : (
                        <Badge variant="error">❌ Reject</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedThesis.needsTieBreaker && (
                <div className="conflict-notice">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>2 reviewers có ý kiến khác nhau. Cần reviewer thứ 3 để quyết định!</span>
                </div>
              )}
              
              {selectedThesis.result && (
                <div className={`result-notice ${selectedThesis.result}`}>
                  <strong>Kết quả cuối cùng:</strong> {selectedThesis.result === 'passed' ? '✅ PASSED' : '❌ FAILED'}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Review Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Review Đề Tài"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsReviewModalOpen(false)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSubmitReview}>
              Gửi Review
            </Button>
          </>
        }
      >
        {selectedThesis && (
          <div className="review-form">
            <div className="form-group">
              <label>Đề tài:</label>
              <p className="info-text">{selectedThesis.title}</p>
            </div>

            <div className="form-group">
              <label>Quyết định: *</label>
              <div className="decision-buttons">
                <button
                  className={`decision-btn approve ${reviewDecision === 'approve' ? 'selected' : ''}`}
                  onClick={() => setReviewDecision('approve')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Approve</span>
                  <p>Đề tài đạt yêu cầu</p>
                </button>
                <button
                  className={`decision-btn reject ${reviewDecision === 'reject' ? 'selected' : ''}`}
                  onClick={() => setReviewDecision('reject')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span>Reject</span>
                  <p>Đề tài chưa đạt</p>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Nhận xét:</label>
              <textarea
                className="review-textarea"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Nhập nhận xét của bạn..."
                rows="5"
              />
            </div>

            <div className="review-info">
              <p><strong>Lưu ý:</strong></p>
              <ul>
                <li>Nếu 2 reviewers cùng Approve → Đề tài PASS</li>
                <li>Nếu 2 reviewers cùng Reject → Đề tài FAIL</li>
                <li>Nếu 2 reviewers khác ý kiến → Thêm reviewer thứ 3</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReviewerTheses;
