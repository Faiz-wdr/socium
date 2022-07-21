import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { auth } from './firebase'

import LoginPage from './pages/login/LoginPage'
import PartNerSelection from './pages/partnerSelection/PartNerSelection'
import Register from './pages/register/Register'
import StudentDashBoard from './pages/studentDashBoard/StudentDashBoard'
function Router() {

    const [loading, setLoading] = useState(true)

    const authChange = async () => {
        onAuthStateChanged(auth, (user) => {
            setLoading(false)
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
            } else {
                // User is signed out
                // ...
            }
        });

    }

    useEffect(() => {
        authChange()
        return () => authChange()
    }, [])

    if (loading) {
        return
    }

    return (

        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/partner" element={<PartNerSelection />} />
            <Route path="/student_dashboard" element={<StudentDashBoard />} />
        </Routes>

    )
}

export default Router