import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UrlData {
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  visits: number;
}

interface Props {
  search: string;
  refresh: boolean;
}

const UrlList: React.FC<Props> = ({ search, refresh }) => {
  const [urls, setUrls] = useState<UrlData[]>([]);

  useEffect(() => {
    axios.get('/api/list').then((res) => setUrls(res.data)).catch(console.error);
  }, [refresh]);

  // const filtered = urls.filter((u) =>
  //   u.originalUrl.toLowerCase().includes(search.toLowerCase())
  // );

  const filtered = Array.isArray(urls)
    ? urls.filter(u => u.originalUrl.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="card">
      <h2>All URLs</h2>
      <table>
        <thead>
        <tr>
          <th>Original URL</th>
          <th>Short URL</th>
          <th>Created</th>
          <th>Visits</th>
        </tr>
        </thead>

        <tbody>
        {filtered.length === 0 && (
          <tr>
            <td colSpan={4}>No URLs found.</td>
          </tr>
        )}
        {filtered.map((u, i) => (
          <tr key={i}>
            <td data-label="Original URL">{u.originalUrl}</td>
            <td data-label="Short URL">
              <a href={u.shortUrl} target="_blank" rel="noopener noreferrer">{u.shortUrl}</a>
            </td>
            <td data-label="Created">{new Date(u.createdAt).toLocaleString()}</td>
            <td data-label="Visits">{u.visits}</td>
          </tr>
        ))}
        </tbody>

      </table>
    </div>
  );
};

export default UrlList;
