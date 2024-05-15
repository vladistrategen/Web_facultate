import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import EventCard from '../common/EventCard';
import Select from 'react-select'; // Import react-select
import styles from '../../styles/EventCard.module.css';

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
    image_url: string;
}

// Define the type for options used in react-select
interface Option {
    value: string;
    label: string;
}

const HomePage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Option | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 
    const [user, setUser] = useState<any>(null);
    const [needsRefresh, setNeedsRefresh] = useState<boolean>(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost/ConnectFest-api/products/read.php');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Event[] = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        setIsLoggedIn(!!localStorage.getItem('user')); 
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
        fetchEvents();

        if (!localStorage.getItem('user')) {
            navigate('/login'); 
        }

    }, [searchTerm, needsRefresh]);

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove user data from localStorage
        navigate('/login'); // Redirect to login page after logout
    };

    // Prepare options for the Select component
    const eventOptions = events.map(event => ({
        value: event.id.toString(),
        label: event.title
    }));

    const handleSelectChange = (option: Option | null) => {
        // perform onclick for event card
        setSelectedEvent(option);

    };

    return (
        <div className={styles.container}>
            <div>
                <h2>Upcoming Events</h2>
                <Select
                    options={eventOptions}
                    onChange={handleSelectChange}
                    value={selectedEvent}
                    placeholder="Select an event..."
                    className="event-select"
                    isClearable={true}
                    isSearchable={true}
                    onInputChange={(inputValue) => setSearchTerm(inputValue)}
                />
                <button onClick={handleLogout} style={{ float: 'right', marginRight: '20px', marginTop: '20px' }}>Logout</button>
            </div>
            {isLoading ? (
                <p>Loading events...</p>
            ) : !selectedEvent && events.length > 0 ? (
                events.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase())).map((event) => (
                    console.log(searchTerm),
                    <EventCard
                        key={event.id}
                        eventId={event.id}
                        title={event.title}
                        date={event.date}
                        location={event.location}
                        description={event.description}
                        imageUrl={event.image_url}
                        canEdit={isLoggedIn && user && user.isAdmin}
                        onUpdate={(updatedEvent) => {setNeedsRefresh(true)}}
                        onDelete={(deletedEventId) => {setNeedsRefresh(true)}}
                    />
                ))
            ) : !selectedEvent ? events.map((event) => (
                <EventCard
                    key={event.id}
                        eventId={event.id}
                        title={event.title}
                    date={event.date}
                    location={event.location}
                    description={event.description}
                    imageUrl={event.image_url}
                    canEdit={isLoggedIn && user && user.isAdmin}
                    onUpdate={(updatedEvent) => {setNeedsRefresh(true)}}
                        onDelete={(deletedEventId) => {setNeedsRefresh(true)}}
                    />
            ))
                : events.filter(event => selectedEvent && event.id.toString() === selectedEvent.value).map((event) => (
                    <EventCard
                        key={event.id}
                        eventId={event.id}

                        title={event.title}
                        date={event.date}
                        location={event.location}
                        description={event.description}
                        imageUrl={event.image_url}
                        canEdit={isLoggedIn && user && user.isAdmin}
                        onUpdate={(updatedEvent) => {setNeedsRefresh(true)}}
                        onDelete={(deletedEventId) => {setNeedsRefresh(true)}}
                    />
                ))
            }
        </div>
    );
};

export default HomePage;
