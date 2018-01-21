import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Bid from './Bid';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	@media (min-width: 800px) {
		margin-left: 4.33333333% !important;
  }
`;

class Bids extends React.Component {

	componentDidMount() {
		setInterval(() => {
			this.props.data.refetch();
		}, 2000);
	}

	handleBidCompleted = () => {
		this.props.data.refetch();
	}

	render() {
		const { hotelId, data: { loading, hotel } } = this.props;
		const bookings = hotel && hotel.bookings ? hotel.bookings : [];

		let $bidsList = bookings ? (
			bookings.map(bid => <Bid onBidCompleted={this.handleBidCompleted} key={bid.id} hotelId={hotelId} {...bid} />)
		) : [];
		let $content = loading ? <p>Cargando...</p> : $bidsList;

		if (!loading && !bookings.length) {
			$content = <p>No hay reservas disponibles para este filtro...</p>
		}

		return (
			<Wrapper className="col-xs-12 col-md-8">
				<h2>Pujas activas</h2>
				{$content}
			</Wrapper>
		)
	}
}

const BIDS_QUERY = gql`
	query GetHotels($id: ID!, $filters: Filters) {
		hotel(id: $id) {
			id,
			bookings(filters: $filters) {
				id,
				expires,
				checkinDate,
				checkoutDate,
				rooms,
				guests,
				currentPrice,
			}
		}
	}
`;

const withBids = graphql(BIDS_QUERY, {
	options: ({ filters, hotelId }) => ({
		variables: {
			id: hotelId,
			filters,
		}
	}),
});

export default withBids(Bids);
