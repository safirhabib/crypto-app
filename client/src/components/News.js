import React, { useState, useEffect } from 'react';
import { newsAxiosInstance } from './axiosInstance'; 

const News = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching new data

      try {
        const response = await newsAxiosInstance.get('/everything', {
          params: {
            q: 'cryptocurrency',
            pageSize: 10,
          },
        });

        // Assuming response.data.articles contains the news articles
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setLoading(false); // Always set loading to false after the API call
      }
    };

    fetchNews();
  }, []);

  // Error State
  if (error) {
    return (
      <div>
        <p className="text-danger">{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  // Loading State
  if (loading) {
    return <div>Loading news...</div>;
  }

  // Empty State
  if (articles.length === 0) {
    return <div>No news articles available at the moment.</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Cryptocurrency News</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {articles.map((article) => (
          <div className="col" key={article.url}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
