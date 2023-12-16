import {
  Box,
  Text,
  Heading,
  Divider,
  FormControl,
  Input,
} from '@chakra-ui/react'

const Groups = () => {
  return (
    <Box
      d="flex"
      alignItems="center"
      justifyContent="center"
      h="100%"
      flexDir="column"
      color="rgba(255, 255, 255, 0.685)"
    >
      <Heading size="4xl" mb="4">
        Groups
      </Heading>
      <Divider />
    </Box>
  )
}

export default Groups
