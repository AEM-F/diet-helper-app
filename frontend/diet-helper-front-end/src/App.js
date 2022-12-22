import React, { Component } from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './components/pages/login.component';
import AuthService from './services/auth.service';
import EventBus from './common/EventBus';
// import AuthVerify from './common/auth-verify';
import SignUp from './components/pages/signup.component';
import BottomNav from './components/nav/bottom-nav.component';
import {CssBaseline, ThemeProvider} from '@mui/material';
import returnTheme from './services/theme.service';
import '@fontsource/ubuntu-mono';
import UserMacroDetailsPage from './components/pages/user-macro-details.page';
import LandingContent from './components/pages/landing.component';
import LoggerPage from './components/pages/logger.page';
import DashboardPage from './components/pages/dashboard.page';
import BarcodeScannerPage from "./components/pages/product/barcode-scanner.page";
import BarcodeScanner from "./components/pages/product/barcode-scanner.page";

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
			<ThemeProvider theme={returnTheme()}>
				<CssBaseline />
				<Routes>
					<Route path="/" element={<LandingContent/>}/>
					<Route path="/home" element={<Login/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/signup" element={<SignUp/>} />
					<Route path="/first-macro" element={<UserMacroDetailsPage/>} />
					<Route path="/logger" element={<LoggerPage/>} />
					<Route path="/dashboard" element={<DashboardPage/>} />
					<Route path="/barcode-scanner/" element={<BarcodeScanner/>} />
				</Routes>
				{this.state.currentUser && (<BottomNav/>)}
				{/*<AuthVerify logOut={this.logOut}/>*/}
			</ThemeProvider>
		);
	}
}

export default App;
