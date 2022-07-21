import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryBtn, SecondaryBtn } from '../../components/Button/Buttons'
import { auth, db } from '../../firebase'
import { logout } from '../../helpers/logout'
import './partNerSelection.css'


const PartNerSelection = () => {

    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [myData, setMyData] = useState({})
    const [selectedUser, setSelectedUser] = useState()
    const [loading, setLoading] = useState(false)


    const submitHandler = async () => {
        if (!selectedUser) {
            alert('Select one partner')
            return
        }
        setLoading(true)
        updateHandler(selectedUser, myData.id)
        updateHandler(myData, selectedUser.id)
    }

    const updateHandler = async (user, updateUserId) => {
        try {
            const washingtonRef = doc(db, "Users", updateUserId);

            await updateDoc(washingtonRef, {
                partner: {
                    name: user.name,
                    RegisterNo: user.RegisterNo,
                    email: user.email,
                    interest: user.interest,
                    experience: user.experience,
                    teamId: user.email.substring(0, 3) + user.RegisterNo.substring(0, 3)
                }
            });


            navigate('/student_dashboard')
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const getMyData = async () => {
        setLoading(true)

        const q = query(collection(db, "Users"), where("email", "==", auth?.currentUser?.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {


            setMyData({ id: doc.id, ...doc.data() })
            setLoading(false)

        });
    }

    const getAllUsers = async () => {
        let tempUsers = []
        const q = query(collection(db, "Users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            tempUsers.push({ id: doc.id, ...doc.data() })
        });
        setUsers(tempUsers)
    }

    useEffect(() => {
        getAllUsers()
        if (auth?.currentUser?.email) {
            getMyData()


        }
    }, [auth?.currentUser?.email])

    if (loading) return

    return (
        <div className='partner' >
            <div style={{ position: 'absolute', top: 20, right: 20 }} >
                <PrimaryBtn onClick={logout} label={'Logout'} />
            </div>
            <h1>Select Your Learning Partner</h1>
            <p className='sub_title' >Showing the list of students  with same interset</p>

            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Interested Area</th>
                    <th>Experience</th>
                </tr>
                {users.map(user => {
                    if (user?.email == auth.currentUser.email) return
                    if (user?.interest != myData.interest) return
                    return <tr style={{ cursor: 'pointer', ...(selectedUser?.email == user.email && { backgroundColor: '#02b920' }) }}
                        onClick={() => setSelectedUser(user)}
                    >
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>{user?.interest}</td>
                        <td>{user?.experience}</td>
                    </tr >
                })}

            </table>
            <div className="btn_wrpr">
                <div style={{ marginRight: 10 }} >
                    <SecondaryBtn  onClick={logout} label='Cancel' />
                </div>
                <PrimaryBtn label='Submit' onClick={submitHandler} />
            </div>

        </div>
    )
}

export default PartNerSelection