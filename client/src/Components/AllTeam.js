import React, { useContext, useEffect, useState } from 'react'
import UserState from '../Context/Users/UserContext';
import Team from './Team'
import { Link } from 'react-router-dom';

const AllTeam = () => {
    const context = useContext(UserState);
    const { allTeam, getAllTeam } = context;
    const [selectedTeam, setSelectedTeam] = useState(null);

    useEffect(() => {
        getAllTeam();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleClick = (team) => {
        setSelectedTeam(team);
    };
    return (
        <>
            <div className='ui container'>
                <div className="ui massive secondary menu">
                    <Link to="/"><button class="ui button">
                        Home
                    </button>
                    </Link>
                </div>
                <div className=' my-5'>  <h1>All Team</h1>
                    <div className='my-5 row'>
                        {allTeam.map((team) => (
                            <div className="col-md-3" key={team._id}>
                                <div className="ui card mb-5">
                                    <div className="content">
                                        <div className="header">{team.teamName}</div>
                                        <div className="meta">
                                            <span className="date">Created in {team.date.split('T')[0]}</span>
                                        </div>
                                        <div className="description  ">
                                            {team.description}
                                        </div>
                                    </div>
                                    <div className="extra content">
                                        <i className="users icon"></i>
                                        {team.member.length}
                                        <div className="right floated author">
                                            <button
                                                className="ui button"
                                                data-bs-toggle="modal"
                                                data-bs-target={`#TeamModal-${team._id}`}
                                                onClick={() => handleClick(team)}
                                            >
                                                View Team
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className="modal fade"
                                        id={`TeamModal-${team._id}`}
                                        tabIndex="-1"
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                                                        Team Details
                                                    </h1>
                                                    <button
                                                        type="button"
                                                        className="btn-close"
                                                        data-bs-dismiss="modal"
                                                        aria-label="Close"
                                                    ></button>
                                                </div>
                                                <div className="modal-body">
                                                    {selectedTeam && selectedTeam._id === team._id && (
                                                        <Team team={selectedTeam} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default AllTeam