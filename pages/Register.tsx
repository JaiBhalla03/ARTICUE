import Link from 'next/link';
import React, {FormEvent, useState} from 'react';
import { signIn } from 'next-auth/react';
import Image from "next/image";
import img from '../images/regimg.png'
import {Bounce} from "react-awesome-reveal";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [interestType, setInterestType] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                interestType: interestType,
            }),
        });
        const data = await res.json();
        if (!data.user) return null;
        await signIn('credentials', {
            username: data.user.username,
            password: password,
            callbackUrl: '/',
        });
    }

    return (
        <Bounce triggerOnce>
            <div className={'bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:pt-20'}>
                <div className='flex justify-around relative shadow-gray-800 shadow-sm py-8 px-6'>
                    <div className={'flex flex-col justify-around justify-between'}>
                        <h2 className={'text-5xl md:mx-10 font-bold'}>Register Now!</h2>
                        <form
                            className={'mt-4 flex flex-col justify-around p-4 md:mx-10'}
                            onSubmit={handleSubmit}>
                            <input
                                className={'bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-4 w-full'}
                                type='text'
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                placeholder={'Create a username'}
                                name='username' required />
                            <input
                                className={'bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-4 w-full'}
                                type='password'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder={'Create a password'}
                                name='password' required />
                            <div className="relative">
                                <select
                                    value={interestType}
                                    onChange={(e)=>setInterestType(e.target.value)}
                                    className="bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-4 w-full"
                                >
                                    <option value="" disabled selected>Select your favorite painting type</option>
                                    <option>Oil Painters</option>
                                    <option>Watercolor Painters</option>
                                    <option>Acrylic Painters</option>
                                    <option>Pastel Painters</option>
                                    <option>Encaustic Painters</option>
                                </select>

                            </div>
                            <button
                                className="w-40 mx-auto mt-8 text-white p-2 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-sm hover:scale-110 active:scale-90"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                        <p className={'md:mx-10 text-center'}>
                            Already registered? <Link className={'underline'} href='/Login'>Login here</Link>
                        </p>
                    </div>
                    <Image src={img} alt={''} width={450}/>
                </div>
            </div>
        </Bounce>
    );
}