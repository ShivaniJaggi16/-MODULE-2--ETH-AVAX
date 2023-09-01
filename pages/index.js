import { useState, useEffect } from "react";
import { ethers } from "ethers";
import crypto_making_tree_abi from "../artifacts/contracts/Hardhat.sol/Hardhat.json";

export default function Homepage() {
  const [meMessage, setMeMessage] = useState("Account Holder Name: Shivani Jaggi");
  const [defaultAccount, setDefaultAccount] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [ethWallet, setEthWallet] = useState(undefined);
  const [Hardhat, setHardhat] = useState(undefined); // it is the Hardhat

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const smcABI = crypto_making_tree_abi.abi;

  const getBalance = async () => {
    if (Hardhat) {
      setBalance((await Hardhat.getBalance()).toNumber());
    }
  };

  const topUp = async () => {
    if (Hardhat) {
      let tx = await Hardhat.topUp(1);
      await tx.wait();
      getBalance();
    }
  };

  const cashOut = async () => {
    if (Hardhat) {
      let tx = await Hardhat.cashOut(1);
      await tx.wait();
      getBalance();
    }
  };

  const burn = async () => {
    if (Hardhat) {
      try {
        const tx = await Hardhat.burn(1); // Replace "burn" with your actual burn function name
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error burning tokens:", error);
      }
    }
  };

  const verifyAddress = async () => {
    if (Hardhat) {
      try {
        const result = await Hardhat.verifyAddress(defaultAccount[0]); // Replace with your verification logic
        setVerificationResult(result); // Set the verification result
      } catch (error) {
        console.error("Error verifying address:", error);
        setVerificationResult("Error verifying address");
      }
    }
  };

  const displayAddress = async () => {
    if (Hardhat) {
      let tx = await Hardhat.displayAddress();
      await tx.wait();
    }
  };

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      console.log("getwallet is executed");
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      accountHandler(account);
    }
  };

  const accountHandler = async (accounts) => {
    if (accounts) {
      console.log("Account connected =", accounts);
      setDefaultAccount(accounts);
    } else {
      console.log("Account Not Located");
    }
  };

  const connectWallettHandler = async () => {
    if (!ethWallet) {
      alert("MetaMask Wallet is required to Connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });

    accountHandler(accounts);

    getMyContract();
  };

  const getMyContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, smcABI, signer);

    setHardhat(contract);
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Don't forget to install the MetaMask browser extension for a smooth experience.</p>;
    }
    if (!defaultAccount) {
      return (
        <button
          onClick={connectWallettHandler}
          style={{ color: "white", background: "Red" }}
        >
          <h3>"Connect With Your Wallet"</h3>
        </button>
      );
    }

    getBalance();

    return (
      <div>
        <h3 style={{ color: "Black" }}>User Account : {defaultAccount}</h3>
        <p style={{ color: "Blue" }}>User Balance : {balance}</p>
        <button
          onClick={displayAddress}
          style={{ color: "white", background: "blue" }}
        >
          <h3 >Verify Address </h3>
        </button>
        <button
          onClick={topUp}
          style={{ color: "white", background: "pink" }}
        >
          <h3 >Top Up Balance</h3>
        </button>
        <button
          onClick={cashOut}
          style={{ color: "white", background: "green" }}
        >
          <h3>Cash Out</h3>
        </button>
        <button
          onClick={burn}
          style={{ color: "white", background: "red" }}
        >
          <h3>Burn 1 ETH</h3>
        </button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="Shivani">
      <h1>
        <marquee width="60%" direction="Left" height="80%">
        Start your Metacrafters ATM experience with a friendly reception!
        </marquee>
      </h1>
      <h2>{meMessage}</h2>

      {initUser()}
      <style jsx>{`
        .Shivani {
          background-image: url("https://image.pngaaa.com/518/1804518-small.png");
          background-position: center;
          background-size: cover;
          /* Adjust this to control how the image is displayed */
          width: 100%;
          /* Make sure it covers the entire viewport width */
          height: 100vh;
          /* Make it cover the entire viewport height */
          text-align: center;
          color: black;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </main>
  );
}

  
     

   
            
