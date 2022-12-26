import './Team.scss'
import Card from '../Card/Card';

import { useQuery } from 'react-query'
import { fetchUsers } from './../../services/serviceAPI';
import Preloader from '../Preloader/Preloader';
import { useState } from 'react';

const Team = () => {
	const [page, setPage] = useState(7)
	const [users, setUsers] = useState([])
	const { isLoading, isFetching, error, data } = useQuery(['users', page], () => fetchUsers(page), {
		keepPreviousData: true,
		onSuccess: (data) => {
			if (data !== users) setUsers(users => [...users, ...data.users])
		},
		select: ({data}) => data
	})

	if (isLoading | isFetching) return <Preloader/>


	const prefetchUsers = () => {
		setPage(state => state + 1)
	}


	const usersCards = users.map(({id, ...userProps}) => {
		return <Card key={id} {...userProps}/>
	})

	console.log('render');
	return (
		<div className='team'>
			<h1>Working with GET request</h1>
			<div className="team__grid">
				{usersCards}
			</div>
			{
				Math.ceil(data.total_users / 6) > page && <button onClick={prefetchUsers} className="button">Show more</button>
			}
		</div>
	)
}

export default Team