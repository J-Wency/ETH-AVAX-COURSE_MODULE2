import {useState, useEffect} from "react";
import {ethers} from "ethers";
import {Button, TextField} from "@mui/material";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState("Unavailable");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const add = async (num1, num2) => {
    if (!atm) return;
    let tx = await atm.addNum(num1, num2);
    await tx.wait();
    updateResult();
  };

  const subtract = async (num1, num2) => {
    if (!atm) return;
    let tx = await atm.subtractNum(num1, num2);
    await tx.wait();
    updateResult();
  };

  const multiply = async (num1, num2) => {
    if (!atm) return;
    let tx = await atm.multiplyNum(num1, num2);
    await tx.wait();
    updateResult();
  };

  const updateResult = async () => {
    if (!atm) return;
    const latestResult = await atm.Result();
    setResult(Number(latestResult));
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <div className="flex flex-col gap-3 p-3 w-full md:w-1/2">
          <h3> Latest Result </h3>
          <h1>
            {result}
          </h1>
          <div className="flex justify-center gap-3">
            <TextField
              variant="outlined"
              type="number"
              placeholder="Number 1"
              value={num1}
              onChange={(event) => setNum1(Number(event.target.value))}
              className="w-full"
            />
            <TextField
              variant="outlined"
              type="number"
              placeholder="Number 2"
              value={num2}
              onChange={(event) => setNum2(Number(event.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex justify-center gap-3">
            <Button
              variant="contained"
              onClick={() => add(num1, num2)}
              className="w-full"
            >
              Add
            </Button>
            <Button
              variant="contained"
              onClick={() => subtract(num1, num2)}
              className="w-full"
            >
              Subtract
            </Button>
            <Button
              variant="contained"
              onClick={() => multiply(num1, num2)}
              className="w-full"
            >
              Multiply
            </Button>
          </div>
        </div>
      </div>

    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
