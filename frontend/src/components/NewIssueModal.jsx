import { useState } from "react";
import {
	Button,
	Container,
	Flex,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Box,
	useToast,
} from "@chakra-ui/react";
import { CiSquarePlus } from "react-icons/ci";
import NewIssueForm from "./NewIssueForm";
import { toTitleCase } from "../../helpers/helper";
import { useIssueStore } from "../store/issue";
import { useEffect } from "react";

const NewIssueModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const [newIssue, setNewIssue] = useState({
		ticket_number: "",
		status: "",
		issue: "",
		solution: "",
		reporter: "",
	});

	const { createIssue, issues } = useIssueStore();

	const validateInputs = () => {
		if (isNaN(newIssue.ticket_number)) {
			return "Ticket Number should be a number";
		}
		const duplicateTicket = issues.find((issue) => {
			return issue.ticket_number == newIssue.ticket_number;
		});

		if (duplicateTicket)
			return `Ticket Number ${duplicateTicket.ticket_number} already exist`;

		const emptyFields = Object.entries(newIssue)
			.filter(([_, value]) => value.trim() === "")
			.map(([key]) => toTitleCase(key));

		if (emptyFields.length > 0) {
			return `Please fill in all fields: ${emptyFields.join(", ")}`;
		}

		return null;
	};

	const showToast = (title, description, status) => {
		toast({
			title,
			description,
			status,
			duration: 3000,
			isClosable: true,
			position: "top",
			variant: "top-accent",
		});
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewIssue((prev) => ({ ...prev, [name]: value }));
	};
	const onSubmit = async () => {
		// Validate input fields
		const validationError = validateInputs();
		if (validationError) {
			showToast("Validation Error", validationError, "error");
			return;
		}

		// Submit the issue
		const { success, message } = await createIssue(newIssue);
		showToast(`Ticket # ${newIssue.ticket_number} Submitted`, message, "success");

		//Resetting the state
		setNewIssue({
			ticket_number: "",
			status: "",
			issue: "",
			solution: "",
			reporter: "",
		});
		onClose();
	};

	return (
		<Container maxW={"1440px"} my={10}>
			<Flex justifyContent="flex-end">
				<Button
					onClick={onOpen}
					leftIcon={<CiSquarePlus size={25} />}
					variant="solid"
				>
					Add new entry
				</Button>

				<Modal
					closeOnOverlayClick={false}
					isOpen={isOpen}
					onClose={onClose}
					size={"2xl"}
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>New Issue Form</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<Box my={4}>
								<NewIssueForm
									newIssue={newIssue}
									handleInputChange={handleInputChange}
								/>
							</Box>
						</ModalBody>

						<ModalFooter>
							<Button
								onClick={onSubmit}
								w={"15%"}
								variant="solid"
								mr={3}
							>
								Submit
							</Button>
							<Button
								w={"15%"}
								variant="outline"
								onClick={onClose}
							>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Flex>
		</Container>
	);
};

export default NewIssueModal;
