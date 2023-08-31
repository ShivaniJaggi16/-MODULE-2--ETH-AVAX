import {useState,useEffect} from "react";
import {ethers} from "ethers";
import crypto_making_tree_abi from "../artifacts/contracts/ETH.sol/ETH.json";

export default function Homepage() {

    const [meMessage,setMeMessage] = useState("SHIVANI JAGGI");
    const [defaultAccount,setDefaultAccount] = useState(undefined);
    const [balance,setBalance] = useState(undefined);
    const [ethWallet,setEthWallet] = useState(undefined); 
    const [ETH,setETH] = useState(undefined); // it is the atm
    const [redeemedAmount, setRedeemedAmount] = useState(0);
    
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const smcABI = crypto_making_tree_abi.abi;

    const getBalance = async() => {
        if(ETH) {
            setBalance( (await ETH.getBalance()).toNumber());
        }
    }

    const deposit = async() => {
        if(ETH) {
            let tx = await ETH.Deposite(1);
            await tx.wait();
            getBalance();
        }
    }

    const withdraw = async() => {
        if (ETH) {
            let tx = await ETH.Withdraw(1);
            await tx.wait();
            getBalance();
        }
    }

    const getWallet = async() => {
        
        if(window.ethereum){
            setEthWallet(window.ethereum);
            console.log("getwallet is executed");
        }
        

        if(ethWallet){
            const account = await ethWallet.request({method: "eth_accounts"});
            accountHandler(account);
        }
    }

    const accountHandler = async(accounts) => {
        if(accounts){
            console.log("Account connected =",accounts);
            setDefaultAccount(accounts);
        }
        else {
            console.log("No Account Found");
        }
    }

    const connectWallettHandler = async() => {
        if(!ethWallet){
            alert("MetaMask Wallet is required to Connect");
            return;
        }
        

        const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });

        accountHandler(accounts);

        getMyContract();
    }
    
    const getMyContract = async() => {
        const provider = new ethers.providers.Web3Provider(ethWallet);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, smcABI, signer);

        setETH(contract);
    }

    const redeem = async () => {
        try {
          if (ETH) {
            let tx = await ETH.Redeem();
            await tx.wait();
            setRedeemedAmount(balance); // Set the redeemed amount to the current balance
            getBalance(); // Refresh the balance after redemption
          }
        } catch (error) {
          console.error("Error while redeeming:", error.message);
        }
      };

    const initUser = () => {
        if(!ethWallet){
            return <p>Please Install the MetaMask extension in your Browser</p>;
        }

        if(!defaultAccount){
            return (<button onClick={connectWallettHandler}>Enable wallet for Ethereum contracts</button>)
        }

        getBalance();

        return (
            <div>
                <h3 style={{ color: 'Black' }}>User Account : {defaultAccount}</h3>
               <p style={{ color: 'Blue' }}>User Balance : {balance}</p>
               <h3><button onClick={deposit} style={{ color: 'Orange', background: 'blue' }}>Designate 1 ETH</button></h3>
               <h3><button onClick={withdraw} style={{ color: 'white', background: 'red' }}>Acquire 1 ETH</button></h3>
               <h3><button onClick={redeem} style={{ color: 'white', background: 'purple' }}>Assert</button></h3>
               <p style={{ color: 'Blue' }}>Asserted Value: {redeemedAmount}</p> {/* Display the redeemed amount */}
            </div>
        )
    }

    useEffect(() => {getWallet();}, []);

    return (
      <main className="Shivani">
        <h1><marquee width="60%" direction="left" height="80%">Step into the world of Metacrafters ATM with a warm welcome!</marquee></h1>
        <h2>{meMessage}</h2>
        
        {initUser()}
        <style jsx>{`
            .Shivani {
            background-image: url("https://static.vecteezy.com/system/resources/thumbnails/018/871/933/small/icon-cloud-technology-or-blockchain-cloud-network-connection-access-to-all-devices-on-a-wireless-network-png.png");
            background-position: center;
            width: 1500px;
            height: 800px;
            background-color: Skin;
            text-align: center;
            color:  blue;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        `}
        </style>
      </main>
    )    
}
