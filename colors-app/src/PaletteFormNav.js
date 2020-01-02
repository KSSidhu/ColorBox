import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import PaletteMetaForm from './PaletteMetaForm';
import clsx from 'clsx';

const drawerWidth = 400;
const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '64px'
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	navBtns: {
		marginRight: '1rem',
		'& a': {
			textDecoration: 'none'
		}
	},
	button: {
		margin: '0 0.5rem'
	}
});

class PaletteFormNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newPaletteName: '',
			formShowing: false
		};
	}

	openForm = () => {
		this.setState({ formShowing: true });
	};

	render() {
		const { classes, open, palettes, handleSubmit } = this.props;
		const { newPaletteName } = this.state;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					color="default"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.props.handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Create a Palette
						</Typography>
					</Toolbar>
					<div className={classes.navBtns}>
						<Link to="/">
							<Button variant="contained" color="secondary" className={classes.button}>
								Go Back
							</Button>
						</Link>
						<Button variant="contained" color="primary" onClick={this.openForm} className={classes.button}>
							Save Palette
						</Button>
					</div>
				</AppBar>
				{this.state.formShowing && <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} />}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
