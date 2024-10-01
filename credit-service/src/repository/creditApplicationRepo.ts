import { CreditApplication, ICreditApplication } from '../models/creditApplicationModel';

export async function saveCreditApplication(data: ICreditApplication): Promise<ICreditApplication> {
    const document = new CreditApplication(data);
    return document.save();
}