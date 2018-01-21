import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Button } from 'antd';
import { InputNumber } from 'antd';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import GroupIcon from './group.svg';
import ArrowIcon from './arrow.svg';

const Wrapper = styled.div`
	display: flex;
	border: 1px solid gray;
	width: 100%;
	padding: 25px 10px;
	margin-bottom: 20px;
`;

const GuestRooms = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-right: 1px solid #EEE;
`;

const GuestsIcon = styled.img`
	padding-right: 10px;
`;

const Dates = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	border-right: 1px solid #EEE;
`;

const Element = styled.span`
	display: block;
`;

const CurrentPrice = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-right: 1px solid #EEE;
`;

const Price = styled.span`
	font-size: 1.2rem;
	font-weight: bold;
	padding: 0 10px;
`;

const ClaimBlock = styled.span`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;

const Arrow = styled.img`
	width: 25px;
	display: flex;
	align-content: center;
	margin: 3px;
`;

class Bid extends React.Component {

	state = {
		newPrice: undefined,
		minimumBetting: undefined,
	}

	onChangePrice = (value) => {
		this.setState({
			newPrice: value,
		});
	}

	onClickClaim = (value) => {
		const { id, hotelId } = this.props;
		const { newPrice, minimumBetting } = this.state;

		if (!newPrice) {
			alert('You need to set a price first');
			return;
		}

		console.log(minimumBetting);
		console.log(newPrice);

		if (!minimumBetting || newPrice > minimumBetting) {
			alert(`The betting price should be at least ${minimumBetting}`);
			return;
		}

		this.props.mutate({
			variables: { 
				hotelId: hotelId,
				bookingId: id,
				price: newPrice,
		}})
		.then(({ data }) => {
			console.log('got data', data);
			this.props.onBidCompleted();
		}).catch((error) => {
			console.log('there was an error sending the query', error);
		});
	}

	componentWillMount() {
		const { currentPrice } = this.props;

		// It should be at least 5% less than the current price
		const minimumBetting = parseInt(currentPrice - (currentPrice * 5 / 100), 10);
		this.setState({ minimumBetting });
	}	

	render() {
		const {
			checkinDate,
			checkoutDate,
			currentPrice,
			rooms,
			guests,
		} = this.props;
		const { minimumBetting } = this.state;

		const dateFormat = 'ddd DD/MM';
		const inDate = moment(checkinDate).format(dateFormat);
		const outDate = moment(checkoutDate).format(dateFormat);

		return (
			<Wrapper className="row">
				<Dates className="col-xs-2">
					<Element>{inDate}</Element>
					<Arrow src={ArrowIcon} />
					<Element>{outDate}</Element>
				</Dates>
				<GuestRooms className="col-xs-3">						
					<GuestsIcon width="60" src={GroupIcon} />
					<div>
						<Element>{guests} {guests === 1 ? 'adulto' : 'adultos'}</Element>
						<Element>{rooms} {rooms === 1 ? 'habitación' : 'habitaciones'}</Element>
					</div>
				</GuestRooms>
				<CurrentPrice className="col-xs-2">
					Precio: <Price>{currentPrice}€</Price>
				</CurrentPrice>
				<ClaimBlock className="col-xs-5">
					<span>Tu puja:</span>
					<span>
						<InputNumber
							placeholder={`Máx. ${minimumBetting}€`}
							max={minimumBetting}
							autoFocus
							size="5"
							defaultValue={this.state.newPrice}
							parser={value => value.replace(/\$\s?|(,*)/g, '')}
							onChange={this.onChangePrice}
						/> €
					</span>
					<Button
						type="primary"
						onClick={this.onClickClaim}
					>Pujar</Button>
				</ClaimBlock>
			</Wrapper>
		)
	}
}

const BID_MUTATION = gql`
	mutation claim($bookingId: ID!, $price: Int!, $hotelId: ID!) {
		claim(bookingId: $bookingId, price: $price, hotelId: $hotelId) {
			id
		}
	}
`;

const withBidMutation = graphql(BID_MUTATION);

export default withBidMutation(Bid);
