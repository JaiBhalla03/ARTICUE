import React, {useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import axios from 'axios';

const Dashboard = () => {
    const {data: session, status} = useSession();
    const [details,setDetails] = useState({});
    const email = session?.user?.email;
    useEffect(()=>{
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`/api/userdashboard/${session?.user?.id}`);
                setDetails(res.data.user);
            } catch (err) {
                console.error(err);
                setDetails(null);
            }
        };
        fetchUserData();
    }, [session]);

    console.log(details);
    return (
        <main>
            <h1>Name: {details?.fullName}</h1>
            <p>Role: {details?.role}</p>
            <p>Interest: {details?.interestType}</p>
        </main>
    );
};

export default Dashboard;