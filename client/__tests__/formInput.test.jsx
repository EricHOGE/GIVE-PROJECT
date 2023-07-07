import { test, expect } from "vitest";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen } from "@testing-library/react";
import FormInput from "../src/components/FormInput";

test("Test du composant FormInput", () => {
	// Mock des valeurs nécessaires pour le test
	const mockType = "text";
	const mockLabel = "Nom";
	const mockName = "nom";
	const mockValue = "";
	const mockShrinkLabel = true;

	// Fonction de test
	render(
		<FormInput
			type={mockType}
			label={mockLabel}
			name={mockName}
			onChange={() => {}}
			value={mockValue}
			inputRef={null}
			shrinkLabel={mockShrinkLabel}
		/>
	);

	// Assertions
	const inputElement = screen.getByLabelText(mockLabel);
	expect(inputElement).toBeInTheDocument();
	expect(inputElement).toHaveAttribute("type", mockType);
	expect(inputElement).toHaveAttribute("name", mockName);
	expect(inputElement).toHaveValue(mockValue);
});
