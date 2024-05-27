# School Dashboard

## Overview

This project is a comprehensive system designed to manage teachers, students, and classes within an educational institution. It leverages a Firebase database to store and manage data, ensuring real-time updates and seamless integration across different components of the system. The project is built using React, with Vite as the template and pnpm as the package manager.

### Key Features

- **Teacher Management**: Add teachers to the database with detailed profiles, including their classes. The system automatically updates the class collection upon teacher creation.
- **Class Creation**: Facilitates the creation of classes with multi-select subjects, teacher details, and student enrollment. Classes are named following a specific format for easy identification.
- **Student Enrollment**: Allows for the addition of students to the system, including their grade, ID, and class enrollments, with an option to track their grades per class.
- **Event Creation**: Facilitates the creation of events with start dates, end dates, event descriptions, and event names.

## Setup Instructions

### Prerequisites

- Node.js
- pnpm
- A Firebase project setup for database management

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/asatpathy314/school-dashboard.git
cd school-dashboard
```

2. **Install dependencies**

Using pnpm, install the project's dependencies:

```bash
pnpm install
```

3. **Firebase Configuration**

- Navigate to the Firebase console and set up a new project if you haven't already.
- Register your app with Firebase and obtain your project's Firebase configuration object.
- Create a `.env` file in the root of your project and populate it with your Firebase configuration keys:

```plaintext
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
```

- Initialize Firebase in your application using the configuration from the `.env` file.

4. **Start the development server**

```bash
pnpm run dev
```

Your application should now be running on `http://localhost:5173.

## Data Models

### Teacher

```javascript
{
  firstName: "Example",
  lastName: "Name",
  id: "somestring",
  email: "something@something.com",
  pronoun: "Mr. ",
  classes: {
    0: "/classes/reference1",
    1: "/classes/reference2"
  }
}
```

### Class

```javascript
{
  name: "Mr Smith's 5th Grade Science Class",
  grade: "5th grade",
  teacher: "/some/reference",
  students: {
    0: "/some/reference",
    1: "/some/reference"
  },
  subject: "Science"
}
```

### Student

```javascript
{
  classes: {
    0: {
      class: "/some/reference",
      grade: 100.0
    }
  },
  firstName: "Mia",
  fullName: "Mia Rodriguez",
  grade: "4th Grade",
  id: "S1010",
  lastName: "Rodriguez"
}
```

### Event

```javascript
{
  description: "Some description.",
  endDate: "ISOString",
  name: "Big Party!",
  startDate: "ISOString"
}
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
