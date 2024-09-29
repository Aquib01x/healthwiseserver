# Backend Overview

This repository contains the NodeJS backend API which serves the frontend application in the "healthwisecms" repository.

The Model-View-Controller pattern has been used to implement the backend as it provides code modularity, allows scalability, and facilitates easier maintenance. Additionally, the MVC pattern significantly reduces the risk of vulnerabilities by allowing individual components to be independently secured and tested:

<img width="445" alt="Screenshot 2024-09-29 alle 17 35 58" src="https://github.com/user-attachments/assets/ed02c601-7242-4cec-881b-fce76931ee1a">

To facilitate communication between the React fronted and NodeJS backend, the Representational state transfer architectural style has been chosen for the API over more rigid or less universally supported protocols such as SOAP. REST's stateless approach and its reliance on simple HTTP methods (GET, POST, PUT,
DELETE) make it well-suited for this project. REST APIs can also be easily integrated with the React application, allowing for dynamic content updates without reloading the page, thus enhancing the user experience with a fast and responsive interface.

Here is the routing pipeline of requests from the frontend to the backend endpoints:

<img width="268" alt="Screenshot 2024-09-29 alle 17 36 16" src="https://github.com/user-attachments/assets/c1911db8-40d6-4dfb-8a15-b7ceea96cc68">


Here is the complete API spec:


<img width="400" alt="Screenshot 2024-09-29 alle 17 48 39" src="https://github.com/user-attachments/assets/147503ef-644a-4a16-9e22-6439c2a6e658">

<img width="400" alt="Screenshot 2024-09-29 alle 17 48 49" src="https://github.com/user-attachments/assets/08ae6274-4986-4677-acff-13d121857fa3">

<img width="402" alt="Screenshot 2024-09-29 alle 17 50 44" src="https://github.com/user-attachments/assets/01f46202-6b87-46d5-8d3e-3ad3b912d64f">

<img width="402" alt="Screenshot 2024-09-29 alle 17 51 12" src="https://github.com/user-attachments/assets/04314254-88a1-448d-92c6-8f5f75c3fdc0">

<img width="402" alt="Screenshot 2024-09-29 alle 17 51 22" src="https://github.com/user-attachments/assets/9edfcf7c-86de-4769-86c0-575fa3acc784">



