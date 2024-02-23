import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Button } from "@mui/material";
import Grid from '@mui/material/Grid';

function ViewEvents() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get("http://localhost:4000/events");
            setEvents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const navigateToAttendees = (eventName, agendaUrl) => {
        navigate(`/view-attendees?eventName=${encodeURIComponent(eventName)}&attendeesUrl=${encodeURIComponent(agendaUrl)}`);
    };
    
    const navigateToAgenda = (eventName, agendaUrl) => {
        navigate(`/view-agenda?eventName=${encodeURIComponent(eventName)}&agendaUrl=${encodeURIComponent(agendaUrl)}`);
    };
    


    return (
        <div>
            <Container maxWidth="lg" sx={{ pt: 5 }} style={{ marginTop: 50 }}>
                <h1 className="mb-5">View all Events</h1>
                {events.map((event, index) => (
                    <div className='d-flex justify-content-start'>
                        <h3>{index + 1}. {event.eventName}</h3>
                        <Button
                            className='mx-3'
                            variant="contained"
                            color="primary"
                            onClick={() => navigateToAgenda(event.eventName, event.agendaUrl)}
                        >
                            View Agenda
                        </Button>


                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigateToAttendees(event.eventName, event.attendeesUrl)}
                        >
                            View Attendees
                        </Button>
                    </div>

                ))}
            </Container>
        </div>
    );
}

export default ViewEvents;
