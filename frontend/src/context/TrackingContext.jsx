import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TrackingContext = createContext();

export const TrackingProvider = ({ children }) => {
    const [mileageLogs, setMileageLogs] = useState([]);
    const [liveData, setLiveData] = useState({});

    /**
     * 1. INITIAL DATA FETCH
     * Fetches historical and current move data from move_history joined with vehicles/units.
     */
    const fetchHistory = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/sidebar/move-history');
            if (!response.ok) throw new Error("Network response was not ok");
            
            const data = await response.json();
            
            const formatted = data.map(row => ({
                ba: row.ba,
                unit: row.unit || "N/A",
                startLat: row.startLat,
                startLng: row.startLng,
                lastLat: row.lastLat,
                lastLng: row.lastLng,
                total: row.total || "0.00",
                currentSpeed: row.currentSpeed ? `${row.currentSpeed} km/h` : "0 km/h"
            }));
            
            setMileageLogs(formatted);
        } catch (err) {
            console.error("TrackingContext Fetch Error:", err);
        }
    }, []);

    /**
     * 2. REAL-TIME UPDATES (WebSocket)
     */
    useEffect(() => {
        fetchHistory(); 

        const socket = new WebSocket('ws://localhost:8080');
        
        socket.onmessage = (event) => {
            const incoming = JSON.parse(event.data);

            // Update Live Assets (Map/Dashboard)
            setLiveData(prev => ({
                ...prev,
                [incoming.ba]: { 
                    lat: incoming.lat, 
                    lng: incoming.lng, 
                    speed: incoming.speed, 
                    unit: incoming.unit 
                }
            }));

            // Update Mileage Report Table (Live increment)
            setMileageLogs(prev => prev.map(item => {
                if (item.ba === incoming.ba) {
                    return {
                        ...item,
                        lastLat: incoming.lat,
                        lastLng: incoming.lng,
                        // Incrementing distance based on 10s ping frequency (~0.01km)
                        total: (parseFloat(item.total) + 0.01).toFixed(2),
                        currentSpeed: `${incoming.speed} km/h`
                    };
                }
                return item;
            }));
        };
        
        socket.onerror = (err) => console.error("WebSocket Error:", err);
        return () => socket.close();
    }, [fetchHistory]);

    return (
        <TrackingContext.Provider value={{ mileageLogs, liveData, refreshData: fetchHistory }}>
            {children}
        </TrackingContext.Provider>
    );
};

export const useTracking = () => {
    const context = useContext(TrackingContext);
    if (!context) throw new Error("useTracking must be used within TrackingProvider");
    return context;
};