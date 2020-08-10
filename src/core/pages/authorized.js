import React from 'react';
import { Members, Connection } from '../components'

/**
 * Immediate component rendered when user has authenticated... 
 */
export function Authorized() {

    return (
        <div className="h-full flex">
            <Members className="w-1/4 overflow-auto" />
            <Connection className="w-3/4 border-l-2 flex flex-col" />
        </div>
    );
}