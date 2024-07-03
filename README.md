# SimplyManage : User Management System 
### Functional requirements:

- Implement a simple website for managing users;
  - Site should contain from 2 screens:
  -  Users list - table / grid view with details about each user;
  - Create user - a form for creating a new user;
    - Input fields / data to collect about each user:
      - First name
        - Field should accept only alphabetical characters
         - Max length should be 100 characters
      - Last name
        - Field should accept only alphabetical characters
        - Max length should be 100 characters
      - E-mail address
        - Only valid e-mail addresses can be used
### Technical requirements:
 - Use React.js for frontend;
 - Use Express / NodeJS / NestJS for backend;
 - Use MongoDB for data persistency;
 - Solution should be Dockerized and there should be a Docker Compose file for running the solution (which includes Frontend, Backend and dependencies);
 - Docker containers should be “production optimized”
 - Solution can be implemented either as single monolith application or 2 separate 
 applications (frontend and backend);
 - Inputs validation should be on the backend side, but it’s also nice to have some basic validation on frontend.

 - #### Add-ons
   - Unit tests using Mocha/Jest/React testing Library;
   - Functional end-to-end test using any automation framework (Selenium, Puppeteer, Cypress);
   - Typescript for both frontend and backend.
 

### UI / UX requirements:
 - There are no specific requirements for a design / UX of the frontend but it should look sensible. Any popular UI framework like Bootstrap / Material UI is preferred.
 

### Deliverables:
- Submit a solution pushed in public Git repository.



## High Level Design
![Highleveldesign](https://github.com/sandeepraju8787/UserManagementSystem/assets/65300002/84595f94-4ddc-4a9f-84d9-b99e43907bd8)

## Low Level Design

### Frontend
![FE_LLD](https://github.com/sandeepraju8787/UserManagementSystem/assets/65300002/46b0a8ac-d680-497b-8170-fe85478affbc)

#### States to be managed
  - State Variables
    - users
    - loading
    - error
    - selectedUser
    - currentPage

  - Callbacks
    - fetchUsers
    - setCurrentPage 
    - editUser
    - addUser
    - handleDeleteUser
    - setSelectedUser

### Backend
  ![Backend_LLD](https://github.com/sandeepraju8787/UserManagementSystem/assets/65300002/83d84556-1419-4b7a-8446-b72eaabb728e)

### In Scope 
- Bonus features added for scalability
  - **Backend Pagination** ( for fetching data in chunks for larger volumes of data )
  - **Makefile** for running the whole project with just one command
  - Unit Tests using Jest
    

### Out Of Scope 
- Planned features for scalability and security
  - **Frontend Pagination** ( for fetching data in chunks for larger volumes of data)
  - Rate Limiting Middleware  using ***'express-rate-limit'*** for limiting requests from an IP. 
  - ***Authentication modules** for both frontend and backend.


 ### Instructions to RUN the project Locally
 - Ensure docker is running on your system
 - Clone the repo from the Link provided
   - ```cd <desired_path>```
   - ```git clone https://github.com/sandeepraju8787/UserManagementSystem.git```
   - ```cd UserManagementSystem```
   - ```git checkout main```
 - **Please send your IP to me over email(sandeepraju.net@gmail.com) for whitelisting, only then you will be able to access the mongodb which I have hosted on Cloud**
 - ```cd <project_root_path>```
 - ```make up``` **to start the whole application locally**
 - ```make down``` **to stop the whole application**
 - ```make restart``` **to restart the whole application**

### Application Screenshots 
<img width="760" alt="Screenshot 2024-07-03 at 2 11 16 PM" src="https://github.com/sandeepraju8787/UserManagementSystem/assets/65300002/a308c85d-6efd-4bb5-8866-7aae9f5b114e">

<img width="760" alt="Screenshot 2024-07-03 at 2 07 02 PM" src="https://github.com/sandeepraju8787/UserManagementSystem/assets/65300002/5f5adee0-2c97-4dfd-88b0-1a314380939f">

<img width="760" alt="Screenshot 2024-07-03 at 2 05 48 PM" src="https://github.com/sandeepraju8787/UserManagementSystem/assets/65300002/1f5a94f6-42d9-45fd-8cb1-5d212704e7ba">

<img width="760" alt="Screenshot 2024-07-03 at 2 04 00 PM" src="https://github.com/sandeepraju8787/UserManagementSystem/assets/65300002/429caaa7-5867-4d08-a04a-236860960427">
