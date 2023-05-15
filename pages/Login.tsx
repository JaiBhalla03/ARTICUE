import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { FormEvent } from 'react';

export default function Login() {
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);

        await signIn('credentials', {
            username: form.get('username'),
            password: form.get('password'),
            callbackUrl: '/',
        });
    }
    return (
        <div className='bg-gray-950 text-white py-8 px-4 pt-4 sm:px-16 md:px-24 lg:px-28 sm:py-4 md:pt-20'>
            <div className={'relative shadow-gray-800 shadow-sm py-8 px-6'}>
                <h2 className={'text-5xl md:mx-10 font-bold'}>Login</h2>
                <form
                    className={'mt-4 flex flex-col p-4 md:mx-10'}
                    onSubmit={handleSubmit}>
                    <input
                        className={'bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full'}
                        type='text'
                        id='username'
                        placeholder={'Enter your username'}
                        name='username' required />
                    <input
                        className={'bg-gray-950 border-none focus:outline-none focus:border-none shadow-gray-800 shadow-sm rounded-sm my-2 p-2 w-full'}
                        type='password'
                        id='password'
                        placeholder={'Enter your password'}
                        name='password' required />
                    <button
                        className="w-40 mx-auto mt-8 text-white p-2 text-xl transition-all duration-500 text-white bg-gray-950 shadow-sm shadow-gray-800 rounded-sm hover:scale-110 active:scale-90"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
                <p className={'md:mx-10'}>
                    Not registered yet? <Link className={'underline'} href='/Register'>Register here</Link>
                </p>
            </div>
        </div>
    );
}