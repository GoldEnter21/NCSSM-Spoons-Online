import React, { Component } from 'react'
import { useState } from 'react';

export default function UserInput() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = () => {
        var user = {
            firstName: firstName,
            lastName: lastName,
            email: email
        };

        var obj = {
            user_table: []
        };
        obj.user_table.push(user);
        var json = JSON.stringify(obj);
        
        // var fs = require('fs');
        // fs.writeFile('../../../data_files/UserData.json', json, 'utf8');
        // fs.readFile('../../../data_files/UserData.json', 'utf8', function readFileCallback(err, data) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         obj = JSON.parse(data); //now it an object
        //         json = JSON.stringify(obj); //convert it back to json
        //         fs.writeFile('../../../data_files/UserData.json', json, 'utf8', callback); // write it back 
        //     }
        // })
        console.log(firstName + ":" + lastName + ":" + email);
    }

    return (
    <div>
        <label>
        First name:
        <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
        />
        </label>

        <label>
        Last name:
        <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
        />
        </label>

        <label>
        Email:
        <input
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        </label>
        {/* <label>
        <button onClick={() => setAge(ageAsNumber + 10)}>
            Add 10 years
        </button>
        </label> */}
        <label>
        <button onClick={() => handleSubmit()}>
            Submit
        </button>
        </label>
    </div>
    );
}

