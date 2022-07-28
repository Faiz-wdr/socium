import React from 'react'
import './button.css'


export const PrimaryBtn = ({ label, onClick, style }) => {
    return (
        <div
            className='primary_btn'
            onClick={onClick}
            style={style}
        >
            <p>{label}</p>
        </div>
    )
}

export const SecondaryBtn = ({ label, onClick }) => {
    return (
        <div
            className='secondary_btn'
            onClick={onClick}
        >
            <p>{label}</p>
        </div>
    )
}
