How to Run the Project Locally:

1️ Clone the repository
git clone https://github.com/ayishashifa21/student_api.git
cd student-management-api-3.4

2️ Install dependencies
npm install

3️ Start the server
node server.js

4️Server will run on:
http://localhost:3000

Deployed API URL
https://student-api-1-mj80.onrender.com

 API Endpoint Documentation
 Base URL
http://localhost:3000


—or—

https://student-api-1-mj80.onrender.com

1. GET /api/students
Description:

Fetch all students.

URL:
GET /api/students

Sample Response
[
  {
    "id": "uuid",
    "name": "John Doe",
    "age": 20,
    "course": "Computer Science",
    "year": 2,
    "status": "active",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]

2. POST /api/students
Description:

Add a new student.

URL:
POST /api/students

Body (JSON):
{
  "name": "John Doe",
  "age": 20,
  "course": "Computer Science",
  "year": 2,
  "status": "active"
}

Success Response
{
  "id": "uuid",
  "name": "John Doe",
  "age": 20,
  "course": "Computer Science",
  "year": 2,
  "status": "active",
  "createdAt": "2025-01-01T00:00:00.000Z"
}

Error Response
{
  "message": "Name is required"
}
