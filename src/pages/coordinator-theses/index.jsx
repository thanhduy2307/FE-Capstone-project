import React, { useState, useCallback, useMemo } from 'react';
import Card from '../../components/Card.jsx';
import Badge from '../../components/Badge.jsx';
import Button from '../../components/Button.jsx';
import Modal from '../../components/Modal.jsx';
import Input from '../../components/Input.jsx';
import Table from '../../components/Table.jsx';
import useCoordinatorStore from '../../stores/coordinatorStore.js';
import './coordinator-theses.css';

// Mock data - MOVED OUTSIDE COMPONENT to prevent re-creation
const MOCK_THESES = [
  {
    id: 1,
    code: null,
    title: 'Ứng dụng Machine Learning trong phân tích dữ liệu',
    studentName: 'Nguyễn Văn A',
    studentCode: 'SV001',
    supervisorName: 'TS. Trần Thị B',
    receivedDate: '2024-01-30',
    status: 'pending_code',
    fileName: 'detai_SV001.pdf',
  },
  {
    id: 2,
    code: 'DT2024002',
    title: 'Xây dựng hệ thống quản lý bằng Blockchain',
    studentName: 'Lê Thị C',
    studentCode: 'SV002',
    supervisorName: 'PGS.TS. Phạm Văn D',
    receivedDate: '2024-01-29',
    status: 'ai_checking',
    fileName: 'detai_SV002.docx',
  },
  {
    id: 3,
    code: 'DT2024003',
    title: 'Phát triển ứng dụng IoT cho Smart Home',
    studentName: 'Hoàng Văn E',
    studentCode: 'SV003',
    supervisorName: 'TS. Võ Thị F',
    receivedDate: '2024-01-28',
    status: 'ai_passed',
    fileName: 'detai_SV003.pdf',
  },
  {
    id: 4,
    code: 'DT2024004',
    title: 'Hệ thống nhận diện khuôn mặt bằng Deep Learning',
    studentName: 'Trần Văn G',
    studentCode: 'SV004',
    supervisorName: 'PGS.TS. Nguyễn Thị H',
    receivedDate: '2024-01-27',
    status: 'review_conflict',
    fileName: 'detai_SV004.pdf',
    reviewers: [
      { id: 1, name: 'TS. Trần Thị Y', decision: 'approve' },
      { id: 2, name: 'TS. Lê Văn Z', decision: 'reject' },
    ],
    needsTieBreaker: true,
  },
];

const MOCK_REVIEWERS = [
  { id: 1, name: 'PGS.TS. Nguyễn Văn X', email: 'nguyenvanx@edu.vn', workload: 3 },
  { id: 2, name: 'TS. Trần Thị Y', email: 'tranthiy@edu.vn', workload: 5 },
  { id: 3, name: 'TS. Lê Văn Z', email: 'levanz@edu.vn', workload: 2 },
  { id: 4, name: 'PGS.TS. Phạm Thị W', email: 'phamthiw@edu.vn', workload: 4 },
];

const CoordinatorTheses = () => {
  const { assignCode, runAICheck, rejectThesis, assignReviewers } = useCoordinatorStore();
  
  const [selectedThesis, setSelectedThesis] = useState(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isAICheckModalOpen, setIsAICheckModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const [thesisCode, setThesisCode] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const [aiCheckResult, setAiCheckResult] = useState(null);

  // Use mock data from constants
  const theses = MOCK_THESES;
  const availableReviewers = MOCK_REVIEWERS;

  const handleAssignCode = useCallback((thesis) => {
    setSelectedThesis(thesis);
    setThesisCode('');
    setIsCodeModalOpen(true);
  }, []);

  const handleSubmitCode = useCallback(async () => {
    if (!thesisCode.trim()) {
      alert('Vui lòng nhập mã đề tài!');
      return;
    }
    
    // await assignCode(selectedThesis.id, thesisCode);
    alert(`Đã gán mã ${thesisCode} cho đề tài!`);
    setIsCodeModalOpen(false);
  }, [thesisCode, selectedThesis]);

  const handleRunAICheck = useCallback((thesis) => {
    setSelectedThesis(thesis);
    setIsAICheckModalOpen(true);
  }, []);

  const handleConfirmAICheck = useCallback(async () => {
    setIsAICheckModalOpen(false);
    
    // Simulate AI checking
    setTimeout(() => {
      const mockResult = {
        passed: Math.random() > 0.3,
        score: Math.floor(Math.random() * 40) + 60,
        checks: [
          { name: 'Định dạng tài liệu', passed: true },
          { name: 'Độ dài nội dung', passed: true },
          { name: 'Tính mới và độc đáo', passed: Math.random() > 0.3 },
          { name: 'Tính khả thi', passed: Math.random() > 0.2 },
          { name: 'Tài liệu tham khảo', passed: true },
        ],
      };
      
      setAiCheckResult(mockResult);
      alert(`AI Check hoàn tất!\nĐiểm: ${mockResult.score}/100\nKết quả: ${mockResult.passed ? 'ĐẠT ✅' : 'KHÔNG ĐẠT ❌'}`);
    }, 2000);
  }, []);

  const handleReject = useCallback((thesis) => {
    setSelectedThesis(thesis);
    setRejectReason('');
    setIsRejectModalOpen(true);
  }, []);

  const handleSubmitReject = useCallback(async () => {
    if (!rejectReason.trim()) {
      alert('Vui lòng nhập lý do từ chối!');
      return;
    }
    
    // await rejectThesis(selectedThesis.id, rejectReason);
    alert('Đã từ chối đề tài!');
    setIsRejectModalOpen(false);
  }, [rejectReason, selectedThesis]);

  const handleAssignReviewers = useCallback((thesis) => {
    setSelectedThesis(thesis);
    setSelectedReviewers([]);
    setIsAssignModalOpen(true);
  }, []);

  const handleToggleReviewer = useCallback((reviewerId) => {
    const isTieBreaker = selectedThesis?.needsTieBreaker;
    const maxReviewers = isTieBreaker ? 1 : 2;
    
    setSelectedReviewers(prev => {
      if (prev.includes(reviewerId)) {
        return prev.filter(id => id !== reviewerId);
      } else if (prev.length < maxReviewers) {
        return [...prev, reviewerId];
      } else {
        alert(`Chỉ được chọn tối đa ${maxReviewers} reviewer!`);
        return prev;
      }
    });
  }, [selectedThesis]);

  const handleSubmitAssign = useCallback(async () => {
    const isTieBreaker = selectedThesis?.needsTieBreaker;
    const requiredCount = isTieBreaker ? 1 : 2;
    
    if (selectedReviewers.length !== requiredCount) {
      alert(`Vui lòng chọn đúng ${requiredCount} reviewer!`);
      return;
    }
    
    // await assignReviewers(selectedThesis.id, selectedReviewers);
    if (isTieBreaker) {
      alert('Đã thêm reviewer thứ 3 thành công!');
    } else {
      alert('Đã phân công 2 reviewer thành công!');
    }
    setIsAssignModalOpen(false);
  }, [selectedThesis, selectedReviewers]);

  const handleViewDetail = useCallback((thesis) => {
    setSelectedThesis(thesis);
    setIsDetailModalOpen(true);
  }, []);

  const getStatusVariant = useCallback((status) => {
    switch (status) {
      case 'pending_code':
        return 'warning';
      case 'ai_checking':
        return 'info';
      case 'ai_passed':
        return 'success';
      case 'ai_failed':
        return 'error';
      case 'assigned':
        return 'success';
      case 'review_conflict':
        return 'error';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  }, []);

  const getStatusText = useCallback((status) => {
    switch (status) {
      case 'pending_code':
        return 'Chờ đánh mã';
      case 'ai_checking':
        return 'AI đang check';
      case 'ai_passed':
        return 'AI đạt';
      case 'ai_failed':
        return 'AI không đạt';
      case 'assigned':
        return 'Đã phân công';
      case 'review_conflict':
        return 'Cần reviewer 3';
      case 'rejected':
        return 'Đã từ chối';
      default:
        return status;
    }
  }, []);

  const columns = useMemo(() => [
    {
      key: 'code',
      label: 'Mã ĐT',
      render: (value) => (
        <span className="thesis-code">
          {value || <span className="no-code">Chưa có</span>}
        </span>
      ),
    },
    {
      key: 'studentCode',
      label: 'Mã SV',
      sortable: true,
    },
    {
      key: 'title',
      label: 'Tên Đề Tài',
      sortable: true,
    },
    {
      key: 'supervisorName',
      label: 'GVHD',
      sortable: true,
    },
    {
      key: 'receivedDate',
      label: 'Ngày Nhận',
      sortable: true,
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
          {row.status === 'pending_code' && (
            <button
              className="action-btn code-btn"
              onClick={() => handleAssignCode(row)}
            >
              Đánh mã
            </button>
          )}
          {row.code && row.status !== 'ai_checking' && row.status !== 'assigned' && row.status !== 'rejected' && (
            <button
              className="action-btn ai-btn"
              onClick={() => handleRunAICheck(row)}
            >
              AI Check
            </button>
          )}
          {row.status === 'ai_passed' && (
            <button
              className="action-btn assign-btn"
              onClick={() => handleAssignReviewers(row)}
            >
              Phân công
            </button>
          )}
          {row.status === 'review_conflict' && (
            <button
              className="action-btn assign-btn"
              onClick={() => handleAssignReviewers(row)}
            >
              Add Reviewer 3
            </button>
          )}
          {(row.status === 'ai_failed' || row.status === 'ai_passed') && (
            <button
              className="action-btn reject-btn"
              onClick={() => handleReject(row)}
            >
              Từ chối
            </button>
          )}
        </div>
      ),
    },
  ], [getStatusVariant, getStatusText, handleViewDetail, handleAssignCode, handleRunAICheck, handleAssignReviewers, handleReject]);

  return (
    <div className="coordinator-theses">
      <div className="page-header">
        <div>
          <h1>Quản Lý Đề Tài</h1>
          <p className="page-subtitle">Điều phối và phân công đề tài</p>
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

      {/* Assign Code Modal */}
      <Modal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        title="Đánh Mã Đề Tài"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsCodeModalOpen(false)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSubmitCode}>
              Xác nhận
            </Button>
          </>
        }
      >
        <div className="modal-form">
          <div className="form-group">
            <label>Đề tài:</label>
            <p className="info-text">{selectedThesis?.title}</p>
          </div>
          <div className="form-group">
            <label>Mã đề tài: *</label>
            <Input
              value={thesisCode}
              onChange={(e) => setThesisCode(e.target.value)}
              placeholder="VD: DT2024001"
            />
            <small className="help-text">
              Format: DT + Năm + Số thứ tự (VD: DT2024001)
            </small>
          </div>
        </div>
      </Modal>

      {/* AI Check Modal */}
      <Modal
        isOpen={isAICheckModalOpen}
        onClose={() => setIsAICheckModalOpen(false)}
        title="🤖 AI Checklist"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAICheckModalOpen(false)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleConfirmAICheck}>
              Chạy AI Check
            </Button>
          </>
        }
      >
        <div className="modal-form">
          <div className="form-group">
            <label>Đề tài:</label>
            <p className="info-text">{selectedThesis?.title}</p>
          </div>
          <div className="ai-check-info">
            <p>Hệ thống AI sẽ kiểm tra:</p>
            <ul>
              <li>✓ Định dạng tài liệu</li>
              <li>✓ Độ dài và cấu trúc nội dung</li>
              <li>✓ Tính mới và độc đáo</li>
              <li>✓ Tính khả thi</li>
              <li>✓ Tài liệu tham khảo</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Từ Chối Đề Tài"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>
              Hủy
            </Button>
            <Button variant="error" onClick={handleSubmitReject}>
              Từ chối
            </Button>
          </>
        }
      >
        <div className="modal-form">
          <div className="form-group">
            <label>Đề tài:</label>
            <p className="info-text">{selectedThesis?.title}</p>
          </div>
          <div className="form-group">
            <label>Lý do từ chối: *</label>
            <textarea
              className="reject-textarea"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Nhập lý do từ chối..."
              rows="5"
            />
          </div>
        </div>
      </Modal>

      {/* Assign Reviewers Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title={selectedThesis?.needsTieBreaker ? "Thêm Reviewer Thứ 3" : "Phân Công Reviewer"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSubmitAssign}>
              {selectedThesis?.needsTieBreaker 
                ? `Thêm Reviewer (${selectedReviewers.length}/1)` 
                : `Phân công (${selectedReviewers.length}/2)`
              }
            </Button>
          </>
        }
      >
        <div className="modal-form">
          <div className="form-group">
            <label>Đề tài:</label>
            <p className="info-text">{selectedThesis?.title}</p>
          </div>
          
          {selectedThesis?.needsTieBreaker && (
            <div className="conflict-notice">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <strong>Conflict:</strong> 2 reviewers có ý kiến khác nhau!
                <div className="reviewer-votes">
                  {selectedThesis.reviewers?.map((r, i) => (
                    <span key={i} className={`vote ${r.decision}`}>
                      {r.name}: {r.decision === 'approve' ? '✅ Approve' : '❌ Reject'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="form-group">
            <label>
              {selectedThesis?.needsTieBreaker 
                ? 'Chọn 1 reviewer để quyết định: *' 
                : 'Chọn 2 reviewer: *'
              }
            </label>
            <div className="reviewer-list">
              {availableReviewers.map((reviewer) => (
                <div
                  key={reviewer.id}
                  className={`reviewer-item ${selectedReviewers.includes(reviewer.id) ? 'selected' : ''}`}
                  onClick={() => handleToggleReviewer(reviewer.id)}
                >
                  <div className="reviewer-checkbox">
                    {selectedReviewers.includes(reviewer.id) && '✓'}
                  </div>
                  <div className="reviewer-info">
                    <div className="reviewer-name">{reviewer.name}</div>
                    <div className="reviewer-meta">
                      {reviewer.email} • Workload: {reviewer.workload} đề tài
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Chi Tiết Đề Tài"
        size="lg"
        footer={
          <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
            Đóng
          </Button>
        }
      >
        {selectedThesis && (
          <div className="thesis-detail">
            <div className="detail-section">
              <h4>Thông Tin Cơ Bản</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Mã đề tài:</label>
                  <span>{selectedThesis.code || 'Chưa có'}</span>
                </div>
                <div className="detail-item">
                  <label>Trạng thái:</label>
                  <Badge variant={getStatusVariant(selectedThesis.status)}>
                    {getStatusText(selectedThesis.status)}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Thông Tin Sinh Viên & GVHD</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Sinh viên:</label>
                  <span>{selectedThesis.studentName} ({selectedThesis.studentCode})</span>
                </div>
                <div className="detail-item">
                  <label>GVHD:</label>
                  <span>{selectedThesis.supervisorName}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Đề Tài</h4>
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
        )}
      </Modal>
    </div>
  );
};

export default CoordinatorTheses;
