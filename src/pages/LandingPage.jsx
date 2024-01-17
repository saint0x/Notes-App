import React from "react";
import { Box, Heading, Button, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  let navigate = useNavigate();
  return (
    <Center minHeight="100vh" flexDirection="column">
      <Heading as="h1">A Very Boring Notes App</Heading>
      <Heading as="h2" size="lg" marginTop="4">
        by Saint
      </Heading>
      <Button marginTop="8" colorScheme="teal" onClick={() => navigate("/notes")}>
        Enter
      </Button>
    </Center>
  );
};

export default LandingPage;
