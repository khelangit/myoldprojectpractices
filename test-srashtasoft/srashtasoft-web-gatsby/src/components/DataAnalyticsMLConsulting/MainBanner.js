import React from 'react';
import {Link} from 'gatsby'
import ReactWOW from 'react-wow';

import MainImage from '../../assets/images/main-banner/main-pic1.png'

const MainBanner = () => {
    return (
        <div className="main-banner-area">
            <div className="container">
                <div className="banner-area-content">
                    <ReactWOW delay='.1s' animation='fadeInLeft'>
                        <h1>Big Data, AI & ML Consulting!</h1>
                    </ReactWOW>

                    <ReactWOW delay='.1s' animation='fadeInLeft'>
                        <p>Get all kinds of hi-tech decesion making consulting services using Artificial Intelligence and Machine Learning from one umbrella.</p>
                    </ReactWOW>

                    <ReactWOW delay='.1s' animation='fadeInRight'>
                        <div className="banner-btn">
                            <Link to="/contact" className="default-btn">
                                <i className="flaticon-web"></i> 
                                Work With Us <span></span>
                            </Link>
                        </div>
                    </ReactWOW>

                    <ReactWOW delay='.1s' animation='fadeInUp'>
                        <img src={MainImage} alt="image" />
                    </ReactWOW>
                </div>
            </div>
        </div>
    )
}

export default MainBanner;