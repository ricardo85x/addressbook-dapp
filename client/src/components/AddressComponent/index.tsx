import { Input, Button, Heading, Stack, Flex, Grid, Box, Text, IconButton } from "@chakra-ui/react"
import { ethers } from "ethers";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDappContext } from "../../contexts/DappContext";

import { toast } from 'react-toastify';

const getWeb3RuntimeError = (err, _defaultMsg: string = "Error") => {

    const { data } = err;

    console.log(err)

    if (data) {
        const { data: { message, data: { name } } } = err;    
        if (message && name == "RuntimeError") {
            const errMessage = (message as string).replace(/.*:\s+revert /, "")
            return errMessage
        } 
    }

    return _defaultMsg 
}

export const AddressComponent = () => {

    const { addressBookContract, addresses } = useDappContext()

    const alias = useRef<HTMLInputElement>(null);
    const address = useRef<HTMLInputElement>(null);

    const handleAdd = async () => {

        if (addressBookContract && alias && address) {
            if (ethers.utils.isAddress(address.current.value)) {

                if (alias.current.value){

                    addressBookContract.addAddress(address.current.value, alias.current.value)
                    .then(() => toast.info("New contact added, waiting for confirmation"))
                    .catch(err => {
                        toast.error(getWeb3RuntimeError(err, "Error on creating new contact"))
                    })
                } else {
                    toast.error("Alias cannot be blank")

                }

            } else {
                toast.error("Invalid address")
            }

        }
    }

    const handleDelete = async (_address: string) => {

        if (addressBookContract) {
            addressBookContract.removeAddress(_address)
                .then(() => toast.info("Address removed, waiting for confirmation"))
                .catch(err => toast.error(getWeb3RuntimeError(err, "Error on creating new contact")))
        }
    }


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
                <Input ref={alias} placeholder="Alias" type="text" />
                <Input ref={address} placeholder="Address" type="text" />
                {addressBookContract && <Button onClick={handleAdd} px="8" colorScheme="teal">Add</Button>}
            </Stack>



            {addresses.map((address, i) => (

                <Flex backgroundColor={i % 2 === 0 ? "inherit" : "teal.50"} filter={i % 2 === 0 ? "inherit" : "brightness(95%)" } px={4} py={1} borderRadius={5} align="center" justify="space-between" direction="row" key={address.address} >

                    <Flex mr="2" w="35px" align="flex-start" justify="center" >
                        {/* <IconButton size="sm" p="0" aria-label="Edit" colorScheme="none" fontSize="25px"   color="orange.600" icon={<FiEdit />} /> */}
                        <IconButton onClick={() => handleDelete(address.address)} size="sm" p="0" aria-label="Delete" colorScheme="none" fontSize="25px" color="teal.600" icon={<FiTrash2 />} />
                    </Flex>
                    <Box align="start" justify="center" >
                        <Text fontWeight="medium">{address.alias}</Text>
                        <Text wordBreak="break-all" fontSize="14">{address.address}</Text>
                    </Box>

                </Flex>


            ))}

        </Stack>
    )
}