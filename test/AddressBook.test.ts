import chai from "chai";
const { expect } = chai

import { ethers, waffle } from "hardhat"
const { deployContract } = waffle

import AddressBookArtifact from "../artifacts/contracts/AddressBook.sol/AddressBook.json";
import { AddressBook } from "../src/types/AddressBook"

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("AddressBook", function() {
    let addressBook: AddressBook;

    let signers: SignerWithAddress[] = []

    let accounts : string[] = []

    beforeEach(async () => {
        signers = await ethers.getSigners();

        for(let i = 0; i < signers.length; i++){
            accounts.push(await signers[i].getAddress())
        }


        addressBook = (
            await deployContract(signers[0], AddressBookArtifact)
        ) as AddressBook;

    })

    it("should add address", async () => {
      
        await addressBook.addAddress(accounts[1], "Bob");

        expect(((await addressBook.getAddressList(accounts[0])).length)).to.be.equal(1)

        expect(await addressBook.getAlias(accounts[0], accounts[1])).to.be.equal("Bob");

    })

    it("should remove address", async () => {

        await addressBook.addAddress(accounts[1], "Bob");

        await addressBook.addAddress(accounts[2], "Paul");

        await addressBook.addAddress(accounts[3], "Antony");

        await addressBook.removeAddress(accounts[2]);

        expect(await addressBook.getAlias(accounts[0], accounts[2])).to.be.equal("");

        console.log(await addressBook.getAddressList(accounts[0]))

    })
})