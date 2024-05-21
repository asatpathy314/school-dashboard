import React, { useState, useEffect } from 'react';
import { db } from './firebase.jsx'; 
import { collection, getDocs } from 'firebase/firestore';

export const Calendar = () => {
  const [events, setEvents] = useState({});
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'events'));
        const eventsData = {};

        snapshot.forEach(doc => {
          const data = doc.data();
          const startDate = data['start-date'].toDate().toISOString().split('T')[0];

          if (!eventsData[startDate]) {
            eventsData[startDate] = {
              marked: true,
              dots: [{ color: 'blue' }]
            };
          } else {
            eventsData[startDate].dots.push({ color: 'blue' });
          }
        });

        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      Calendar
    </div>
    
  );
};

