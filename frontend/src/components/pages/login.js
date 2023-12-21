import React, { useState } from 'react';
import axios from 'axios';
import '../../CSS/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
import Home from '../pages/home'

function Form() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:7000/', {
                username,
                password
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='back'>
            <form onSubmit={handleSubmit}>
                <h4>Login <FontAwesomeIcon icon={faUser}/></h4>
                <label>
                   <span className='distance'>Username:</span> 
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name='username'/>
                </label><br></br>
                <label>
                    <span className='distance'>Password:</span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name='password' />
                </label>
                <Link to="/home" element={<Home />}><button type="submit">Submit</button></Link>
            </form>
        </div>
    );
}

export default Form;
