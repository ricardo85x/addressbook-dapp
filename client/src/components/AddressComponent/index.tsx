import { Input, Button, Heading, Stack, Flex, Grid, Box, Text, IconButton } from "@chakra-ui/react"
import faker from "faker";

import { FiEdit, FiTrash2 } from "react-icons/fi";


interface Address {
    alias: string
    address: string
}

export const AddressComponent = () => {

    const addresses: Address[] = [...Array(5)].map((_, i) => {
        return {
            alias: faker.name.findName(),
            address: faker.finance.ethereumAddress()
        }
    })

    return (
        <Stack
            w="100%"
            maxW={900}
            direction="column"
            spacing="5"
            align="start"
            py="2"
            pr="10"

            m="5"
        >

            <Heading>My Addresses</Heading>

            <Stack spacing="2" direction={["column", "row"]} >
                <Input placeholder="Alias" type="text" />
                <Input placeholder="Address" type="text" />
                <Button px="8" colorScheme="brand">Add</Button>
            </Stack>



            {addresses.map(address => (

                <Flex align="center" justify="space-between" direction="row" key={address.address} >
                    
                    <Flex mr="2" w="70px" align="flex-start" justify="center" >
                        <IconButton size="sm" p="0" aria-label="Edit" colorScheme="none" fontSize="25px"   color="orange.600" icon={<FiEdit />} />
                        <IconButton size="sm" p="0" aria-label="Delete" colorScheme="none" fontSize="25px" color="orange.600" icon={<FiTrash2 />} />
                    </Flex>
                    <Box align="start" justify="center" >
                        <Text fontWeight="medium">{address.alias}</Text>
                        <Text fontSize="14">{address.address}</Text>
                    </Box>

                </Flex>


            ))}



        </Stack>
    )
}