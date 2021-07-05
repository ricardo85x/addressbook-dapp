import { ReactNode, useState, createContext, useContext } from "react";

import { ethers } from "ethers"
import { ExternalProvider, Web3Provider } from "@ethersproject/providers/lib"


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
}


const DappContext = createContext({} as DappContextProps)

export const DappContextProvider = ({ children }: DappContextProviderProps) => {

    const [accounts, setAccounts] = useState<string[]>([])
    const [provider, setProvider] = useState<Web3Provider>()



    const handleConnect = async () => {


        if (window.ethereum && window.ethereum.request) {

            try {

                if (!provider) {
                    const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
                    setAccounts(_accounts)

                    const _provider = new ethers.providers.Web3Provider(window.ethereum)
                    setProvider(_provider)
                } 

            } catch (e) {

            }


        }

    }

    const value = {
        accounts, setAccounts,
        provider, setProvider,
        handleConnect
    } as DappContextProps

    return (
        <DappContext.Provider value={value}>
            {children}
        </DappContext.Provider>
    )
}

export const useDappContext = () => useContext(DappContext)
