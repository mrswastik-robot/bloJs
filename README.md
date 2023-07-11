# bloJs

Project Description: This is a web application developed using Next.js for the frontend and Firebase for the backend. The application allows users to [describe what the application does].

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Firebase Configuration](#firebase-configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- [Feature 1]: [A Rich Text Editor where a user can do many operations while creating blogs like , applying bold , italics , underline , coloring the text , inserting a image or video or link or a table , writing in bullet points and some more stuff.]
- [Feature 2]: [Once blog is posted , user can later edit or delete them as wanted.]
- [Feature 3]: [Users can comment on other user's blog.]
- [Feature 4]: [Each user will have his/her profile page where their social media handles and every blog written by him/her till date will be displayed and that profile page can be viewed by any other user.]
- ...

## Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/mrswastik-robot/bloJs.git`
2. Navigate to the project directory: `cd bloJs`
3. Install the dependencies: `npm install`

## Usage

To start the development server, use the following command:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to see the application.

## Firebase Configuration

This project uses Firebase for the backend. Follow these steps to set up Firebase:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com).
2. Obtain your Firebase project credentials (API key, auth domain, database URL, etc.).
3. Rename the `.env.local.example` file in the project root directory to `.env.local`.
4. Replace the placeholder values in the `.env.local` file with your Firebase project credentials.

Example `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your-database-url
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Contributing

Contributions are welcome! If you find any bugs or want to improve the project, feel free to open an issue or submit a pull request.

1. Fork the project repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

[MIT License](LICENSE)
