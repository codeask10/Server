import React, { useState, useEffect, useContext } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import UserState from '../Context/Users/UserContext';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TeamUserItem from './TeamUserItem';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const Team = () => {
    const [team, setTeam] = useState({ teamName: "", description: "", member: [] });
    const context = useContext(UserState);
    const { availableTrue, getAllAvailable, selectedUsers, teamSubmit } = context;
    useEffect(() => {
        getAllAvailable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const usersPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const currentUsers = availableTrue.slice(startIndex, endIndex);

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            setTeam((prevTeam) => {
                const updatedTeam = { ...prevTeam, member: selectedUsers };
                teamSubmit(updatedTeam);
                return updatedTeam;
            })
            setTeam({ teamName: "", description: "", member: [] });
            window.location.reload();
        }
        catch (error) {
            console.error("Error submitting data:", error);
        }
    }
    const handleChange = (e) => {
        setTeam({ ...team, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="container">
                <div className="ui massive secondary menu">
                    <Link to="/"><button class="ui button">
                        Home
                    </button>
                    </Link>
                    <Link to="/AllTeam"><button class="ui button">
                        View Team
                    </button>
                    </Link>
                </div>
            </div>
            <div className=" container my-5 " >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <h1>create team</h1>
                    <div className="container">
                        <div className="d-flex justify-content-between ">
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="teamName"
                                    required
                                    fullWidth
                                    type="text"
                                    id="teamName"
                                    label="Team Name"
                                    value={team.teamName}
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    type='text'
                                    label="Description"
                                    name="description"
                                    value={team.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                create Team
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        {currentUsers.map((user) => (
                            <div className="col-md-3" key={user.id}>
                                <TeamUserItem user={user} />
                            </div>
                        ))}
                    </div>
                    <Stack spacing={3} direction="row" justifyContent="center" sx={{ marginTop: '20px' }}>
                        <Pagination count={Math.ceil(availableTrue.length / usersPerPage)} size="large" page={currentPage} onChange={(_, value) => setCurrentPage(value)} />
                    </Stack>
                </Box>
            </div>
        </>
    )
}

export default Team