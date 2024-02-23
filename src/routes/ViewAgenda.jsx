import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';

function ViewAgenda() {
    const [agenda, setAgenda] = useState([]);
    const { eventName, agendaUrl } = useParams();

    console.log(eventName, agendaUrl);

    useEffect(() => {
        fetchAgenda();
    }, [eventName, agendaUrl]);

    async function fetchAgenda() {
        try {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: agendaUrl,
                headers: { 
                    'apikey': '5lvxfXuxOq5ykXRuApfmygFD0oXIUv6eugpbrTY9FGHFvAJlcsFoj8m64EuEZbxbpgcp9ekCP9slH', 
                    'apppassword': 'mme_events_3113', 
                    'appusername': 'krishna@meetingmindsubai.com', 
                    'cache-control': 'no-cache', 
                    'Cookie': '.ASPXANONYMOUS=_2OD9sUAVgVS6MQ1d9NbFAOMe61HljaHq5p-T6Hs_9XEUSPL1MtUc_s141NHnzr8VHpAy7CmSh0grad5Z60jnW2w-vREFHVFfelgHRvUtRp44r3nq5LRTd_7OLp93dw_FnqUR-13HeE-ibLS0ZETSw2'
                }
            };

            const response = await axios.request(config);
            setAgenda(response.data);
        } catch (error) {
            console.error("Error fetching agenda:", error);
        }
    }

    return (
        <Container maxWidth="lg" sx={{ pt: 5 }} style={{ marginTop: 50 }}>
            <Typography variant="h1" gutterBottom>View Agenda </Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {agenda.map((attendee, index) => (
                    <Card key={index} style={{ margin: '10px', width: '300px' }}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {attendee.name}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {attendee.email}
                            </Typography>
                            {/* Add more attendee details if needed */}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Container>
    );
}

export default ViewAgenda;
