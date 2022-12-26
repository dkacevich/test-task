import axios from 'axios';

const API_BASE = 'https://frontend-test-assignment-api.abz.agency/api/v1'


export const fetchUsers = async (page) => {
    const res = await axios.get(`${API_BASE}/users?page=${page}&count=6`)
    return res
}