import { useState } from 'react';
import axios from 'axios';
import {useSession} from "next-auth/react";

const Details = () => {
    const [success, setSuccess] = useState(false);
    const { data: session } = useSession();
    const email = session?.user?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const role = formData.get('role');
        const interestType = formData.get('interestType');

        try {
            await axios.post('/api/updateDetails', {
                email,
                role,
                interestType,
            });
            setSuccess(true);
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    return (
        <div>
            <h1>Specify your details here</h1>
            {success && <p>Details updated successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="role">Role:</label>
                    <input type="text" name="role" id="role" />
                </div>
                <div>
                    <label htmlFor="interestType">Interest Type:</label>
                    <input type="text" name="interestType" id="interestType" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Details;
