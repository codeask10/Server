import UserContext from "./UserContext";
import { useState } from "react";
const URL = "http://localhost:5004";

const UserState = (props) => {
  const [user, setUser] = useState([]);
  const [queries, setQueries] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [availableTrue, setAvailableTrue] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamData,setTeamData]=useState([]);
  const [allTeam,setAllTeam]=useState([]);
  const [team,setTeam]=useState([]);
  //Get All  a notes
  const getUser = async () => {
    //To do API call
    const response = await fetch(`${URL}/api/user/fetchAllUser`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json();
    if (json.success) {
      setUser(json.users);
    }
    else {
      alert("Users not found");
    }
  };

  //adding a user
  const addUser = async (newUser) => {
    const response = await fetch(`${URL}/api/user/adduser `, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ first_name: newUser.first_name, last_name: newUser.last_name, email: newUser.email, gender: newUser.gender, avatar: newUser.avatar, domain: newUser.domain, available: newUser.available }) // body data type must match "Content-Type" header
    });
    const userData = await response.json();
    if (userData.success) {
      setUser(user.concat(userData.saveuser));
    }
    else {
      alert(userData.error);
    }
  }
  //deleting a user
  const deleteUser = async (id) => {
    //todo API call
    const response = await fetch(`${URL}/api/user/delete/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const Json = await response.json();
    if (Json.success) {
      const newUser = user.filter((user) => { return user._id !== id })
      setUser(newUser);
      alert("User Deleted Successfully");
    }
    else {
      alert(Json.error);
    }
  }

  //   //updating a user details
  const userUpdate = async (edata) => {
    //API Call
    const id = edata._id;
    const response = await fetch(`${URL}/api/user/update/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ first_name: edata.efirst_name, last_name: edata.elast_name, gender: edata.egender, avatar: edata.eavatar, domain: edata.edomain, available: edata.eavailable }) // body data type must match "Content-Type" header
    });
    const Json = await response.json();
    if (Json.success) {
      setQueries(Json);
      alert("User Added successfully");
    }
    else {
      alert(Json.error);
    }
  }

  const searchByName = async (query) => {
    // API Call
    const response = await fetch(`${URL}/api/query/searchByName?search=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jsonData = await response.json();
    if (jsonData.success) {
      setQueries(jsonData.query_data);
    }
    else {
      setQueries([]);
    }
    // Update the state only if the current query is not empty
    // (query === "") ? setQueries([]) : setQueries(jsonData);
  };
  const getFilterData = async (data) => {
    // API Call
    const { domain, gender, available } = data;
    const response = await fetch(`${URL}/api/query/searchByFilter?domain=${domain}&gender=${gender}&available=${available}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jsonData = await response.json();
    if (jsonData.success) {
      setFilterData(jsonData.filter_data);
    }
    else {
      alert('No data found with the specified filters.');
      setFilterData([]);
    }
  };
  const getAllAvailable = async () => {
    // API Call
    const response = await fetch(`${URL}/api/query/available`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jsonData = await response.json();
    setAvailableTrue(jsonData);

  };
  const createTeam = (users) => {
    const { id, first_name, last_name, domain } = users;
    // Check if the user is already in the selected users array
    if (selectedUsers.some((user) => user.id === id)) {
      alert('User is already in the team.');
      return 1;

    }// Check for unique domain
    if (selectedUsers.some((user) => user.domain === domain)) {
      alert('User has the same domain as another user in the team.');
      return 1;

    }
    // If all checks pass, add the user to the selected users array
    setSelectedUsers([...selectedUsers, { id: id, first_name: first_name, last_name: last_name, domain: domain }]);
  }

  const teamSubmit = async(data) => {
    const response = await fetch(`${URL}/api/team/addTeam`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ teamName: data.teamName, description: data.description, member:data.member}) // body data type must match "Content-Type" header
    });
    const userData = await response.json();
    if (userData.success) {
      setTeamData(userData.savedTeam);
      setSelectedUsers([]);
    }
    else {
      alert(userData.error);
    }

  }

  const getAllTeam=async()=>{
    const response = await fetch(`${URL}/api/team/allTeam`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(!response){
      alert("getting failed")
    }
    const json = await response.json();
    if (json.success) {
      setAllTeam(json.teams);
    }
    else {
      alert(json.error);
    }
  };
  const getTeamByID=async(id)=>{
    const response = await fetch(`${URL}/api/team/allTeam/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json();
    if (json.success) {
      setTeam(json.team);
    }
    else {
      alert("Team not found");
    }
  };
  return (
    <UserContext.Provider value={{ user, queries, filterData, availableTrue, selectedUsers, teamData,allTeam,team, getUser, addUser, userUpdate, deleteUser, searchByName, getFilterData, getAllAvailable, createTeam, teamSubmit,getAllTeam,getTeamByID   }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;