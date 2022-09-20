import React from "react";
import { ethers } from "ethers";
import { Flex, Text, Button, Image } from "@chakra-ui/react";
import { IAccounts } from "../types/IAccounts";
import { usePicasso } from "../hooks/usePicasso";
import Link from "next/link";

const NavBar: React.FC<IAccounts> = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);
  const theme = usePicasso();

  const connectAccount = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  };

  return (
    <Flex
      fontFamily={theme.fonts.vt}
      align="center"
      p="30px 30px"
      w="100vw"
      justify="space-around"
    >
      <Flex>
        <Flex justify="space-around" w="40%" p="0 75px">
          <Link href="https://www.facebook.com">
            <Image
              src="/assets/social-media-icons/facebook_32x32.png"
              boxSize="42px"
              m="0 15px"
              alt="x"
              cursor="pointer"
            />
          </Link>
        </Flex>
        <Flex justify="space-around" w="40%" p="0 75px">
          <Link href="https://www.twitter.com">
            <Image
              src="/assets/social-media-icons/twitter_32x32.png"
              boxSize="42px"
              m="0 15px"
              alt="x"
              cursor="pointer"
            />
          </Link>
        </Flex>
        <Flex justify="space-around" w="40%" p="0 75px">
          <Link href="https://www.gmail.com">
            <Image
              src="/assets/social-media-icons/email_32x32.png"
              boxSize="42px"
              m="0 15px"
              alt="x"
              cursor="pointer"
            />
          </Link>
        </Flex>
      </Flex>

      <Flex align="center" gap="20" fontSize="2xl">
        <Flex cursor="pointer">About</Flex>
        <Flex cursor="pointer">Mint</Flex>
        <Flex cursor="pointer">Team</Flex>

        {isConnected ? (
          <Text>Connected</Text>
        ) : (
          <Button
            onClick={connectAccount}
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
            Connect
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
