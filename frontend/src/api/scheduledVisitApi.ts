import api from "./axios";

export const createScheduledVisit = async (data: any) => {
    const response = await api.post("/scheduled-visits", data);
    return response.data;
};