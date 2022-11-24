import * as React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

const goals = [
	{
		title: 'Track your food',
		description: [
			'Learn about the foods ' +
			'you will be consuming'
		]
	},
	{
		title: 'Keep your body healthy',
		description: [
			'Let us help you by \n' +
			'recommending the best \n' +
			'alternatives and by \n' +
			'keeping you always \n' +
			'informed about your body \n' +
			'status'
		]
	},
	{
		title: 'Setting goals',
		description: [
			'Losing or gaining weight, \n' +
			'tell us your goals so we \n' +
			'can help you achieve \n' +
			'them\n'
		]
	}
];

function LandingContent() {
	return (
		<React.Fragment>
			<GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
			>
				<Toolbar sx={{ flexWrap: 'wrap' }}>
					<Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        HTrack
					</Typography>
					<nav>
					</nav>
					<Link to={'/login'}>
						<Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
							Login
						</Button>
					</Link>
				</Toolbar>
			</AppBar>
			{/* Hero unit */}
			<Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
				<Typography
					component="h1"
					variant="h3"
					align="center"
					color="text.primary"
					gutterBottom
				>
                    THE BENEFITS
				</Typography>
				<Typography variant="h10" align="center" color="text.secondary" component="div">
					<Typography variant="h5" component="p">Disclaimer:</Typography>
					The following GUI serves as a interactive wireframe for the final product.
					As such, by the end of the project lifecycle there will be notable changes to the functionalities and design.
				</Typography>
			</Container>
			{/* End hero unit */}
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{goals.map((tier) => (
						// Enterprise card is full width at sm breakpoint
						<Grid
							item
							key={tier.title}
							xs={12}
							sm={tier.title === 'Enterprise' ? 12 : 6}
							md={4}
						>
							<Card>
								<CardHeader
									title={tier.title}
									subheader={tier.subheader}
									titleTypographyProps={{ align: 'center' }}
									action={tier.title === 'Pro' ? <StarIcon /> : null}
									subheaderTypographyProps={{
										align: 'center',
									}}
									sx={{
										backgroundColor: (theme) =>
											theme.palette.mode === 'light'
												? theme.palette.grey[200]
												: theme.palette.grey[700],
									}}
								/>
								<CardContent>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'baseline',
											mb: 2,
										}}
									>
										<Typography component="p" variant="p" sx={{color: 'gray'}}>
                                            Placeholder Image
										</Typography>
									</Box>
									<ul>
										{tier.description.map((line) => (
											<Typography
												component="li"
												variant="subtitle1"
												align="center"
												key={line}
											>
												{line}
											</Typography>
										))}
									</ul>
								</CardContent>
								<CardActions>
									<Button fullWidth variant={tier.buttonVariant}>
										{tier.buttonText}
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</React.Fragment>
	);
}

export default function Landing() {
	return <LandingContent />;
}
