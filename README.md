# EFS Coding Challenge

## Overview

Welcome to the EFS Coding Challenge. This challenge tests your ability to design, implement, and integrate a backend microservice system. You will create a new service for processing credit applications and integrate it with an existing customer API using webhooks.

## Problem Statement

You need to implement a credit application service that integrates with an external customer API. The credit service should:

- Receive customer data via webhooks from the customer API.
- Cache this customer data locally using a Dockerized database (Postgres, MongoDB, or SQLite).
- Use the cached customer data to process credit applications.

The challenge arises because:

- Customers register and update their information on the customer API.
- The customer API sends a webhook to the credit application service with updated customer data.
- When a customer submits a credit application, the latest cached customer data must be used.
- Direct querying of the customer API during the credit application process is **not allowed** due to its unreliability and slow response times.

The goal is to ensure a smooth user experience by:

- Ensuring the credit application uses the latest customer data.
- Reflecting any changes in customer data (e.g., address or IBAN) in the credit application process.

## Objectives

1. **Design the Architecture**: Create a solution architecture for integrating the credit service with the customer API via webhooks.
2. **Implement the Credit Service**: Develop a credit service that processes credit applications and integrates with the customer API through webhooks.
3. **Order Processing**: Use the Schufa mock to check if the credit applicant is eligible for a loan.

## Tasks

### Task 1: Design the Architecture

#### Goal

Design an architecture for the credit service that integrates seamlessly with the customer API using webhooks.

#### Deliverables

- **Architecture Diagram**: A high-level diagram showing the interaction between the credit service and the customer API via webhooks.
- **Data Flow Explanation**: A detailed explanation of the data flow and mechanisms to handle delays and failures. *(Note: How you handle both is up to you.)*

### Task 2: Implement the Credit Service

#### Goal

Develop a credit service that processes credit applications, integrates with the customer API via webhooks, and checks customer eligibility for a loan using the Schufa score.

#### Requirements

1. **Project Setup**:

   - Initialize a NodeJS/TypeScript project.
   - Set up necessary dependencies (e.g., Express/Hono for REST API, Axios/Node-fetch/Fetch for HTTP requests, Prisma for database interaction).
   - Use Docker to configure a database (Postgres, MongoDB, or SQLite).
   - **To start the project, run:** `docker-compose up -d`.

2. **Webhook Listener**:

   - Create a webhook listener at `POST /webhook/customer` to receive customer data updates from the customer API.
   - Only process the `customer.created` event and store the customer data in a local database.
   - Cache the received customer data locally for use during credit application processing.

3. **Credit Application Processing**:

   - **POST `/credit-application` Endpoint**:

     - Create a POST endpoint that accepts credit application submissions.
     - When a customer submits a credit application, use the latest cached customer data (from the webhook) to process the application.
     - The credit application submission should include necessary details such as customer ID, loan amount, term, etc.

   - **Schufa Score Check**:

     - Use the Schufa score check (provided in `schufa.ts`) to evaluate the creditworthiness of the customer linked to the application.
     - Incorporate the Schufa score to determine the customer's eligibility for the loan.

   - **Eligibility Determination**:

     - Based on the result of the Schufa score check, decide whether the customer qualifies for the loan and return this information as part of the credit application response.

   - **Persistence**:

     - Store both customer data (from the webhook) and credit application data in the local Dockerized database.

4. **CustomerRepo Integration**:

   - Use Docker to set up a database (e.g., Postgres, MongoDB, or SQLite) for storing both customer data (received from webhooks) and credit application data.

#### Deliverables

- **Source Code**:

  - REST API with a webhook listener for customer updates and a credit application submission endpoint.
  - CustomerRepo integration for storing and using locally cached customer data.
  - Schufa score check integrated into the credit application process to evaluate loan eligibility.

- **Docker Compose Configuration**:

  - Configuration for setting up the environment.
  - **To start the project, run:** `docker-compose up -d`.

- **Documentation**:

  - Instructions on how to run and test the solution, with explanations of design choices and how they address the challenge.
  - Include any necessary information about how to use the API endpoints.

## Constraints

- **Customer API Delays**: The customer API may experience random delays, adjustable via `MAX_DELAY` in the `docker-compose` file.

- **IGNORE_WEBHOOK**: The `IGNORE_WEBHOOK` environment variable in the `docker-compose` file can be set to `true` to ignore sending out the webhook, for cases when you just want to test the customer API without the credit service integration or enable sending webhooks by setting it to `false`.

- **Do Not Modify Customer API**: The customer API is simulating an external API we do not control; thus, it must **not** be modified.

- **No Direct Querying**: Directly querying the customer API during credit application creation is **not allowed** due to potential long wait times.

- **Error Handling**: While the system should be robust, **excessive error handling is not needed** for this challenge.

- **Testing**: **No tests are needed** for this challenge.

## Data Models

You can find the data models for the customer and credit services in the following OpenAPI specifications:

- [Customer API](assets/customer_openapi.yaml)
- [Credit API](assets/credit_openapi.yaml)

## Webhook Endpoint

- **Path**: `POST /webhook/customer`
- **Payload**:

  ```json
  {
    "event": "customer.created",
    "customerId": "string"
  }
  ```

  - **Note**: The customer API may send other event types, but only `customer.created` needs to be handled.

### Note

The implementation **does not need to be complete**. It's perfectly acceptable if parts are unfinished, as long as the overall goal and approach are clear. The main objective is to demonstrate your design and how you plan to achieve the required functionality.