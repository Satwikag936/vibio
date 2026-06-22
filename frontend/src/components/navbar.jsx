import { useState } from 'react';
import axios from 'axios';

export default function Navbar() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await axios.get(`http://localhost:5000/api/videos/search?q=${q}`);
    setResults(res.data);
  };

  return (
    <div className="p-4 bg-gray-800 text-white">
      <input
        className="text-black p-2"
        placeholder="Search videos..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button onClick={search} className="ml-2 bg-blue-500 p-2 rounded">
        Search
      </button>

      <div>
        {results.map((v) => (
          <div key={v._id}>
            <h4>{v.title}</h4>
            <p>{v.description}</p>
            <video controls width="300" src={`http://localhost:5000${v.videoUrl}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
