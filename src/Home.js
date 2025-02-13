import React, { useEffect, useState } from 'react';
import { getUserDetails } from './api';
import { useNavigate } from 'react-router-dom';
import { Table, Spin, message } from 'antd';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const userData = await getUserDetails(token);
        setUser(userData);
      } catch (error) {
        console.error('Unauthorized access or API error:', error);
        navigate('/');
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products); // Store product data
        
      } catch (error) {
        
        message.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    
  }, []);

  // Table columns definition
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {`${user?.firstName || ''} ${user?.lastName || ''}`}</h2>
      <p>Email: {user?.email}</p>

      <h3>Products List</h3>
      {loading ? (
        <Spin tip="Loading products..." />
      ) : (
        <Table bordered={true} columns={columns} dataSource={products} rowKey="id" pagination={true} />
      )}
    </div>
  );
};

export default Home;
