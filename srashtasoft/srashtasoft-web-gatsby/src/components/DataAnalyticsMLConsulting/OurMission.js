import React from 'react';
import {Link} from 'gatsby'

import StarIcon from '../../assets/images/star-icon.png'
import OurMissionShape from '../../assets/images/our-mission/our-mission-shape2.png'
import OurMissionImg from '../../assets/images/our-mission/our-mission1.png'
import OurMissionShape1 from '../../assets/images/our-mission/our-mission-shape1.png'

const OurMission = () => {
    return (
        <section className="our-mission-area ptb-100">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12">
                        <div className="our-mission-content">
                            <div className="content">
                                <span className="sub-title">
                                    <img src={StarIcon} alt="image" /> 
                                    Our Mission
                                </span>
                                <h2>Data Science & Data Analysis Agency</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                                <ul className="our-mission-list">
                                    <li>
                                        <i className="flaticon-tick"></i>
                                        Global Experience
                                        <img src={OurMissionShape} alt="Our Mission Shape" />
                                    </li>
                                    <li>
                                        <i className="flaticon-tick"></i>
                                        Value for Results
                                        <img src={OurMissionShape} alt="Our Mission Shape" />
                                    </li>
                                    <li>
                                        <i className="flaticon-tick"></i>
                                        User Prespective
                                        <img src={OurMissionShape} alt="Our Mission Shape" />
                                    </li>
                                    <li>
                                        <i className="flaticon-tick"></i>
                                        Business Prespective
                                        <img src={OurMissionShape} alt="Our Mission Shape" />
                                    </li>
                                    <li>
                                        <i className="flaticon-tick"></i>
                                        Expert Prepective
                                        <img src={OurMissionShape} alt="Our Mission Shape" />
                                    </li>
                                    <li>
                                        <i className="flaticon-tick"></i>
                                        Retail Solutions
                                        <img src={OurMissionShape} alt="Our Mission Shape" />
                                    </li>
                                </ul>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>

                                <Link to="/about-us-two" className="default-btn">
                                    <i className="flaticon-right"></i> Read More <span></span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="our-mission-image">
                            <img src={OurMissionImg} alt="image" />
                            <div className="shape">
                                <img src={OurMissionShape1} alt="image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurMission;