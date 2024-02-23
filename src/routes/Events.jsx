import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, Container, FormControl, Input, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import FormHelperText from '@mui/material/FormHelperText';

function EventsPage() {
    const [eventName, setEventName] = useState('');
    const [attendeesUrl, setAttendeesUrl] = useState('');
    const [agendaUrl, setAgendaUrl] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook to get access to the navigation object

    const navigatetoEvents = () => {
        // Perform form submission
        // If form is valid, navigate to the view-events route
        navigate('/events/view-events');
    };

    const validateForm = () => {
        if (!eventName || !attendeesUrl || !agendaUrl) {
            setError('All fields are required');
            return false;
        }
        return true;
    };

    const sendEventData = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/events", {
                eventName: eventName,
                attendeesUrl: attendeesUrl,
                agendaUrl: agendaUrl,
            });

            if (response.success) {
                // If event submission is successful, navigate to view-events
                navigate('/events/view-events');
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Container maxWidth="lg" sx={{ pt: 5 }} style={{ marginTop: 50 }}>

                <div className='d-flex align-items-center justify-content-between mb-5'>
                    <h1 className="m-0">Events</h1>
                    <Button variant='outlined' onClick={navigatetoEvents}>View Events</Button>
                </div>

                {error && <div style={{ color: 'red' }}>{error}</div>}
                <Box
                    component="form"
                    onSubmit={sendEventData}
                    sx={{ m: 1, width: "100%", maxWidth: "600px" }}
                    noValidate
                    autoComplete="off"
                >
                    <FormControl className="d-flex" sx={{ px: 2, mb: 4 }}>
                        <InputLabel htmlFor="eventName">Event Name *</InputLabel>
                        <Input
                            id="eventName"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            aria-describedby="eventName-error"
                            error={!eventName}
                        />
                        {!eventName && <FormHelperText id="eventName-error">Event Name is required</FormHelperText>}
                    </FormControl>
                    <FormControl className="d-flex" sx={{ px: 2, mb: 4 }}>
                        <InputLabel htmlFor="attendeesUrl">Attendees API Url *</InputLabel>
                        <Input
                            id="attendeesUrl"
                            value={attendeesUrl}
                            onChange={(e) => setAttendeesUrl(e.target.value)}
                            aria-describedby="attendeesUrl-error"
                            error={!attendeesUrl}
                        />
                        {!attendeesUrl && <FormHelperText id="attendeesUrl-error">Attendees API Url is required</FormHelperText>}
                    </FormControl>
                    <FormControl className="d-flex" sx={{ px: 2, mb: 4 }}>
                        <InputLabel htmlFor="agendaUrl">Agenda API Url *</InputLabel>
                        <Input
                            id="agendaUrl"
                            value={agendaUrl}
                            onChange={(e) => setAgendaUrl(e.target.value)}
                            aria-describedby="agendaUrl-error"
                            error={!agendaUrl}
                        />
                        {!agendaUrl && <FormHelperText id="agendaUrl-error">Agenda API Url is required</FormHelperText>}
                    </FormControl>
                    <Button variant="contained" type="submit">Submit</Button>
                </Box>
            </Container>
        </div>
    );
}

export default EventsPage;
