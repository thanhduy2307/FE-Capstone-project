import React, { useState, useEffect } from 'react';
import Table from '../../components/Table.jsx';
import Modal from '../../components/Modal.jsx';
import Badge from '../../components/Badge.jsx';
import Button from '../../components/Button.jsx';
import Card from '../../components/Card.jsx';
import Input from '../../components/Input.jsx';
import thesisService from '../../services/thesisService.js';
import './admin-theses.css';

const AdminTheses = () => {
  const [theses, setTheses] = useState([]);
  const [selectedTheses, setSelectedTheses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailData, setEmailData] = useState({ subject: '', message: '' });
  const [currentThesis, setCurrentThesis] = useState(null);

  // Mock data - replace with real API call
  useEffect(() => {
    fetchTheses();
  }, []);

  const fetchTheses = async () => {
    setIsLoading(true);
    // Mock data
    setTimeout(() => {
      setTheses([
        {
          id: 1,
          title: 'Machine Learning for Predictive Analytics',
          studentName: 'Nguyễn Văn A',
          supervisorName: 'TS. Trần Thị B',
          supervisorEmail: 'tranthib@university.edu.vn',
          submittedDate: '2024-01-15',
          status: 'approved',
        },
        {
          id: 2,
          title: 'Blockchain Technology in Supply Chain',
          studentName: 'Lê Thị C',
          supervisorName: 'PGS.TS. Phạm Văn D',
          supervisorEmail: 'phamvand@university.edu.vn',
          submittedDate: '2024-01-16',
          status: 'pending',
        },
        {
          id: 3,
          title: 'IoT Applications in Smart Cities',
          studentName: 'Hoàng Văn E',
          supervisorName: 'TS. Võ Thị F',
          supervisorEmail: 'vothif@university.edu.vn',
          submittedDate: '2024-01-17',
          status: 'rejected',
        },
      ]);
      setIsLoading(false);
    }, 500);
  };

  const handleApprove = async (id) => {
    try {
      await thesisService.approveThesis(id);
      fetchTheses();
    } catch (error) {
      console.error('Failed to approve thesis:', error);
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Lý do từ chối:');
    if (reason) {
      try {
        await thesisService.rejectThesis(id, reason);
        fetchTheses();
      } catch (error) {
        console.error('Failed to reject thesis:', error);
      }
    }
  };

  const handleSendEmail = (thesis) => {
    setCurrentThesis(thesis);
    setEmailData({
      subject: `Thông báo về đề tài: ${thesis.title}`,
      message: '',
    });
    setIsEmailModalOpen(true);
  };

  // NEW: Send email to all supervisors
  const [isBulkEmailModalOpen, setIsBulkEmailModalOpen] = useState(false);
  const [bulkEmailData, setBulkEmailData] = useState({ subject: '', message: '' });

  const handleSendBulkEmail = () => {
    setBulkEmailData({
      subject: 'Thông báo từ Ban Quản Lý Đề Tài',
      message: '',
    });
    setIsBulkEmailModalOpen(true);
  };

  const handleBulkEmailSubmit = async () => {
    try {
      // Get unique supervisors
      const uniqueSupervisors = [...new Map(
        theses.map(thesis => [thesis.supervisorEmail, thesis])
      ).values()];

      // Send email to all supervisors
      const promises = uniqueSupervisors.map(thesis =>
        thesisService.sendEmailToSupervisor(thesis.id, bulkEmailData)
      );

      await Promise.all(promises);
      
      setIsBulkEmailModalOpen(false);
      setBulkEmailData({ subject: '', message: '' });
      alert(`Email đã được gửi thành công đến ${uniqueSupervisors.length} giảng viên!`);
    } catch (error) {
      console.error('Failed to send bulk email:', error);
      alert('Gửi email hàng loạt thất bại!');
    }
  };

  const handleEmailSubmit = async () => {
    if (!currentThesis) return;
    
    try {
      await thesisService.sendEmailToSupervisor(currentThesis.id, emailData);
      setIsEmailModalOpen(false);
      setEmailData({ subject: '', message: '' });
      alert('Email đã được gửi thành công!');
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Gửi email thất bại!');
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Thesis Title',
      sortable: true,
    },
    {
      key: 'studentName',
      label: 'Student',
      sortable: true,
    },
    {
      key: 'supervisorName',
      label: 'Supervisor',
      sortable: true,
    },
    {
      key: 'submittedDate',
      label: 'Submitted Date',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={getStatusVariant(value)}>
          {value}
        </Badge>
      ),
    },
    // {
    //   key: 'actions',
    //   label: 'Actions',
    //   render: (_, row) => (
    //     <div className="action-buttons">
    //       {row.status === 'pending' && (
    //         <>
    //           <button
    //             className="action-btn approve-btn"
    //             onClick={() => handleApprove(row.id)}
    //           >
    //             Approve
    //           </button>
    //           <button
    //             className="action-btn reject-btn"
    //             onClick={() => handleReject(row.id)}
    //           >
    //             Reject
    //           </button>
    //         </>
    //       )}
    //       <button
    //         className="action-btn email-btn"
    //         onClick={() => handleSendEmail(row)}
    //       >
    //         Email
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="admin-theses">
      <div className="page-header">
        <div>
          <h1>Thesis Management</h1>
          <p className="page-subtitle">Quản lý đề tài tốt nghiệp</p>
        </div>
        <div className="header-actions">
          <Button variant="outline" size="md">
            Export
          </Button>
          <Button variant="outline" size="md">
            Filter
          </Button>
          <Button variant="primary" size="md" onClick={handleSendBulkEmail}>
            📧 Gửi Email cho Tất Cả GV
          </Button>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          data={theses}
          isLoading={isLoading}
          selectable={true}
          selectedRows={selectedTheses}
          onSelectionChange={setSelectedTheses}
          emptyMessage="Không có đề tài nào"
        />
      </Card>

      {/* Email Modal */}
      <Modal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="Gửi Email cho Giảng Viên Hướng Dẫn"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleEmailSubmit}>
              Gửi Email
            </Button>
          </>
        }
      >
        <div className="email-form">
          <div className="form-group">
            <label>Người nhận:</label>
            <p className="recipient-info">
              {currentThesis?.supervisorName} ({currentThesis?.supervisorEmail})
            </p>
          </div>
          <div className="form-group">
            <label>Tiêu đề:</label>
            <Input
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              placeholder="Nhập tiêu đề email"
            />
          </div>
          <div className="form-group">
            <label>Nội dung:</label>
            <textarea
              className="email-textarea"
              value={emailData.message}
              onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
              placeholder="Nhập nội dung email"
              rows="6"
            />
          </div>
        </div>
      </Modal>

      {/* Bulk Email Modal */}
      <Modal
        isOpen={isBulkEmailModalOpen}
        onClose={() => setIsBulkEmailModalOpen(false)}
        title="Gửi Email cho Tất Cả Giảng Viên Hướng Dẫn"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsBulkEmailModalOpen(false)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleBulkEmailSubmit}>
              Gửi Email cho Tất Cả
            </Button>
          </>
        }
      >
        <div className="email-form">
          <div className="form-group">
            <label>Người nhận:</label>
            <p className="recipient-info">
              Tất cả giảng viên hướng dẫn ({[...new Set(theses.map(t => t.supervisorEmail))].length} người)
            </p>
            <div className="supervisor-list">
              {[...new Map(theses.map(t => [t.supervisorEmail, t])).values()].map((thesis, index) => (
                <div key={index} className="supervisor-item">
                  • {thesis.supervisorName} ({thesis.supervisorEmail})
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Tiêu đề:</label>
            <Input
              value={bulkEmailData.subject}
              onChange={(e) => setBulkEmailData({ ...bulkEmailData, subject: e.target.value })}
              placeholder="Nhập tiêu đề email"
            />
          </div>
          <div className="form-group">
            <label>Nội dung:</label>
            <textarea
              className="email-textarea"
              value={bulkEmailData.message}
              onChange={(e) => setBulkEmailData({ ...bulkEmailData, message: e.target.value })}
              placeholder="Nhập nội dung email"
              rows="6"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminTheses;
