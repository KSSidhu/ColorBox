import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

class PaletteMetaForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: 'form',
			newPaletteName: ''
		};
	}

	componentDidMount = () => {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
		);
	};

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	showEmojiPicker = () => {
		this.setState({ stage: 'emoji' });
	};

	savePalette = (emoji) => {
		const newPalette = {
			paletteName: this.state.newPaletteName,
			emoji: emoji.native
		};
		this.props.handleSubmit(newPalette);
	};

	render() {
		const { newPaletteName } = this.state;
		const { closeForm, handleSubmit } = this.props;

		return (
			<div>
				<Dialog open={this.state.stage === 'emoji'} onClose={closeForm}>
					<DialogContentText>Choose Palette Emoji</DialogContentText>
					<Picker title="Pick a Palette Emoji" onSelect={this.savePalette} />
				</Dialog>

				<Dialog open={this.state.stage === 'form'} aria-labelledby="form-dialog-title" onClose={closeForm}>
					<DialogTitle id="form-dialog-title">Choose Palette Name</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText>Please enter a unique name for your new palette.</DialogContentText>

							<TextValidator
								label="Palette Name"
								value={newPaletteName}
								name="newPaletteName"
								fullWidth
								margin={'normal'}
								onChange={this.handleChange}
								validators={[ 'required', 'isPaletteNameUnique' ]}
								errorMessages={[ 'Enter Palette Name', 'That Name Exists' ]}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={closeForm} color="primary">
								Cancel
							</Button>
							<Button variant="contained" color="primary" type="submit">
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		);
	}
}

export default PaletteMetaForm;
