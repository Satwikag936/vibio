import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../utils/uploads.css'; 
export default function Upload(){
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [hasChannel, setHasChannel] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token) return navigate('/login');
    axios.get('http://localhost:5000/api/channels/me', { headers: { Authorization: `Bearer ${token}` }})
      .then(res => setHasChannel(Boolean(res.data)))
      .catch(()=> setHasChannel(false));
  },[]);

  const submit = async (e) => {
    e.preventDefault();
    if (!hasChannel) return alert('You must create a channel before uploading');
    if (!file) return alert('Select a video file');
    const fd = new FormData();
    fd.append('video', file);
    fd.append('title', title);
    fd.append('description', desc);
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/videos/upload', fd, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      alert('Uploaded');
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.msg || 'Upload failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>
      <form onSubmit={submit} className="max-w-lg">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="input mb-2" />
        <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="input mb-2" />
        <input type="file" accept="video/*" onChange={e => setFile(e.target.files[0])} className="mb-2" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Upload</button>
      </form>
    </div>
  );
}
