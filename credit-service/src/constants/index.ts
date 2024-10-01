export const WebHookEvents = {
    CUSTOMER_CREATED: 'customer.created',
};

export const Routes = {
    FETCH_CUSTOMER_BY_ID: (customerId: string) => `http://${process.env.CUSTOMER_API_HOSTNAME}:3000/api/v1/customer/${customerId}`,
    CREATE_CREDIT_APPLICATION: '/credit-application',
    WEBHOOK_CUSTOMER: '/webhook/customer',
    DATABASE_URL: process.env.MONGO_URL,
};

export const ErrorCodes = {
    SUCCESS: 200,
    INVALID_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export const ErrorMessages = {
    INVALID_CREATE_CREDIT_REQUEST : 'Invalid request: customerId, loanAmount, and term are required.',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    FAILED_TO_FETCH_CUSTOMER_DATA: 'Failed to fetch customer data.',
    FAILED_TO_SAVE_CUSTOMER_DATA: 'Failed to save customer data.',
    CUSTOMER_DATA_NOT_FOUND: 'Customer data not found.',
    CUSTOMER_DATA_SAVED: 'Customer data Saved Successfully.',
    CREDIT_APPLICATION_DATA_SAVED: 'Credit Application data Saved Successfully.',
    FAILED_TO_CREATE_CREDIT_APPLICATION: 'Failed to create credit application.',
    FAILED_TO_PROCESS_WEBHOOK: 'Failed to process webhook.',
};


