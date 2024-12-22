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
- Project Name: (e.g., Expense-Track).

Open the prompted Firebase Console link.

Navigate to Project Overview.

Add Firebase to the app by clicking the Web icon.

Fill out the necessary detail and register the app.

Copy the Firebase Config Object provided.

In the project folder, open `src > config > firebase-config.js` file.

Replace the `firebaseConfig` object with the copied one. 

### Enable Authentication in Firebase

- In the frebase project console, go to `Build` section in the left-hand menu. 
- Click `Authentication`. 
- Go to `Sign-in method` tab.
- Enable `Email/Password` authentication
- Navigate to `Authentication` > `Users` and add your admin user using your `email` and `password` (you will use this email and password to sign into the Expense Tracking System as the `administrator`).
- Return to the project folder.
- Open `src > pages > auth > index.jsx` file.
- In line `36` and `47`, replace the placeholder email with the your email.

### Configure Firestore Database

- In your Firebase project console, go to `Build` section in the left-hand menu. 
- Click `Firestore Database` and click `Create Database`.
- Choose `Production Mode` and select Firestore Location. 
- Return back to `Build > Firestore Database`.
- Click on the `Rules` tab at the top of the Firestore page.
- Update line 6 of the rules to `allow read, write: if request.auth != true;`.
- Click `Publish`
### ``
### ``
This will start the mock backend server (JSON Server)

In a new command prompt of the project directory, run:

### `npm start`
This will launch the React app at http://localhost:3000.