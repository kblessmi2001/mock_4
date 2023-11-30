// Forum.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Box,
  Text,
  Avatar,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import {
  ADD_QUESTION,
  DELETE_QUESTION,
  EDIT_QUESTION,
  GET_QUESTIONS,
} from "../Redux/actionTypes";

const Forum = () => {
  const [askQuestionModalOpen, setAskQuestionModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    username: "",
    title: "",
    description: "",
    language: "JavaScript",
    postedDate: new Date().toLocaleDateString(),
    upvotes: 0,
    answers: [],
  });

  const [filterLanguage, setFilterLanguage] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questions = useSelector((store) => {
    console.log(store);
    return store.questionsReducer.questions;
  });
  console.log(questions);

  useEffect(() => {
    // Fetch questions data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mockserver-fidj.onrender.com/forum"
        );
        console.log("response:", response.data);
        dispatch({ type: GET_QUESTIONS, payload: response.data });
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilterLanguage(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleAskQuestion = () => {
    // Set username from signed-in user data
    setNewQuestion((prev) => ({ ...prev, username: "SignedInUser" }));
    setAskQuestionModalOpen(true);
  };

//   const handlePostQuestion=()=>{
//     console.log(newQuestion)
//   }

  const handlePostQuestion = async () => {
    try {
      // Post question to the server
      const response = await axios.post(
        "https://mockserver-fidj.onrender.com/forum",
        newQuestion
      );
      dispatch({ type: ADD_QUESTION, payload: response.data });
      setAskQuestionModalOpen(false);
    } catch (error) {
      console.error("Error posting question:", error);
    }
  };

  const handleCloseModal = () => {
    setAskQuestionModalOpen(false);
  };

  const handleEditQuestion = (id, title) => {
    const newTitle = prompt("Edit Question Title:", title);
    if (newTitle) {
      // Edit question in the Redux state and update on the server
      dispatch({ type: EDIT_QUESTION, payload: { id, title: newTitle } });
      axios.patch(`https://mockserver-fidj.onrender.com/forum/${id}`, {
        title: newTitle,
      });
    }
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      // Delete question from the Redux state and server
      dispatch({ type: DELETE_QUESTION, payload: id });
      axios.delete(`https://mockserver-fidj.onrender.com/forum/${id}`);
    }
  };

  const handleViewQuestion = (id) => {
    // Redirect to the Answer Page with the question ID
    navigate(`/answer/${id}`);
  };

  const filteredAndSortedQuestions = questions
    .filter(
      (question) =>
        filterLanguage === "All" ||
        question.question.language === filterLanguage
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.question.upvotes - b.question.upvotes
        : b.question.upvotes - a.question.upvotes
    );

  console.log(filteredAndSortedQuestions, "dsd");

  return (
    <VStack spacing={4} align="stretch">
      <Button onClick={handleAskQuestion}>Ask Question</Button>

      {/* Add filter and sort controls */}
      <FormControl id="filter">
        <FormLabel>Filter by Language</FormLabel>
        <Select value={filterLanguage} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
        </Select>
      </FormControl>

      <FormControl id="sort">
        <FormLabel>Sort by Upvotes</FormLabel>
        <Select value={sortOrder} onChange={handleSortChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </Select>
      </FormControl>

      {/* Add question cards */}
      {filteredAndSortedQuestions.map((el) => {
        // console.log('el:', el)
        return (
          <Box
            display="flex"
            justifyContent={"space-between"}
            key={el.question.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            onClick={() => handleViewQuestion(el.question.id)}
          >
            <Box>
              <Avatar
                size="2xl"
                name="Segun Adebayo"
                src={el.question.userAvatar}
              />{" "}
              <Text fontSize="xl">{el.question.username}</Text>
            </Box>
            <VStack>
              <Text fontSize="xl">{el.question.questionTitle}</Text>
              <Flex>
                <Text>Language: {el.question.language}</Text>
                <Text>No. of Upvotes: {el.question.upvotes}</Text>
                <Text>No. of Answers: {el.answers.length}</Text>
                <Text>Posted Date: {el.question.postedDate}</Text>
              </Flex>
            </VStack>

            <Box>
              {/* Show Edit and Delete buttons only for the signed-in user's questions */}
              {el.question.username === "SignedInUser" && (
                <Button
                  onClick={() =>
                    handleEditQuestion(el.question.id, el.question.title)
                  }
                >
                  Edit
                </Button>
              )}
              {el.question.username === "SignedInUser" && (
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteQuestion(el.question.id)}
                >
                  Delete
                </Button>
              )}
            </Box>
          </Box>
        );
      })}

      <Modal isOpen={askQuestionModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text fontSize="xl">Ask a Question</Text>
              <FormControl>
                <FormLabel>Question Title</FormLabel>
                <Input
                  value={newQuestion.title}
                  onChange={(e) =>
                    setNewQuestion((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Question Description</FormLabel>
                <Textarea
                  value={newQuestion.description}
                  onChange={(e) =>
                    setNewQuestion((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Language</FormLabel>
                <Select
                  value={newQuestion.language}
                  onChange={(e) =>
                    setNewQuestion((prev) => ({
                      ...prev,
                      language: e.target.value,
                    }))
                  }
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                </Select>
              </FormControl>
              <Button onClick={handlePostQuestion}>Post Question</Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Forum;