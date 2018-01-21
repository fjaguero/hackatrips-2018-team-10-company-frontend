import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import logo from './logo.png';

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 5px 20px;
	background-color: #222;
`;

const Top = styled.div`
  display: flex;
  margin: 50px 0;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
`;

const Hotel = styled.div`
  display: flex;
  margin: 50px 0;
  justify-content: center;
  flex-direction: column;
	align-items: flex-end;
	color: white;

	@media (max-width: 800px) {
		display: none;
	}
`;

const Titles = styled.div`
  display: flex;
  flex-direction: column;
	text-align: left;
  align-items: flex-start;
	margin-left: 50px;
`;


const Title = styled.h1`
	text-transform: uppercase;
	font-size: 1.5rem;
`;

const HotelName = styled.span`
  max-width: 375px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const propTypes = {
	hotelId: PropTypes.string.isRequired,
}

function Header({ data: { loading, hotel } }) {
	return (
		<Wrapper className="App-header">
			<div className="row col-xs-12">
				<Top className="col-xs-9">
					<img src={logo} width="60" alt="TravelBid" />
					<Titles>
						<Title style={{ color: 'white' }}>Real-Time Customer Acquisition</Title>
						<h3 style={{ color: 'white' }}>Reajuste de ofertas para la adquisición de clientes de la competencia</h3>
					</Titles>
				</Top>
		
			{
				loading ? (
					<Hotel>Cargando...</Hotel>
				) : (
					<Hotel className="col-xs-3">
						<HotelName>Hotel: {hotel && hotel.name}</HotelName>
						<span>City: {hotel && hotel.place}</span>
					</Hotel>
				)
			}
			</div>
		</Wrapper>
	)
}

const COMPANY_QUERY = gql`
	query GetHotels($id: ID!) {
		hotel(id: $id) {
			id,
			name,
			stars,
			place
		}
	}
`;

const withCompany = graphql(COMPANY_QUERY, {
	options: ({ hotelId }) => ({
		variables: {
			id: hotelId
		}
	}),
});

Header.propTypes = propTypes;

export default withCompany(Header);
