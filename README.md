# AI Tools SaaS Platform 🚀

A comprehensive SaaS platform offering multiple AI-powered tools for content creation, image processing, and professional development. Built with the PERN stack (PostgreSQL, Express.js, React, Node.js) and modern web technologies.

## 🌟 Features

### 🤖 AI-Powered Tools
- **Resume Review**: Intelligent resume analysis with actionable feedback and optimization suggestions
- **Image Generation**: Create stunning images from text prompts using advanced AI models
- **Background Removal**: Remove backgrounds from images with 95%+ accuracy
- **Object Removal**: Intelligently remove unwanted objects from photos
- **Blog Title Generator**: Generate engaging and SEO-optimized blog titles
- **Article Writer**: Create comprehensive articles on any topic with AI assistance

### 🔐 User Management
- Secure user authentication with JWT tokens
- Role-based access control
- User dashboard with usage analytics
- Profile management and settings

### 📱 Modern UI/UX
- Responsive design that works on all devices
- Clean and intuitive interface built with Tailwind CSS
- Real-time processing feedback and loading states
- Interactive dashboards and data visualization

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **JWT** - Secure authentication tokens

### File Handling & Storage
- **Multer** - File upload middleware
- **Cloudinary** - Image storage and processing
- **File validation** - Secure file type checking

### Deployment
- **Vercel** - Frontend and backend deployment
- **CI/CD** - Automated deployment pipeline

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- Cloudinary account for image processing
- AI API keys (for various AI services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rishabh-108272/AI-SaaS-Platform.git
   cd AI-SaaS-Platform
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Variables**
   
   Create `.env` files in both client and server directories:
   
   **Server (.env):**
   ```env
   PORT=5000
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   AI_API_KEY=your_ai_service_api_key
   ```
   
   **Client (.env):**
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Database Setup**
   ```bash
   # Run database migrations (if using migrations)
   cd server
   npm run migrate
   
   # Or set up your PostgreSQL database manually
   ```

5. **Run the application**
   ```bash
   # From the root directory
   npm run dev
   
   # Or run separately:
   # Terminal 1 - Server
   cd server && npm run dev
   
   # Terminal 2 - Client
   cd client && npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
AI-SaaS-Platform/
├── client/                     # React frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── pages/         # Page components
│   │   │   └── ...            # Other components
│   │   ├── assets/            # Images and icons
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js backend
│   ├── configs/               # Configuration files
│   │   ├── cloudinary.js      # Cloudinary setup
│   │   ├── db.js              # Database connection
│   │   └── multer.js          # File upload config
│   ├── controllers/           # Route controllers
│   │   ├── aiController.js    # AI tools logic
│   │   └── userController.js  # User management
│   ├── middlewares/           # Custom middleware
│   │   └── auth.js            # Authentication middleware
│   ├── routes/                # API routes
│   │   ├── aiRoutes.js        # AI tools endpoints
│   │   └── userRoutes.js      # User endpoints
│   ├── package.json
│   └── server.js              # Entry point
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### AI Tools
- `POST /api/ai/review-resume` - Analyze and review resume
- `POST /api/ai/generate-image` - Generate image from text prompt
- `POST /api/ai/remove-background` - Remove image background
- `POST /api/ai/remove-object` - Remove objects from image
- `POST /api/ai/generate-blog-titles` - Generate blog titles
- `POST /api/ai/write-article` - Generate article content

## 🎨 Features in Detail

### Resume Review Tool
- PDF/DOC file upload support
- AI-powered analysis of resume content
- Actionable feedback and improvement suggestions
- ATS compatibility scoring
- Industry-specific recommendations

### Image Processing Tools
- Support for multiple image formats (JPG, PNG, WEBP)
- High-quality background removal
- Intelligent object detection and removal
- Batch processing capabilities
- Cloud storage integration

### Content Generation
- SEO-optimized blog title suggestions
- Full article generation with customizable length
- Multiple writing styles and tones
- Research-backed content creation

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- File type validation for uploads
- Rate limiting for API endpoints
- CORS configuration
- Environment variable protection

## 📊 Performance Optimization

- Image optimization and compression
- Lazy loading for components
- Code splitting with React.lazy()
- API response caching
- Database query optimization
- CDN integration for static assets

## 🚀 Deployment

The application is deployed on Vercel with the following configuration:

**vercel.json (root):**
```json
{
  "builds": [
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "client/dist/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "client/dist/$1"
    }
  ]
}
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rishabh Verma**
- GitHub: [@rishabh-108272](https://github.com/rishabh-108272)
- LinkedIn: [Rishabh Verma](https://www.linkedin.com/in/rishabh-verma-875214247/)
- Email: rishabhverma3648@gmail.com

## 🙏 Acknowledgments

- Thanks to all AI service providers for their APIs
- Cloudinary for image processing capabilities
- The open-source community for amazing tools and libraries
- Vercel for seamless deployment experience

## 📈 Future Enhancements

- [ ] Mobile app development (React Native)
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] API rate limiting and usage tiers
- [ ] Integration with more AI services
- [ ] Multi-language support
- [ ] Advanced user roles and permissions
- [ ] Real-time collaboration tools

---

⭐ If you found this project helpful, please give it a star on GitHub!
