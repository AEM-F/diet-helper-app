import React, { Component } from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './components/pages/login.component';
import AuthService from './services/auth.service';
import EventBus from './common/EventBus';
import AuthVerify from './common/auth-verify';
import Landing from './components/pages/landing.component';
import SignUp from './components/pages/signup.component';

class App extends Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);

		this.state = {
			currentUser: undefined,
		};
	}

	componentDidMount() {
		const user = AuthService.getCurrentUser();

		if (user) {
			this.setState({
				currentUser: user
			});
		}
    
		EventBus.on('logout', () => {
			this.logOut();
		});
	}

	componentWillUnmount() {
		EventBus.remove('logout');
	}

	logOut() {
		AuthService.logout();
		this.setState({
			currentUser: undefined,
		});
	}

	render() {

		return (
			<div>
				<div className="container mt-3">
					<Routes>
						<Route path="/" element={<Landing/>}/>
						<Route path="/home" element={<Login/>} />
						<Route path="/login" element={<Login/>} />
						<Route path="/signup" element={<SignUp/>} />
					</Routes>
				</div>
				<AuthVerify logOut={this.logOut}/>
			</div>
		);
	}
}

export default App;
