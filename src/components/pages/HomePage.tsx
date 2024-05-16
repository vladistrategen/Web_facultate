import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import EventCard from '../common/EventCard';
import Select from 'react-select'; 
import styles from '../../styles/EventCard.module.css';

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
    image_url: string;
}

interface Option {
    value: string;
    label: string;
}

const HomePage: React.FC = () => {
    const [allEvents, setAllEvents] = useState<Event[]>([]); 
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Option | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 
    const [user, setUser] = useState<any>(null);
    const [needsRefresh, setNeedsRefresh] = useState<boolean>(false); 
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState<Option | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost/ConnectFest-api/products/read.php');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Event[] = await response.json();
                setEvents(data);
                setAllEvents(data);
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
        console.log("useeff")
        sortEvents();

    }, [searchTerm, needsRefresh, sortOption]);


    const sortEvents = () => {
        const sortedEvents = [...allEvents];
        if (sortOption?.value === 'name') {
            sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption?.value === 'date') {
            sortedEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
        setEvents(sortedEvents);
    };

    const sortOptions = [
        { value: 'name', label: 'Sort by Name' },
        { value: 'date', label: 'Sort by Date' }
    ];

    const handleSortChange = (option: Option | null) => {
        setSortOption(option);
    };
    const eventOptions = events.map(event => ({
        value: event.id.toString(),
        label: event.title
    }));

    const handleSelectChange = (option: Option | null) => {
        setSelectedEvent(option);
    };

    const addNewEvent = () => {
        const newEvent: Event = {
            id: Math.max(...events.map(event => event.id)) + 1,
            title: '',
            date: '',
            location: '',
            description: '',
            image_url: 'https://picsum.photos/200' + (Math.max(...events.map(event => event.id)) + 1).toString()[0]
        };
        const createEvent = async () => {
            try{
                
                const response = await fetch('http://localhost/ConnectFest-api/products/create.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newEvent)
                });
                if (response.ok) {
                    setNeedsRefresh(true);
                } else {
                    alert('Failed to create the event.');
                }
            }
            catch (error) {
                console.error('Error creating event:', error);
            }
            finally {
                setNeedsRefresh(true);
            }
        }
        createEvent();
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
                <Select
                options={sortOptions}
                onChange={handleSortChange}
                value={sortOption}
                placeholder="Sort Events..."
                className="sort-select"
                isClearable={true}
            />
            <button style={{ backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', margin: '10px' }}
                        onClick={addNewEvent}>
                    + Add New Event
                </button>
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
