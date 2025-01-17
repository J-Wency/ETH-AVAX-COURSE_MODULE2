# ETH-AVAX-COURSE_MODULE2
This is a repository for the submission requirement for the Metacrafters Etherium + Avalanche PROOF: Intermediate Course. It demonstrates the local environment setup and connection to test smart contracts for development purposes. 

# Description
This program is a project requirement for Module 2. It is for the requirement of a smart contract deployment featuring a front-end interface to interact with rather than a command-line display. There are four functions in the smart contract, three of which are interactable on the frontend which takes an input number and does a simple numerical calculation and outputting the answer on the webpage after confirming the smart contract transaction. 

# Program Execution
1. Open [https://github.com/J-Wency/ETH-AVAX-COURSE_MODULE2](https://github.com/J-Wency/ETH-AVAX-COURSE_MODULE2) and create a new Gitpod workspace.
2. Wait for npm to install the necessary modules. If `localhost` is active, do the shortcut `Ctrl Key + C` to terminate, it will be relaunched after some initial steps.
3. Create another terminal instance in Gitpod by doing the shortcut `ctrl + shift + (tilde, key left of 1)` or clicking on the `+` symbol on the bottom right. It creates a new terminal.
4. On the new terminal instance, enter `npx hardhat node` command to start a hardhat node of pre-generated testing accounts. Open the prompt of a new browser window, it will be a blank page but the HTTP address is important to copy.
5. Open your MetaMask wallet and copy a private key from one of the pre-generated accounts, then add the hardhat RPC or the newly opened blank HTTP address referring to your Gitpod instance. [https://support.chainstack.com/hc/en-us/articles/4408642503449-Using-MetaMask-with-a-Hardhat-node](https://support.chainstack.com/hc/en-us/articles/4408642503449-Using-MetaMask-with-a-Hardhat-node) refer to this link for more detailed instructions.
6. Switch to the new testing network on MetaMask, then on the old terminal, enter `npx hardhat run --network localhost scripts/deploy.js` to deploy the smart contract onto the testing network.
7. On the compile log, check if the contract address is the same as the one in **pages/index.js line 15**. If not, then replace with the contract address on the contract compilation log.
8. Enter `npm run dev` to start the frontend connection and server, click on the prompt that appears on the bottom right or `ctrl + left click` the `localhost:3000` message to open the frontend.
9. Connect your wallet then interact with the functions. If done correctly, it will prompt your MetaMask using the testing account to pay a fee, proceed then the function should update on the frontend.

# Troubleshooting Problems
Occasionally, there would be a trasnaction on your MetaMask that you accept but the React Frontend would not update to show the output on screen. This tends to be a problem with the wallet and smart contract interacting, possibly causing errors on Hardhat due to the bugged transaction number. To resolve this issue, go to your MetaMask wallet select the testing account, select the Hardhat network and go to Settings > Advanced > Clear Activity Tab Data. This will clear possible transaction conflicts, making the program functional. Additionally, this could be resolved by using a different testing account.

# Contact
J-Wency, wenceslao.joseph.s@gmail.com

# License
This program is licensed under the MIT License, see LICENSE.md for details.
