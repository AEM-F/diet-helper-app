import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function LoggerPage(){
	const [value, setValue] = React.useState(dayjs('2022-04-07'));
	return (
		<div className={'page-wrapper'}>
			<div className={'top-container'}>
				<div className={'date-container'}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<MobileDatePicker
							label="For mobile"
							value={value}
							onChange={(newValue) => {
								setValue(newValue);
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</div>
				<div className={'stats-container'}>

				</div>
			</div>
			<div className={'bottom-container'}>

			</div>
		</div>
	);
}
