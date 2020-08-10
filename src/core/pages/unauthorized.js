import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Immediate component rendered for unauthenticated user... 
 */
export function UnAuthorized() {

    return (
        <div className="h-full flex flex-col flex-grow">
            <div className="justify-center m-auto">
                <div class="flex-grow mb-6 text-gray-700 text-base text-xl">
                    <p>
                        <span>You have here because you wanted to be connected.</span>
                        <a className="text-blue-500" href={'https://www.youtube.com/watch?v=afnWirF-VV0'} target="_blank"> Its ok to find a friend to lean on and talk it out.</a>
                    </p>
                    <p>Your conversations are just few clicks away. </p>
                    <p>If you have already joined, start by <span class="font-bold">signing-in</span>, else not worry much. Just <span class="font-bold">sign-up</span>, with new a new username and sign-in.</p>
                    <p>Happy Conversations !!</p>
                </div>

                <div class="flex items-center justify-evenly align-baseline font-bold text-lg text-blue-500 ">
                    <Link class="hover:text-blue-800" to={'/signup'}> Sign Up </Link>
                    <Link class="hover:text-blue-800" to={'/signin'}> Sign In </Link>
                </div>
            </div>
        </div>
    );
}



