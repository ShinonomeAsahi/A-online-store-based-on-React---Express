import axios from 'axios';



// 创建讨论
const createDiscussion = async (discussionData) => {
    const response = await axios.post('/api/discussions/create', discussionData);
    return response.data;
  };
  
  // 获取所有讨论
  const getDiscussions = async () => {
    const response = await axios.get('http://localhost:3010/api/discussions/getDiscussionList');
    // console.log(response.data)
    return response.data;
  };
  
  // 获取单个讨论
  const getDiscussionById = async (id) => {
    const response = await axios.get(`/api/discussions/${id}`);
    return response.data;
  };
  
  // 更新讨论
  const updateDiscussion = async (id, discussionData) => {
    const response = await axios.put(`/api/discussions/${id}`, discussionData);
    return response.data;
  };
  
  // 删除讨论
  const deleteDiscussion = async (id) => {
    const response = await axios.delete(`/api/discussions/${id}`);
    return response.data;
  };
  
  export { createDiscussion, getDiscussions, getDiscussionById, updateDiscussion, deleteDiscussion };