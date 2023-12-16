import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../config/ChatLogics'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ChatState } from '../context/ChatProvider'
import { Tooltip, Avatar, Box, Button } from '@chakra-ui/react'
import { ContextMenu } from 'chakra-ui-contextmenu'
import { MenuList, MenuItem } from '@chakra-ui/menu'

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState()

  const saveReport = async (id) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
      await axios.post(
        'http://localhost:5000/api/report',
        {
          messageId: id,
        },
        config
      )
      toast.info(`Report fixed`);
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, index) => (
          <div style={{ display: 'flex' }} key={message._id}>
            {(isSameSender(messages, message, index, user.user._id) ||
              isLastMessage(messages, index, user.user._id)) && (
              <Tooltip
                label={message.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="20px"
                  mr="1"
                  size="xs"
                  cursor="pointer"
                  name={message.sender.name}
                  src={message.sender.image}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor:
                  message.sender._id === user.user._id ? '#8EAF0C' : '#212121',
                borderRadius:
                  message.sender._id !== user.user._id
                    ? '0.8rem 0.8rem 0.8rem 0'
                    : '0.8rem 0.8rem 0 0.8rem',
                padding: '0.5rem 1rem',
                maxWidth: '66%',
                color: '#fff',
                marginLeft: isSameSenderMargin(
                  messages,
                  message,
                  index,
                  user.user._id
                ),
                marginTop: isSameUser(messages, message, index, user.user._id)
                  ? 3
                  : 10,
              }}
            >
              <ContextMenu
                renderMenu={() => (
                  <MenuList>
                    <MenuItem onClick={() => saveReport(message._id)}>Report</MenuItem>
                  </MenuList>
                )}
              >
                {(ref) => <div ref={ref}>{message.content}</div>}
              </ContextMenu>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
