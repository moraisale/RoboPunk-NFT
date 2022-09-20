import type { NextPage } from "next";
import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import MainMint from "../components/MainMint";

const Home: NextPage = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  return (
    <Flex
      opacity="0.85"
      w="100%"
      h="100%"
      z-index="10"
      top="0"
      left="0"
      position="fixed"
    >
      <Flex>
        <Flex
          z-index="-1"
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          backgroundImage='url("/assets/background/parallax-bg.gif")'
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="40% 40%"
          textAlign="center"
          fontFamily="Press Start 2P"
          direction="column"
          color="white"
        >
          <NavBar accounts={accounts} setAccounts={setAccounts} />
          <MainMint accounts={accounts} setAccounts={setAccounts} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
