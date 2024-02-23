import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CircularProgress, TablePagination } from '@mui/material';
import { useLocation } from 'react-router-dom';

const AttendeeCard = ({attendee}) => (
    <Card key={attendee.ID} style={{ width: '100%', margin: '10px' }}>
        <CardContent className='d-flex align-items-center flex-wrap justify-content-between'>
            <Typography variant="h5" component="h2">
                {attendee.FirstName + " " + attendee.LastName}
            </Typography>
            <Typography variant="body2" component="p">
                {attendee.Email}
            </Typography>
            <Typography variant="body2" component="p">
                {attendee.Organization}
            </Typography>
            <Typography variant="body2" component="p">
                {attendee.Country}
            </Typography>
            <Typography variant="body2" component="p">
                {attendee.RegistrationType}
            </Typography>
            {/* Add more attendee details if needed */}
        </CardContent>
    </Card>
);

function ViewAttendees() {
    const [attendees, setAttendees] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalAttendees, setTotalAttendees] = useState(0);

    const getUrlParameter = (name) => {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const eventName = getUrlParameter('eventName');
    const attendeesUrl = getUrlParameter('attendeesUrl');

    useEffect(() => {
        setAttendees([]);
        setPage(0);
    }, [eventName, attendeesUrl]);

    useEffect(() => {
        fetchAttendees();
    }, [page, rowsPerPage]);

    const fetchAttendees = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:4000/attendees', {
                params: {
                    url: attendeesUrl
                }
            });
            const { Attendees } = response.data;
            const invitedSpeakers = Attendees.filter(attendee => attendee.RegistrationType === 'Invited Speaker');
            setTotalAttendees(invitedSpeakers.length);
            const startIndex = page * rowsPerPage;
            const endIndex = Math.min((page + 1) * rowsPerPage, invitedSpeakers.length); // Ensure endIndex doesn't exceed the length of invitedSpeakers
            const slicedAttendees = invitedSpeakers.slice(startIndex, endIndex);
            setAttendees(slicedAttendees);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching attendees:", error);
            setLoading(false);
            // Display a user-friendly error message
        }
    };
    
    
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const selectedRowsPerPage = parseInt(event.target.value, 10);
        if ([ 10, 25, 50, 100].includes(selectedRowsPerPage)) {
            setRowsPerPage(selectedRowsPerPage);
            setPage(0);
        } else {
            // Handle invalid rows per page value
            console.error("Invalid rows per page value:", selectedRowsPerPage);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ pt: 5 }} style={{ marginTop: 50 }}>
            <Typography variant="h1" gutterBottom>View all Attendees</Typography>
            <TablePagination
                component="div"
                count={totalAttendees}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <h2>Invited Speakers</h2>
                {attendees.filter(attendee => attendee.RegistrationType === 'Invited Speaker').map(attendee => <AttendeeCard attendee={attendee} />)}
            </div>
            {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <h2>Attendees</h2>
                {attendees.filter(attendee => attendee.RegistrationType === 'Attendee').map(attendee => <AttendeeCard attendee={attendee} />)}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <h2>Scientific Committee</h2>
                {attendees.filter(attendee => attendee.RegistrationType === 'Scientific Committee').map(attendee => <AttendeeCard attendee={attendee} />)}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <h2>Presenters</h2>
                {attendees.filter(attendee => attendee.RegistrationType === 'Presenter').map(attendee => <AttendeeCard attendee={attendee} />)}
            </div> */}
            {loading && <CircularProgress style={{ marginTop: 20 }} />}
        </Container>
    );
}

export default ViewAttendees;
