import React from 'react';
import { Link } from 'react-router-dom';

export function UnAuthorized() {

    return (
        <div className="flex flex-col flex-grow h-full">
            <div className="justify-center m-auto">
                <div className="flex flex-row">
                    <div class="flex-grow px-8 pt-6 pb-8 mb-4">
                        <div class="flex-grow mb-6 text-gray-700 text-base text-lg">
                            <p>
                                <span>You have here because you wanted to be connected.</span>
                                <a className="text-blue-500" href={'https://www.youtube.com/watch?v=afnWirF-VV0'} target="_blank"> Its ok to find a friend to lean on and talk it out.</a>
                            </p>
                            <p>Your conversations are just few clicks away. </p>
                            <p>If you have already joined, start by <span class="font-bold">signing-in</span>, else not worry much. Just <span class="font-bold">sign-up</span>, with new a new username and sign-in.</p>
                            <p>Happy Conversations !!</p>
                        </div>

                        <div class="flex items-center justify-evenly mb-6">
                            <Link class="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800" to={'/signup'}> Sign Up </Link>
                            <Link class="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800" to={'/signin'}> Sign In </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



