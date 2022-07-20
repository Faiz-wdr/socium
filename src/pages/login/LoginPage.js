import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PrimaryBtn } from '../../components/Button/Buttons'
import NavBar from '../../components/Navbar/NavBar'
import './login.css'
import Bgimg from '../../assets/images/landing.png'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'

function LoginPage() {

    const navigate = useNavigate()

    const [selectedBtn, setSelectedBtn] = useState('student')
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


    const signInHandler = () => {
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate('/student_dashboard')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <div className='login'
            style={{
                backgroundImage: `url(${Bgimg})`,
                backgroundPosition: 'center',
                backgroundSize: '100%'
            }}
        >
            <NavBar />
            <div className='content' >
                <div className='sub_1' >
                    <h1>Find Your Real <br /> Learning Partner</h1>
                    <PrimaryBtn label={'Register Now'}
                        onClick={() => navigate('/register')}
                    />
                </div>
                <div className='sub_2'>
                    <div>
                        <div

                            className='btn_wpr' >
                            <div
                                onClick={() => setSelectedBtn('student')}
                                style={{
                                    backgroundColor: selectedBtn == 'student' ? '#3FFF75' : 'transparent',
                                    color: selectedBtn == 'student' ? 'black' : 'white'
                                }}
                            >Student
                            </div>
                            <div
                                onClick={() => setSelectedBtn('admin')}
                                style={{
                                    backgroundColor: selectedBtn != 'student' ? '#3FFF75' : 'transparent',
                                    color: selectedBtn != 'student' ? 'black' : 'white'
                                }}
                            >Admin
                            </div>
                        </div>
                        <input className='input'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                        <input className='input'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                        />
                        <PrimaryBtn label='Login' onClick={signInHandler} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage