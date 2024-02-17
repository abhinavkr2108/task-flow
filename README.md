# Task-Flow

This project entails the development of a robust task management application inspired by Trello, enhanced with real-time collaboration features and intuitive drag-and-drop functionality. The application is designed to streamline task organization, foster collaboration among team members, and facilitate seamless project management experiences

## Features

- Real-Time Collaboration: Users can collaborate in real-time, enabling simultaneous updates and changes across all connected devices. This feature promotes enhanced communication and productivity among team members.
- Intuitive Drag-and-Drop Interface: The application offers a user-friendly interface with drag-and-drop functionality, allowing users to effortlessly organize tasks, assign priorities, and manage project workflows.
- Customizable Boards and Cards: Users have the flexibility to create custom boards and cards, tailored to their specific project requirements. This feature enables efficient organization and categorization of tasks, enhancing project clarity and visibility.
- User Authentication and Permissions: The application includes robust user authentication mechanisms and role-based permissions, ensuring secure access control and data privacy.
- Responsive Design: The application is designed to be responsive across various devices and screen sizes, ensuring optimal user experience and accessibility.

## Tech Stack

**Frontend**: The frontend of the application is built using modern web technologies such as Next.js and Typescript, ensuring a dynamic and interactive user interface.

**Authentication and Authorization:** Next Auth JSON Web Tokens (JWT) are utilized for secure user authentication and authorization, ensuring robust access control mechanisms.

**Database:** MongoDB is chosen as the database solution for its flexibility, scalability, and compatibility with the Node.js environment.

**Real Time Collaboration**: For Real time collaoration between users, Liveblocks is used

## Run Locally

Clone the project

```bash
  git clone https://github.com/abhinavkr2108/task-flow.git
```

Go to the project directory

```bash
  cd task-flow
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the root directory

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`MONGODB_URI`

`NEXTAUTH_URL`="http://localhost:3000"

`NEXTAUTH_SECRET`="any-random-string"

`LIVE_BLOCKS_KEY`

## Screenshots

![App Screenshot](https://imgtr.ee/images/2024/02/17/386aec8ac1bd74de068823909fb8e8be.png)
![App Screenshot](https://imgtr.ee/images/2024/02/17/b2db5e7578711ef47a8d821242d35be1.png)
![App Screenshot](https://imgtr.ee/images/2024/02/17/58ee5209c9430f057c23fabecd7a3525.png)
