import React, { useState, useEffect } from 'react';
import { NewsSection } from '../components/sections/NewsSection';
import { API_ENDPOINTS, apiRequest } from '../config/api';

interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
}

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await apiRequest(API_ENDPOINTS.news);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <NewsSection
      title="Latest News & Updates"
      subtitle="Stay updated with the latest tech insights, GDG events, and developer news from our community."
      articles={articles}
      showSearch={true}
      showCategories={true}
    />
  );
};

export default News; 