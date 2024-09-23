import React, { useState, useEffect, useRef } from 'react';
import { Button, Table, Modal, Form, Input, Space, Typography, Select, Rate, notification } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from "react-redux";
import { getArticle, updateArticle, deleteArticle, getCategories } from '../../../redux/apiRequest';
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Title } = Typography;

const Article = () => {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const navigate = useNavigate();
  const articles = useSelector((state) => state.article?.getArticle?.articles);
  const categories = useSelector((state) => state.category?.getCategory?.categories);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();
  const editorRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to home page if user doesn't exist
    }
  }, [user, navigate]);

  useEffect(() => {
    getArticle(dispatch);
    getCategories(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    if (articles) {
      setTimeout(() => {
        setDataSource(articles);
        setFilteredData(articles);
        setLoading(false);
      }, 300);
    }
  }, [articles]);

  const getCategoryNames = () => {
    if (!categories || !Array.isArray(categories)) return [];
    return categories.map(category => category.name);
  };

  const getTags = (categoryName) => {
    if (!categories || !Array.isArray(categories)) return [];
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.tags : [];
  };

  const handleAdd = () => {
    form.validateFields().then(values => {
      const htmlContent = editorRef.current ? editorRef.current.getContent() : '';
      if (!htmlContent) {
        notification.error({
          message: 'Error',
          description: 'Content cannot be empty!',
        });
        return;
      }

      const newArticle = {
        ...values,
        content: htmlContent,
        status: 'approved',
        views: 0,
        totalRating: 0,
        ratingCount: 0,
        userId: user._id,
      };

      updateArticle(dispatch, newArticle)
        .then(() => {
          notification.success({
            message: 'Success',
            description: 'Article added successfully!',
          });
          getArticle(dispatch);
          setIsModalVisible(false);
          form.resetFields();
          if (editorRef.current) {
            editorRef.current.setContent('');
          }
        })
        .catch((error) => {
          notification.error({
            message: 'Error',
            description: 'An error occurred while adding the article.',
          });
        });
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleEdit = (record) => {
    setEditingArticle(record);
    form.setFieldsValue({
      title: record.title,
      author: record.author,
      category: record.category,
      tags: record.tags,
      // content sẽ được set trong useEffect
    });
    setSelectedCategory(record.category);
    setIsModalVisible(true);
  };

  const handleSaveEdit = () => {
    form.validateFields().then(values => {
      const htmlContent = editorRef.current ? editorRef.current.getContent() : '';
      if (!htmlContent) {
        notification.error({
          message: 'Error',
          description: 'Content cannot be empty!',
        });
        return;
      }

      const updatedArticle = {
        ...editingArticle,
        ...values,
        content: htmlContent,
      };

      updateArticle(dispatch, updatedArticle)
        .then(() => {
          notification.success({
            message: 'Success',
            description: 'Article updated successfully!',
          });
          getArticle(dispatch);
          setIsModalVisible(false);
          form.resetFields();
          setEditingArticle(null);
        })
        .catch((error) => {
          notification.error({
            message: 'Error',
            description: 'An error occurred while updating the article.',
          });
        });
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this article?',
      onOk: () => {
        deleteArticle(dispatch, record._id)
          .then(() => {
            notification.success({
              message: 'Deleted',
              description: 'Article deleted successfully!',
            });
            const newData = dataSource.filter((article) => article._id !== record._id);
            setDataSource(newData);
            setFilteredData(newData);
          })
          .catch((error) => {
            notification.error({
              message: 'Error',
              description: 'An error occurred while deleting the article.',
            });
          });
      },
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    form.setFieldsValue({ tags: [] });
  };

  // Khi mở modal để chỉnh sửa, nạp nội dung vào TinyMCE
  useEffect(() => {
    if (editingArticle && editorRef.current) {
      editorRef.current.setContent(editingArticle.content || '');
    } else if (!editingArticle && editorRef.current) {
      editorRef.current.setContent('');
    }
  }, [editingArticle]);

  return (
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      <Title level={4}>Article Management</Title>
      <Space direction="horizontal" style={{ justifyContent: 'space-between', width: '100%' }}>
        <Button type="primary" onClick={() => { setIsModalVisible(true); setEditingArticle(null); form.resetFields(); if (editorRef.current) { editorRef.current.setContent(''); } }}>Add Article</Button>
        <Input.Search
          placeholder="Search articles"
          enterButton
          onSearch={(value) => setFilteredData(dataSource.filter((article) =>
            article.title.toLowerCase().includes(value.toLowerCase()) ||
            article.author.toLowerCase().includes(value.toLowerCase())
          ))}
          style={{ maxWidth: '300px' }}
        />
      </Space>
      <Table
        loading={loading}
        dataSource={filteredData}
        rowKey="_id"
        columns={[
          {
            title: "Title",
            dataIndex: "title",
            sorter: (a, b) => a.title.localeCompare(b.title),
          },
          {
            title: "Author",
            dataIndex: "author",
            sorter: (a, b) => a.author.localeCompare(b.author),
          },
          {
            title: "Category",
            dataIndex: "category",
            render: (category) => <span>{category || "Unknown"}</span>,
            filters: getCategoryNames().map(cat => ({ text: cat, value: cat })),
            onFilter: (value, record) => record.category === value,
          },
          {
            title: "Tags",
            dataIndex: "tags",
            render: (tags) => (
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                {(tags || []).map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            ),
          },
          {
            title: "Average Rating",
            render: (record) => {
              const averageRating = record.ratingCount === 0 ? 0 : (record.totalRating / record.ratingCount).toFixed(1);
              return <Rate value={parseFloat(averageRating)} allowHalf disabled />;
            },
            sorter: (a, b) => {
              const avgA = a.ratingCount === 0 ? 0 : a.totalRating / a.ratingCount;
              const avgB = b.ratingCount === 0 ? 0 : b.totalRating / b.ratingCount;
              return avgA - avgB;
            },
          },
          {
            title: "Actions",
            render: (text, record) => (
              <Space>
                <Button onClick={() => handleEdit(record)}>Edit</Button>
                <Button danger onClick={() => handleDelete(record)}>Delete</Button>
              </Space>
            ),
          },
        ]}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingArticle ? "Edit Article" : "Add Article"}
        visible={isModalVisible}
        onCancel={() => { setIsModalVisible(false); setEditingArticle(null); form.resetFields(); if (editorRef.current) { editorRef.current.setContent(''); } }}
        width={800}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={editingArticle ? handleSaveEdit : handleAdd}
        >
          <Form.Item
            name="title"
            label="Article Title"
            rules={[{ required: true, message: 'Please input the article title!' }]}
          >
            <Input placeholder="Enter article title" />
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please input the author!' }]}
          >
            <Input placeholder="Enter author name" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select
              style={{ width: '100%' }}
              placeholder="Select a category"
              onChange={handleCategoryChange}
            >
              {getCategoryNames().map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>
          {selectedCategory && (
            <Form.Item
              name="tags"
              label="Tags"
              rules={[{ required: true, message: 'Please select at least one tag!' }]}
            >
              <Select mode="multiple" style={{ width: '100%' }} placeholder="Select tags">
                {getTags(selectedCategory).map(tag => (
                  <Option key={tag} value={tag}>{tag}</Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {/* TinyMCE Editor for Content */}
          <Form.Item
            label="Content"
            required
            rules={[{ required: true, message: 'Please enter the content!' }]}
          >
            <Editor
              apiKey='r8bopxw2pat6ygctufal4fsmgfibwz7ycshko88au6n635zm' // Thay YOUR_TINYMCE_API_KEY bằng API key thực tế của bạn
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue={editingArticle ? editingArticle.content : ''}
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
              ],
              toolbar: 'undo redo | bold italic underline | link image media table | align left center right | removeformat'
              }}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingArticle ? "Update" : "Add"}
              </Button>
              <Button onClick={() => { setIsModalVisible(false); setEditingArticle(null); form.resetFields(); if (editorRef.current) { editorRef.current.setContent(''); } }}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default Article;




/*
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Space, Typography, Select, Rate } from 'antd';
const { Option } = Select;
import { useDispatch,useSelector } from "react-redux";
import { getArticle,updateArticle,deleteArticle,getCategories } from '../../../redux/apiRequest';

const staticCategoryData = {
  categories: [
    {
      name: "Thời sự",
      tags: ["Chính trị", "Xã hội", "Quốc tế", "Giao thông", "Môi trường"],
    },
    {
      name: "Khoa học",
      tags: ["Công nghệ", "Khám phá", "Nghiên cứu"],
    },
    // Add more categories as needed
  ],
};
const articles = useSelector((state) => state.article.getArticle.articles);
const categories = useSelector((state) => state.category.getCategory.categories);
const dispatch = useDispatch();
  

  useEffect(() => {
    getArticle(dispatch);
  }, [dispatch]);
const getCategories = () => staticCategoryData.categories.map(category => category.name);

const getTags = (categoryName) => {
  const category = staticCategoryData.categories.find(cat => cat.name === categoryName);
  return category ? category.tags : [];
};

const staticArticlesData = {
  articles: [
    // Articles data here...
  ],
};

const Article = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [filteredData, setFilteredData] = useState(staticArticlesData.articles);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDataSource(staticArticlesData.articles);
      setLoading(false);
    }, 300);
  }, []);

  const handleAdd = () => {
    setEditingArticle(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingArticle(record);
    form.setFieldsValue(record);
    setSelectedCategory(record.categories[0]);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    const newData = dataSource.filter((article) => article._id !== record._id);
    setDataSource(newData);
    setFilteredData(newData);
  };

  const handleSave = (values) => {
    if (editingArticle) {
      const newData = dataSource.map((article) =>
        article._id === editingArticle._id ? { ...article, ...values } : article
      );
      setDataSource(newData);
      setFilteredData(newData);
    } else {
      const newArticle = {
        _id: (dataSource.length + 1).toString(),
        ...values,
        status: 'pending',
        views: 0,
        totalRating: 0,
        ratingCount: 0,
      };
      const newData = [...dataSource, newArticle];
      setDataSource(newData);
      setFilteredData(newData);
    }
    setIsModalVisible(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    form.setFieldsValue({ tags: [] }); // Reset tags field when category changes
  };

  return (
    <Space direction="vertical" size={20}>
      <Typography.Title level={4}>Article Management</Typography.Title>
      <Space direction="horizontal">
        <Button type="primary" onClick={handleAdd}>Add Article</Button>
        <Input.Search
          placeholder="Search articles"
          enterButton
          onSearch={(value) => setFilteredData(dataSource.filter((article) =>
            article.title.toLowerCase().includes(value.toLowerCase()) ||
            article.author.toLowerCase().includes(value.toLowerCase())
          ))}
        />
      </Space>
      <Table
        loading={loading}
        dataSource={filteredData}
        rowKey="_id"
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Author",
            dataIndex: "author",
          },
          {
            title: "Category",
            dataIndex: "categories",
            render: (categories) => <span>{categories[0]}</span>,
          },
          {
            title: "Tags",
            dataIndex: "tags",
            render: (tags) => (
              <ul>
                {tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            ),
          },
          {
            title: "Average Rating",
            render: (record) => {
              const averageRating = record.ratingCount === 0 ? 0 : record.totalRating / record.ratingCount;
              return <Rate value={averageRating} allowHalf disabled />;
            },
          },
          {
            title: "Actions",
            render: (text, record) => (
              <Space>
                <Button onClick={() => handleEdit(record)}>Edit</Button>
                <Button danger onClick={() => handleDelete(record)}>Delete</Button>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        title={editingArticle ? "Edit Article" : "Add Article"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} initialValues={editingArticle} onFinish={handleSave}>
          <Form.Item
            name="title"
            label="Article Title"
            rules={[{ required: true, message: 'Please input the article title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please input the author!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categories"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select
              style={{ width: '100%' }}
              placeholder="Select a category"
              onChange={handleCategoryChange}
            >
              {getCategories().map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>
          {selectedCategory && (
            <Form.Item
              name="tags"
              label="Tags"
              rules={[{ required: true, message: 'Please select at least one tag!' }]}
            >
              <Select mode="multiple" style={{ width: '300px' }} placeholder="Select tags">
                {getTags(selectedCategory).map(tag => (
                  <Option key={tag} value={tag}>{tag}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default Article;

*/