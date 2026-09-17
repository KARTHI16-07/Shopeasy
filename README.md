# ShopEasy – Full-Stack E-Commerce Application

ShopEasy is a robust, responsive, and fully-featured e-commerce platform built with a traditional Java Spring Boot backend and a modern React.js frontend. It is designed to be highly functional, clean, and professional.

![ShopEasy Banner](https://via.placeholder.com/1200x300?text=ShopEasy+-+Full-Stack+E-Commerce)

## 🚀 Features

### User Features
- Secure Registration and JWT-based Login.
- Browse products by category or search by name.
- View detailed product information, price, and stock.
- Add products to the shopping cart, update quantities, or remove items.
- Place orders with multiple mock payment options (Cash on Delivery, Mock Credit Card).
- Dedicated profile page to manage personal information and address.
- Order history tracking with real-time status.

### Admin Features
- Secure, role-based Admin Dashboard.
- Manage Products (Add, Edit, Delete, Update Stock/Prices, Image URLs).
- Manage Categories (Add, Edit, Delete).
- Manage Orders (Update status: PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED).
- View a list of all registered users.
- View platform analytics (total revenue, order counts, etc.).

---

## 🛠️ Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.x** (Web, Data JPA)
- **Spring Security** with **JWT (JSON Web Tokens)** for stateless authentication.
- **MySQL 8** Database.
- **Maven** for build and dependency management.
- **Lombok** to reduce boilerplate code.
- **Swagger / OpenAPI** for API Documentation.

### Frontend
- **React.js 18** (scaffolded with Vite for lightning-fast HMR).
- **React Router v6** for client-side routing.
- **Material-UI (MUI)** for a clean, professional, and responsive component library.
- **Axios** for API requests and interceptors.
- **Context API** for state management (Auth, Cart).

---

## 📸 Screenshots

| Home Page | Product Details |
|-----------|-----------------|
| ![Home](https://via.placeholder.com/500x300?text=Home+Page+Screenshot) | ![Product](https://via.placeholder.com/500x300?text=Product+Details+Screenshot) |

| Shopping Cart | Admin Dashboard |
|---------------|-----------------|
| ![Cart](https://via.placeholder.com/500x300?text=Cart+Screenshot) | ![Admin](https://via.placeholder.com/500x300?text=Admin+Dashboard+Screenshot) |

*(Replace the placeholder URLs above with actual screenshots of your application)*

---

## ⚙️ Local Setup Instructions

### Prerequisites
- Java Development Kit (JDK) 17 or higher
- Node.js (v18+) and npm
- MySQL Server 8 (or use the provided Docker Compose file)

### 1. Database Setup

**Option A: Using Docker Compose (Recommended)**
Navigate to the root directory and run:
```bash
docker-compose up -d
```
This will start a MySQL 8 container with the required database `shopeasy` and user credentials.

**Option B: Manual MySQL Setup**
Create a database named `shopeasy` in your local MySQL instance.

### 2. Backend Setup
1. Navigate to the `backend` directory.
2. The application will automatically create the database tables (Hibernate `ddl-auto: update`).
3. Set your environment variables or check `backend/src/main/resources/application.yml`.
4. Run the application:
```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```
5. The backend will run on `http://localhost:8080`.

### 3. Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
```bash
npm install
```
3. Run the React development server:
```bash
npm run dev
```
4. The frontend will be available at `http://localhost:5173`.

---

## 🔑 Demo Credentials

Upon initial startup, the backend automatically seeds the database with sample categories, products, and two user accounts:

**Admin Account**
- **Email:** admin@shopeasy.com
- **Password:** admin123

**Test User Account**
- **Email:** user@shopeasy.com
- **Password:** user123

---

## 📚 API Documentation

Once the backend is running, you can access the Swagger UI documentation to test the RESTful APIs directly from your browser:
**URL:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

## 🌐 Deployment Instructions

### Backend (Spring Boot)
1. Build the production `.jar` file:
   ```bash
   ./mvnw clean package -DskipTests
   ```
2. The generated jar file will be in `backend/target/backend-0.0.1-SNAPSHOT.jar`.
3. You can deploy this JAR to AWS Elastic Beanstalk, Heroku, Render, or any VPS (using a `Dockerfile`).
4. Ensure you set production environment variables (`SPRING_DATASOURCE_URL`, `JWT_SECRET`, etc.) on your hosting provider.

### Frontend (React/Vite)
1. Build the production static files:
   ```bash
   npm run build
   ```
2. The static files will be generated in the `frontend/dist` folder.
3. Deploy the `dist` folder to Vercel, Netlify, AWS S3, or GitHub Pages.
4. Make sure to set `VITE_API_BASE_URL` in your production environment to point to your live backend URL.

### Database
- Use a managed cloud database like AWS RDS (MySQL), PlanetScale, or a DigitalOcean Managed Database. Update the backend connection string accordingly.
