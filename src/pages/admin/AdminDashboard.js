import React, { useEffect, useState } from 'react'
import { PrimaryBtn, SecondaryBtn } from '../../components/Button/Buttons'
import './adminDashboard.css'
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../helpers/logout';

const AdminDashBoard = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false)
    const [students, setStudents] = useState([])


    const getAllStudents = async () => {
        setLoading(true)

        let tempStu = []
        const q = query(collection(db, "Users"));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {

            tempStu.push({ id: doc.id, ...doc.data() })

        });
        setStudents(tempStu)
        setLoading(false)
    }

    const getUserData = async () => {
        setLoading(true)

        const q = query(collection(db, "Users"), where("email", "==", auth.currentUser.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // if (doc.data().isAdmin) {
            //     navigate('/admin')
            // }
            // else if (doc.data().partner) {
            setUserData({ id: doc.id, ...doc.data() })
            setLoading(false)
            // } else {
            //     navigate('/partner')
            // }
        });
        setLoading(false)
    }
    const experienceLinkHandler = () => {
        if (userData.interest == 'Python') {
            window.open('https://olivine-planet-59a.notion.site/Python-de6e9534d2284156aa76883981d95caf')
        } else if (userData.interest == 'Flutter') {
            window.open('https://olivine-planet-59a.notion.site/Flutter-5e599c91368c419280518c885b884eae')
        }
        else if (userData.interest == 'Machine Learning') {
            window.open('https://olivine-planet-59a.notion.site/Machine-Learning-0a2ef29c831b4e33a4b38cb997ebf75c')
        }
        else if (userData.interest == 'UI/UX') {
            window.open('https://olivine-planet-59a.notion.site/UI-UX-6608155473b545269f7b5923f8a90616')
        }
        else if (userData.interest == 'Cyber Security') {
            window.open('https://olivine-planet-59a.notion.site/Cyber-Security-32c354cea06a4640ac2b924a0798433e')
        }
    }
    useEffect(() => {
        getAllStudents()
        getUserData()
    }, [auth?.currentUser?.email])
    // if (loading) return
    return (
        <div className='adminDashboard' >
            <div style={{ position: 'absolute', top: 20, right: 20 }} >
                <SecondaryBtn onClick={logout} label={'Logout'} />
            </div>

            <div className="header">
                <div className="sub_1">
                    <p className='id' >Admin</p>
                    <h1>A34RT</h1>
                </div>
                {/* <h2
                    onClick={experienceLinkHandler}
                >{userData?.interest}</h2> */}
            </div>
            <div className='team_wrpr' >
                <p className='id ' style={{ alignSelf: 'flex-start', marginBottom: 20 }} >Student Details</p>
                <table>


                    {students.map((stu) =>
                        <tr>
                            <th>{stu.name}</th>
                            <th>{stu.email}</th>
                            <th>{stu.interest}</th>
                            <th>{stu.experience}</th>
                        </tr>
                    )}


                </table>
                {/* <PrimaryBtn label={'Connect Partner'} onClick={() => window.location.href = ('mailto:' + userData?.partner?.email)} /> */}
            </div>
            <div style={{ flex: 1 }} />
            <footer>
                {/* <h3
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.location.href = 'https://olivine-planet-59a.notion.site/Learning-Resources-44e6636df76a4fa08439af67176aec00'}
                >Learning Resources</h3> */}
                <h3
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.open('https://airtable.com/shrYKwSS5wGdhQNEY')}
                >Suggestions</h3>
                <h3
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.open('https://airtable.com/shrInjTc1F4GiUzbS')}
                >Reports</h3>
            </footer>
        </div>
    )
}

export default AdminDashBoard