import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; 

const Home = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [perPage] = useState(20); // Fixed number of cryptocurrencies per page
  const [page, setPage] = useState(1); // Current page number

  useEffect(() => {
    const fetchCryptos = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await axiosInstance.get('/cryptocurrencies', {
          params: { page },
        });
  
        setCryptos(prev => [...prev, ...response.data]);
      } catch (err) {
        setError('Failed to load cryptocurrencies.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCryptos();
  }, [page]);
  

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number to fetch more
  };

  return (
    <div className="container mt-5">
      <h1>Top Cryptocurrencies</h1>

      {error && <div className="alert alert-danger">{error}</div>} {/* Error Message */}
      
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {cryptos.map((crypto) => (
          <div className="col" key={crypto.id}>
            <div className="card h-100">
              <div className="card-body d-flex align-items-center">
                <img 
                  src={crypto.image} 
                  alt={crypto.name} 
                  className="crypto-icon me-3" 
                  style={{ width: '50px', height: '50px' }} // Ensure consistent icon size
                />
                <div>
                  <h5 className="card-title">{crypto.name}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> ${crypto.current_price.toLocaleString()}
                  </p>
                  <p className="card-text">
                    <strong>Market Cap:</strong> ${crypto.market_cap.toLocaleString()}
                  </p>
                  <p className="card-text">
                    <strong>24h Change:</strong> {crypto.price_change_percentage_24h.toFixed(2)}%
                  </p>
                  <p className="card-text">
                    <strong>Volume:</strong> ${crypto.total_volume.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && <div className="text-center mt-3">Loading...</div>} {/* Loading Indicator */}
      
      <div className="mt-3 text-center">
        <button 
          className="btn btn-primary" 
          onClick={handleShowMore} 
          disabled={loading}
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Home;
