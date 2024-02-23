import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './includes/Header';
import LoginPage from './routes/Login';
import HomePage from './routes/Home';
import EventsPage from './routes/Events';
import ReportsPage from './routes/Reports';
import ViewEvents from './routes/ViewEvents';
import ViewAgenda from './routes/ViewAgenda';
import ViewAttendees from './routes/ViewAttendees';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in (you might use a more sophisticated method here)
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    }, []);

    return (
        <div>
            <Router>
                <Header /> {/* Render the Header component outside the Routes */}
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/events" element={<EventsPage isLoggedIn={isLoggedIn} />} />
                    <Route path="/reports" element={<ReportsPage isLoggedIn={isLoggedIn} />} />
                    <Route path="/events/view-events" element={<ViewEvents isLoggedIn={isLoggedIn} />} />
					<Route path="/view-attendees" element={<ViewAttendees />} />
					<Route path="/view-agenda" element={<ViewAgenda />} />


                </Routes>
            </Router>
        </div>
    );
}

export default App;
