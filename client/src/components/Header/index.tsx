import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react"

export const Header = () => {

    return (

        <Box 

        maxW={1050}
        w="100%"

        backgroundColor="orange.600"
        borderTopRadius="10"

        mt="2"
        p="4"
        align="center" justify="center">

<Flex
            align="center"
            justify="space-between"
            maxW={900}
            w="100%"
            color="white"

        >
            <Heading >Address Book</Heading>
            <Button colorScheme="none" _hover={{
                backgroundColor: "orange.500"
            }}>Connect</Button>

        </Flex>

        </Box>
        
    )

}