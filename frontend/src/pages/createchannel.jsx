import { useState } from 'react';
import axios from 'axios';

import '../utils/createchannel.css';

export default function CreateChannel() {
  const [channelName, setChannelName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('channelName', channelName);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('video', videoFile);

      await axios.post(
        'http://localhost:5000/api/create-channel-and-upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setMessage('Uploaded successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Error uploading');
    }
  };

  return (
    <div className="create-channel-container">
      <h1>Create Channel & Upload Video</h1>
      <form onSubmit={handleSubmit} className="create-channel-form">
        <input
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
}
