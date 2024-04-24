import React, { useState } from 'react';
import { Popup } from 'devextreme-react/popup';
import styles from '../../styles/EventCard.module.css';

type EventCardProps = {
    title: string;
    date: string;
    location: string;
    description: string;
    imageUrl: string;
};

const EventCard: React.FC<EventCardProps> = ({ title, date, location, description, imageUrl }) => {
    const [visible, setVisible] = useState(false);

    const togglePopup = () => { setVisible(!visible); console.log("Toggled Popup!") };

    return (
        <div className={styles.card} onClick={togglePopup}>
            <img src={imageUrl} alt={title} />
            <h3>{title}</h3>
            <p>{date}</p>
            <p>{location}</p>
            <Popup
                visible={visible}
                onHiding={togglePopup}
                dragEnabled={true}
                closeOnOutsideClick={true}
                showCloseButton={true}
                title={title}
                width="80%"
                height="80%"
                maxHeight="80%"
                maxWidth="80%"
                container="body" 
                wrapperAttr={{ style: { padding: 20, backgroundColor: 'white' } }}
            >
                <div style={{ textAlign: 'center' }}>
                    <img src={imageUrl} alt={title} style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />
                    <p>{date} at {location}</p>
                    <p>{description}</p>
                    <button onClick={() => alert("Marked Interest!")}>Mark Interest</button>
                </div>
            </Popup>
        </div>
    );
};

export default EventCard;