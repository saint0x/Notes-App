import React, { useState } from "react";
import { ChakraProvider, Box, Text, Button, VStack, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea, Grid, theme, extendTheme, IconButton, useColorMode, useColorModeValue, Heading, Image, Input, Center } from "@chakra-ui/react";
import { FaPlus, FaMoon, FaSun, FaSave } from "react-icons/fa";

const customTheme = extendTheme({
  // Ensure the entire site is in dark mode by default
  config: {
    initialColorMode: "dark", // Changed from "light" to "dark"
    useSystemColorMode: false,
  },
  colors: {
    teal: theme.colors.teal,
  },
});

const Note = ({ note, onSave }) => {
  const [editValue, setEditValue] = useState(note.text);
  const [isEditing, setIsEditing] = useState(false);
  // Display image and audio if available and not editing
  const attachmentContent =
    note.image || note.audio ? (
      <VStack>
        {note.image && <Image maxH="200px" src={URL.createObjectURL(note.image)} alt="Note attachment" />}
        {note.audio && <audio controls src={URL.createObjectURL(note.audio)} />}
      </VStack>
    ) : null;

  const handleSave = () => {
    onSave(note.id, editValue);
    setIsEditing(false);
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg={useColorModeValue("white", "gray.700")}>
      {isEditing ? (
        <Textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} />
      ) : (
        <>
          <Text mb={4}>{note.text}</Text>
          {attachmentContent}
        </>
      )}
      <Text fontSize="sm">Last Edited: {note.lastEdited.toLocaleString()}</Text>
      {isEditing ? (
        <Button leftIcon={<FaSave />} mt={3} size="sm" onClick={handleSave}>
          Save
        </Button>
      ) : (
        <Button mt={3} size="sm" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      )}
    </Box>
  );
};

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [attachments, setAttachments] = useState({ image: null, audio: null });
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const handleNewNote = () => {
    const newNote = {
      id: notes.length + 1,
      text: newNoteText,
      lastEdited: new Date(),
      image: attachments.image,
      audio: attachments.audio,
    };
    setNotes([newNote, ...notes]);
    setNewNoteText("");
    onClose();
  };

  const handleSaveEdit = (id, text) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, text, lastEdited: new Date() } : note)));
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <HStack justifyContent="space-between" width="100%">
              <Heading as="h1">Notes</Heading>
              <IconButton aria-label="Toggle dark mode" icon={<SwitchIcon />} onClick={toggleColorMode} />
            </HStack>
            <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onOpen}>
              New Note
            </Button>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {notes.map((note) => (
                <Note key={note.id} note={note} onSave={handleSaveEdit} />
              ))}
            </Grid>
          </VStack>
        </Grid>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Textarea placeholder="Enter your note here..." value={newNoteText} onChange={(e) => setNewNoteText(e.target.value)} />
              <HStack spacing={4} justifyContent="center">
                <Input type="file" accept="image/*" placeholder="image" size="lg" variant="filled" borderRadius="full" p={2} textAlign="center" cursor="pointer" onChange={(e) => setAttachments((prev) => ({ ...prev, image: e.target.files[0] }))} />
                <Input type="file" accept="audio/*" placeholder="voice" size="lg" variant="filled" borderRadius="full" p={2} textAlign="center" cursor="pointer" onChange={(e) => setAttachments((prev) => ({ ...prev, audio: e.target.files[0] }))} />
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleNewNote}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default Index;
