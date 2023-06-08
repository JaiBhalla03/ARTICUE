import React, {useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import axios from "axios";

const Cart = () => {
    const {data:session} = useSession();
    const [details, setDetails] = useState(null);

    console.log(session)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`/api/userCart/${session?.user?.id}`);
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
        <div>
          this is the customers cart page
        </div>
    );
};

export default Cart;