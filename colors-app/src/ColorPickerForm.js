import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import { ChromePicker } from 'react-color';

class ColorPickerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentColor: 'teal',
			newColorName: ''
		};
	}

	componentDidMount = () => {
		ValidatorForm.addValidationRule('isNameUnique', (value) =>
			this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);

		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.props.colors.every(({ color }) => color !== this.state.currentColor)
		);
	};

	updateCurrentColor = (newColor) => {
		this.setState({ currentColor: newColor.hex });
	};

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	handleSubmit = () => {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName
		};
		this.props.addColor(newColor);
		this.setState({ newColorName: '' });
	};

	render() {
		const { paletteIsFull } = this.props;
		const { currentColor, newColorName } = this.state;
		return (
			<div>
				<ChromePicker color={currentColor} onChangeComplete={this.updateCurrentColor} />
				<ValidatorForm onSubmit={this.handleSubmit}>
					<TextValidator
						value={newColorName}
						name="newColorName"
						onChange={this.handleChange}
						validators={[ 'required', 'isNameUnique', 'isColorUnique' ]}
						errorMessages={[
							'Enter a Color Name',
							'Color Name Must Be Unique',
							'This Color Already Exists'
						]}
					/>
					<Button
						variant="contained"
						color="primary"
						style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
						type="submit"
						disabled={paletteIsFull}
					>
						{paletteIsFull ? 'Palette is Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default ColorPickerForm;
