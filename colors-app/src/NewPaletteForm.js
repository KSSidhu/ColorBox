import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import { Button } from '@material-ui/core';
import { arrayMove } from 'react-sortable-hoc';
import clsx from 'clsx';

const drawerWidth = 400;
const appBarHeight = 64;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		display: 'flex',
		alignItems: 'center'
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	content: {
		flexGrow: 1,
		height: `calc(100vh - ${appBarHeight}px)`,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	},
	container: {
		width: '90%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%'
	},
	buttons: {
		width: '100%'
	},
	button: {
		width: '50%'
	}
});

class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20
	};
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			colors: this.props.palettes[0].colors
		};
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	addNewColor = (newColor) => {
		this.setState({ colors: [ ...this.state.colors, newColor ], newColorName: '' });
	};

	addRandomColor = () => {
		const allColors = this.props.palettes.map((p) => p.colors).flat();
		let rand = Math.floor(Math.random() * allColors.length);
		const randomColor = allColors[rand];
		this.setState({ colors: [ ...this.state.colors, randomColor ] });
	};

	handleSubmit = (newPalette) => {
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
		newPalette.colors = this.state.colors;
		this.props.savePalette(newPalette);
		this.props.history.push('/');
	};

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	removeColor = (colorName) => {
		this.setState({
			colors: this.state.colors.filter((color) => color.name !== colorName)
		});
	};

	clearPalette = () => {
		this.setState({ colors: [] });
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex)
		}));
	};

	render() {
		const { classes, maxColors, palettes } = this.props;
		const { open, colors } = this.state;
		const paletteIsFull = colors.length >= maxColors;

		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={open}
					palettes={palettes}
					handleSubmit={this.handleSubmit}
					handleDrawerOpen={this.handleDrawerOpen}
				/>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<div className={classes.container}>
						<Typography variant="h4" gutterBottom>
							Design Your Palette
						</Typography>
						<div className={classes.buttons}>
							<Button
								variant="contained"
								color="secondary"
								onClick={this.clearPalette}
								className={classes.button}
							>
								Clear Palette
							</Button>
							<Button
								variant="contained"
								color="primary"
								disabled={paletteIsFull}
								onClick={this.addRandomColor}
								className={classes.button}
							>
								Random Color
							</Button>
						</div>
						<ColorPickerForm
							paletteIsFull={paletteIsFull}
							addColor={this.addNewColor}
							colors={this.state.colors}
						/>
					</div>
				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={this.state.colors}
						removeColor={this.removeColor}
						axis="xy"
						onSortEnd={this.onSortEnd}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
