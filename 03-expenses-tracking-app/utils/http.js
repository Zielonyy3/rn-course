import axios from "axios";

const baseUrl = process.env.EXPO_PUBLIC_FIREBASE_URL;

export const storeExpense = async (expenseData) => {
    const response = await axios.post(
        `${baseUrl}expenses.json`,
        expenseData
    )
    return response.data.name;
}

export const getExpenses = async () => {
    const response = await axios.get(`${baseUrl}expenses.json`)

    const expenses = []
    for (const key in response.data) {
        const expense = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }
        expenses.push(expense)
    }
    return expenses;
}
export const updateExpense = (id, expenseData) => {
    return axios.put(`${baseUrl}expenses/${id}.json`, expenseData);
}

export const deleteExpense = (id) => {
    return axios.delete(`${baseUrl}expenses/${id}.json`);
}