# Web-Based Expense Tracking System 

This is a web-based react application developed for the **Information Systems Project** module assignment of my **Bsc Business Computing and Inforamtion Systems Degree**. The app allows users to create individual accounts, add and manage expense records and analyze their expenses using various metrics. 

## Main Features
- **Create User Accounts**: Users can create individual accounts to access the Expense Tracking platform.
- **Add Expense**: Users create expense records and add them to the system.
- **Manage Expense**: Users can edit or delete their expense records.
- **View Expense Records**: Users can view their individual expense history or thier department's expense history.

## Technologies Used
- **Frontend**: React, 
- **Backend**: Firebase (for Firebase Authentication & Firestore Database services)
- **Database**: Firebase's Firestore Database
- **Routing**: React Router

## Getting Started

Make sure you have Node.js installed on your local machine.

In the command prompt of the project directory, run:

### `npm install`
This will install the necessary dependencies. 

### `npm install firebase-tools`
### `npm install node-firestore-import-export`
### `npx firebase login`
Type Y when prompted and proceed. Sign in to your Firebase account. Trust Firebase CLI.
This will login to your Firebase.

### `npx firebase projects:create`
When prompted, provide these details:
- Project ID: (e.g., aa1-expense-tracker)
- Project Name: (e.g., Expense-Track)
Open the prompted Firebase Console link.
Navigate to Project Overview.
Add Firebase to the app by clicking the Web icon.
Fill out the necessary detail and register the app.
Copy the Firebase Config Object provided.
In the project folder, open `src > config > firebase-config.js` file.
Replace the `firebaseConfig` object with the copied one. 

### ``
### ``
This will start the mock backend server (JSON Server)

In a new command prompt of the project directory, run:

### `npm start`
This will launch the React app at http://localhost:3000.