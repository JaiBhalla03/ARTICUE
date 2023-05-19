import React from 'react';
import {useSession} from "next-auth/react";

const Dashboard = () => {
    const {data: session, status} = useSession();
    return (
        <main>
            <h1>Name: {session.user.fullName}</h1>
            <p>Role: {session.user.role}</p>
            <p>Interest: {session.user.interestType}</p>
        </main>
    );
};

export default Dashboard;