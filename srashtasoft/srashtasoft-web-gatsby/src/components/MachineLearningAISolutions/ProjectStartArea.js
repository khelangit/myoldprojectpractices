import React from 'react';
import {Link} from 'gatsby'

import ProjectStart1 from '../../assets/images/project-start1.png'
import CircleShape1 from '../../assets/images/shape/circle-shape1.png'

const ProjectStartArea = () => {
    return (
        <div className="project-start-area ptb-100">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12">
                        <div className="project-start-image">
                            <img src={ProjectStart1} alt="image" />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="project-start-content">
                            <h2>We Like to Start Your Project With Us</h2>
                            <p>Ready to build your custom application solution? Send us your requirement on info@srashtasoft.com
or call on +(91) 9898582705</p>
                            
                            <Link to="/contact" className="default-btn">
                                <i className="flaticon-web"></i> 
                                Get Started 
                                <span></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="circle-shape1">
                <img src={CircleShape1} alt="image" />
            </div>
        </div>
    )
}

export default ProjectStartArea;