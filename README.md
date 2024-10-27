![image](https://github.com/user-attachments/assets/b1795697-28bc-452c-ac64-e77ceb6633ee) 

# Project Overview

In this project, we innovatively designed an intelligent bookkeeping and financial advice analysis application that combines a large language model (LLM). It will generate detailed financial status and financial advice reports based on the information provided by the user. The development of this project follows an agile and open process and incorporates advanced technologies, leaving a lot of room for expansion for the technical team.  
Based on the first phase of the architecture design, the application provides basic bookkeeping functions as well as artificial intelligence financial reports. Users can easily manage their financial records and get smart customized advice for their financial situation.  
At the same time, the application uses LLM to analyze financial data and generate comprehensive reports. This feature enhances the application's ability to interpret data, make suggestions, and help users make wise financial decisions, effectively adding value beyond standard bookkeeping tools.  
During the development process, our team always follows an agile approach. By combining iterative development cycles, feedback loops, and regular team collaboration, we ensure continuous improvement and response to feedback to create products that meet changing needs and user expectations.  
To support the functionality and performance of the application, the user interface of the program is built using React in the front-end and back-end frameworks to achieve a responsive and interactive user experience, while the back-end is powered by Express.
At the same time, cloud services ensure smooth deployment and efficient data processing. In this part, we used AWS for scalable and reliable cloud hosting. In terms of deployment and CI/CD, we used Docker to manage continuous integration and deployment, so as to achieve seamless updates and reliable performance in different environments. Finally, optical character recognition (OCR) technology was used to automatically extract data from physical receipts and documents, which greatly facilitated users to record their daily consumption habits.   

# Configuration

- **Environment Variables**
    
    Configure environment variables in the backend `.env` file to store sensitive information securely and efficiently. Example variables include:
    
    - **AI_API_KEY**: Set for LLM access and updated as needed to prevent expiry.
    - **MONGO_DB_URI**: Connection URI for MongoDB.
    - **AWS_ACCESS_KEY_ID** and **AWS_SECRET_ACCESS_KEY**: Authentication for AWS services.
    - **OCR_API_KEY**: API key to activate OCR capabilities for receipt reading.
- **LLM Hyperparameters**
    
    To ensure quality and efficiency in generating financial advice reports, the LLM model operates with adjusted hyperparameters such as:
    
    - **max_tokens**: Limits the token count for each response, balancing processing time and data quality.
    - **temperature**: Controls response creativity, allowing for more analytical responses when set to a lower value (e.g., 0.3).
    - **top_p**: Ensures a balanced probability distribution for coherent output, recommended to set to 0.8-1.
- **Frontend Configurations (React)**
    
    In `client/src/config.js`, configuration settings for connecting to backend endpoints, managing API requests, and defining UI/UX settings:
    
    - **BASE_API_URL**: Backend API URL for easy API call management.
    - **AUTO_SAVE_INTERVAL**: Set intervals for auto-saving user inputs and preventing data loss.
- **Backend Configurations (Express)**
    
    The backend in Express handles routing, APIs, and LLM data processing. Recommended configurations include:
    
    - **Body Parsing Limits**: To manage large file uploads for OCR, adjust the body parser to handle larger payloads.
    - **Request Timeout**: Configure an appropriate request timeout in Express to handle LLM processing without session timeouts.
- **Docker Configurations**
    
    For a consistent runtime environment across development and production, Docker files are set up with:
    
    - **Docker Compose**: Orchestrates multi-container setup for database, backend, and frontend services.
    - **Environment Variables in Docker**: Integrate environment-specific variables for staging, testing, and production.
- **CI/CD Settings**
    
    Continuous integration is facilitated through Docker-based CI/CD pipelines with settings for automatic deployment. Key settings include:
    
    - **Build Automation**: Automatic builds triggered on merge to main branch.
    - **Health Checks**: Docker containers configured with health checks for service readiness before deployment.
- **Cloud Configuration (AWS)**
    
    AWS configurations support scalable and secure application deployment:
    
    - **EC2 Instance Sizing**: Set the instance types based on user traffic and data requirements.
    - **S3 Bucket Policies**: Secure policies for receipt and backup storage.
    - **Auto-scaling Policies**: Trigger scaling based on load, ensuring availability for high-traffic scenarios.
 
# Deployment

1. Extract files.  

2. Start the backend:
  + Navigate to the server folder.
  + In the terminal, first install dependencies:
    ```bash
    npm install
    ```
  + Once installed, start the server:
    ```bash
    node App.js
    ```
  
3. Start the frontend:
  + Navigate to the client folder.
  + In the terminal, first install dependencies:
    ```bash
    npm install
    ``` 
  + Once installed, start the frontend:
    ```bash
    npm run dev
    ``` 
Usage: The login screen is for demonstration purposes only. Enter a username with more than 6 characters and a password with more than 4 characters to log in.After entering some financial information on the main page, you can generate a report.  

Note: If there are issues with generating reports and reading receipts but not with reading information, it may be due to an expired **AI API key**. In this case, contact the development team to replace the **API key**. The API key is located in `/server/.env`.

# Advanced Technologies

- React: This tool helps build the parts of the software that users interact with, making it feel fast and responsive. When users click through to view reports or input expenses, React keeps things snappy and easy to navigate.

- Express: Express helps us set up my backend quickly, handling routes, requests, and responses. It makes managing data and building APIs easy, so I can focus more on my app's features than on server details.

- AWS: This is the cloud service where the software’s data (like records, backups, etc.) can be safely stored and accessed. Using AWS makes it easy to scale up if lots of people are using the app, or if a user’s data grows over time without slowing things down.

- MongoDB: This is where all the app’s data is stored in a flexible format, which is especially handy when dealing with varied information like transaction notes, receipt images, and more. It keeps everything organized and easy to search.

- Docker: Ensures the app runs consistently across different computers. When updating or fixing, Docker lets us test in a secure “bubble,” reducing unexpected issues.

- OCR: Reads text from images, like receipts. This helps users by letting them snap a photo, and OCR automatically grabs the important details, saving time and cutting down on manual entry mistakes.

- Mongoose: Works with MongoDB in Node.js projects, letting us set up data templates (“schemas”) to keep things organized and consistent. It simplifies database actions like creating and updating data.

- Swagger: Makes it easy for both the team and financial institutions to understand and use our API. It provides clear, testable documentation, helping everyone work together smoothly and integrate confidently.
