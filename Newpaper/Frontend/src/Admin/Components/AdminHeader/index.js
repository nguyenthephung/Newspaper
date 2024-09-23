import {
  Avatar,
  Badge,
  Drawer,
  List,
  Space,
  Typography,
  Form,
  Input,
  Button,
} from "antd";
import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  updateUser,
  getComment,
  getArticlePending,
} from "../../../redux/apiRequest";
import "./header.css";

function AdminHeader() {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [adminInfoVisible, setAdminInfoVisible] = useState(false);
  const dispatch = useDispatch();

  const adminInfo = useSelector(
    (state) => state.auth?.login?.currentUser
  );
  const articlesPending = useSelector(
    (state) =>
      state.articlePending?.getArticlePending?.articlesPending
  ) || [];
  const comments = useSelector(
    (state) => state.comment?.getComment?.comments
  ) || [];

  // Lọc những comment và bài viết chưa được đọc
  const unreadComments = comments.filter((comment) => !comment.isRead);
  const pendingArticles = articlesPending.filter(
    (article) =>
      article.status === "pending" &&
      article.publish === true &&
      article.isRead === false
  );

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

  const markCommentsAsRead = async (commentsToMark) => {
    try {
      const unreadCommentIds = commentsToMark
        .filter((comment) => !comment.isRead)
        .map((comment) => comment._id);
      if (unreadCommentIds.length > 0) {
        await axios.post("/v1/comment/markAsRead", {
          commentIds: unreadCommentIds,
        });
        // Sau khi thành công, làm mới danh sách bình luận
        await getComment(dispatch);
      }
    } catch (error) {
      console.error("Failed to update comments as read:", error);
    }
  };

  const markArticlesAsRead = async (articlesToMark) => {
    try {
      const unreadArticleIds = articlesToMark
        .filter((article) => !article.isRead)
        .map((article) => article._id);
      if (unreadArticleIds.length > 0) {
        await axios.post("/v1/article/markAsRead", {
          articleIds: unreadArticleIds,
        });
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
  };

  const openNotificationsDrawer = () => {
    setNotificationsOpen(true);
    // Không đánh dấu bài viết là đã đọc tại đây
  };

  const handleArticleClick = async (article) => {
    // Xử lý khi người dùng nhấp vào bài viết (ví dụ: mở chi tiết bài viết)
    // Bạn có thể thêm logic để mở chi tiết bài viết ở đây

    // Đánh dấu bài viết này là đã đọc
    await markArticlesAsRead([article]);
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
        <Badge
          count={unreadComments.length}
          dot={unreadComments.some((comment) => !comment.isRead)}
        >
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={openCommentsDrawer}
          />
        </Badge>

        <Badge
          count={pendingArticles.length}
          dot={pendingArticles.some((article) => !article.isRead)}
        >
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={openNotificationsDrawer}
          />
        </Badge>
      </Space>
      {/* Drawer Cho Bình Luận */}
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
              <Typography.Text strong>
                {item.user?.name || "Unknown User"}{" "}
                {item.userId ? `(${item.userId})` : "(Unknown ID)"}
              </Typography.Text>{" "}
              commented on the article{" "}
              <Typography.Text strong>
                {item.article?.title || (item.articleId ? item.articleId : "Unknown Article")}
              </Typography.Text>{" "}
              with the content:{" "}
              {item.content || "No content provided"}
            </List.Item>
          )}
        />
      </Drawer>
      {/* Drawer Cho Thông Báo Bài Viết */}
      <Drawer
        title="Notifications"
        visible={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        maskClosable
      >
        <List
          dataSource={pendingArticles}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleArticleClick(item)}
              style={{ cursor: "pointer" }}
            >
              <Typography.Text strong>{item.author}</Typography.Text>: {item.title} is pending review!
            </List.Item>
          )}
        />
      </Drawer>
      {/* Drawer Cho Thông Tin Admin */}
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
