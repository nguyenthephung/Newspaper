import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Tag, Modal, message as antdMessage } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';  // Thêm useDispatch để dispatch updateUserInfo
import { updateUserInfo } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const ReviewWriterRequests = () => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();  // Khởi tạo dispatch

  // Lấy tất cả yêu cầu từ server
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/v1/requests'); // API lấy tất cả yêu cầu
      setRequests(response.data);
    } catch (error) {
      antdMessage.error('Có lỗi xảy ra khi lấy danh sách yêu cầu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id, userId) => {
    try {
      // API cập nhật trạng thái
      await axios.put(`/v1/requests/${id}`, { status: 'approved', userId }); 
      antdMessage.success('Yêu cầu đã được chấp nhận.');

      // Cập nhật thông tin người dùng sau khi duyệt
      dispatch(updateUserInfo({
        role: 'writer' // Thêm vai trò writer cho user sau khi duyệt
      }));

      fetchRequests(); // Cập nhật lại danh sách yêu cầu sau khi chấp nhận
    } catch (error) {
      antdMessage.error('Có lỗi xảy ra khi chấp nhận yêu cầu.');
    }
  };

  const handleReject = async (id, userId) => {
    try {
      await axios.put(`/v1/requests/${id}`, { status: 'rejected', userId }); // API cập nhật trạng thái
      antdMessage.success('Yêu cầu đã bị từ chối.');
      fetchRequests(); // Cập nhật lại danh sách yêu cầu sau khi từ chối
    } catch (error) {
      antdMessage.error('Có lỗi xảy ra khi từ chối yêu cầu.');
    }
  };

  const handleViewMessage = (request) => {
    setCurrentRequest(request);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCurrentRequest(null);
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Review Writer Requests</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: 'Username',
            dataIndex: 'username',
          },
          {
            title: 'Email',
            dataIndex: 'email',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
              let color = status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'orange';
              return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
          },
          {
            title: 'Actions',
            render: (record) => (
              <Space size="middle">
                <Button onClick={() => handleApprove(record._id, record.userId)} disabled={record.status !== 'pending'}>
                  Approve
                </Button>
                <Button onClick={() => handleReject(record._id, record.userId)} disabled={record.status !== 'pending'}>
                  Reject
                </Button>
                <Button onClick={() => handleViewMessage(record)}>View Message</Button>
              </Space>
            ),
          },
        ]}
        dataSource={requests.map((item) => ({ ...item, key: item._id }))}
        pagination={{
          pageSize: 5,
        }}
      />
      <Modal
        title="Request Message"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
        {currentRequest && (
          <div>
            <Typography.Paragraph>{currentRequest.message}</Typography.Paragraph>
          </div>
        )}
      </Modal>
    </Space>
  );
};

export default ReviewWriterRequests;
