/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Flex, Text, Button, Input, Box } from "@chakra-ui/react";
import roboPunksNFT from "../pages/RoboPunksNFT.json";
import { IAccounts } from "../types/IAccounts";
import { usePicasso } from "../hooks/usePicasso";

const roboPunksNFTAddress = "0xd6B950C750f19B03eB8b2F0Eb8db5857175976a8";

const MainMint: React.FC<IAccounts> = ({ accounts, setAccounts }) => {
  const [mintAmount, setMinAmount] = useState<number>(1);
  const isConnected = Boolean(accounts[0]);
  const theme = usePicasso();

  const handleMint = async () => {
    if (window.ethereum) {
      // provides a way for ethers connect to the blockchain
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // abstraction of an Ethereum Account, to be used to sign messagens and transactions
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunksNFT.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log(response);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" h="100vh" pb="36">
      <Box w="520px">
        <Flex direction="column">
          <Text fontSize="5xl" fontFamily={theme.fonts.vt}>
            RoboPunks
          </Text>
          <Text
            fontSize="3xl"
            textShadow="0 2px 2px #000000"
            letterSpacing="-5.5%"
            fontFamily={theme.fonts.vt}
          >
            It's 2078. Can the RoboPunks NFT save humans from destructive
            rampant NFT speculation? Mint RoboPunks to find out.
          </Text>
        </Flex>
        {isConnected ? (
          <Flex direction="column" gap="2" align="center">
            <Flex align="center">
              <Button
                onClick={() => {
                  if (mintAmount <= 1) {
                    return;
                  }
                  setMinAmount(mintAmount - 1);
                }}
                bg="#D6517D"
                fontSize="2xl"
                borderRadius="md"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                p="4"
                m="0 15px"
                _hover={{ bg: "#D6517D" }}
              >
                -
              </Button>
              <Input
                type="number"
                value={mintAmount}
                readOnly
                fontFamily="inherit"
                w="24"
                h="10"
                textAlign="center"
                pl="5"
                mt="2"
              />
              <Button
                onClick={() => {
                  if (mintAmount >= 1) {
                    return;
                  }
                  setMinAmount(mintAmount + 1);
                }}
                bg="#D6517D"
                fontSize="2xl"
                borderRadius="md"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                p="4"
                m="0 15px"
                _hover={{ bg: "#D6517D" }}
              >
                +
              </Button>
            </Flex>
            <Button
              onClick={handleMint}
              bg="#D6517D"
              fontSize="2xl"
              borderRadius="md"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="VT323"
              p="4"
              m="0 15px"
              _hover={{ bg: "#D6517D" }}
            >
              Mint Now
            </Button>
          </Flex>
        ) : (
          <Text fontFamily={theme.fonts.vt} fontSize="2xl">
            You must be connected to Mint.
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
