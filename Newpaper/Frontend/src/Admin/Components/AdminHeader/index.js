import { Avatar, Badge, Drawer, List, Space, Typography, Form, Input, Button } from "antd";
import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUser, getComment, getArticlePending } from "../../../redux/apiRequest";
import "./header.css";

function AdminHeader() {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [adminInfoVisible, setAdminInfoVisible] = useState(false);
  const dispatch = useDispatch();

  const adminInfo = useSelector((state) => state.auth?.login?.currentUser);
  const articlesPending = useSelector((state) => state.articlePending?.getArticlePending?.articlesPending) || [];
  const comments = useSelector((state) => state.comment?.getComment?.comments) || [];
  
  // Lọc những comment và bài viết chưa được đọc
  const unreadComments = comments.filter((comment) => !comment.isRead);
  const pendingArticles = articlesPending.filter((article) => article.status === 'pending' && article.publish === true&&article.isRead ===false);

  useEffect(() => {
    getComment(dispatch);
    getArticlePending(dispatch);
  }, [dispatch]);

  const showAdminInfoDrawer = () => {
    setAdminInfoVisible(true);
  };

  const closeAdminInfoDrawer = () => {
    setAdminInfoVisible(false);
  };

  const handleAdminInfoUpdate = (values) => {
    const updatedUser = {
      ...adminInfo,
      ...values,
      password: values.password ? values.password : adminInfo.password,
    };
    updateUser(dispatch, updatedUser);
    closeAdminInfoDrawer();
  };

  // Gọi API để đánh dấu tất cả bình luận là đã đọc
  const markCommentsAsRead = async (comments) => {
    try {
      const commentIds = comments.map(comment => comment._id);
      if (commentIds.length > 0) {
        await axios.post("/v1/comment/markAsRead", { commentIds });
        // Sau khi thành công, làm mới danh sách bình luận
        await getComment(dispatch);
      }
    } catch (error) {
      console.error("Failed to update comments as read:", error);
    }
  };

  // Gọi API để đánh dấu tất cả bài viết là đã đọc
  const markArticlesAsRead = async (articles) => {
    try {
      const articleIds = articles.map(article => article._id);
      if (articleIds.length > 0) {
        await axios.post("/v1/article/markAsRead", { articleIds });
        // Sau khi thành công, làm mới danh sách bài viết
        await getArticlePending(dispatch);
      }
    } catch (error) {
      console.error("Failed to update articles as read:", error);
    }
  };

  const openCommentsDrawer = async () => {
    setCommentsOpen(true);
    // Đánh dấu tất cả bình luận là đã đọc
    await markCommentsAsRead(unreadComments);
    // Làm mới dữ liệu sau khi API gọi thành công
    const updatedComments = await getComment(dispatch);
    // Kiểm tra xem có cập nhật đúng cách không
    console.log("Updated Comments: ", updatedComments);
  };
  
  const openNotificationsDrawer = async () => {
    setNotificationsOpen(true);
    // Đánh dấu tất cả thông báo là đã đọc
    await markArticlesAsRead(pendingArticles);
    // Làm mới dữ liệu sau khi API gọi thành công
    const updatedArticles = await getArticlePending(dispatch);
    // Kiểm tra xem có cập nhật đúng cách không
    console.log("Updated Articles: ", updatedArticles);
  };
  

  return (
    <div className="AppHeader">
      <Avatar
        size={40}
        icon={<UserOutlined />}
        src="https://cdn.pixabay.com/photo/2014/03/25/16/32/user-297330_1280.png"
        onClick={showAdminInfoDrawer}
        style={{ cursor: "pointer" }}
      />
      <Typography.Title level={3} style={{ margin: "0 16px" }}>
        Admin Dashboard
      </Typography.Title>
      <Space>
        <Badge count={unreadComments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={openCommentsDrawer}
          />
        </Badge>
        <Badge count={pendingArticles.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={openNotificationsDrawer}
          />
        </Badge>
      </Space>
      <Drawer
        title="Comments"
        visible={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text strong>{item.user}</Typography.Text>: {item.content}
            </List.Item>
          )}
        />
      </Drawer>
      <Drawer
        title="Notifications"
        visible={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        maskClosable
      >
        <List
          dataSource={pendingArticles}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text strong>{item.author}</Typography.Text>: {item.title} is pending review!
            </List.Item>
          )}
        />
      </Drawer>
      <Drawer
        title="Admin Information"
        visible={adminInfoVisible}
        onClose={closeAdminInfoDrawer}
        width={400}
      >
        <Form
          layout="vertical"
          onFinish={handleAdminInfoUpdate}
          initialValues={adminInfo}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              <Button onClick={closeAdminInfoDrawer}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default AdminHeader;
