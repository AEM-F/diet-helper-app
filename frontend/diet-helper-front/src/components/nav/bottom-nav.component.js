import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DescriptionIcon from '@mui/icons-material/Description';
import {Paper} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function BottomNav() {
	const location = useLocation();
	const [value, setValue] = React.useState(location.pathname);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
			<BottomNavigation
				value={value} 
				onChange={handleChange}
			>
				<BottomNavigationAction value={'/dashboard'} label="Dashboard" icon={<DashboardIcon />} LinkComponent={Link} to={'/dashboard'}/>
				<BottomNavigationAction value={'/logger'} label="Logger" icon={<DescriptionIcon />} LinkComponent={Link} to={'/logger'}/>
				<BottomNavigationAction label="Account" icon={<AccountBoxIcon />} />
			</BottomNavigation>
		</Paper>
	);
}
