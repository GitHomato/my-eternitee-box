import React, {useState, useEffect } from 'react';

export default function CreateMission() {

    const [submitting, setSubmitting] = useState(false)
    const [name, setName] = useState("")
    const [hours, setHours] = useState(0)
    const [address, setAddress] = useState("")
    const [id, setID] = useState("") //ID is used for Volunteer's Name

    const [currentName, setCurrentName] = useState("")
    const [currentHours, setCurrentHours] = useState("")
    const [currentAddress, setCurrentAddress] = useState("")
    const [currentID, setCurrentID] = useState("")

    const [missions, setMissions] = useState([])


    const handleCreateMission = () => {
        setMissions([...missions, mission]);
        setMission({ name: "", hours: "", address: "", id: "" });
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("test for button");
        setSubmitting(true)

        setTimeout(() => {
            setCurrentName(name)
            setCurrentHours(hours)
            setCurrentAddress(address)
            setCurrentID(id)
            localStorage.setItem('currentName', name)
            localStorage.setItem('currentHours', hours)
            localStorage.setItem('currentID', id)
            localStorage.setItem('currentAddress', address)
            
        }, 10)

    }

    <CreateMission missions={missions} setMissions={setMissions} />

    let [mission, setMission] = useState({ name: "", hours: "", address: "", id: "" });



    const retrieveData = () => {
        const _currentName = localStorage.getItem('currentName');
        setCurrentName(_currentName);

        const _currentHours = localStorage.getItem('currentHours');
        setCurrentHours(_currentHours);

        const _currentID = localStorage.getItem('currentID');
        setCurrentID(_currentID);

        const _current = localStorage.getItem('currentName');
        setCurrentName(_currentName);
    }

   useEffect(()=> {
    console.log('useEffect time');

    //update the UI
   }, [])

    const handleNewMission = (event) => {
        setName(event.target.value)
        setMission=({...mission, name: event.target.value})
        setHours(event.target.value)
        setMission=({...mission, hours: event.target.value})
        setAddress(event.target.value)
        setMission=({...mission, address: event.target.value})
        setID(event.target.value)
        setMission=({...mission, id: event.target.value})

        setMissions([...missions, mission]);
    }

    // On laisse pour l'instant pour pas fuck avec le onChange mais on va peut être seulement garder onClick pour l'instant pour tester une version ou la mission se crée au moment ou on appuie sur créer mission
    let handleNameChange = (event) => {
        setName(event.target.value)
        setMission=({...mission, name: event.target.value})
    }

    let handleHoursChange = (event) => {
        setHours(event.target.value)
        setMission=({...mission, hours: event.target.value})
    }

    let handleAddressChange = (event) => {
        setAddress(event.target.value)
        setMission=({...mission, address: event.target.value})
    }

    let handleIDChange = (event) => {
        setID(event.target.value)
        setMission=({...mission, id: event.target.value})
    }

    return (
    <div className = "container">
        <div className = "h4"> Eternitee </div>
        <div className = "h2">  </div>

        <form onSubmit = {handleSubmit} >
            
            <div className="mb-3">
                <label for="Mission name" className="form-label">Mission name</label>
                <input name ="name" onChange = {handleNameChange} className="form-control" id="Mission name"/>
                <div id="Mission name help" className="form-text">Give a unique name to your mission.</div>
            </div>

            <div className="mb-3">
                <label for="Hours" className="form-label">Number of hours</label>
                <input hours = "hours" onChange = {handleHoursChange} className="form-control" id="exampleInputEmail1"/>
                <div id="hoursHelp" className="form-text">This amount of hour tokens will be credited to the volunteer</div>
            </div>

            <div className="mb-3">
                <label for="VolunteerName" className="form-label">Volunteer's Name</label>
                <input ID = "ID" onChange = {handleIDChange} className="form-control" id="VolunteerName"/>
                <div id="emailHelp" className="form-text"></div>
            </div>

            <div className="mb-3">
                <label for="VolunteerAddress" className="form-label">Volunteer's ID / Address</label>
                <input address = "address" onChange = {handleAddressChange} className="form-control" id="VolunteerAddress"/>
                <div id="emailHelp" className="form-text">This address will be used to send the hours tokens</div>
            </div>
           
            

            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" for="exampleCheck1">Excellence</label>
            </div>

            <div className = "mt-4">
                {hours && <>Do you want to create the mission <strong>{name}</strong> with <strong>{hours}</strong> hour Tokens for <strong>{id}</strong> with this address : <strong>{address}</strong>? </>}
            </div>


            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create mission !</button>


            {submitting && <div>Validating mission...</div>}


            <table>
              <thead>
                <tr>
                  <th>Mission Name</th>
                  <th>Hours</th>
                  <th>Volunteer Name</th>
                  <th>Volunteer Address</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {missions.map((mission, index) => (
                  <tr key={index}>
                    <td>{mission.name}</td>
                    <td>{mission.hours}</td>
                    <td>{mission.address}</td>
                    <td>{mission.id}</td>
                    <td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
        </form>
    </div>
     

    )
}