import { useEffect, useState } from 'react'
import Web3 from 'web3'
import {ethers} from "ethers"
import artifact from '../../contracts/Hours.json';
import ValidateMission from '../ValidateMission';


 const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");


export default function MissionValidator() {
    const [account, setAccount] = useState('')
    const [balance, setBalance] = useState(0)
    const [network, setNetwork] = useState(0)
    const [contract, setContract] = useState()
    const [totalMissions, setTotalMissions] = useState(0)
    const [allMissions, setAllMissions] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [volunteer, setVolunteer] = useState('')
    const [message, setMessage] = useState('')
    const [hours, setHours] = useState(0)


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

            // We connect to the contact
            const networkID = await web3.eth.net.getId();
            const { abi } = artifact;
            try {
                const address = artifact.networks[networkID].address
                const contract = new web3.eth.Contract(abi, address);
                setContract(contract)
            } catch (err) {
                console.error(err);
            }
        }
        loadAccountAndContract()

    }, [])

    // useEffect(() => {
    //     if (contract) {
    //         getTotalMissions()
    //         getAllMissions()
    //     }
    // }, [contract])

    const getTotalMissions = async () => {
        const totalMissions = await contract.methods.getTotalMissions().call()
        setTotalMissions(totalMissions)
    }

    const getAllMissions = async () => {
        const allMissions = await contract.methods.getAllMissions().call()
        console.log(allMissions)
        setAllMissions(allMissions)
    }

    const handleSubmit = async (event) => {

        event.preventDefault()
        setSubmitting(true)

        try {
            const transaction = await contract.methods.buyMissions(message.trim(),volunteer.trim(),Web3.utils.toWei('0.001', 'ether'),hours.trim()).send({ from: account })

            console.log("Mining...", transaction);
            setSubmitting(false)
        } catch (e) {

        }
    }

    const handleOnVolunteerChange = (event) => {
        setVolunteer(event.target.value)
    }

    const handleOnMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const handleOnHoursChange = (event) => {
        setHours(event.target.value)
    }

    return (
        <div className="container">

            <ul>
                <li><strong>My account:</strong> {account}</li>
                <li><strong>Network:</strong> {network}</li>
                <li><strong>Balance:</strong> {balance}</li>
            </ul>

            <div>
                {totalMissions > 0
                    ? <>Thanks I got {totalMissions} mission(s)</>
                    : <>No missions yet!</>
                }
            </div>

            <hr />

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="volunteer-address" className="form-label">Volunteer's address</label>
                    <input className="form-control" id="my-name" placeholder="What's the volunteer's address?" onChange={handleOnVolunteerChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="my-message" className="form-label">Describe the mission</label>
                    <textarea className="form-control" id="my-message" placeholder="Write the name of the mission" rows="3" onChange={handleOnMessageChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="hours" className="form-label">Number of hours</label>
                    <textarea type="number" className="form-control" id="hours" placeholder="Write the number of hours" rows="1" onChange={handleOnHoursChange}></textarea>
                </div>
                
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary me-3" >Validate mission!</button>
                </div>
            </form>

            {submitting &&
                <div>Submtting Form...</div>
            }

            <div className='mt-2'>
                <button className='btn btn-primary me-2' onClick={getTotalMissions}>Fetch number of coffee</button>
                <button className='btn btn-primary' onClick={getAllMissions}>get all missions</button>
            </div>

            <hr />

            <ol className="list-group list-group-numbered">
                {allMissions.map((mission, index) => {
                    return (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div>{mission.volunteer}</div>
                                <div>{mission.message}</div>
                                <div>{mission.hours}</div>
                            </div>
                        </li>
                    )
                })}
            </ol>

        </div>
    )

}