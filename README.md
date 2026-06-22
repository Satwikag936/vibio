# Vibio 🎬

A YouTube-inspired video streaming platform built with the MERN stack.  
Users can create channels, upload videos, search, and interact with content.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)

---

## 📌 Features

- 🔐 **JWT Authentication** — Secure signup/login with bcrypt password hashing
- 📺 **Channel Creation** — Users can create their own channel
- 📤 **Video Upload** — Upload videos using Multer (server-side file handling)
- 🏠 **Home Feed** — Browse all videos with channel info via Mongoose populate()
- 🔍 **Search** — Search across video titles AND channel names simultaneously
- 👍 **Like / Unlike / Share** — Engagement tracked in dedicated VideoStats collection
- ⚡ **Optimistic UI** — Instant like/unlike feedback before API confirmation

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router DOM, Axios, Vite |
| Backend | Node.js, Express.js (ES Modules) |
| Database | MongoDB, Mongoose ODM |
| Auth | JWT (jsonwebtoken), bcryptjs |
| File Uploads | Multer — server-side video storage |

---

## 🗄️ Database Design

4 MongoDB collections with ObjectId references:
User → owns → Channel → has many → Videos → each has one → VideoStats
| Collection | Purpose |
|------------|---------|
| users | name, email, hashed password, channel reference |
| channels | channel name, owner (User ObjectId) |
| videos | title, description, videoUrl, channel reference |
| videostats | likes[], unlikes[], shares — linked to Video by ObjectId |

---

## 🔍 Search Implementation

Search queries both video titles and channel names simultaneously:

```javascript
const videos = await Video.find({
  $or: [
    { title: { $regex: q, $options: 'i' } },
    { channel: { $in: channelIds } }
  ]
}).populate('channel');
```

---

## 🚀 Getting Started Locally

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` in backend folder:
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## 📁 Project Structure
---

## 👩‍💻 Author

**Aiswarya Satwika Gannavarapu**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Satwika-blue?logo=linkedin)](https://linkedin.com/in/aiswarya-satwika-gannavarapu)
[![GitHub](https://img.shields.io/badge/GitHub-Satwikag936-black?logo=github)](https://github.com/Satwikag936)
