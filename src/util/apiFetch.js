import axios from 'axios';
import 'regenerator-runtime/runtime'

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Fetch all calls
export const fetchCalls = async () => {
    try {
        //const response = await axios.get(`${API_BASE_URL}/activities`);
        const response = await axios.get(`https://cerulean-marlin-wig.cyclic.app/activities`);
        const data = response.data;
        console.log("api- ",API_BASE_URL);
        // Filter out calls that do not have both 'to' and 'from' values
        const validCalls = data.filter(call => call.to !== undefined && call.from !== undefined);
        return validCalls;
    } catch (error) {
        console.error('There was an error fetching the calls:', error);
        throw error;
    }
};


// Archive a call
export const archiveCall = async (callId) => {
    try {
        await axios.patch(`${API_BASE_URL}/activities/${callId}`, {
            is_archived: true
        });
    } catch (error) {
        console.error('There was an error archiving the call:', error);
        throw error;
    }
};

// Unarchive a call
export const unarchiveCall = async (callId) => {
    try {
        await axios.patch(`${API_BASE_URL}/activities/${callId}`, {
            is_archived: false
        });
    } catch (error) {
        console.error('There was an error unarchiving the call:', error);
        throw error;
    }
};

// Archive all calls
export const archiveAllCalls = async (calls) => {
    try {
        const archivePromises = calls.map(call => {
            return axios.patch(`${API_BASE_URL}/activities/${call.id}`, {
                is_archived: true
            });
        });
        await Promise.all(archivePromises);
    } catch (error) {
        console.error('There was an error archiving all calls:', error);
        throw error;
    }
};

// Unarchive all calls
export const unarchiveAllCalls = async (calls) => {
    try {
        const unarchivePromises = calls.map(call => {
            return axios.patch(`${API_BASE_URL}/activities/${call.id}`, {
                is_archived: false
            });
        });
        await Promise.all(unarchivePromises);
    } catch (error) {
        console.error('There was an error unarchiving all calls:', error);
        throw error;
    }
};
