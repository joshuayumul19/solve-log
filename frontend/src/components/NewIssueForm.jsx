import {
	Input,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
} from "@chakra-ui/react";

const NewIssueForm = ({ newIssue, handleInputChange }) => {
	const renderFormField = (name, label, colSpan = 1, key) => (
		<GridItem colSpan={colSpan} key={key}>
			<FormControl variant="floating" id={name} isRequired>
				<Input
					placeholder=""
					name={name}
					value={newIssue[name]}
					onChange={handleInputChange}
				/>
				<FormLabel>{label}</FormLabel>
				<FormErrorMessage>{`${label} is required`}</FormErrorMessage>
			</FormControl>
		</GridItem>
	);

	const fieldConfigs = [
		{ name: "ticket_number", label: "Ticket Number", colSpan: 1 },
		{ name: "status", label: "Status", colSpan: 1 },
		{ name: "issue", label: "Issue", colSpan: 2 },
		{ name: "solution", label: "Solution", colSpan: 2 },
		{ name: "reporter", label: "Reporter", colSpan: 2 },
	];

	return (
		<Grid templateColumns="repeat(2, 1fr)" gap={10}>
			{fieldConfigs.map(({ name, label, colSpan }) =>
				renderFormField(name, label, colSpan, name)
			)}
		</Grid>
	);
};

export default NewIssueForm;
