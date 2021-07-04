import { Flex, Box } from "@chakra-ui/react"
import { AddressComponent } from "../components/AddressComponent"
import { Header } from "../components/Header"

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
        borderColor="orange.600"
        borderBottomRadius="10px"
        borderTop="none"
        align="center"
      >
        <AddressComponent />
      </Box>
    </Flex>
  )
}
