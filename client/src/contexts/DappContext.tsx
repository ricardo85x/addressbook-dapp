import { ReactNode, useState, createContext, useContext } from "react";

import { ethers } from "ethers"
import { ExternalProvider, Web3Provider } from "@ethersproject/providers/lib"

import AddressBookGanache from "../hardhat-deploy/ganache/AddressBook.json"
import AddressBookRopsten from "../hardhat-deploy/ropsten/AddressBook.json"
import { AddressBook as AddressBookProps } from "../../../src/types/AddressBook"

declare global {
    interface Window {
        ethereum?: ExternalProvider;
    }
}

type DappContextProviderProps = {
    children: ReactNode
}

interface DappContextProps {
    accounts: string[]
    setAccounts: (_accounts: string[]) => void;

    provider: Web3Provider | undefined
    setProvider: (_provider: Web3Provider) => void;

    handleConnect: () => void;

    addressBookContract: AddressBookProps;

    addresses: Address[];

}

interface Address {
    alias: string
    address: string
}

const DappContext = createContext({} as DappContextProps)

export const DappContextProvider = ({ children }: DappContextProviderProps) => {

    const [accounts, setAccounts] = useState<string[]>([])
    const [provider, setProvider] = useState<Web3Provider>()
    const [addressBookContract, setAddressBookContract] = useState<AddressBookProps>()
    const [addresses, setAddresses] = useState<Address[]>([])


    const validNetworks = {
        "1337": "Ganache",
        "3":"Ropsten"
    }

    const handleConnect = async () => {

        if (window.ethereum && window.ethereum.request) {

            try {

                if (!provider) {
                    const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];

                    const _provider = new ethers.providers.Web3Provider(window.ethereum)

                    const blockNumber = await _provider.getBlockNumber()

                    const signer = _provider.getSigner();

                    const network = await _provider.getNetwork()

                    if (!Object.keys(validNetworks).includes(network.chainId.toString())){

                        alert(
                            "Wrong network, change your network to " + 
                            Object.values(validNetworks).join(" or ")
                        )

                        return;

                    }

                    const currentNetwork = validNetworks[network.chainId.toString()]

                    const AddressBookArtifact = currentNetwork == "Ganache" ? AddressBookGanache : AddressBookRopsten
                    
                    const _addressBookContract = new ethers.Contract(AddressBookArtifact.address, AddressBookArtifact.abi, signer) as AddressBookProps


                    !!addressBookContract && addressBookContract.removeAllListeners();
                    listenerAddress(_addressBookContract, _accounts[0], blockNumber);

                    setAccounts(_accounts)
                    setProvider(_provider)
                    setAddressBookContract(_addressBookContract)

                    loadAddress(_addressBookContract, _accounts[0])


                } else {
                    // TODO disconnect change account
                }

            } catch (e) {

            }

        }

    
    }


    const listenerAddress = (_addressBookContract: AddressBookProps, _account: string, fromBlock: number) => {

        const AddEventFromUser = _addressBookContract.filters.addAddressEvent(null, null, _account);

        _addressBookContract.on(AddEventFromUser, (...args: any[]) => {
            const currentBlock = args[args.length - 1].blockNumber as number;

            if (currentBlock > fromBlock) {
                loadAddress(_addressBookContract, _account)
            }
        })

        const RemoveEventFromUser = _addressBookContract.filters.removeAddressEvent(null,_account);

        _addressBookContract.on(RemoveEventFromUser, (...args: any[]) => {
            const currentBlock = args[args.length - 1].blockNumber as number;

            if (currentBlock > fromBlock) {
                loadAddress(_addressBookContract, _account)
            }
        })


    }

    const emptyAddress = (_address: string, length: number) => {
        if (_address.length === length) {
            const empty = "0x" + "0".repeat(length - 2)
            if (_address.toLowerCase() === empty) {
                return true
            }
        }
        return false;
    }

    const loadAddress = async (_addressBookContract: AddressBookProps, _account: string ) => {

        const list = await _addressBookContract.getAddressList(_account)

        let _addresses: Address[] = []

        if (list.length) {

            for (let i = 0; i < list.length; i++) {
                const _addr = list[i];

                if (!emptyAddress(_addr, _account.length)) {
                    const _alias = await _addressBookContract.getAlias(_account, _addr);
                    _addresses.push({
                        alias: _alias,
                        address: _addr
                    })
                }

            }

        }
        setAddresses(_addresses)
    }

    const value = {
        accounts, setAccounts,
        provider, setProvider,
        handleConnect,
        addressBookContract,
        addresses
    } as DappContextProps

    return (
        <DappContext.Provider value={value}>
            {children}
        </DappContext.Provider>
    )
}

export const useDappContext = () => useContext(DappContext)
