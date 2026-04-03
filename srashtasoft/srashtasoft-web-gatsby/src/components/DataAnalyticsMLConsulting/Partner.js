import React from 'react';
import ReactWOW from 'react-wow';

import Partner1 from '../../assets/images/partner/partner1.png'
import Partner2 from '../../assets/images/partner/partner2.png'
import Partner3 from '../../assets/images/partner/partner3.png'
import Partner4 from '../../assets/images/partner/partner4.png'
import Partner5 from '../../assets/images/partner/partner5.png'
import Partner6 from '../../assets/images/partner/partner6.png'

const Partner = () => {
    return (
        <div className="partner-area pt-100 pb-70 bg-f1f8fb">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-2 col-6 col-sm-4 col-md-4">
                        <ReactWOW delay='.1s' animation='fadeInUp'>
                            <div className="single-partner-item">
                                <img src={Partner1} alt="Partner" />
                            </div>
                        </ReactWOW>
                    </div>

                    <div className="col-lg-2 col-6 col-sm-4 col-md-4">
                        <ReactWOW delay='.2s' animation='fadeInUp'>
                            <div className="single-partner-item">
                                <img src={Partner2} alt="Partner" />
                            </div>
                        </ReactWOW>
                    </div>

                    <div className="col-lg-2 col-6 col-sm-4 col-md-4">
                        <ReactWOW delay='.3s' animation='fadeInUp'>
                            <div className="single-partner-item">
                                <div className="single-partner-item">
                                    <img src={Partner3} alt="Partner" />
                                </div>
                            </div>
                        </ReactWOW>
                    </div>

                    <div className="col-lg-2 col-6 col-sm-4 col-md-4">
                        <ReactWOW delay='.4s' animation='fadeInUp'>
                            <div className="single-partner-item">
                                <div className="single-partner-item">
                                    <img src={Partner4} alt="Partner" />
                                </div>
                            </div>
                        </ReactWOW>
                    </div>

                    <div className="col-lg-2 col-6 col-sm-4 col-md-4">
                        <ReactWOW delay='.5s' animation='fadeInUp'>
                            <div className="single-partner-item">
                                <div className="single-partner-item">
                                    <img src={Partner5} alt="Partner" />
                                </div>
                            </div>
                        </ReactWOW>
                    </div>

                    <div className="col-lg-2 col-6 col-sm-4 col-md-4">
                        <ReactWOW delay='.6s' animation='fadeInUp'>
                            <div className="single-partner-item">
                                <div className="single-partner-item">
                                    <img src={Partner6} alt="Partner" />
                                </div>
                            </div>
                        </ReactWOW>
                    </div>
                </div>
            </div>

            <div className="divider"></div>
        </div>
    )
}

export default Partner;