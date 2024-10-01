# EFS Coding Challenge

## Assumptions
1. Customer API Integration
Customer API acts as an external service that triggers a Webhook whenever a new customer is created (customer.created).
The Webhook Listener at the endpoint POST /webhook/customer receives the webhook and fetches the full customer data from the Customer API.

2. Webhook Workflow
When the webhook is triggered, the system fetches the full customer data and then stores it in a local Credit Application Database for future reference.

3. Credit Application Process
The customer submits a credit application through the Credit Application Endpoint (POST /credit-application).
Before saving the credit application, the system performs a Schufa Score Check and the application is stored in the Credit Application Database.

4. Data Flow and Storage
The system involves two major data flows:
Customer Data: Fetched from the Customer API via a webhook and stored in the Credit Application Database.
Credit Application Data: Submitted by the customer, processed through eligibility checks, and then saved in the Credit Application Database.

## Links

1. **[Project Setup Instructions](./SETUP.md)**  
   A guide on how to initialize and run the project, including Docker setup, dependencies, and running the credit service.

2. **[Service Architecture Diagram](./assets/Architecture%20Diagram.png)**  
   A diagram of the interaction between the credit service and the customer API via webhooks.

3. **[Service Architecture Diagram Incase Of Delay](./assets/Architecture%20Diagram%20With%20Delay.png)**  
   A diagram of the interaction between the credit service and the customer API via webhooks in case of delay response from customer API.

4. **[Task Description](./TASK_DESCRIPTION.md)**  
   A detailed description of the tasks to be completed for this coding challenge.
