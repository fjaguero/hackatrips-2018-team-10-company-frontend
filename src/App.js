import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import queryString from 'query-string'; 
import 'moment/locale/es';
import Sidebar from './Sidebar';
import Header from './Header';
import Bids from './Bids';
import 'flexboxgrid/dist/flexboxgrid.css';
import 'normalize.css/normalize.css';
import './App.css';

moment.locale('es');

const Bottom = styled.div`
  margin: 50px 10px;
`;

class App extends React.Component {

	state = {
		checkinDate: moment(),
		checkoutDate: moment().clone().add(2, 'weeks'),
		guests: 1,
		hotel: '',
		maxPrice: 0,
	}

	handleChangeFilters = (filters) => {
		this.setState(state => ({
			...state,
			...filters
		}))
	}

	componentWillMount() {
		// eslint-disable-next-line
		const hotelParam = queryString.parse(location.search);
		const hotelId = hotelParam && hotelParam.id;

		this.setState({ hotel: hotelId });
	}

  render() {
		const { hotel } = this.state;
		if (!hotel) {
			return (
				<p>You need to specificy an hotelId in the url, like /?id=1234</p>
			)
		}

    return (
      <div className="App">
				<Header hotelId={hotel} />
        <div className="wrap container-fluid">
          <Bottom className="col-xs-center col-xs-12">  
            <div className="row">
              <Sidebar onChangeFilters={this.handleChangeFilters} />
							<Bids filters={this.state} hotelId={hotel} />
            </div>
          </Bottom>
        </div>
      </div>
    );
  }
}

export default App;
