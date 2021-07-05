import { Box, Flex, Heading, Button } from "@chakra-ui/react"
import { useDappContext } from "../../contexts/DappContext"

export const Header = () => {


    const { accounts, provider, handleConnect} = useDappContext()



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
                <Heading  >Address Book</Heading>
                <Button onClick={handleConnect} colorScheme="none" _hover={{
                    backgroundColor: "orange.500"
                }}> 
                    { accounts.length ? `0x...${accounts[0].substr(-4)}` : "Connect"}
                </Button>

            </Flex>

        </Box>

    )

}