import {
	Button,
	Container,
	Flex,
	HStack,
	Text,
	useColorMode,
	useColorModeValue,
	Box,
} from "@chakra-ui/react";
import { CiDark, CiLight, CiSquarePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box
			bg={useColorModeValue("brand.background.dark")}
			boxShadow="2xl"
			py={2}
		>
			<Container maxW={"1440px"}>
				<Flex
					align={"center"}
					justifyContent={"space-between"}
					flexDir={{
						base: "column",
						sm: "row",
					}}
				>
					<Link to="/">
						<img
							width="100"
							height="auto"
							src="/SolveLog-logo.png"
							alt="SolveLog Logo"
							loading="lazy"
						/>
					</Link>

					<HStack spacing={2} alignItems={"center"}>
						{/* <Link to={"/create"}>
							<Button variant="ghost">
								<CiSquarePlus size={30} />
							</Button>
						</Link> */}
						<Button variant="ghost" onClick={toggleColorMode}>
							{colorMode === "light" ? (
								<CiDark size={30} />
							) : (
								<CiLight size={30} />
							)}
						</Button>
					</HStack>
				</Flex>
			</Container>
		</Box>
	);
};
export default Navbar;
