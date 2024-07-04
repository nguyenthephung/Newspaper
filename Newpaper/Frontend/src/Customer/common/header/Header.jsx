import React, { useState } from "react";
import Head from "./Head";
import "./header.css";
import { Link } from "react-router-dom";
import { Drawer, Switch, Button, Menu, Dropdown, Modal } from "antd";
import { MenuOutlined, DownOutlined } from '@ant-design/icons';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState({
    username: "Phung",
    email: "phung@example.com",
    preferences: {
      categories: [
        {
          category: "Technology",
          topics: ["React", "Node.js"]
        }
      ]
    },
    notificationsEnabled: true,
    adFreeSubscription: false
  });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  const staticCategoryData = {
    "categories": [
      {
        "name": "Thời sự",
        "tags": [
          "Chính trị",
          "Xã hội",
          "Quốc tế",
          "Giao thông",
          "Môi trường"
        ]
      },
      {
        "name": "Kinh tế",
        "tags": [
          "Tài chính",
          "Chứng khoán",
          "Bất động sản",
          "Doanh nghiệp",
          "Khởi nghiệp"
        ]
      },
      {
        "name": "Thể thao",
        "tags": [
          "Bóng đá",
          "Bóng rổ",
          "Tennis",
          "Cầu lông",
          "Điền kinh"
        ]
      },
      {
        "name": "Văn hóa",
        "tags": [
          "Điện ảnh",
          "Âm nhạc",
          "Mỹ thuật",
          "Văn học",
          "Sân khấu"
        ]
      },
      {
        "name": "Giải trí",
        "tags": [
          "Sao",
          "Phim ảnh",
          "TV Show",
          "Âm nhạc",
          "Trò chơi"
        ]
      },
      {
        "name": "Công nghệ",
        "tags": [
          "Điện thoại",
          "Máy tính",
          "Internet",
          "AI",
          "Gadget"
        ]
      },
      {
        "name": "Sức khỏe",
        "tags": [
          "Dinh dưỡng",
          "Bệnh tật",
          "Lối sống",
          "Tập luyện",
          "Tinh thần"
        ]
      },
      {
        "name": "Giáo dục",
        "tags": [
          "Học đường",
          "Tuyển sinh",
          "Du học",
          "Đào tạo",
          "Công nghệ giáo dục"
        ]
      },
      {
        "name": "Du lịch",
        "tags": [
          "Điểm đến",
          "Kinh nghiệm",
          "Ẩm thực",
          "Khám phá",
          "Nghỉ dưỡng"
        ]
      }
    ]
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleToggleNotifications = () => {
    setUser({ ...user, notificationsEnabled: !user.notificationsEnabled });
  };

  const handleToggleAdFree = () => {
    setUser({ ...user, adFreeSubscription: !user.adFreeSubscription });
  };

  const categoryMenu = (category) => (
    <Menu>
      {category.tags.map((tag, index) => (
        <Menu.Item key={index}>
          <Link to={`/tag/${tag}`}>{tag}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Head />
      <header>
        <div className="container mx-auto p-4">
          <nav className="flex justify-between items-center">
            <ul className={navbar ? "navbar" : "flex space-x-4"}>
              <li>
                <Link to="/" className="hover:text-gray-700">
                  Home
                </Link>
              </li>
              {staticCategoryData.categories.slice(0, 9).map((category, index) => (
                <li key={index}>
                    <Link to={`/category/${category.name}`} className="ant-dropdown-link hover:text-gray-700">
                      {category.name}
                    </Link>
               
                </li>
              ))}
              <li>
                <button onClick={openModal} className="hover:text-gray-700">
                  More
                </button>
              </li>
            </ul>
            <div className="relative flex items-center space-x-4">
              {user ? (
                <>
                  <button onClick={toggleDrawer} className="relative text-blue-700">
                    Hi, <span>{user.username}</span>
                  </button>
                  <Drawer
                    title="User Info"
                    placement="right"
                    onClose={toggleDrawer}
                    visible={drawerVisible}
                  >
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <div className="py-2">
                      <label className="text-gray-700">
                        Enable Notifications
                        <Switch
                          checked={user.notificationsEnabled}
                          onChange={handleToggleNotifications}
                          className="ml-2"
                        />
                      </label>
                    </div>
                    <div className="py-2">
                      <label className="text-gray-700">
                        Ad-Free Subscription
                        <Switch
                          checked={user.adFreeSubscription}
                          onChange={handleToggleAdFree}
                          className="ml-2"
                        />
                      </label>
                    </div>
                    <Button
                      type="primary"
                      danger
                      className="mt-4"
                      onClick={handleLogout}
                    >
                      Log out
                    </Button>
                  </Drawer>
                </>
              ) : (
                <>
                  <Link to="/login" className="navbar-login text-blue-700">
                    Login
                  </Link>
                  <Link to="/register" className="navbar-register text-blue-700">
                    Register
                  </Link>
                </>
              )}
              <button
                className="barIcon text-gray-900"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <i className="fa fa-times"></i>
                ) : (
                  <MenuOutlined />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>
      <Modal
  visible={modalVisible}
  onCancel={closeModal}
  footer={null}
  width="80%"
>
  <div className="grid grid-cols-6 gap-4">
    {staticCategoryData.categories.map((category, index) => (
      <div key={index} className="mb-4">
        <h3 className="font-bold">
          <Link to={`/category/${category.name}`}>{category.name}</Link>
        </h3>
        <ul className="ml-4 list-disc">
          {category.tags.map((tag, tagIndex) => (
            <li key={tagIndex}>
              <Link to={`/tag/${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</Modal>;
    </>
  );
};

export default Header;
