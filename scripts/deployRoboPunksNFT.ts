const hre = require("hardhat");

const main = async () => {
  const RoboPunksNFT = await hre.ethers.getContractFactory("RoboPunksNFT");
  const roboPunksNFT = await RoboPunksNFT.deploy();

  await roboPunksNFT.deployed();
  console.log("RoboPunksNFT deployed to:", roboPunksNFT.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
