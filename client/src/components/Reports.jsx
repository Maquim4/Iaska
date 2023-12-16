import {
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
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ChatState } from '../context/ChatProvider'

const Reports = () => {
  const [reports, setReports] = useState([])
  const { user } = ChatState()
  useEffect(() => {
    fetchAllReports()
  }, [])

  const fetchAllReports = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get(
        `http://localhost:5000/api/report`,
        config
      )
      console.log(data)
      setReports(data)
    } catch (err) {
      toast.error(err)
      return
    }
  }

  const resolveReport = async (reportId) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
      await axios.delete(`http://localhost:5000/api/report/${reportId}`, config)
      toast.success(`Report successfully resolved`)
    } catch (err) {
      toast.error(err)
    }
  }

  const handleRemoveReport = async (id) => {
    await resolveReport(id)
    setReports(reports.filter((report) => report._id !== id))
  }

  const deleteMessage = async (messageId) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
      await axios.delete(
        `http://localhost:5000/api/message/${messageId}`,
        config
      )
      toast.success(`Message deleted`)
    } catch (err) {
      toast.error(err)
    }
  }

  const handleDeleteMessage = async (report) => {
    await deleteMessage(report.messageId._id)
    await resolveReport(report._id)
    setReports(reports.filter((r) => r._id !== report._id))
  }

  const deleteChat = async (chatId) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
      await axios.delete(`http://localhost:5000/api/chats/${chatId}`, config)
      toast.success(`Chat deleted`)
    } catch (err) {
      toast.error(err)
    }
  }

  const handleDeleteChat = async (report) => {
    await deleteChat(report.messageId.chatId._id)
    await resolveReport(report._id)
    setReports(reports.filter((r) => r._id !== report._id))
  }

  return (
    <Box
      overflowY="auto"
      maxHeight="600px"
      maxWidth="1000px"
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
              <Th>Report type</Th>
              <Th>Content</Th>
              <Th>Author</Th>
              <Th>Chat</Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {reports.map((report, i) => (
              <Tr key={i}>
                <Td>{report.type}</Td>
                <Td>
                  <Text as="cite">{report.messageId.content}</Text>
                </Td>
                <Td>{report.messageId.sender.name}</Td>
                <Td>{report.messageId.chatId.chatName}</Td>
                <Td>
                  <Button
                    size="xs"
                    bg={'black'}
                    variant="transparent" color="#fff"
                    onClick={() => handleDeleteMessage(report)}
                  >
                    Remove message
                  </Button>
                </Td>
                <Td>
                  <Button
                    size="xs"
                    bg={'black'}
                    variant="transparent" color="#fff"
                    onClick={() => handleDeleteChat(report)}
                  >
                    Delete chat
                  </Button>
                </Td>
                <Td>
                  <Button
                    size="xs"
                    color={'black'}
                    onClick={() => handleRemoveReport(report._id)}
                  >
                    Resolve
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Reports
