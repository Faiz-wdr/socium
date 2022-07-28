import React from 'react'
import Bgimg from '../../assets/images/landing.png'
import './about.css'
import { ElfsightWidget } from 'react-elfsight-widget';
const About = () => {
    return (
        <div className='about'
            style={{
                backgroundImage: `url(${Bgimg})`,
                backgroundPosition: 'center',
                backgroundSize: '100%',
                paddingTop: 100

            }}
        >
            <ElfsightWidget widgetID="f54142c6-ae3d-4041-a8b4-f534daf6f211" />
        </div>
    )
}

export default About