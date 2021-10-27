import { Flex, Box } from "@chakra-ui/react"
import { AddressComponent } from "../components/AddressComponent"
import { Header } from "../components/Header"

// polygon
// 0x80cC6570a741498B19b71FeB2A6cE5079AFd7dd3


export default function Home() {

  return (
    <Flex 
      direction="column"
      p={5}
      w="100%"
      maxW={1400}
      align="center"
      justify="flex-start"
    >

      <Header />

      <Box
        w="100%"
        maxW={1050}
        minH={400}

        border="2px" 
        borderColor="teal.600"
        borderBottomRadius="10px"
        borderTop="none"
        align="center"
      >
        <AddressComponent />
      </Box>
    </Flex>
  )
}
