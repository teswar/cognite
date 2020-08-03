import React from 'react';
import { api } from '../data';


export const Connection = (value) => {

    return (
        <div>
            <span>{value.first_name}</span>
            <span>{value.last_name}</span>
        </div>
    );
};


export const Connections = ({ userId }) => {

    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        api.users.get(userId).then((data) => setUsers(data));
    }, []);

    return (
        <div>
            {users.map(m => <Connection key={value.id} {...value} />)}
        </div>
    );
};