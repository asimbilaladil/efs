import {createSchufaSDK, PassSchufaScore} from '../../schufa';
import {findById} from "../repository/customerRepo";
import {saveCreditApplication} from "../repository/creditApplicationRepo";
const schufaSDK = createSchufaSDK();
import { ICreditApplication } from "../models/creditApplicationModel";
import {ErrorCodes, ErrorMessages} from "../constants";

interface IResponse {
    message: string;
    data: ICreditApplication | null
    statusCode: number;
};

export async function createCreditApplication(
    customerId: string,
    loanAmount: number,
    term: number
): Promise<IResponse> {
    try {

        const customerData = await findById(customerId);
        if (!customerData) {
            return { message: ErrorMessages.CUSTOMER_DATA_NOT_FOUND, data: null, statusCode: ErrorCodes.NOT_FOUND };
        }

        const schufaScore = schufaSDK.getSchufaScore(customerId);

        const eligible = determineEligibility(schufaScore);

        const creditApplicationResult: ICreditApplication = {
            customerId,
            loanAmount,
            term,
            eligible,
            schufaScore,
        };

        await saveCreditApplication(creditApplicationResult);

        return { message: ErrorMessages.CREDIT_APPLICATION_DATA_SAVED, data: creditApplicationResult, statusCode: ErrorCodes.SUCCESS };
    } catch (error) {
        return { message: ErrorMessages.FAILED_TO_CREATE_CREDIT_APPLICATION, data: null, statusCode: ErrorCodes.INTERNAL_SERVER_ERROR };
    }
}

function determineEligibility(schufaScore: string): boolean {
    return PassSchufaScore.includes(schufaScore);
}