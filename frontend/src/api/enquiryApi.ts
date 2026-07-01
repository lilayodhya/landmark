import api from "./axios";

export const createEnquiry = async (data: any) => {
    const response = await api.post("/enquiry", data);
    return response.data;
};