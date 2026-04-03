import React from 'react'
import { Link } from 'gatsby'
import starIcon from '../../assets/images/star-icon.png'
import team5 from '../../assets/images/team/team5.jpg'
import team6 from '../../assets/images/team/team6.jpg'
import team7 from '../../assets/images/team/team7.jpg'

const TeamMembers = () => {
    return (
        <section className="scientist-area pt-100 pb-70">
            <div className="container">
                <div className="section-title">
                    <span className="sub-title">
                        <img src={starIcon} alt="testimonials" /> 
                        Team Members
                    </span>
                    <h2>Our Awesome Team</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-sm-6">
                        <div className="single-scientist-item-box">
                            <div className="image">
                                <img src={team5} alt="testimonials" />

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
                                <span>CEO & Founder</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="single-scientist-item-box">
                            <div className="image">
                                <img src={team6} alt="testimonials" />

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
                                <span>UX/UI Designer</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6 offset-lg-0 offset-sm-3">
                        <div className="single-scientist-item-box">
                            <div className="image">
                                <img src={team7} alt="testimonials" />

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
                                <span>Web Developer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TeamMembers