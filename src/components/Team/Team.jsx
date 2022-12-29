import './Team.scss'
import Card from '../Card/Card';
import { useInfiniteQuery, useQuery } from 'react-query'
import { fetchUsers } from './../../services/serviceAPI';
import Preloader from '../Preloader/Preloader';
import React, { useState } from 'react';

const Team = () => {
	const { hasNextPage, isFetching, fetchNextPage, isFetchingNextPage, error, data, status } = useInfiniteQuery(
		['users'],
		fetchUsers,
		{ getNextPageParam: (lastPage) => lastPage.data.links.next_url }
	)

	if (status === 'loading') return <Preloader />
	if (status === 'error') return `Error: ${error.message}`


	const usersCards = data.pages.map((group, i) => (
		<React.Fragment key={i}>
			{group.data.users.map(({ id, ...userProps }) => (
				<Card key={id} {...userProps} id={id} />
			))}
		</React.Fragment>
	))


	return (
		<div className='team'>
			<h1>Working with GET request</h1>
			<div className="team__grid">
				{usersCards}
			</div>
			{
				(isFetching | isFetchingNextPage) ? <Preloader /> : (hasNextPage ? <button disabled={isFetchingNextPage} onClick={() => fetchNextPage()} className="button">Show more</button> : null)
			}

		</div>
	)
}

export default Team