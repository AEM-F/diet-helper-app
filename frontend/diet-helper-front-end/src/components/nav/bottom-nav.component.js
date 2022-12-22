import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DescriptionIcon from '@mui/icons-material/Description';
import {Paper} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useNavigate } from 'react-router-dom';

export default function BottomNav() {
	const navigate = useNavigate();
	const location = useLocation();
	const [value, setValue] = React.useState(location.pathname);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const onMorningNavigate = () => {
		handleClose();
		navigate('/barcode-scanner', {replace: true, state:{timeOfDay: 'morning' }})
	}
	const onAfternoonNavigate = () => {
		handleClose();
		navigate('/barcode-scanner', {replace: true, state:{timeOfDay: 'afternoon' }})
	}
	const onEveningNavigate = () => {
		handleClose();
		navigate('/barcode-scanner', {replace: true, state:{timeOfDay: 'evening' }})
	}


	return (
		<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
			{value === '/logger' &&
				<>
					<Backdrop open={open} />
					<SpeedDial
						ariaLabel="SpeedDial tooltip"
						sx={{ position: 'fixed', bottom: 0, left: 0, right: 2 }}
						icon={<SpeedDialIcon />}
						onClose={handleClose}
						onOpen={handleOpen}
						open={open}
					>
						<SpeedDialAction
							key={'morning'}
							icon={<Brightness5Icon/>}
							tooltipTitle={'Morning'}
							tooltipOpen
							onClick={onMorningNavigate}
						/>
						<SpeedDialAction
							key={'afternoon'}
							icon={<Brightness6Icon/>}
							tooltipTitle={'Afternoon'}
							tooltipOpen
							onClick={onAfternoonNavigate}
						/>
						<SpeedDialAction
							key={'evening'}
							icon={<Brightness4Icon/>}
							tooltipTitle={'Evening'}
							tooltipOpen
							onClick={onEveningNavigate}
						/>

					</SpeedDial>
				</>
			}
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
