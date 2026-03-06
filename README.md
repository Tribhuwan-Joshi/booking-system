# Room Booking System API

A REST API built with Node.js and Express for managing room bookings.  
The system allows users to register, login, view available rooms, check availability for a date range, and book rooms while preventing overlapping bookings.

The application uses **MySQL** as the database and runs MySQL through **Docker** to simplify setup.

## Tech Stack

### Backend framework
Node.js with Express

### Database
MySQL 8 running inside Docker

### Authentication
JWT based authentication

### Security and middleware
Helmet for security headers  
CORS for cross origin requests  
Express Rate Limit for API rate limiting  
Custom error middleware

### Password hashing
bcrypt

### Database driver
mysql2 with connection pooling

### Containerization
Docker and Docker Compose


## Setup

*Note - Docker is required because the MySQL database runs inside a Docker container.*

### Step 1

Clone the repository

```bash
git clone git@github.com:Tribhuwan-Joshi/booking-system.git
cd booking-system
```

### Step 2

Create `.env` file in the root.

Setup your secrets and password.  
You can use these as example.

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=password
DB_NAME=room_booking

JWT_SECRET=your_secret_key
```

You can generate a robust key using:

```bash
openssl rand -base64 32
```

### Step 3

Start the MySQL DB using docker and install dependencies.

```bash
docker compose up -d
```

This command will:

Start a MySQL container  
Create the `room_booking` database  
Run the SQL initialization script automatically

To access DB manually and check status you can enter into mysql:

```bash
docker exec -it room-booking-mysql mysql -uroot -p
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

The API will run at

```
http://localhost:3000
```


## API

Base URL

```
http://localhost:3000
```

You can test these APIs using any API client like Postman or Insomnia.

## Authentication

### Register

```
POST /auth/register
```

Request body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response

Status 201

```json
{
  "userId": 1,
  "token": "jwt_token_here"
}
```

Possible errors

Status 400

```json
{
  "error": "Email already registered"
}
```

### Login

```
POST /auth/login
```

Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response

Status 200

```json
{
  "userId": 1,
  "token": "jwt_token_here"
}
```

Possible errors

Status 401

```json
{
  "error": "Invalid credentials"
}
```

## Rooms

### Get All Rooms

```
GET /rooms
```

Authentication not required

Response

Status 200

```json
[
  {
    "id": 1,
    "name": "Standard Room",
    "price_per_night": 1200
  },
  {
    "id": 2,
    "name": "Deluxe Room",
    "price_per_night": 2000
  },
  {
    "id": 3,
    "name": "Suite",
    "price_per_night": 3500
  }
]
```

Possible errors

Status 500

```json
{
  "error": "Internal server error"
}
```


## Bookings

### Check Room Availability

```
POST /bookings/check
```

Authentication required

Header

```
Authorization: Bearer <token>
```

Request body

```json
{
  "roomId": 1,
  "startDate": "2026-03-10",
  "endDate": "2026-03-12"
}
```

Response

Status 200

```json
{
  "available": true
}
```

Possible errors

Status 400

```json
{
  "error": "roomId, startDate and endDate are required"
}
```


### Create Booking

```
POST /bookings
```

Authentication required

Header

```
Authorization: Bearer <token>
```

Request body

```json
{
  "roomId": 1,
  "startDate": "2026-03-10",
  "endDate": "2026-03-12"
}
```

Response

Status 201

```json
{
  "message": "Booking confirmed",
  "bookingId": 5
}
```

Possible errors

Status 400

```json
{
  "error": "Room already booked for selected dates"
}
```

Status 400

```json
{
  "error": "Invalid date range"
}
```

Status 401

```json
{
  "error": "Invalid or expired token"
}
```