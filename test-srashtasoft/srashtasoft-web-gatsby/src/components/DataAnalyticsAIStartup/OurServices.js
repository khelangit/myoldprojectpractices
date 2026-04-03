import React from 'react'
import { Link } from 'gatsby'
import starIcon from '../../assets/images/star-icon.png'
import icon1 from '../../assets/images/services/service-icon1.png'
import icon2 from '../../assets/images/services/service-icon2.png'
import icon3 from '../../assets/images/services/service-icon3.png'
import icon4 from '../../assets/images/services/service-icon4.png'
import icon5 from '../../assets/images/services/service-icon5.png'
import icon6 from '../../assets/images/services/service-icon6.png'
import shape1 from '../../assets/images/services/service-shape1.png'
import shape2 from '../../assets/images/services/service-shape2.png'

const OurServices = () => {
    return (
        <section className="services-area ptb-100 bg-e3fbff">
            <div className="container">
                <div className="section-title">
                    <span className="sub-title">
                        <img src={starIcon} alt="image" /> 
                        Our Services
                    </span>
                    <h2>We Offer Professional Solutions For Business</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="single-services-item">
                            <div className="icon">
                                <img src={icon1} alt="image" />
                            </div>
                            <h3>
                                <Link to="/service-details">
                                    Customer Analytics
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna doloresssit amet aliqua.</p>
                                
                            <Link to="/service-details" className="default-btn">
                                <i className="flaticon-right"></i> 
                                Read More <span></span>
                            </Link>

                            <div className="shape1">
                                <img src={shape1} alt="image" />
                            </div>
                            <div className="shape2">
                                <img src={shape2} alt="image" />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="single-services-item">
                            <div className="icon">
                                <img src={icon2} alt="image" />
                            </div>
                            <h3>
                                <Link to="/service-details">
                                    Risk Analytics
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna doloresssit amet aliqua.</p>

                            <Link to="/service-details" className="default-btn">
                                <i className="flaticon-right"></i> 
                                Read More <span></span>
                            </Link>
                            
                            <div className="shape1">
                                <img src={shape1} alt="image" />
                            </div>
                            <div className="shape2">
                                <img src={shape2} alt="image" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="single-services-item">
                            <div className="icon">
                                <img src={icon3} alt="image" />
                            </div>
                            <h3>
                                <Link to="/service-details">
                                    Social Media Analytics
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna doloresssit amet aliqua.</p>
                            
                            <Link to="/service-details" className="default-btn">
                                <i className="flaticon-right"></i> 
                                Read More <span></span>
                            </Link>
                            
                            <div className="shape1">
                                <img src={shape1} alt="image" />
                            </div>
                            <div className="shape2">
                                <img src={shape2} alt="image" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="single-services-item">
                            <div className="icon">
                                <img src={icon4} alt="image" />
                            </div>
                            <h3>
                                <Link to="/service-details">
                                    Real Time Analytics
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna doloresssit amet aliqua.</p>
                            
                            <Link to="/service-details" className="default-btn">
                                <i className="flaticon-right"></i> 
                                Read More <span></span>
                            </Link>
                            
                            <div className="shape1">
                                <img src={shape1} alt="image" />
                            </div>
                            <div className="shape2">
                                <img src={shape2} alt="image" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="single-services-item">
                            <div className="icon">
                                <img src={icon5} alt="image" />
                            </div>
                            <h3>
                                <Link to="/service-details">
                                    Big Data Analytics
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna doloresssit amet aliqua.</p>
                            
                            <Link to="/service-details" className="default-btn">
                                <i className="flaticon-right"></i> 
                                Read More <span></span>
                            </Link>
                            
                            <div className="shape1">
                                <img src={shape1} alt="image" />
                            </div>
                            <div className="shape2">
                                <img src={shape2} alt="image" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="single-services-item">
                            <div className="icon">
                                <img src={icon6} alt="image" />
                            </div>
                            <h3>
                                <Link to="/service-details">
                                    Business Analytics
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna doloresssit amet aliqua.</p>
                            
                            <Link to="/service-details" className="default-btn">
                                <i className="flaticon-right"></i> 
                                Read More <span></span>
                            </Link>
                            
                            <div className="shape1">
                                <img src={shape1} alt="image" />
                            </div>
                            <div className="shape2">
                                <img src={shape2} alt="image" />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                        <div className="load-more-btn text-center">
                            <Link to="/services" className="default-btn">
                                <i className="flaticon-refresh"></i> 
                                Load More <span></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurServices