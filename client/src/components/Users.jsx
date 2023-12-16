import {
  Avatar,
  Box,
  TableContainer,
  Td,
  Tr,
  Th,
  Thead,
  Table,
  Tbody,
  Text,
  Button,
} from '@chakra-ui/react'
import { ChatState } from '../context/ChatProvider'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Users = () => {
  const { user } = ChatState()
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    fetchAllUsers()
  }, [])

  const fetchAllUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get(
        `http://localhost:5000/api/users`,
        config
      )
      console.log(data)
      setAllUsers(data.users)
    } catch (err) {
      toast.error(err)
      return
    }
  }

  const handleMod = async (person) => {
    try {
      if (!user.user.isAdmin) {
        toast.info("Only Admins can add/remove moderators");
        return;
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(
        "http://localhost:5000/api/users/mod",
        { userId: person._id, state: person.isMod },
        config
      );
      toast.info(`User ${person.name} ${person.isMod? "unumpowered" : "empowered"} to moderator`);
      fetchAllUsers()
    } catch (err) {
      toast.error(err);
      return;
    }
  };

  return (
    <Box
      overflowY="auto"
      maxHeight="600px"
      width="1000px"
      sx={{
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-track': { background: '#201D19' },
        '&::-webkit-scrollbar-thumb': { background: '#fff' },
      }}
    >
      <TableContainer color={'#f9d094'}>
        <Table variant="unstyled">
          <Thead color={'#fff'}>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {allUsers.length > 0 ? (
              allUsers.map((user, i) => (
                <Tr key={i}>
                  <Td>
                    <Avatar
                      size="lg"
                      cursor="pointer"
                      name={user.name}
                      src={user.image}
                    />
                  </Td>
                  <Td>{user.name}</Td>
                  <Td>
                    <Text as="samp">{user.email}</Text>
                  </Td>
                  <Td>
                    <Button size="xs" bg={'black'} variant="transparent" color="#fff" onClick={() => handleMod(user)} >
                      { user.isMod? "Unmod" : "Set mod"}
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="4">No users available</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Users
