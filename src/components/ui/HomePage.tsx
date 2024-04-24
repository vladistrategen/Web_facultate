import React from 'react';
import EventCard from '../common/EventCard';
import styles from '../../styles/EventCard.module.css';


const HomePage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h2>Upcoming Events</h2>
            <EventCard
                title="Summer Fest"
                date="June 15, 2024"
                location="Central Park"
                description="Join us for a day of fun, music, and sunshine at the annual Summer Fest."
                imageUrl="https://via.placeholder.com/250x150.png?text=Summer+Fest"
            />
            <EventCard
                title="Book Fair"
                date="July 10, 2024"
                location="Downtown Library"
                description="Discover the latest in literature and meet your favorite authors."
                imageUrl="https://via.placeholder.com/250x150.png?text=Book+Fair"
            />
            {/* Add more EventCard components as needed */}
        </div>
    );
};

export default HomePage;
