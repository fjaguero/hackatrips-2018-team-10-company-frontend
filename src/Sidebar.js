import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { Radio } from 'antd';

const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY/MM';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
	margin-bottom: 20px;
`;

const Block = styled.div`
	display: flex;
  flex-direction: column;
	margin-top: 20px;
	align-items: flex-start;
`;

export default class Sidebar extends React.Component {

	state = {
		guests: "1",
		price: undefined,
	}

	onChangeDate = (value, dateString) => {
		this.props.onChangeFilters({
			checkinDate: value[0],
			checkoutDate: value[1],
		});
	}

	onChangeRooms = (e) => {
		const { value } = e.target;
		this.setState({
			guests: value,
		});

		this.props.onChangeFilters({
			guests: value,
		});
	}

	onChangePrice = (value) => {
		this.setState({
			maxPrice: value,
		});

		this.props.onChangeFilters({
			maxPrice: value,
		});
	}

  render() {
		const initialDate = moment();
		const endDate = moment().clone().add(2, 'weeks');

    return (
      <Wrapper className="col-xs-12 col-md-3">
				<h2>Filtros</h2>
				<RangePicker
					defaultValue={[initialDate, endDate]}
					format={dateFormat}
					onChange={this.onChangeDate}
				/>
				<Block>
					<h3>Habitación para</h3>
					<Radio.Group value={this.state.guests} onChange={this.onChangeRooms}>
						<Radio.Button value="1">1 adulto</Radio.Button>
						<Radio.Button value="2">2 adulto</Radio.Button>
						<Radio.Button value="3">Familias</Radio.Button>
					</Radio.Group>
				</Block>
				{/* <Block>
					<h3>Precio/noche</h3>
					<InputNumber
						placeholder="< 60€"
						size="5"
						onChange={this.onChangePrice}
					/> 
				</Block> */}
      </Wrapper>
    )
  }
}
