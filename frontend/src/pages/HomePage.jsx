import { Container, Flex } from "@chakra-ui/react";
import NewIssueModal from "../components/NewIssueModal";
import IssuesTable from "../components/IssuesTable";

const HomePage = () => {
	return (
		<Container maxW={"1440px"}>
			<Flex justifyContent="flex-end" mb={4}>
				<NewIssueModal />
			</Flex>

			<IssuesTable />
		</Container>
	);
};
export default HomePage;
