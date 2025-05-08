import React, { useState } from 'react';
import ShortUrlForm from './components/ShortUrlForm';
import UrlList from './components/UrlList';
import SearchBar from './components/SearchBar';
import './App.css'
const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="container">
      <h1>ShortLink — URL Shortener</h1>
      <ShortUrlForm onNewUrl={handleRefresh} />
      <SearchBar value={search} onChange={setSearch} />
      <UrlList search={search.length >= 3 ? search : ''} refresh={refresh} />
    </div>
  );
};

export default App;
