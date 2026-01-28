import React, { createContext, useContext, useState, useEffect } from 'react';

const TrackingContext = createContext();

export const TrackingProvider = ({ children }) => {
    const [mileageLogs, setMileageLogs] = useState([]);
    const [liveData, setLiveData] = useState({}); // New state for continuous tracking

    // 1. Fetch initial data from MySQL via the Node.js API
    const fetchHistory = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/reports/mileage');
            const data = await response.json();
            
            // Map the Relational MySQL columns (vehicle_no, unit_name) to UI columns
            const formatted = data.map(row => ({
                ba: row.vehicle_no,         // Updated to match your new schema
                unit: row.unit_name || "Unassigned",
                startLat: row.start_lat,
                startLng: row.start_lng,
                lastLat: row.end_lat,
                lastLng: row.end_lng,
                total: row.total_distance || "0.00",
                currentSpeed: "0 km/h",
                status: row.status          // Tracking the 'ACTIVE' status from sanctions
            }));
            setMileageLogs(formatted);
        } catch (err) {
            console.error("Database Fetch Error:", err);
        }
    };

    useEffect(() => {
        fetchHistory(); 

        // 2. WebSocket for Real-time Updates
        const socket = new WebSocket('ws://localhost:8080');
        
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // UPDATE LIVE TABLE STATE (For continuous tracking page)
            setLiveData(prev => ({
                ...prev,
                [data.ba]: { 
                    lat: data.lat, 
                    lng: data.lng, 
                    speed: data.speed, 
                    unit: data.unit 
                }
            }));

            // UPDATE MILEAGE REPORT STATE (Incremental update)
            setMileageLogs(prev => {
                const updated = [...prev];
                const index = updated.findIndex(item => item.ba === data.ba);
                
                if (index !== -1) {
                    updated[index] = {
                        ...updated[index],
                        lastLat: data.lat,
                        lastLng: data.lng,
                        total: (parseFloat(updated[index].total) + 0.01).toFixed(2),
                        currentSpeed: data.speed + " km/h"
                    };
                }
                return updated;
            });
        };
        
        return () => socket.close();
    }, []);

    return (
        <TrackingContext.Provider value={{ mileageLogs, liveData }}>
            {children}
        </TrackingContext.Provider>
    );
};

export const useTracking = () => {
    const context = useContext(TrackingContext);
    if (!context) throw new Error("useTracking must be used within TrackingProvider");
    return context;
};