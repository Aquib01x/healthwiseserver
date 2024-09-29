# Backend Overview

This repository contains the NodeJS backend API which serves the frontend application in the "healthwisecms" repository.

The Model-View-Controller pattern has been used to implement the backend as it provides code modularity, allows scalability, and facilitates easier maintenance. Additionally, the MVC pattern significantly reduces the risk of vulnerabilities by allowing individual components to be independently secured and tested:
pic



To facilitate communication between the React fronted and NodeJS backend, the Representational state transfer architectural style has been chosen for the API over more rigid or less universally supported protocols such as SOAP. REST's stateless approach and its reliance on simple HTTP methods (GET, POST, PUT,
DELETE) make it well-suited for this project. REST APIs can also be easily integrated with the React application, allowing for dynamic content updates without reloading the page, thus enhancing the user experience with a fast and responsive interface.

Here is the routing pipeline of requests from the frontend to the backend endpoints:
pic



Here is the complete API spec:
pic

