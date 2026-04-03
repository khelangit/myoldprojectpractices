import React from 'react';
import {Link} from 'gatsby'

import StarIcon from '../../assets/images/star-icon.png'
import Scientist12 from '../../assets/images/scientist/scientist12.jpg'
import Scientist13 from '../../assets/images/scientist/scientist13.jpg'
import Scientist14 from '../../assets/images/scientist/scientist14.jpg'
import Scientist15 from '../../assets/images/scientist/scientist15.jpg'

const TeamMember = () => {
    return (
        <section className="scientist-area pt-100 pb-70">
            <div className="container">
                <div className="section-title">
                    <span className="sub-title">
                        <img src={StarIcon} alt="image" /> 
                        Team Members
                    </span>
                    <h2>Our Data Scientist</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                </div>

                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="single-scientist-item-box">
                            <div className="image">
                                <img src={Scientist12} alt="Scientist" />

                                <ul className="social">
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-facebook'></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-twitter'></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-instagram'></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-linkedin'></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="content">
                                <h3>Merv Adrian</h3>
                                <span>Data Management</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="single-scientist-item-box">
                            <div className="image">
                                <img src={Scientist13} alt="Scientist" />

                                <ul className="social">
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-facebook'></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-twitter'></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-instagram'></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-linkedin'></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="content">
                                <h3>Kirk Borne</h3>
                                <span>Data Scientist</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="single-scientist-item-box">
                            <div className="image">
                                <img src={Scientist14} alt="Scientist" />

                                <ul className="social">
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-facebook'></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-twitter'></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-instagram'></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-linkedin'></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="content">
                                <h3>Carla Gentry</h3>
                                <span>Analytical Solutions</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="single-scientist-item-box">
                            <div className="image">
                                <img src={Scientist15} alt="Scientist" />

                                <ul className="social">
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-facebook'></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-twitter'></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-instagram'></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-block" target="_blank">
                                            <i className='bx bxl-linkedin'></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="content">
                                <h3>Marie Curie</h3>
                                <span>Data Scientist</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TeamMember;