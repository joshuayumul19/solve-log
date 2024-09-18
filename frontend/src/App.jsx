import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

function App() {
	return (
		<Box minH={"100vh"}>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</Box>
	);
}

export default App;
