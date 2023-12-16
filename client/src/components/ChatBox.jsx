import React from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SingleChat from './SingleChat'
import Reports from './Reports'
import Users from './Users'
import Groups from './Groups'

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, panel } = ChatState()

  const renderPanel = () => {
    if (panel === 'reports') {
      return <Reports />
    } else if (panel === 'users') {
      return <Users />
    } else if (panel === 'groups') {
      return <Groups />
    }
    return <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
  }

  return (
    <Box
      d={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems="center"
      flexDir="column"
      maxH={{ base: '100vh', md: '90vh' }}
      w={{ base: '100%', md: '68%' }}
      borderRadius="lg"
      border="1px rgba(255, 255, 255, 0.085) solid"
    >
      {renderPanel()}
    </Box>
  )
}

export default ChatBox
