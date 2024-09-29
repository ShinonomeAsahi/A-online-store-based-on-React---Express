import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

const Login = () => {
  const [redirectToHomePage, setRedirectToHomePage] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_password: ''
  });
  const [error, setError] = useState('');
  const { setToken, setUserId, setUserName } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 验证用户名和密码
    if (!formData.user_name || !formData.user_password) {
      setError('用户名和密码不能为空');
      return;
    }
    if (formData.user_password.length < 6) {
      setError('密码长度不能少于六位数');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', formData);
      const token = response.data.token.split(' ')[1]; // 移除 'Bearer ' 前缀
      setToken(token);
      setUserId(response.data.user_id);
      setUserName(response.data.user_name);
      // localStorage.setItem('username', response.data.user_name);
      setRedirectToHomePage(true);
    } catch (error) {
      console.error(error);
      setError('登录失败，请检查用户名和密码');
    }
  };

  if (redirectToHomePage) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>
      <div className="max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl mb-4">会员登录</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block mb-1">用户名</label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              className="w-full border-2 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">密码</label>
            <input
              type="password"
              name="user_password"
              value={formData.user_password}
              onChange={handleChange}
              className="w-full border-2 rounded px-3 py-2"
            />
          </div>
          <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded hover:bg-white hover:text-gray-900 hover:border hover:border-gray-900 transition-all duration-500">登录</button>
          <div className="flex justify-between mt-4 text-center">
            <Link to="/reset-password" className="text-sm text-gray-500 hover:text-gray-700">忘记密码?</Link>
            <Link to="/register" className="text-sm text-gray-500 hover:text-gray-700">注册</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
