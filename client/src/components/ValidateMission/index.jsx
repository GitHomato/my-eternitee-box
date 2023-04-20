import React, {useState, useEffect } from 'react';
import Web3 from 'web3'
import artifact from '../../contracts/MissionValidator.json';
import HoursArtifact from '../../contracts/Hours.json'
import { address } from '@truffle/contract/lib/contract/properties';
import { emit } from 'process';


const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");




function ValidateMission({ownerAddress, hoursContract, onSubmit}) {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState(0);
    const [hrsBalance, setHrsBalance] = useState(0);
    const [network, setNetwork] = useState(0);   
    const [contract, setContract] = useState();
    const [volunteerAddress, setVolunteerAddress] = useState('');
    const [hours, setHours] = useState(0);
    const [submitting, setSubmitting] = useState();
    const hrsTokenAddress = "0x1edCf1B64A240b0c967A6e21F7d6B1E59F54f3BF";
    const hrsTokenAbi = HoursArtifact;
    const hrsTokenContract = new web3.eth.Contract(hrsTokenAbi.abi, hrsTokenAddress); //go check what token we're talking about
    
    

    const handleVolunteerAddressChange = (event) => {
        setVolunteerAddress(event.target.value)
        console.log(volunteerAddress)
    }

    const handleHoursChange = (event) => {
        setHours(event.target.value)
    } 

    const newMission = (event) => {
        console.log("New Mission Validated for : "+ address);
    }

    
    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitting(true)


        const networkID = await web3.eth.net.getId()
       
        try {
            const address = artifact.networks[networkID].address;
            const { abi } = artifact;
            console.log("contract address: " + address);     
            console.log("volunteer's address: " + volunteerAddress);  
            console.log("HRS tokens: " + hours);  

            // const contract = new web3.eth.Contract(abi, address);
            // setContract(contract);
            //const amount = Web3.utils.toWei(hours, 'Hours')
            const transaction = await contract.methods.transferHRS(volunteerAddress,hours).send({from:account});
            console.log("Sending hours", transaction);
            setSubmitting(false)
            
        } catch (e) {
            const address = artifact.networks[networkID].address;
            const { abi } = artifact;
            console.log("Erreur de transaction " + "Adresse du volontaire : " + volunteerAddress + "  amount : "+ hours + " et l'adresse du contract est : " + address + "mais l'adresse qu'on essaie d'utiliser est : " + account)
        }
    }

    useEffect(() => {

        async function loadAccountAndContract() {
            // We load the account being connected
            const accounts = await web3.eth.requestAccounts()
            const _account = accounts[0]
            setAccount(_account)

            // We get the network type
            const network = await web3.eth.net.getNetworkType()
            setNetwork(network)

            // We load the balance for the account and format the balance
            const balance = await web3.eth.getBalance(_account)
            setBalance((balance / 1e18).toFixed(4))

            const hrsBalance = await hrsTokenContract.methods.balanceOf(_account).call() //Check the balance of the hrsToken contract 
            setHrsBalance(hrsBalance)

            // We connect to the contract
            const networkID = await web3.eth.net.getId()
            const { abi } = artifact
            try {
                const address = artifact.networks[networkID].address;
                console.log(address);
                const contract = new web3.eth.Contract(abi, address);
                setContract(contract);
            } catch (err) {
                console.error(err);
            }
        }
        loadAccountAndContract()

    }, [])

  

    return (

    <><div className="container">
          <ul>
              <li><strong>My account:</strong> {account}</li>
              <li><strong>Network:</strong> {network}</li>
              <li><strong>ETH Balance:</strong> {balance}</li>
              <li><strong>HRS Balance:</strong> {hrsBalance} </li>
          </ul>
      </div><form onSubmit={handleSubmit}>
              <label>
                  Volunteer Address:
                  <input type="text" value={volunteerAddress} onChange={handleVolunteerAddressChange} />
              </label>
              <br />
              <label>
                  How many hours:
                  <input type="number" value={hours} onChange={handleHoursChange} />
              </label>
              <br />
              <button type="submit">Validate mission</button>
          </form></>
    );
}

export default ValidateMission;