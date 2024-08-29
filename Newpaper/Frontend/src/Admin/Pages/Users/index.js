// import { Button, Checkbox, Form, Input, Modal, Space, Table, Typography } from "antd";
// import React, { useState, useEffect } from 'react';

// // Static customers data for demonstration
// const staticCustomersData = {
//   users: [
//     {
//       id: 1,
//       username: "johndoe",
//       email: "john.doe@example.com",
//       isAdmin: false,
//       socialAccounts: {
//         facebook: "john.doe.facebook",
//         google: "john.doe.google",
//         phoneNumber: "+1234567890",
//       },
//       preferences: {
//         categories: [
//           {
//             category: "60c72b2f9b1e8b0b8c9c9a1a", // ObjectId of Category
//             topics: ["technology", "health"],
//           },
//         ],
//       },
//       notificationsEnabled: true,
//       bookmarkedArticles: ["60c72b3e9b1e8b0b8c9c9a1b"], // ObjectId of Article
//       adFreeSubscription: false,
//     },
//     {
//       id: 2,
//       username: "janesmith",
//       email: "jane.smith@example.com",
//       isAdmin: true,
//       socialAccounts: {
//         facebook: "jane.smith.facebook",
//         google: "jane.smith.google",
//         phoneNumber: "+1987654321",
//       },
//       preferences: {
//         categories: [
//           {
//             category: "60c72b2f9b1e8b0b8c9c9a1c", // ObjectId of Category
//             topics: ["business", "sports"],
//           },
//         ],
//       },
//       notificationsEnabled: true,
//       bookmarkedArticles: ["60c72b3e9b1e8b0b8c9c9a1d"], // ObjectId of Article
//       adFreeSubscription: true,
//     },
//     {
//       id: 3,
//       username: "michaeljohnson",
//       email: "michael.johnson@example.com",
//       isAdmin: false,
//       socialAccounts: {
//         facebook: "michael.johnson.facebook",
//         google: "michael.johnson.google",
//         phoneNumber: "+1122334455",
//       },
//       preferences: {
//         categories: [
//           {
//             category: "60c72b2f9b1e8b0b8c9c9a1e", // ObjectId of Category
//             topics: ["entertainment", "travel"],
//           },
//         ],
//       },
//       notificationsEnabled: false,
//       bookmarkedArticles: ["60c72b3e9b1e8b0b8c9c9a1f"], // ObjectId of Article
//       adFreeSubscription: false,
//     },
//   ],
// };

// const Users = () => {
//   const [loading, setLoading] = useState(false);
//   const [dataSource, setDataSource] = useState(null);
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   useEffect(() => {
//     setLoading(true);
//     // Simulating API call with static data
//     setTimeout(() => {
//       setDataSource(staticCustomersData.users);
//       setLoading(false);
//     }, 300); // Simulating loading time
//   }, []);
//   const handleAddCustomer = () => {
//     setEditingCustomer(null);
//     form.resetFields();
//     setModalVisible(true);
//   };

//   const handleEditCustomer = (customer) => {
//     setEditingCustomer(customer);
//     form.setFieldsValue(customer);
//     setModalVisible(true);
//   };

//   const handleDeleteCustomer = (customerId) => {
//     const updatedData = dataSource.filter((customer) => customer.id !== customerId);
//     setDataSource(updatedData);
//   };

//   const handleSaveCustomer = () => {
//     form.validateFields().then((values) => {
//       if (editingCustomer) {
//         const updatedData = dataSource.map((customer) =>
//           customer.id === editingCustomer.id ? { ...customer, ...values } : customer
//         );
//         setDataSource(updatedData);
//       } else {
//         const newId = dataSource.length > 0 ? dataSource[dataSource.length - 1].id + 1 : 1;
//         const newCustomer = { ...values, id: newId };
//         setDataSource([...dataSource, newCustomer]);
//       }
//       setModalVisible(false);
//     });
//   };

//   const handleSearch = (value) => {
//     const filteredData = staticCustomersData.users.filter((customer) =>
//       customer.username.toLowerCase().includes(value.toLowerCase()) ||
//       customer.email.toLowerCase().includes(value.toLowerCase())
//     );
//     setDataSource(filteredData);
//   };

//   const columns = [
//     {
//       title: "Username",
//       dataIndex: "username",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//     },
//     {
//       title: "Is Admin",
//       dataIndex: "isAdmin",
//       render: (isAdmin) => <Checkbox checked={isAdmin} disabled />,
//     },
//     {
//       title: "Phone Number",
//       dataIndex: ["socialAccounts", "phoneNumber"],
//     },
//     {
//       title: "Actions",
//       dataIndex: "action",
//       render: (_, record) => (
//         <Space>
//           <Button type="primary" onClick={() => handleEditCustomer(record)}>
//             Edit
//           </Button>
//           <Button type="danger" onClick={() => handleDeleteCustomer(record.id)}>
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <Space size={20} direction="vertical">
//       <Typography.Title level={4}>Users</Typography.Title>
//       <Space direction="horizontal">
//       <Button type="primary" onClick={handleAddCustomer}>
//         Add User
//       </Button>
//       <Input.Search
//         placeholder="Search users"
//         enterButton
//         onSearch={handleSearch}
//         onChange={(e) => handleSearch(e.target.value)}
//       />
//       </Space>
//       <Table  loading = {loading} columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} rowKey="id" />
//       <Modal
//         title={editingCustomer ? "Edit User" : "Add User"}
//         visible={modalVisible}
//         onOk={handleSaveCustomer}
//         onCancel={() => setModalVisible(false)}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please enter username" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter email" }, { type: "email", message: "Please enter a valid email" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="isAdmin" valuePropName="checked">
//             <Checkbox>Is Admin</Checkbox>
//           </Form.Item>
//           <Form.Item name={["socialAccounts", "phoneNumber"]} label="Phone Number">
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </Space>
//   );
// };

// export default Users;
import { Button, Checkbox, Form, Input, Modal, Space, Table, Typography, message } from "antd";
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUser, deleteUser } from "../../../redux/apiRequest";
import debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom";
const Users = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const navigate = useNavigate();
  const users = useSelector((state) => state.user?.users?.allUsers) || []; 
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();
  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to home page if user doesn't exist
    }
  }, [user, navigate]);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        await getAllUsers(dispatch);
      } catch (error) {
        message.error("Failed to fetch users: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter((user) => 
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.socialAccounts?.phoneNumber?.includes(searchTerm)
    );
  }, [users, searchTerm]);

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      ...user,
      phoneNumber: user.socialAccounts?.phoneNumber,
    });
    setModalVisible(true);
  };

  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      await deleteUser(dispatch, userId);
      message.success("User deleted successfully");
      await getAllUsers(dispatch);
    } catch (error) {
      message.error("Failed to delete user: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUser = async () => {
    try {
        const values = await form.validateFields();
        setLoading(true);

        const userData = {
            username: values.username,
            email: values.email,
            isAdmin: values.isAdmin || false,
            socialAccounts: {
                phoneNumber: values.phoneNumber || '',
            },
        };

        if (values.password) {
            userData.password = values.password;
        }

        if (editingUser) {
            // Sửa người dùng hiện có
            const updatedUser = { ...userData, _id: editingUser._id };
            await updateUser(dispatch, updatedUser);
            message.success("User updated successfully");
        } else {
            // Thêm người dùng mới
            if (!values.password) {
                message.error("Password is required for new users");
                setLoading(false);
                return;
            }
            await updateUser(dispatch, userData); // Không thêm _id khi thêm người dùng mới
            message.success("User created successfully");
        }

        await getAllUsers(dispatch);
        setModalVisible(false);
        form.resetFields();
    } catch (error) {
        message.error("Operation failed: " + error.message);
    } finally {
        setLoading(false);
    }
};

  

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      render: (username) => username || 'No Username',
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) => email || 'No Email',
    },
    {
      title: "Is Admin",
      dataIndex: "isAdmin",
      render: (isAdmin) => <Checkbox checked={isAdmin || false} disabled />,
    },
    {
      title: "Phone Number",
      dataIndex: ["socialAccounts", "phoneNumber"],
      render: (phoneNumber) => phoneNumber || 'No Phone Number',
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEditUser(record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDeleteUser(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space size={20} direction="vertical" style={{ width: '100%' }}>
      <Typography.Title level={4}>Users</Typography.Title>
      <Space direction="horizontal" style={{ width: '100%', justifyContent: 'space-between' }}>
        <Button type="primary" onClick={handleAddUser}>
          Add User
        </Button>
        <Input.Search
          placeholder="Search users by username, email or phone"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </Space>
      <Table
        loading={loading}
        columns={columns}
        dataSource={filteredUsers}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
      />
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={modalVisible}
        onOk={handleSaveUser}
        onCancel={() => setModalVisible(false)}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: !editingUser,
                message: "Please enter password",
              },
            ]}
          >
            <Input.Password placeholder={editingUser ? "Leave blank to keep current password" : "Enter password"} />
          </Form.Item>
          <Form.Item
            name="isAdmin"
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox>Is Admin</Checkbox>
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default Users;
