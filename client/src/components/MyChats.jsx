import React, { useState, useEffect } from "react";
import { ChatState } from "../context/ChatProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { Box, Text, Button, Stack, Avatar, Divider } from "@chakra-ui/react";
import { IoMdAdd, IoMdPeople } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import Loader from "./Loader";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:5000/api/chats`, config);
      setChats(data);
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("deLinkUser")));
    fetchChats();
  }, [fetchAgain]);

  if (!loggedUser) {
    return <Loader />;
  }
  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p="3"
      h="90vh"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      bg={"#423b30"}
    >
      <Box
        pb="3"
        px="3"
        fontSize={{ base: "1.25rem", md: "1.4rem" }}
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text color={"#f9d094"}>My Chats</Text>
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "1rem", md: "0.9rem", lg: "1rem" }}
     
            rightIcon={
              <div style={{ color: "#fff" }}>
                <IoMdAdd />
              </div>
            }
            zIndex="0"
            colorScheme={"blackAlpha"}
      
          >
            Create Group
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#2e2a24"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat, index) => (
              <div key={index}>
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#201d19" : "e8e8e8"}
                  color={selectedChat === chat ? "#fff" : "#f9d094"}
                  px="3"
                  py="2"
                  borderRadius="lg"
                  transition="200ms ease-in-out"
                  d="flex"
                >
                  <Avatar
                    size="lg"
                    cursor="pointer"
                    bg={chat.isGroupChat ? "#201d19" : null}
                    icon={
                      chat.isGroupChat && (
                        <HiUserGroup fontSize="2.5rem" color="#fff" />
                      )
                    }
                    src={
                      !chat.isGroupChat &&
                      getSender(loggedUser.user, chat.users)?.image
                    }
                    name={
                      !chat.isGroupChat &&
                      getSender(loggedUser.user, chat.users).name
                    }
                    mr="4"
                  />
                  <Text fontSize="1.25rem">
                    {!chat.isGroupChat
                      ? getSender(loggedUser?.user, chat?.users)?.name
                      : chat.chatName}
                  </Text>
                </Box>
              </div>
            ))}
          </Stack>
        ) : (
          <Loader />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
