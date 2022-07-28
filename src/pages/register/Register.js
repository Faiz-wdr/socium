import React, { useState } from 'react'
import './register.css'
import Select from 'react-select'
import { PrimaryBtn, SecondaryBtn } from '../../components/Button/Buttons'
import bgImg from '../../assets/images/signup.png'
import RegInput from './RegInput'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
const Register = () => {

    const navigate = useNavigate()

    const [name, setName] = useState()
    const [RegisterNo, setRegisterNo] = useState()
    const [email, setEmail] = useState()
    const [interest, setInterest] = useState()
    const [experience, setExperience] = useState()
    const [password, setPassword] = useState()


    const interestedOptions = [
        { value: 'Flutter', label: 'Flutter' },
        { value: 'Python', label: 'Python' },
        { value: 'Machine Learning', label: 'Machine Learning' },
        { value: 'UI/UX', label: 'UI/UX' },
        { value: 'Cyber Security', label: 'Cyber Security' },
    ]

    const ExperienceOptions = [
        { value: 'Beginner', label: 'Beginner' },
        { value: 'InterMediate', label: 'InterMediate' },
        { value: 'Professional', label: 'Professional' },

    ]

    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'transparent', width: 150, marginLeft: 10, color: 'black', fontSize: 15, }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = 'gray'
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? 'blue'
                        : isFocused
                            ? color
                            : undefined,


                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? 'yellow'
                            : 'red'
                        : undefined,
                },
            };
        },
        // input: (styles) => ({ ...styles, }),
        // placeholder: (styles) => ({ ...styles, }),
        singleValue: (styles, { data }) => ({ ...styles, color: 'white' }),
    };

    const signUpHandler = async () => {
        if (!name || !RegisterNo || !email || !interest || !experience || !password) {
            alert('Fill All Fields')
            return
        }
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                uploadHandler()
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    const uploadHandler = async () => {
        try {
            const docRef = await addDoc(collection(db, "Users"), {
                name,
                RegisterNo,
                email,
                interest,
                experience
            })
            navigate('/student_dashboard')
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return (
        <div className='register' >
            <div>
                <img src={bgImg} className='bgImg' />
            </div>
            <div className='form' >
                <RegInput label={'Name'} value={name} onChange={(e) => setName(e.target.value)} />
                <RegInput label={'Register-No'} value={RegisterNo} onChange={(e) => setRegisterNo(e.target.value)} />
                <RegInput label={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@email.com' />

                <div className='dpdwn_container' >
                    <div className='dpdwn_wrpr'>
                        <p className='label'>Interested Area</p>
                        <Select

                            options={interestedOptions}
                            styles={colourStyles}
                            value={{ value: interest, label: interest }}
                            onChange={(e) => setInterest(e.value)}
                        />
                    </div>
                    <div className='dpdwn_wrpr'>
                        <p className='label'>Experience</p>
                        <Select
                            options={ExperienceOptions}
                            styles={colourStyles}
                            value={{ value: experience, label: experience }}
                            onChange={(e) => setExperience(e.value)}
                        />
                    </div>
                </div>
                <RegInput type='password' label={'Password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="btn_wrpr">
                    <div style={{ marginRight: 10 }} >
                        <SecondaryBtn label='Cancel' />
                    </div>
                    <PrimaryBtn label='Sign-UP' onClick={signUpHandler} />
                </div>
            </div>
            <p className='reserved' >© <span style={{ color: '#02b920' }} >Socium</span>. All Rights Resrved 2022</p>
        </div>
    )
}

export default Register