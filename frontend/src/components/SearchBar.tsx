import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => (
  <div className="card">
    <input
      type="text"
      placeholder="Search by long URL (min 3 characters)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
