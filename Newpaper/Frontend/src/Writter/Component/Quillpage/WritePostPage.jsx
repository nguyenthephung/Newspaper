// import React, { useState, useEffect } from 'react';
// import { Layout, Card, Col, Row, Button, Input, Select, DatePicker, Modal, notification, Spin, List, Typography } from 'antd';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useSelector, useDispatch } from 'react-redux';
// import moment from 'moment';
// import { updateArticle, getBookMaked, getArticlePending, deleteArticle } from '../../../redux/apiRequest';
// import { Link, useNavigate, useLocation } from 'react-router-dom'; // Thêm useLocation

// const { Option } = Select;
// const { Text } = Typography;

// const WritePostPage = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [publishDate, setPublishDate] = useState(null);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//     const [lastSaved, setLastSaved] = useState(null);
//     const [currentArticleId, setCurrentArticleId] = useState(null);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation(); // Sử dụng useLocation để nhận state
//     const categories = useSelector((state) => state.category?.getCategory?.categories) || [];
//     const user = useSelector(state => state.auth?.login?.currentUser);
//     const draftArticles = useSelector((state) => state.bookMaked?.getBookMaked?.bookMaked) || [];

//     useEffect(() => {
//         if (user) {
//             getBookMaked(dispatch, user._id);
//             getArticlePending(dispatch);
//         }
//     }, [dispatch, user]);

//     // Nhận dữ liệu bài viết khi có chuyển hướng từ Draft
//     useEffect(() => {
//         if (location.state && location.state.article) {
//             const article = location.state.article;
//             setCurrentArticleId(article._id);
//             setTitle(article.title);
//             setContent(article.content_blocks.map(block => {
//                 if (block.type === 'paragraph' || block.type === 'quote') {
//                     return block.content;
//                 } else if (block.type === 'image') {
//                     return `<img src="${block.src}" alt="${block.alt}" />`;
//                 }
//                 return '';
//             }).join(''));
//             // Tìm category ID dựa trên tên danh mục
//             const categoryId = categories.find(cat => cat.name === article.category)?._id;
//             setSelectedCategory(categoryId);
//             setSelectedTags(article.tags);
//             setPublishDate(article.publishDate ? moment(article.publishDate) : null);
//         }
//     }, [location.state, categories]);

//     const handleCategoryChange = (value) => {
//         setSelectedCategory(value);
//         setSelectedTags([]);
//     };

//     const handleTagChange = (value) => {
//         setSelectedTags(value);
//     };

//     const parseContent = (htmlContent) => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(htmlContent, 'text/html');
//         const blocks = [];

//         doc.body.childNodes.forEach((node) => {
//             if (node.nodeType === Node.ELEMENT_NODE) {
//                 if (node.tagName === 'P') {
//                     blocks.push({
//                         type: 'paragraph',
//                         content: node.innerHTML
//                     });
//                 } else if (node.tagName === 'IMG') {
//                     blocks.push({
//                         type: 'image',
//                         src: node.src,
//                         alt: node.alt
//                     });
//                 } else if (node.tagName === 'BLOCKQUOTE') {
//                     blocks.push({
//                         type: 'quote',
//                         content: node.innerHTML
//                     });
//                 }
//             }
//         });

//         return blocks;
//     };

//     const handleSave = (isPublished) => {
//         setIsSaving(true);
//         const contentBlocks = parseContent(content);
//         const categoryName = categories.find(cat => cat._id === selectedCategory)?.name || '';
//         const article = {
//             _id: currentArticleId,
//             userId: user._id,
//             title,
//             author: user.username,
//             category: categoryName, // Lưu tên danh mục thay vì ID
//             publish: isPublished,
//             tags: selectedTags,
//             content_blocks: contentBlocks,
//             publishDate: publishDate ? publishDate.toISOString() : null
//         };
//         updateArticle(dispatch, article)
//             .then(() => {
//                 setIsSaving(false);
//                 setLastSaved(new Date());
//                 notification.success({
//                     message: 'Success',
//                     description: isPublished ? 'Article published successfully!' : 'Draft saved successfully!'
//                 });
//                 getBookMaked(dispatch, user._id);
//                 resetForm(); // Reset form sau khi lưu
//             })
//             .catch((error) => {
//                 setIsSaving(false);
//                 notification.error({
//                     message: 'Error',
//                     description: 'An error occurred while saving the article.'
//                 });
//             });
//     };

//     const saveDraft = () => {
//         handleSave(false);
//     };

//     const handlePublish = () => {
//         handleSave(true);
//     };

//     const showModal = () => {
//         setIsModalVisible(true);
//     };

//     const handleOk = () => {
//         handlePublish();
//         setIsModalVisible(false);
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };

//     const handleDeleteDraft = (id) => {
//         deleteArticle(dispatch, id).then(() => {
//             getBookMaked(dispatch, user._id);
//             if (id === currentArticleId) {
//                 resetForm();
//             }
//         });
//     };

//     const resetForm = () => {
//         setCurrentArticleId(null);
//         setTitle('');
//         setContent('');
//         setSelectedCategory(null);
//         setSelectedTags([]);
//         setPublishDate(null);
//     };

//     const modules = {
//         toolbar: [
//             [{ 'header': [1, 2, false] }],
//             ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//             [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//             ['link', 'image'],
//             ['clean']
//         ],
//     };

//     const formats = [
//         'header',
//         'bold', 'italic', 'underline', 'strike', 'blockquote',
//         'list', 'bullet', 'indent',
//         'link', 'image'
//     ];

//     return (
//         <Layout>
//             <Row gutter={16}>
//                 <Col span={18}>
//                     <Card title={currentArticleId ? "Edit Draft" : "New Post"}>
//                         <Input
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             placeholder="Title"
//                             style={{ marginBottom: '20px', fontSize: '20px' }}
//                         />

//                         <Select
//                             placeholder="Select a category"
//                             onChange={handleCategoryChange}
//                             value={selectedCategory}
//                             style={{ width: '100%', marginBottom: '20px' }}
//                         >
//                             {categories.map(category => (
//                                 <Option key={category._id} value={category._id}>{category.name}</Option>
//                             ))}
//                         </Select>

//                         <Select
//                             mode="multiple"
//                             placeholder="Select tags"
//                             onChange={handleTagChange}
//                             value={selectedTags}
//                             style={{ width: '100%', marginBottom: '20px' }}
//                         >
//                             {selectedCategory && categories.find(cat => cat._id === selectedCategory)?.tags.map((tag, index) => (
//                                 <Option key={index} value={tag}>{tag}</Option>
//                             ))}
//                         </Select>

//                         <ReactQuill
//                             value={content}
//                             onChange={setContent}
//                             modules={modules}
//                             formats={formats}
//                             style={{ height: '300px', marginBottom: '50px' }}
//                         />

//                         <DatePicker
//                             showTime
//                             placeholder="Select Publish Date & Time"
//                             value={publishDate ? moment(publishDate) : null}
//                             onChange={(date) => setPublishDate(date)}
//                             style={{ marginTop: '20px' }}
//                         />

//                         <Button type="primary" onClick={showModal} style={{ marginTop: '20px' }}>Publish</Button>
//                         <Button onClick={saveDraft} style={{ marginTop: '20px', marginLeft: '10px' }}>Save Draft</Button>

//                         <Modal
//                             title="Confirm Publish"
//                             visible={isModalVisible}
//                             onOk={handleOk}
//                             onCancel={handleCancel}
//                         >
//                             <p>Are you sure you want to publish this article?</p>
//                         </Modal>
//                     </Card>
//                 </Col>
//             </Row>
//         </Layout>
//     );
// };

// export default WritePostPage;
// import React, { useState, useEffect, useRef } from 'react';
// import {
//     Layout,
//     Card,
//     Col,
//     Row,
//     Button,
//     Input,
//     Select,
//     DatePicker,
//     Modal,
//     notification,
//     Typography
// } from 'antd';
// import { Editor } from '@tinymce/tinymce-react';
// import { useSelector, useDispatch } from 'react-redux';
// import moment from 'moment';
// import {
//     updateArticle,
//     getBookMaked,
//     getArticlePending,
//     deleteArticle
// } from '../../../redux/apiRequest';
// import { useNavigate, useLocation } from 'react-router-dom';

// const { Option } = Select;
// const { Text } = Typography;

// const WritePostPage = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [publishDate, setPublishDate] = useState(null);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//     const [lastSaved, setLastSaved] = useState(null);
//     const [currentArticleId, setCurrentArticleId] = useState(null);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const categories = useSelector((state) => state.category?.getCategory?.categories) || [];
//     const user = useSelector(state => state.auth?.login?.currentUser);
//     const draftArticles = useSelector((state) => state.bookMaked?.getBookMaked?.bookMaked) || [];

//     const editorRef = useRef(null);
 

//     useEffect(() => {
//         if (user) {
//             getBookMaked(dispatch, user._id);
//             getArticlePending(dispatch);
//         }
//     }, [dispatch, user]);

//     useEffect(() => {
//         if (location.state && location.state.article) {
//             const article = location.state.article;
//             setCurrentArticleId(article._id || null);
//             setTitle(article.title || '');
//             setContent(article.content_blocks.map(block => {
//                 if (block.type === 'paragraph' || block.type === 'quote') {
//                     return block.content || '';
//                 } else if (block.type === 'image') {
//                     return `<img src="${block.src}" alt="${block.alt}" />`;
//                 }
//                 return '';
//             }).join(''));
//             const category = categories.find(cat => cat.name === article.category);
//             const categoryId = category ? category._id : null;
//             setSelectedCategory(categoryId);
//             setSelectedTags(article.tags || []);
//             setPublishDate(article.publishDate ? moment(article.publishDate) : null);
//         } else {
//             resetForm();
//         }
//     }, [location.state, categories]);

//     const handleCategoryChange = (value) => {
//         setSelectedCategory(value);
//         setSelectedTags([]);
//     };

//     const handleTagChange = (value) => {
//         setSelectedTags(value);
//     };

//     const parseContent = (htmlContent) => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(htmlContent, 'text/html');
//         const blocks = [];
    
//         doc.body.childNodes.forEach((node) => {
//             if (node.nodeType === Node.ELEMENT_NODE) {
//                 // Nếu là đoạn văn
//                 if (node.tagName === 'P') {
//                     let currentParagraph = ''; // Biến lưu trữ tạm nội dung đoạn văn
//                     node.childNodes.forEach((childNode) => {
//                         if (childNode.nodeType === Node.TEXT_NODE) {
//                             currentParagraph += childNode.textContent;
//                         } else if (childNode.nodeType === Node.ELEMENT_NODE && childNode.tagName === 'BR') {
//                             currentParagraph += '<br>';
//                         } else if (childNode.nodeType === Node.ELEMENT_NODE && childNode.tagName === 'IMG') {
//                             if (currentParagraph.trim()) {
//                                 // Đẩy đoạn văn hiện tại vào block trước khi xử lý ảnh
//                                 blocks.push({
//                                     type: 'paragraph',
//                                     content: currentParagraph.trim()
//                                 });
//                                 currentParagraph = ''; // Reset nội dung đoạn văn
//                             }
//                             // Thêm hình ảnh vào block
//                             blocks.push({
//                                 type: 'image',
//                                 src: childNode.getAttribute('src') || '',
//                                 alt: childNode.getAttribute('alt') || ''
//                             });
//                         }
//                     });
//                     if (currentParagraph.trim()) {
//                         // Đẩy đoạn văn cuối cùng vào block nếu còn
//                         blocks.push({
//                             type: 'paragraph',
//                             content: currentParagraph.trim()
//                         });
//                     }
//                 }
//                 // Nếu là thẻ img không nằm trong <p>
//                 else if (node.tagName === 'IMG') {
//                     blocks.push({
//                         type: 'image',
//                         src: node.getAttribute('src') || '',
//                         alt: node.getAttribute('alt') || ''
//                     });
//                 }
//                 // Nếu là thẻ quote
//                 else if (node.tagName === 'BLOCKQUOTE') {
//                     blocks.push({
//                         type: 'quote',
//                         content: node.innerHTML.trim()
//                     });
//                 }
//             }
//         });
    
//         return blocks;
//     };
    
    
    
//     const handleSave = (isPublished) => {
//         setIsSaving(true);
    
//         // Kiểm tra nếu editorRef.current tồn tại
//         if (editorRef.current) {
//             const contentBlocks = parseContent(editorRef.current.getContent()); // Chuyển đổi nội dung TinyMCE thành content_blocks
//             const categoryName = categories.find(cat => cat._id === selectedCategory)?.name || '';
//             const article = {
//                 _id: currentArticleId,
//                 userId: user._id,
//                 title,
//                 author: user.username,
//                 category: categoryName,
//                 publish: isPublished,
//                 tags: selectedTags,
//                 content_blocks: contentBlocks,
//                 publishDate: publishDate ? publishDate.toISOString() : null
//             };
    
//             updateArticle(dispatch, article)
//                 .then(() => {
//                     setIsSaving(false);
//                     setLastSaved(new Date());
//                     notification.success({
//                         message: 'Success',
//                         description: isPublished ? 'Article published successfully!' : 'Draft saved successfully!'
//                     });
//                     getBookMaked(dispatch, user._id);
//                     resetForm();
//                 })
//                 .catch((error) => {
//                     setIsSaving(false);
//                     notification.error({
//                         message: 'Error',
//                         description: 'An error occurred while saving the article.'
//                     });
//                 });
//         } else {
//             setIsSaving(false);
//             notification.error({
//                 message: 'Error',
//                 description: 'Editor is not initialized yet.'
//             });
//         }
//     };
    

//     const saveDraft = () => {
//         handleSave(false);
//     };

//     const handlePublish = () => {
//         handleSave(true);
//     };

//     const showModal = () => {
//         setIsModalVisible(true);
//     };

//     const handleOk = () => {
//         handlePublish();
//         setIsModalVisible(false);
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };

//     const resetForm = () => {
//         setCurrentArticleId(null);
//         setTitle('');
//         setContent('');
//         setSelectedCategory(null);
//         setSelectedTags([]);
//         setPublishDate(null);
//     };

//     return (
//         <Layout>
//             <Row gutter={16}>
//                 <Col span={18}>
//                     <Card title={currentArticleId ? "Edit Draft" : "New Post"}>
//                         <Input
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             placeholder="Title"
//                             style={{ marginBottom: '20px', fontSize: '20px' }}
//                         />

//                         <Select
//                             placeholder="Select a category"
//                             onChange={handleCategoryChange}
//                             value={selectedCategory}
//                             style={{ width: '100%', marginBottom: '20px' }}
//                         >
//                             {categories.map(category => (
//                                 <Option key={category._id} value={category._id}>{category.name}</Option>
//                             ))}
//                         </Select>

//                         <Select
//                             mode="multiple"
//                             placeholder="Select tags"
//                             onChange={handleTagChange}
//                             value={selectedTags}
//                             style={{ width: '100%', marginBottom: '20px' }}
//                         >
//                             {selectedCategory && categories.find(cat => cat._id === selectedCategory)?.tags.map((tag, index) => (
//                                 <Option key={index} value={tag}>{tag}</Option>
//                             ))}
//                         </Select>

//                         <Editor
//     apiKey='r8bopxw2pat6ygctufal4fsmgfibwz7ycshko88au6n635zm'
//     onInit={(evt, editor) => editorRef.current = editor} // Gắn editorRef vào editor
//     init={{
//         plugins: [
//             'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
//         ],
//         toolbar: 'undo redo | bold italic underline | link image media table | align left center right | removeformat'
//     }}
    
//     initialValue=""
// />

//                         <DatePicker
//                             showTime
//                             placeholder="Select Publish Date & Time"
//                             value={publishDate ? moment(publishDate) : null}
//                             onChange={(date) => setPublishDate(date)}
//                             style={{ marginTop: '20px' }}
//                         />

//                         <Button type="primary" onClick={showModal} style={{ marginTop: '20px' }}>Publish</Button>
//                         <Button onClick={saveDraft} style={{ marginTop: '20px', marginLeft: '10px' }}>Save Draft</Button>

//                         <Modal
//                             title="Confirm Publish"
//                             visible={isModalVisible}
//                             onOk={handleOk}
//                             onCancel={handleCancel}
//                         >
//                             <p>Are you sure you want to publish this article?</p>
//                         </Modal>
//                     </Card>
//                 </Col>
//             </Row>
//         </Layout>
//     );
// };

// export default WritePostPage;
// import React, { useState, useEffect, useRef } from 'react';
// import {
//     Layout,
//     Card,
//     Col,
//     Row,
//     Button,
//     Input,
//     Select,
//     DatePicker,
//     Modal,
//     notification,
//     Typography
// } from 'antd';
// import { Editor } from '@tinymce/tinymce-react';
// import { useSelector, useDispatch } from 'react-redux';
// import moment from 'moment';
// import {
//     updateArticle,
//     getBookMaked,
//     getArticlePending
// } from '../../../redux/apiRequest';
// import { useNavigate, useLocation } from 'react-router-dom';

// const { Option } = Select;
// const { Text } = Typography;

// const WritePostPage = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');  // Lưu HTML content ở đây
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [publishDate, setPublishDate] = useState(null);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//     const [lastSaved, setLastSaved] = useState(null);
//     const [currentArticleId, setCurrentArticleId] = useState(null);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const categories = useSelector((state) => state.category?.getCategory?.categories) || [];
//     const user = useSelector(state => state.auth?.login?.currentUser);
//     const draftArticles = useSelector((state) => state.bookMaked?.getBookMaked?.bookMaked) || [];

//     const editorRef = useRef(null);

//     useEffect(() => {
//         if (user) {
//             getBookMaked(dispatch, user._id);
//             getArticlePending(dispatch);
//         }
//     }, [dispatch, user]);

//     useEffect(() => {
//         if (location.state && location.state.article) {
//             const article = location.state.article;
//             setCurrentArticleId(article._id || null);
//             setTitle(article.title || '');
//             setContent(article.content || '');  // Gán lại nội dung HTML nếu có
//             const category = categories.find(cat => cat.name === article.category);
//             const categoryId = category ? category._id : null;
//             setSelectedCategory(categoryId);
//             setSelectedTags(article.tags || []);
//             setPublishDate(article.publishDate ? moment(article.publishDate) : null);
//         } else {
//             resetForm();
//         }
//     }, [location.state, categories]);

//     const handleCategoryChange = (value) => {
//         setSelectedCategory(value);
//         setSelectedTags([]);
//     };

//     const handleTagChange = (value) => {
//         setSelectedTags(value);
//     };

//     const handleSave = (isPublished) => {
//         setIsSaving(true);

//         if (editorRef.current) {
//             const htmlContent = editorRef.current.getContent();  // Lấy nội dung HTML từ TinyMCE
//             const categoryName = categories.find(cat => cat._id === selectedCategory)?.name || '';
//             const article = {
//                 _id: currentArticleId,
//                 userId: user._id,
//                 title,
//                 author: user.username,
//                 category: categoryName,
//                 publish: isPublished,
//                 tags: selectedTags,
//                 content: htmlContent,  // Lưu nội dung HTML trực tiếp
//                 publishDate: publishDate ? publishDate.toISOString() : null
//             };

//             updateArticle(dispatch, article)
//                 .then(() => {
//                     setIsSaving(false);
//                     setLastSaved(new Date());
//                     notification.success({
//                         message: 'Success',
//                         description: isPublished ? 'Article published successfully!' : 'Draft saved successfully!'
//                     });
//                     getBookMaked(dispatch, user._id);
//                     resetForm();
//                 })
//                 .catch((error) => {
//                     setIsSaving(false);
//                     notification.error({
//                         message: 'Error',
//                         description: 'An error occurred while saving the article.'
//                     });
//                 });
//         } else {
//             setIsSaving(false);
//             notification.error({
//                 message: 'Error',
//                 description: 'Editor is not initialized yet.'
//             });
//         }
//     };

//     const saveDraft = () => {
//         handleSave(false);
//     };

//     const handlePublish = () => {
//         handleSave(true);
//     };

//     const showModal = () => {
//         setIsModalVisible(true);
//     };

//     const handleOk = () => {
//         handlePublish();
//         setIsModalVisible(false);
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };

//     const resetForm = () => {
//         setCurrentArticleId(null);
//         setTitle('');
//         setContent('');
//         setSelectedCategory(null);
//         setSelectedTags([]);
//         setPublishDate(null);
//     };

//     return (
//         <Layout>
//             <Row gutter={16}>
//                 <Col span={18}>
//                     <Card title={currentArticleId ? "Edit Draft" : "New Post"}>
//                         <Input
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             placeholder="Title"
//                             style={{ marginBottom: '20px', fontSize: '20px' }}
//                         />

//                         <Select
//                             placeholder="Select a category"
//                             onChange={handleCategoryChange}
//                             value={selectedCategory}
//                             style={{ width: '100%', marginBottom: '20px' }}
//                         >
//                             {categories.map(category => (
//                                 <Option key={category._id} value={category._id}>{category.name}</Option>
//                             ))}
//                         </Select>

//                         <Select
//                             mode="multiple"
//                             placeholder="Select tags"
//                             onChange={handleTagChange}
//                             value={selectedTags}
//                             style={{ width: '100%', marginBottom: '20px' }}
//                         >
//                             {selectedCategory && categories.find(cat => cat._id === selectedCategory)?.tags.map((tag, index) => (
//                                 <Option key={index} value={tag}>{tag}</Option>
//                             ))}
//                         </Select>

//                         <Editor
//                             apiKey='r8bopxw2pat6ygctufal4fsmgfibwz7ycshko88au6n635zm'
//                             onInit={(evt, editor) => editorRef.current = editor}  // Gắn editorRef vào editor
//                             init={{
//                                 plugins: [
//                                     'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
//                                 ],
//                                 toolbar: 'undo redo | bold italic underline | link image media table | align left center right | removeformat'
//                             }}
//                             initialValue={content}  // Gán lại nội dung nếu có
//                         />

//                         <DatePicker
//                             showTime
//                             placeholder="Select Publish Date & Time"
//                             value={publishDate ? moment(publishDate) : null}
//                             onChange={(date) => setPublishDate(date)}
//                             style={{ marginTop: '20px' }}
//                         />

//                         <Button type="primary" onClick={showModal} style={{ marginTop: '20px' }}>Publish</Button>
//                         <Button onClick={saveDraft} style={{ marginTop: '20px', marginLeft: '10px' }}>Save Draft</Button>

//                         <Modal
//                             title="Confirm Publish"
//                             visible={isModalVisible}
//                             onOk={handleOk}
//                             onCancel={handleCancel}
//                         >
//                             <p>Are you sure you want to publish this article?</p>
//                         </Modal>
//                     </Card>
//                 </Col>
//             </Row>
//         </Layout>
//     );
// };

// export default WritePostPage;
import React, { useState, useEffect, useRef } from 'react';
import {
    Layout,
    Card,
    Col,
    Row,
    Button,
    Input,
    Select,
    DatePicker,
    Modal,
    notification,
    Typography
} from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
    updateArticle,
    getBookMaked,
    getArticlePending
} from '../../../redux/apiRequest';
import { useNavigate, useLocation } from 'react-router-dom';

const { Option } = Select;
const { Text } = Typography;

const WritePostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [publishDate, setPublishDate] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [currentArticleId, setCurrentArticleId] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Khai báo useNavigate
    const location = useLocation();
    const categories = useSelector((state) => state.category?.getCategory?.categories) || [];
    const user = useSelector(state => state.auth?.login?.currentUser);
    const draftArticles = useSelector((state) => state.bookMaked?.getBookMaked?.bookMaked) || [];

    const editorRef = useRef(null);

    useEffect(() => {
        if (user) {
            getBookMaked(dispatch, user._id);
            getArticlePending(dispatch);
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (location.state && location.state.article) {
            const article = location.state.article;
            setCurrentArticleId(article._id || null);
            setTitle(article.title || '');
            setContent(article.content || '');
            const category = categories.find(cat => cat.name === article.category);
            const categoryId = category ? category._id : null;
            setSelectedCategory(categoryId);
            setSelectedTags(article.tags || []);
            setPublishDate(article.publishDate ? moment(article.publishDate) : null);
        } else {
            resetForm();
        }
    }, [location.state, categories]);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setSelectedTags([]);
    };

    const handleTagChange = (value) => {
        setSelectedTags(value);
    };

    const handleSave = (isPublished) => {
        setIsSaving(true);

        if (editorRef.current) {
            const htmlContent = editorRef.current.getContent();
            const categoryName = categories.find(cat => cat._id === selectedCategory)?.name || '';
            const article = {
                _id: currentArticleId,
                userId: user._id,
                title,
                author : user.nickname ? user.nickname : user.username,
                category: categoryName,
                publish: isPublished,
                tags: selectedTags,
                content: htmlContent,
                publishDate: publishDate ? publishDate.toISOString() : null
            };

            updateArticle(dispatch, article)
                .then(() => {
                    setIsSaving(false);
                    setLastSaved(new Date());
                    notification.success({
                        message: 'Success',
                        description: isPublished ? 'Article published successfully!' : 'Draft saved successfully!'
                    });
                    getBookMaked(dispatch, user._id);
                    resetForm();
                })
                .catch((error) => {
                    setIsSaving(false);
                    notification.error({
                        message: 'Error',
                        description: 'An error occurred while saving the article.'
                    });
                });
        } else {
            setIsSaving(false);
            notification.error({
                message: 'Error',
                description: 'Editor is not initialized yet.'
            });
        }
    };

    const saveDraft = () => {
        handleSave(false);
    };

    const handlePublish = () => {
        handleSave(true);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        handlePublish();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const resetForm = () => {
        setCurrentArticleId(null);
        setTitle('');
        setContent('');
        setSelectedCategory(null);
        setSelectedTags([]);
        setPublishDate(null);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Row gutter={16} style={{ height: '100vh' }}>
                <Col span={24}>
                    <Card title={currentArticleId ? "Edit Draft" : "New Post"} style={{ height: '100%' }}>
                        <Button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>Quay lại</Button> {/* Nút Quay lại */}

                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            style={{ marginBottom: '20px', fontSize: '20px' }}
                        />

                        <Select
                            placeholder="Select a category"
                            onChange={handleCategoryChange}
                            value={selectedCategory}
                            style={{ width: '100%', marginBottom: '20px' }}
                        >
                            {categories.map(category => (
                                <Option key={category._id} value={category._id}>{category.name}</Option>
                            ))}
                        </Select>

                        <Select
                            mode="multiple"
                            placeholder="Select tags"
                            onChange={handleTagChange}
                            value={selectedTags}
                            style={{ width: '100%', marginBottom: '20px' }}
                        >
                            {selectedCategory && categories.find(cat => cat._id === selectedCategory)?.tags.map((tag, index) => (
                                <Option key={index} value={tag}>{tag}</Option>
                            ))}
                        </Select>

                        <Editor
                            apiKey='r8bopxw2pat6ygctufal4fsmgfibwz7ycshko88au6n635zm'
                            onInit={(evt, editor) => editorRef.current = editor}
                            init={{
                                height: '600px',
                                width: '100%',
                                plugins: [
                                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
                                ],
                                toolbar: 'undo redo | bold italic underline | link image media table | align left center right | removeformat'
                            }}
                            initialValue={content}
                        />

                        <DatePicker
                            showTime
                            placeholder="Select Publish Date & Time"
                            value={publishDate ? moment(publishDate) : null}
                            onChange={(date) => setPublishDate(date)}
                            style={{ marginTop: '20px' }}
                        />

                        <Button type="primary" onClick={showModal} style={{ marginTop: '20px' }}>Publish</Button>
                        <Button onClick={saveDraft} style={{ marginTop: '20px', marginLeft: '10px' }}>Save Draft</Button>

                        <Modal
                            title="Confirm Publish"
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <p>Are you sure you want to publish this article?</p>
                        </Modal>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};

export default WritePostPage;
