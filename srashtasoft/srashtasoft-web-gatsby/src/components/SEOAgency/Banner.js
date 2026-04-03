import React from 'react'
import ReactWOW from 'react-wow'
import { Link } from 'gatsby'
import bannerImg2 from '../../assets/images/banner-img2.png'

const Banner = () => {
    return (
        <div className="seo-agency-banner">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-12">
                        <div className="banner-wrapper-content">
                            <span className="sub-title">SEO Agency</span>
                            <ReactWOW delay='.1s' animation='fadeInLeft'>
                                <h1>Creative & Strategic Digital SEO Agency</h1>
                            </ReactWOW>

                            <ReactWOW delay='.1s' animation='fadeInLeft'>
                                <p>We have created a cloud based tool to do your all boring tasks related to data analysis and decesion making based on the nature of data!</p>
                            </ReactWOW>

                            <ReactWOW delay='.1s' animation='fadeInRight'>
                                <div className="btn-box">
                                    <Link to="/about-us" className="default-btn">
                                        <i className="flaticon-right"></i> 
                                        About Us 
                                        <span></span>
                                    </Link>
                                </div>
                            </ReactWOW>
                        </div>
                    </div>

                    <div className="col-lg-7 col-md-12">
                        <ReactWOW delay='.1s' animation='fadeInUp'>
                            <div className="banner-wrapper-image">
                                <img src={bannerImg2} alt="banner" />
                            </div>
                        </ReactWOW>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner