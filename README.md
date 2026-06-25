# Ebook Marketplace

A full-stack Ebook Marketplace platform where Readers can purchase ebooks and Writers can publish and manage their ebooks. The platform includes role-based authentication, ebook management, sales tracking, wishlist functionality, and secure payment integration.

##  Live Website

 https://fable-ebook-client.vercel.app


##  Project Purpose

This platform connects readers and writers in a digital ebook marketplace. Readers can discover and purchase ebooks, while writers can publish, manage, and track sales of their ebooks through a dedicated dashboard.

##  Key Features

### Authentication & Authorization
- Secure user authentication
- Role-based access control (Admin, Writer, Reader)
- Protected routes and dashboards

### Reader Features
- Browse and search ebooks
- View ebook details
- Purchase ebooks
- Wishlist/Bookmark ebooks
- View purchased books
- Reading history

### Writer Features
- Upload and publish ebooks
- Manage ebooks (edit, delete, update)
- Track sales history
- View earnings and sales information

### Admin Features
- Manage users
- Change user roles
- Delete users
- Monitor platform activities

name:AdminOne
email:AdminOne1@gmail.com
pasward:AdminOne1@gmail.com


### Additional Features
- Loading Skeleton UI
- Custom 404 Page
- Error Handling & Toast Notifications
- Responsive Design
- Dark Mode Support
- Secure API Integration

##  Technologies Used

### Frontend
- Next.js
- React
- Tailwind CSS
- Framer Motion
- React Icons
- React Hot Toast
- Next Themes

### Backend

- Express.js
- MongoDB
- JWT Authentication

### Deployment
- Vercel (Frontend)
- Render / Railway / Vercel Functions (Backend)

## NPM Packages Used

### Client
```bash
npm install framer-motion
npm install react-hot-toast
npm install react-icons

```

### Server
```bash
npm install express
npm install mongodb
npm install cors
npm install dotenv
npm install jsonwebtoken
```

##  Environment Variables

### Frontend

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_KEY=
```

### Backend

```env
DB_USER=
DB_PASS=
JWT_SECRET=
```

##  Installation

### Clone Repository

```bash
git clone https://github.com/mdabgal/fable-ebook-client

### Client Setup

```bash
cd client
npm install
npm run dev
```

### Server Setup

```bash
cd server
npm install
npm start
```

##  Author

jannati
