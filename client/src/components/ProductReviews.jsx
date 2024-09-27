import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${productId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews', error);
      }
    };
    fetchReviews();
  }, [productId]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900">Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} className="mt-2">
          <p className="text-sm text-gray-600">{review.comment}</p>
          <p className="text-sm text-gray-500">Rating: {review.rating}/5</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;