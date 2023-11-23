import React, { useContext, useState, useRef } from 'react'
import WorkIcon from '@mui/icons-material/Work';
import UserState from '../Context/Users/UserContext';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Useritem = (props) => {
    const [updateUser, setUpdateUser] = useState({
        _id: "",
        eid: "",
        efirst_name: "",
        elast_name: "",
        eemail: "",
        egender: "",
        eavatar: "",
        edomain: "",
        eavailable: ""
    });

    const { user } = props;
    const { first_name, last_name, email, gender, domain, available, avatar } = user;
    const context = useContext(UserState);
    const { userUpdate, deleteUser } = context;

    const handleClick = () => {
        setUpdateUser({ _id: user._id, eid: user.id, efirst_name: first_name, elast_name: last_name, egender: gender, eavatar: avatar, edomain: domain, eavailable: available })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser.eavailable = String(true) === updateUser.eavailable
        userUpdate(updateUser);
        window.location.reload();
    };

    const handleChange = (e) => {
        console.log(e.target.value)
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
    }
    return (
        <>
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">User Update</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Box noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="efirst_name"
                                            type='text'
                                            onChange={handleChange}
                                            value={updateUser.efirst_name}
                                            required
                                            fullWidth
                                            id="efirst_name"
                                            label="First Name"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            value={updateUser.elast_name}
                                            type='text'
                                            onChange={handleChange}
                                            id="elast_name"
                                            label="Last Name"
                                            name="elast_name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            name="egender"
                                            type='text'
                                            required
                                            fullWidth
                                            value={updateUser.egender}
                                            onChange={handleChange}
                                            id="egender"
                                            label="Gender"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth
                                            onChange={handleChange}
                                            value={updateUser.edomain}
                                            type='text'
                                            id="edomain"
                                            label="Domain"
                                            name="edomain"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            name="eavailable"
                                            type="text"
                                            required
                                            fullWidth
                                            value={updateUser.eavailable}
                                            id="eavailable"
                                            onChange={handleChange}
                                            label="Available"
                                            title='true | false'
                                            placeholder='true | false'
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            onChange={handleChange}
                                            value={updateUser.eavatar}
                                            name="eavatar"
                                            label="profile url"
                                            type="text"
                                            id="eavatar"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary " onClick={handleSubmit} data-bs-dismiss="modal"> save changes </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-3">
                <div className="ui cards">
                    <div className="green card">
                        <div className="content">
                            <img className="right floated mini ui image" src={avatar} alt="profileImage" />
                            <div className="header mt-2">
                                {first_name} {last_name}
                            </div>
                            <div className="description" style={{ marginTop: '20px', fontSize: "16px" }}>
                                <p><i className="envelope icon"></i> {email} </p>
                                <p><i className={`${(gender === "Male" ? "male" : "female")} icon`}></i> {gender} </p>
                                <p><WorkIcon /> {domain}</p>
                                <p><i className="circle icon" style={(available === true) ? { color: "green" } : { color: "red" }}></i>{(available === true) ? "Available" : "Not Available"} </p>
                            </div>
                        </div>
                        <div className="extra content">
                            <div className="ui two buttons">
                                <div className="ui basic green button" onClick={handleClick} data-bs-toggle="modal" data-bs-target="#exampleModal1"> <i className="edit icon"></i>Edit</div>
                                <div className="ui basic red button" onClick={() => { deleteUser(user._id) }}> <i className="trash icon"></i>Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Useritem