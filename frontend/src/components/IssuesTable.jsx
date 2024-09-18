import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableContainer,
	Button,
	useColorModeValue,
	Text,
	useToast,
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
} from "@chakra-ui/react";
import { useIssueStore } from "../store/issue";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import UpdateIssueForm from "./UpdateIssueForm";
import { toTitleCase } from "../../helpers/helper";

const IssuesTable = () => {
	const { fetchIssues, deleteIssue, issues, updateIssue } = useIssueStore();
	const iconColor = useColorModeValue("black", "white");
	const toast = useToast();
	const {
		isOpen: isEditModalOpen,
		onOpen: onEditModalOpen,
		onClose: onEditModalClose,
	} = useDisclosure();
	const {
		isOpen: isDeleteModalOpen,
		onOpen: onDeleteModalOpen,
		onClose: onDeleteModalClose,
	} = useDisclosure();
	const [updatedIssue, setUpdatedIssue] = useState(null);
	const [issueToDelete, setIssueToDelete] = useState(null);

	useEffect(() => {
		fetchIssues();
	}, [fetchIssues]);

	const validateInputs = (updatedIssue) => {
		console.log(updatedIssue);
		const emptyFields = Object.entries(updatedIssue)
			.filter(([_, value]) => {
				if (typeof value === "string") {
					return value.trim() === "";
				}
				return value == null || value === "";
			})
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
	const handleDeleteIssue = async (issueID, issue) => {
		const { success, message } = await deleteIssue(issueID);
		showToast(`Ticket #${issue.ticket_number} Deleted`, message, "success");
	};

	const handleEditIssue = async (issue) => {
		setUpdatedIssue(issue);
		onEditModalOpen();
	};

	const handleEditInputChange = (e) => {
		const { name, value } = e.target;
		setUpdatedIssue((prev) => ({ ...prev, [name]: value }));
	};

	const handleUpdateIssue = async (issueID, updatedIssue) => {
		const validationError = validateInputs(updatedIssue);

		if (validationError) {
			showToast("Validation Error", validationError, "error");
			return;
		}

		const { success, message } = await updateIssue(issueID, updatedIssue);
		showToast(`Ticket #${updatedIssue.ticket_number}`, message, "success");
		onEditModalClose();
	};

	const handleDeleteClick = (issue) => {
		setIssueToDelete(issue);
		onDeleteModalOpen();
	};

	const handleConfirmDelete = async () => {
		if (issueToDelete) {
			await handleDeleteIssue(issueToDelete._id, issueToDelete);
			onDeleteModalClose();
			setIssueToDelete(null);
		}
	};

	return (
		<>
			{issues.length > 0 ? (
				<Box>
					<TableContainer>
						<Table variant="simple" size={"sm"}>
							<Thead>
								<Tr>
									{/* Center the header text */}
									<Th textAlign="center">Ticket #</Th>
									<Th textAlign="center">Issue</Th>
									<Th textAlign="center">Status</Th>
									<Th textAlign="center">Solution</Th>
									<Th textAlign="center">Reporter</Th>
									<Th textAlign="center">Date Reported</Th>
									<Th textAlign="center">Action Buttons</Th>
								</Tr>
							</Thead>
							<Tbody>
								{issues.map((issue) => {
									return (
										<Tr key={issue._id}>
											{/* Center the content for each cell */}
											<Td textAlign="center">
												{issue.ticket_number}
											</Td>
											<Td textAlign="center">
												{issue.issue}
											</Td>
											<Td textAlign="center">
												{issue.status}
											</Td>
											<Td textAlign="center">
												{issue.solution}
											</Td>
											<Td textAlign="center">
												{issue.reporter}
											</Td>
											<Td textAlign="center">
												{issue.date}
											</Td>
											<Td textAlign="center">
												<Button
													variant={"ghost"}
													onClick={() =>
														handleEditIssue(issue)
													}
													aria-label="Edit issue"
												>
													<CiEdit
														size={20}
														color={iconColor}
													/>
												</Button>
												<Button
													variant={"ghost"}
													onClick={() =>
														handleDeleteClick(issue)
													}
													aria-label="Delete issue"
												>
													<MdDeleteOutline
														size={20}
														color="red"
													/>
												</Button>
											</Td>
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</TableContainer>
					<Modal
						closeOnOverlayClick={false}
						isOpen={isEditModalOpen}
						onClose={onEditModalClose}
						size={"2xl"}
					>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Update Issue Form</ModalHeader>
							<ModalCloseButton />
							<ModalBody pb={6}>
								<Box my={4}>
									<UpdateIssueForm
										updateIssue={updatedIssue}
										handleInputChange={
											handleEditInputChange
										}
									/>
								</Box>
							</ModalBody>

							<ModalFooter>
								<Button
									w={"15%"}
									variant="solid"
									mr={3}
									onClick={() =>
										handleUpdateIssue(
											updatedIssue._id,
											updatedIssue
										)
									}
								>
									Update
								</Button>
								<Button
									w={"15%"}
									variant="outline"
									onClick={onEditModalClose}
								>
									Cancel
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>

					<Modal
						isOpen={isDeleteModalOpen}
						onClose={onDeleteModalClose}
					>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader color={"red"}>
								Confirm Delete
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								Are you sure you want to delete Ticket #
								{issueToDelete?.ticket_number}?
							</ModalBody>
							<ModalFooter>
								<Button
									colorScheme="red"
									mr={3}
									onClick={handleConfirmDelete}
								>
									Yes
								</Button>
								<Button
									variant="outline"
									onClick={onDeleteModalClose}
								>
									No
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</Box>
			) : (
				<Text
					textAlign={"center"}
					bgGradient="linear(to-l, #38A169, #3182CE)"
					bgClip="text"
					fontSize="6xl"
					fontWeight="extrabold"
				>
					No issues were logged yet
				</Text>
			)}
		</>
	);
};

export default IssuesTable;
