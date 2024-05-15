import React, { useState } from 'react';
import { Popup } from 'devextreme-react/popup';
import styles from '../../styles/EventCard.module.css';

type EventCardProps = {
    eventId: number;
    title: string;
    date: string;
    location: string;
    description: string;
    imageUrl: string;
    canEdit: boolean;
    onDelete: (id: number) => void; // Function to handle deletion
    onUpdate: (event: Event) => void; // Function to handle update
};

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
    image_url: string;
}

const EventCard: React.FC<EventCardProps> = ({eventId, title, date, location, description, imageUrl, canEdit, onUpdate, onDelete }) => {
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    const togglePopup = () => { if (!editVisible) setVisible(!visible)};
    const toggleEditPopup = () => setEditVisible(!editVisible);
    const editEvent = () => setEditVisible(true); // Open the edit popup
    const deleteEvent = () => alert('Delete Event Functionality Placeholder');
    const [formData, setFormData] = useState({
        id : eventId,
        title: title,
        date: date,
        location: location,
        description: description,
        imageUrl: imageUrl
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveChanges = async (updatedEvent: Event) => {
        const response = await fetch('http://localhost/ConnectFest-api/products/update.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEvent)
        });

        if (response.ok) {
            onUpdate(updatedEvent);
            toggleEditPopup(); // Close the edit popup on success
        } else {
            alert('Failed to update the event.');
        }
    };
    const handleDelete = async (eventId: number) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            const response = await fetch('http://localhost/ConnectFest-api/products/delete.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: eventId })
            });
            console.log(eventId)

            if (response.ok) {
                onDelete(eventId);
            } else {
                alert('Failed to delete the event.');
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedEvent: Event = {
            id: formData.id,
            title: formData.title,
            date: formData.date,
            location: formData.location,
            description: formData.description,
            image_url: formData.imageUrl
        };
        handleSaveChanges(updatedEvent);
    };

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
                width="80%"
                height="80%"
                maxHeight="80%"
                maxWidth="80%"
                container="body" 
                wrapperAttr={{ style: { padding: 20, backgroundColor: 'white' } }}
            >
                <div style={{ textAlign: 'center', background: 'grey', width: "100%", height: "100%"}}>
                    <img src={imageUrl} alt={title} style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />
                    <p>{date} at {location}</p>
                    <p>{description}</p>
                    <button onClick={() => alert("Marked Interest!")}>Mark Interest</button>
                    {canEdit && (
                <div className={styles.editButtons}>
                    <button className={styles.editButton} onClick={editEvent}>🖊</button>
                    <button className={styles.deleteButton} onClick={() => {handleDelete(eventId)}}>🗑</button>
                </div>
            )}
                </div>
            </Popup>
            <Popup
                visible={editVisible}
                onHiding={toggleEditPopup}
                dragEnabled={true}
                closeOnOutsideClick={true}
                showCloseButton={true}
                title="Edit Event"
                width="80%"
                height="80%"
            >
                <div style={{ textAlign: 'center', background: 'grey', width: "100%", height: "100%"}}>

                <form onSubmit={handleSubmit} className={styles.editForm}>
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
            <label>Location:</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            <button type="submit">Save Changes</button>
        </form>
                    </div>
            </Popup>
        </div>
    );
};

export default EventCard;