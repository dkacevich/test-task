import axios from 'axios';

const API_BASE = 'https://frontend-test-assignment-api.abz.agency/api/v1'


export const fetchUsers = async ({ pageParam = `${API_BASE}/users?page=1&count=6` }) => {
    const res = await axios.get(pageParam)
    return res
}

export const registerUser = async ({ data, token }) => {
        throw new Error('Custom error')
    const res = await axios.post(`${API_BASE}/users`, data, {
        headers: {
            token
        }
    })
    return res
}


export const fetchPositions = async () => {
    const res = await axios.get(`${API_BASE}/positions`)
    return res
}


export const getToken = async () => {
    const res = await axios.get(`${API_BASE}/token`)
    return res
}