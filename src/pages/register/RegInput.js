import React from 'react'

const RegInput = ({ label, value, onChange, ...props }) => {
    return (<div className='reg_input' >
        <p className='label' >{label}</p>
        <input
            className='input_reg'
            value={value}
            onChange={onChange}
            {...props}
        />
    </div>)
}


export default RegInput