# CongAn-Friend

> This repository consists code for the prototype of our [application](#paper) that predicts the severity of depression based on machine learning models deployed over the Google Cloud Platform using Firebase.

## Paper

**Title**:
[Multimodal Depression Severity Prediction from medical bio-markers using Machine Learning Tools and Technologies](https://www.researchgate.net/publication/344244798_Multimodal_Depression_Severity_Prediction_from_medical_bio-markers_using_Machine_Learning_Tools_and_Technologies)

**Abstract**:
Depression has been a leading cause of mental-health illnesses across the world. While the loss of lives due to unmanaged depression is a subject of attention, so is the lack of diagnostic tests and subjectivity involved. Using behavioural cues to automate depression diagnosis and stage prediction in recent years has relatively increased. However, the absence of labelled behavioural datasets and a vast amount of possible variations prove to be a major challenge in accomplishing the task. This paper proposes a novel Custom CM Ensemble approach and focuses on a paradigm of a cross-platform smartphone application that takes multimodal inputs from a user through a series of pre-defined questions, sends it to the Cloud ML architecture and conveys back a depression quotient, representative of its severity. Our app estimates the severity of depression based on a multi-class classification model by utilizing the language, audio, and visual modalities. The given approach attempts to detect, emphasize, and classify the features of a depressed person based on the low-level descriptors for verbal and visual features, and context of the language features when prompted with a question. The model achieved a precision value of 0.88 and an accuracy of 91.56%. Further optimization reveals the intramodality and intermodality relevance through the selection of the most influential features within each modality for decision making.

**Keywords**:
Long Short Term Memory Networks, Multi-modality Learning, Multi-class Depression Prediction,Ensemble Learning


Please follow the [guidelines](#codes--redistribution) to build upon our work.

# Protoype Development

## Front-end:
React-Native was the base framework for the front end development of the cross platform smartphone application. It was then used with Redux as a state management tool to store cache and reuse state components instead of loading them multiple times that included authentication, firebase, WebRTC, etc. Node Package Manager (NPM) was used to manage the JavaScript packages necessary for the User Interface (UI) components. Over 20 packages were used for Firebase services and authentication, Firestore, Firebase storage, Cloud messaging, React Navigation, and Video audio recording options.

## Back-end:
Back-end was structured using Google Cloud Platform (GCP) that involved services like authentication including back-end management of the user login and the sign- up services, creation, modification, and deletion of a user. The user files like the patient reports, medication, images, video, audio, history, and logs files were stored in the cloud storage; and Cloud Firestore (Firebase), a scalable cloud database to store all data required (for front-end and back-end) using its client library for Python v3.7 and Node.js for database interactions. One database was dedicated to the user profiles of the patients and doctors while the other database comprised only of the results.



## Codes & Redistribution

### Codes
[Prototype](https://github.com/Ritik-Sharma38/CongAn-Friend)

[Models](https://github.com/shivanishimpi/DepressionSeverityPrediction)

[LICENSE: Creative Common's Non Attribution International 4.0](https://github.com/shivanishimpi/DepressionSeverityPrediction/blob/master/Attribution-NonCommercial-NoDerivatives4.0International.pdf)

*Linked Repositories: [shivanishimpi/DepressionSeverityPrediction](https://github.com/shivanishimpi/DepressionSeverityPrediction/)*

### Terms and Conditions 

*Attribution* - You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

*NonCommercial* - You may not use the material for commercial purposes.

*NoDerivatives* - If you remix, transform, or build upon the material, you may not distribute the modified material.

*No additional restrictions* - You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.
