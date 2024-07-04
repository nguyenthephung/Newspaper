import React, { useState } from "react";
import Head from "./Head";
import "./header.css";
import { Link } from "react-router-dom";
import { Drawer, Switch, Button } from "antd";
import { MenuOutlined } from '@ant-design/icons';

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
  const staticTagsData = {
    tags: [
      {
        _id: "1",
        name: "Technology",
        description: "Articles about technology",
        listIdArticle: [
          { title: "Tech Article 1", description: "Description of Tech Article 1", author: "John Doe", date: "13/02/2021" },
          { title: "Tech Article 2", description: "Description of Tech Article 2", author: "Jane Smith", date: "13/02/2021" }
        ],
        date: "13/02/2021"
      },
      {
        _id: "2",
        name: "Health",
        description: "Articles about health",
        listIdArticle: [
          { title: "Health Article 1", description: "Description of Health Article 1", author: "Emily Johnson", date: "13/02/2021" },
          { title: "Health Article 2", description: "Description of Health Article 2", author: "Michael Brown", date: "13/02/2021" }
        ],
      },
    ],
  };

  const handleLogout = () => {
    // Logic đăng xuất
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
              {staticTagsData.tags.map((tag) => (
                <li key={tag._id}>
                  <Link to={`/tag/${tag._id}`} className="hover:text-gray-700">
                    {tag.name}
                  </Link>
                </li>
              ))}
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
    </>
  );
};

export default Header;
