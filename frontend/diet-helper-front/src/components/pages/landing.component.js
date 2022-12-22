import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import './landing.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormControl, InputLabel, MenuItem, Paper, Select} from '@mui/material';
import Typography from '@mui/material/Typography';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { particlesOptions } from '../../particlesConfig';
import {useNavigate} from 'react-router-dom';
import User from '../../common/user.model';
import UserService from '../../services/user.service';
import {useEffect} from 'react';

function LandingContent() {
	useEffect(()=>{
		localStorage.removeItem('user');
		console.log(localStorage.getItem('user'));
	},[]);

	const navigate = useNavigate();

	const particlesInit = (engine) => {
		loadFull(engine);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const user = new User(
			data.get('firstName'),
			data.get('lastName'),
			data.get('gender'),
			data.get('weight'),
			data.get('height'),
			data.get('age'),
			data.get('activity'),
		);
		UserService.initialLoadUser(user);
		navigate('/first-macro', {replace: true});
	};
	return (
		<React.Fragment>
			<CssBaseline />
			<Particles init={particlesInit} options={particlesOptions} />
			<div className={'base-wrapper'}>
				<Box className={'main-title'} sx={{padding: '4px'}} elevation={10}>
					<Typography variant="h5" component="h5">
						Welcome to the NTrack
					</Typography>
				</Box>
				<Paper className={'form-sub-title-wrapper'} elevation={0}>
					<Typography sx={{color: '#0f0', width: '100%'}} variant="subtitle1" component="h6">
						Please begin by filling in your information
					</Typography>
				</Paper>
				<Box bgcolor={'#212121'} className={'form-wrapper'} component="form" onSubmit={handleSubmit}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="firstName"
						label="First Name"
						name="firstName"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="lastName"
						label="Last Name"
						name="lastName"
					/>
					<FormControl fullWidth margin={'normal'}>
						<InputLabel id="simple-select-gender-label">Gender</InputLabel>
						<Select defaultValue={'male'}
							labelId="simple-select-gender-label"
							name={'gender'}
							id="simple-select-gender"
							label="Gender"
						>
							<MenuItem value={'male'}>Male</MenuItem>
							<MenuItem value={'female'}>Female</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth margin={'normal'}>
						<InputLabel id="simple-select-activity-label">Activity level</InputLabel>
						<Select defaultValue={'sedentary'}
							labelId="simple-select-activity-label"
							name={'activity'}
							id="simple-select-activity-1"
							label="Activity"
						>
							<MenuItem value={'sedentary'}>Sedentary</MenuItem>
							<MenuItem value={'light'}>Light</MenuItem>
							<MenuItem value={'moderately'}>Moderately</MenuItem>
							<MenuItem value={'very'}>Very</MenuItem>
							<MenuItem value={'extra'}>Extra</MenuItem>
						</Select>
					</FormControl>
					<div className={'basic-info-wrapper-1'}>
						<TextField
							sx={{width: '30%'}}
							name={'weight'}
							id="weight"
							label="Weight (kg)"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							variant="filled"
						/>
						<TextField
							sx={{width: '30%'}}
							name={'height'}
							id="height"
							label="Height (cm)"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							variant="filled"
						/>
						<TextField
							sx={{width: '30%'}}
							name={'age'}
							id="age"
							label="Age (years)"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							variant="filled"
						/>
					</div>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Submit
					</Button>
				</Box>
			</div>
		</React.Fragment>
	);
}

export default LandingContent;
