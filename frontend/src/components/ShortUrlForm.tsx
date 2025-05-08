import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  onNewUrl: () => void;
}

const ShortUrlForm: React.FC<Props> = ({ onNewUrl }) => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('/api/encode', { url: longUrl });
      setShortUrl(res.data.shortUrl);
      setLongUrl('');
      onNewUrl(); // Refresh list
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Shorten a URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="https://example.com"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Shorten'}
        </button>
      </form>
      {shortUrl && <div className="success">Short URL: <a href={shortUrl} target="_blank">{shortUrl}</a></div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ShortUrlForm;
