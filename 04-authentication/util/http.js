import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_FIREBASE_URL;

export async function getMessage(token) {
    const response = await axios.get(API_URL + 'message.json' + `?auth=${token}`,);
    return response.data;
}
