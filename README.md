# CongAn-Friend

> This repository is consists the code for the prototype of an application that predicts the severity of depression based on machine learning models deployed over the Google Cloud Platform using Firebase.

## Front-end:
React-Native was the base framework for the front end development of the cross platform smartphone application. It was then used with Redux as a state management tool to store cache and reuse state components instead of loading them multiple times that included authentication, firebase, WebRTC, etc. Node Package Manager (NPM) was used to manage the JavaScript packages necessary for the User Interface (UI) components. Over 20 packages were used for Firebase services and authentication, Firestore, Firebase storage, Cloud messaging, React Navigation, and Video audio recording options.

## Back-end:
Back-end was structured using Google Cloud Platform (GCP) that involved services like authentication including back-end management of the user login and the sign- up services, creation, modification, and deletion of a user. The user files like the patient reports, medication, images, video, audio, history, and logs files were stored in the cloud storage; and Cloud Firestore (Firebase), a scalable cloud database to store all data required (for front-end and back-end) using its client library for Python v3.7 and Node.js for database interactions. One database was dedicated to the user profiles of the patients and doctors while the other database comprised only of the results.
