// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Modal, Form, Input, Button, Select } from 'antd';
// import { HomeOutlined } from '@ant-design/icons'; // Import biểu tượng Home
// import './UserInfo.css';
// import { useSelector } from 'react-redux';
// const { Option } = Select;

// // Dữ liệu mẫu cho các category
// const staticCategoryData = {
//     categories: [
//         { name: 'Technology' },
//         { name: 'Health' },
//         { name: 'Science' },
//         { name: 'Politics' },
//         { name: 'Art' },
//         { name: 'Design' },
//         { name: 'Photography' }
//     ]
// };

// const UserInfo = () => {
//     const [user, setUser] = useState({
//         username: "johndoe123",
//         email: "johndoe@example.com",
//         password: "hashedPassword123",
//         isAdmin: false,
//         socialAccounts: {
//             facebook: "john.doe.fb",
//             google: "johndoe@gmail.com",
//             phoneNumber: "+1234567890"
//         },
//         preferences: {
//             categories: [
//                 {
//                     category: "Technology",
//                     topics: ["Technology", "AI", "Web Development"]
//                 },
//                 {
//                     category: "Science",
//                     topics: ["Science", "Space Exploration"]
//                 }
//             ]
//         },
//         Subscribe: "premium_monthly",
//         notificationsEnabled: true,
//         bookmarkedArticles: [
//             "60d5ecb8b6e7c45b4f5e8b1c",
//             "60d5ecb8b6e7c45b4f5e8b1d"
//         ],
//         adFreeSubscription: true,
//         createdAt: new Date("2023-01-15T10:30:00Z"),
//         updatedAt: new Date("2023-08-20T15:45:00Z")
//     });
     
//     const [editModalVisible, setEditModalVisible] = useState(false);
//     const [form] = Form.useForm();

//     const handleLogout = () => {
//         // Clear user session or token
//         // For example: localStorage.removeItem('userToken');
//         // Redirect to login page
//         window.location.href = '/login';
//     };

//     const handleUpdateInfo = (values) => {
//         console.log('Updated user info:', values);
//         // Here you would usually send a PUT request to update user info
//         setUser({ ...user, ...values });
//         setEditModalVisible(false);
//     };

//     const openEditModal = () => {
//         form.setFieldsValue({
//             username: user.username,
//             email: user.email,
//             categories: user.preferences.categories.map(c => c.category)
//         });
//         setEditModalVisible(true);
//     };

//     const closeEditModal = () => {
//         setEditModalVisible(false);
//     };

//     return (
//         <div className="user-info">
//             <Link to="/" className="home-link">
//                 <HomeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
//             </Link>
//             <p className="user-email">Username: {user.username}</p>
//             <p className="user-detail">Email: {user.email}</p>
//             <p className="user-detail">Danh mục yêu thích: 
//                 {user.preferences.categories.map((cat, index) => (
//                     <span key={index} className="user-category">
//                         {cat.category}{index < user.preferences.categories.length - 1 ? ', ' : ''}
//                     </span>
//                 ))}
//             </p>
            
//             <ul className="user-links">
//                 <li><Link to="/writer/publish">Tin đã viết</Link></li>
//                 <li><Link to="/writer/draft">Tin nháp</Link></li>
//             </ul>
//             <hr />
//             <Button className="update-info" onClick={openEditModal}>Cập Nhật Thông Tin</Button>
//             <Button className="logout" onClick={handleLogout}>Đăng xuất</Button>

//             <Modal
//                 visible={editModalVisible}
//                 onCancel={closeEditModal}
//                 footer={null}
//                 title="Update Info"
//             >
//                 <Form form={form} onFinish={handleUpdateInfo}>
//                     <Form.Item
//                         name="username"
//                         label="Username"
//                         rules={[{ required: true, message: 'Please input your username!' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         name="email"
//                         label="Email"
//                         rules={[{ required: true, message: 'Please input your email!' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         name="categories"
//                         label="Categories"
//                         rules={[{ required: true, message: 'Please select your categories!' }]}
//                     >
//                         <Select mode="multiple" placeholder="Select categories">
//                             {staticCategoryData.categories.map(category => (
//                                 <Option key={category.name} value={category.name}>
//                                     {category.name}
//                                 </Option>
//                             ))}
//                         </Select>
//                     </Form.Item>
//                     <Form.Item>
//                         <Button type="primary" htmlType="submit">
//                             Save
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default UserInfo;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Modal, Form, Input, Button, Select } from 'antd';
// import { HomeOutlined } from '@ant-design/icons';
// import './UserInfo.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateUser, logOut } from '../../redux/apiRequest';
// import { createAxios } from '../../createInstance';
// import { loginSuccess } from '../../redux/authSlice';
// import { updateUserInfo } from '../../redux/authSlice';

// const { Option } = Select;

// const UserInfo = () => {
//     const categories = useSelector((state) => state.category?.getCategory?.categories) || [];
//     const user = useSelector((state) => state.auth?.login?.currentUser);
//     const [editModalVisible, setEditModalVisible] = useState(false);
//     const [form] = Form.useForm();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     let axiosJWT = createAxios(user, dispatch, loginSuccess);

//     const handleLogout = () => {
//         logOut(dispatch, navigate, user?._id, user?.accessToken, axiosJWT);
//     };

//     const handleUpdateInfo = (values) => {
//         // Nếu password không được nhập, giữ nguyên mật khẩu cũ
//         const updatedUser = {
//             ...user,
//             ...values,
//             password: values.password ? values.password : user.password,
//             preferences: values.categories  // Cập nhật preferences từ categories đã chọn
//         };
//         updateUser(dispatch, updatedUser);
//         setEditModalVisible(false);
//     };

//     const openEditModal = () => {
//         form.setFieldsValue({
//             username: user?.username || '',
//             email: user?.email || '',
//             categories: user?.preferences || []  // Sử dụng trực tiếp preferences
//         });
//         setEditModalVisible(true);
//     };

//     const closeEditModal = () => {
//         setEditModalVisible(false);
//     };

//     if (!user) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="user-info">
//             <Link to="/" className="home-link">
//                 <HomeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
//             </Link>
//             <p className="user-email">Username: {user.username}</p>
//             <p className="user-detail">Email: {user.email}</p>
//             <p className="user-detail">Danh mục yêu thích: 
//                 {Array.isArray(user?.preferences) && user.preferences.length > 0 ? (
//                     user.preferences.map((pref, index) => (
//                         <span key={index} className="user-category">
//                             {pref}{index < user.preferences.length - 1 ? ', ' : ''}
//                         </span>
//                     ))
//                 ) : (
//                     <span>No preferences</span>
//                 )}
//             </p>
            
//             <ul className="user-links">
//                 <li><Link to="/writer/publish">Tin đã viết</Link></li>
//                 <li><Link to="/writer/draft">Tin nháp</Link></li>
//             </ul>
//             <hr />
//             <Button className="update-info" onClick={openEditModal}>Cập Nhật Thông Tin</Button>
//             <Button className="logout" onClick={handleLogout}>Đăng xuất</Button>

//             <Modal
//                 visible={editModalVisible}
//                 onCancel={closeEditModal}
//                 footer={null}
//                 title="Update Info"
//             >
//                 <Form form={form} onFinish={handleUpdateInfo}>
//                     <Form.Item
//                         name="username"
//                         label="Username"
//                         rules={[{ required: true, message: 'Please input your username!' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//             name="password"
//             label="New Password"
//             rules={[{ required: false }]}  // Không bắt buộc nhập
//         >
//             <Input.Password />
//         </Form.Item>
//                     <Form.Item
//                         name="email"
//                         label="Email"
//                         rules={[{ required: true, message: 'Please input your email!' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//   name="categories"
//   label="Categories"
//   style={{ width: '300px' }}
//   rules={[{ required: true, message: 'Please select your categories!' }]}
// >
//   <Select
//     mode="multiple"
//     placeholder="Select categories"
//     className="w-full h-12 text-lg"
//   >
//     {categories && categories.map(category => (
//       <Option style={{ width: '300px' }} key={category.name} value={category.name}>
//         {category.name}
//       </Option>
//     ))}
//   </Select>
// </Form.Item>
//                     <Form.Item>
//                         <Button type="primary" htmlType="submit">
//                             Save
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default UserInfo;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar, Typography, Button, Modal, Form, Input, Select, Switch, DatePicker, Upload, message, notification, Space } from 'antd';
import { UserOutlined, LockOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
 import { updateUser, logOut } from '../../redux/apiRequest';
 import { createAxios } from '../../createInstance';
 import { loginSuccess } from '../../redux/authSlice';
 import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const UserProfile = () => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editField, setEditField] = useState('');
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [writerRequestModalVisible, setWriterRequestModalVisible] = useState(false);
    const [writerRequestStatus, setWriterRequestStatus] = useState(null);
    const dispatch = useDispatch();
      const navigate = useNavigate();
      const user = useSelector((state) => state.auth?.login?.currentUser);
    const categories = useSelector((state) => state.category?.getCategory?.categories) || [];
    useEffect(() => {
        // Fetch writer request status when component mounts
        if (user?.roll === 'guest') {
            axios.get(`/v1/requests/${user._id}`)
            .then((response) => {
                setWriterRequestStatus(response.data.status);
            })
            .catch((error) => {
                console.error('Error fetching writer request status:', error);
            });
        }
    }, [user]);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    
       const handleLogout = () => {
            logOut(dispatch, navigate, user?._id, user?.accessToken, axiosJWT);
     };
  
     const handleUpdateInfo = (values) => {
        const updatedUser = { ...user, ...values };
        if (values.dateOfBirth) {
            updatedUser.dateOfBirth = values.dateOfBirth.toISOString();
        }
        updateUser(dispatch, updatedUser);
    };
    

    const handleAvatarChange = (info) => {
        if (info.file.status === 'done') {
            const imageUrl = info.file.response.url; // Đảm bảo server trả về URL
            handleUpdateInfo({ avatar: imageUrl });
        }
    };

    const handleSendRequest = (values) => {
        const requestPayload = {
            userId: user._id,
            username: user.username,
            email: user.email,
            message: values.message
        };

        axios.post('/v1/request', requestPayload)
        .then(() => {
            notification.success({ message: 'Request sent successfully!' });
            setWriterRequestModalVisible(false);
            setWriterRequestStatus('pending');
        })
        .catch(() => {
            notification.error({ message: 'Failed to send request' });
        });
    };

    const renderEditModal = () => {
        let formItem;
        switch(editField) {
            case 'username':
            case 'nickname':
            case 'email':
            case 'phoneNumber':
            case 'address':
                formItem = (
                    <Form.Item name={editField} label={editField.charAt(0).toUpperCase() + editField.slice(1)}>
                        <Input />
                    </Form.Item>
                );
                break;
            case 'preferences':
                formItem = (
                    <Form.Item name={editField} label="Preferences">
                        <Select mode="multiple">
                            {categories.map(category => (
                                <Option key={category._id} value={category.name}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                );
                break;
            case 'gender':
                formItem = (
                    <Form.Item name={editField} label="Gender">
                        <Select>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>
                );
                break;
            case 'dateOfBirth':
                formItem = (
                    <Form.Item name={editField} label="Date of Birth">
                        <DatePicker />
                    </Form.Item>
                );
                break;
            case 'subscribe':
            case 'notificationsEnabled':
            case 'adFreeSubscription':
                formItem = (
                    <Form.Item name={editField} label={editField.charAt(0).toUpperCase() + editField.slice(1)} valuePropName="checked">
                        <Switch />
                    </Form.Item>
                );
                break;
            default:
                formItem = null;
        }

        return (
            <Modal
                title={`Edit ${editField}`}
                visible={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                footer={null}
            >
                <Form layout="vertical" onFinish={handleUpdateInfo} initialValues={{
                    ...user,
                    dateOfBirth: user?.dateOfBirth ? moment(user.dateOfBirth) : null
                }}>
                    {formItem}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Save Changes</Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const renderPasswordModal = () => (
        <Modal
            title="Change Password"
            visible={passwordModalVisible}
            onCancel={() => setPasswordModalVisible(false)}
            footer={null}
        >
            <Form layout="vertical" onFinish={handleUpdateInfo}>
                <Form.Item name="oldPassword" label="Current Password" rules={[{ required: true }]}>
                    <Input.Password prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item name="newPassword" label="New Password" rules={[{ required: true }]}>
                    <Input.Password prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item name="confirmPassword" label="Confirm New Password" rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords do not match!'));
                        },
                    }),
                ]}>
                    <Input.Password prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Change Password</Button>
                </Form.Item>
            </Form>
        </Modal>
    );

    const renderWriterRequestModal = () => (
        <Modal
            title="Request to become a writer"
            visible={writerRequestModalVisible}
            onCancel={() => setWriterRequestModalVisible(false)}
            footer={null}
        >
            <Form layout="vertical" onFinish={handleSendRequest}>
                <Form.Item name="message" label="Reason for becoming a writer" rules={[{ required: true }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Send Request</Button>
                </Form.Item>
            </Form>
        </Modal>
    );

    const renderUserInfo = (label, value, editable = true) => (
        <Card className="mb-4">
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text type="secondary">{label}</Text>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Text strong>{value || 'Not set'}</Text>
                    {editable && (
                        <Button 
                            icon={<EditOutlined />} 
                            onClick={() => {
                                setEditField(label.toLowerCase());
                                setEditModalVisible(true);
                            }}
                        >
                            Edit
                        </Button>
                    )}
                </Space>
            </Space>
        </Card>
    );

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <Card>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Space align="start">
                        <Avatar size={64} icon={<UserOutlined />} src={user?.avatar} />
                        <Space direction="vertical">
                            <Title level={2}>{user?.username}</Title>
                            <Text type="secondary">{user?.roll}</Text>
                            <Upload
                                name="avatar"
                                showUploadList={false}
                                action="/api/upload" // Replace with your upload endpoint
                                onChange={handleAvatarChange}
                            >
                                <Button icon={<UploadOutlined />}>Change Avatar</Button>
                            </Upload>
                        </Space>
                    </Space>
    
                    {renderUserInfo('Username', user?.username)}
                    {renderUserInfo('Nickname', user?.nickname)}
                    {renderUserInfo('Email', user?.email)}
                    {renderUserInfo('Phone Number', user?.phoneNumber)}
                    {renderUserInfo('Address', user?.address)}
                    {renderUserInfo('Date of Birth', user?.dateOfBirth ? moment(user.dateOfBirth).format('YYYY-MM-DD') : 'Not set')}
                    {renderUserInfo('Gender', user?.gender)}
                    {renderUserInfo('Preferences', user?.preferences?.join(', ') || 'None')}
                    {renderUserInfo('Subscribed', user?.subscribe ? 'Yes' : 'No')}
                    {renderUserInfo('Role', user?.roll, false)}
    
                    <Space>
                        <Button onClick={() => setPasswordModalVisible(true)}>
                            Change Password
                        </Button>
                        <Button onClick={handleLogout}>
                            Log Out
                        </Button>
                    </Space>
    
                    {user?.roll === 'guest' && (
                        <Space direction="vertical">
                            {writerRequestStatus === null && (
                                <Button type="primary" onClick={() => setWriterRequestModalVisible(true)}>
                                    Request to become a writer
                                </Button>
                            )}
                            {writerRequestStatus === 'pending' && (
                                <Text type="warning">Your writer request is pending approval.</Text>
                            )}
                            {writerRequestStatus === 'rejected' && (
                                <Text type="danger">Your writer request was rejected. You may submit a new request.</Text>
                            )}
                        </Space>
                    )}
    
                    {user?.roll === 'writer' && (
                        <Space direction="vertical">
                            <Link to="/writer/publish">
                                <Button type="link">Tin đã viết</Button>
                            </Link>
                            <Link to="/writer/draft">
                                <Button type="link">Tin nháp</Button>
                            </Link>
                            <Link to="/writer">
                                <Button type="link">Viết bài mới</Button>
                            </Link>
                        </Space>
                    )}
                </Space>
            </Card>
    
            {renderEditModal()}
            {renderPasswordModal()}
            {renderWriterRequestModal()}
        </div>
    );
    
};

export default UserProfile;