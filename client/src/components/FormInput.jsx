import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FormInput({
	type,
	label,
	name,
	onChange,
	value,
	inputRef,
	shrinkLabel,
}) {
	return (
		<Box
			component="form"
			sx={{
				"& > :not(style)": { m: 1, width: "25ch" },
				"& .MuiTextField-root": {
					margin: "10px",
					width: "25ch",
				},
				"& .MuiInputLabel-root": {
					color: "white",
				},
				"& .MuiInputLabel-root.Mui-focused": {
					color: "#23bc81",
				},
				"& .MuiInputBase-root": {
					color: "white",
				},
				"& .MuiInput-underline:before": {
					borderBottom: "1px solid white",
				},
				"& .MuiInput-underline:after": {
					borderBottom: "1px solid #23bc81",
				},
				"& .MuiInput-underline:hover:not(.Mui-disabled):before": {
					borderBottom: "2px solid #23bc81",
				},
			}}
			noValidate
			autoComplete="off"
		>
			<TextField
				type={type}
				name={name}
				label={label}
				variant="standard"
				onChange={onChange}
				value={value}
				inputRef={inputRef}
				InputLabelProps={{
					shrink: shrinkLabel || undefined,
				}}
			/>
		</Box>
	);
}
