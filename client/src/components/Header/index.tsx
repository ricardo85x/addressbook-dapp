import { Box, Flex, Heading, Button, Icon } from "@chakra-ui/react"
import { useDappContext } from "../../contexts/DappContext"

import { FaLeaf } from "react-icons/fa"


export const Header = () => {


    const { accounts, handleConnect} = useDappContext()



    return (

        <Box

            maxW={1050}
            w="100%"

            backgroundColor="teal.600"
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
                <Flex  justify="center" align="center" gridGap={2} > <Heading  >Address Book</Heading> <Icon color="green.400" w={30} h={30} aria-label="Leaf " as={FaLeaf}  /></Flex>
                <Button onClick={handleConnect} colorScheme="none" variant="outline" _hover={{
                    backgroundColor: "teal.500"
                }}> 
                    { accounts.length ? `0x...${accounts[0].substr(-4)}` : "Connect"}
                </Button>

            </Flex>

        </Box>

    )

}