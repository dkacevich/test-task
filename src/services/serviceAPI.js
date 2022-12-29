import axios from 'axios';

const API_BASE = 'https://frontend-test-assignment-api.abz.agency/api/v1'


export const fetchUsers = async ({pageParam = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6`}) => {
    const res = await axios.get(pageParam)
    return res
}


export const fetchPositions = async () => {
    const res = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
    return res
}