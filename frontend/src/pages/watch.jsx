import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Watch(){
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/videos/${id}`)
      .then(res => setVideo(res.data))
      .catch(()=> {});
  },[id]);

  if(!video) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <video controls className="w-full h-96 bg-black" src={`http://localhost:5000${video.videoUrl}`} />
      <h2 className="text-2xl font-bold mt-4">{video.title}</h2>
      <p className="text-sm text-gray-600">Channel: {video.channelId?.name}</p>
      <p className="mt-2">{video.description}</p>
    </div>
  );
}
