import React from 'react'
import {Link,graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import starIcon from '../../assets/images/star-icon.png'
import client1 from '../../assets/images/testimonials/client1.jpg'
import client2 from '../../assets/images/testimonials/client2.jpg'
import client3 from '../../assets/images/testimonials/client3.jpg'
import shape from '../../assets/images/shape/shape1.svg'

const TestimonialsStyleTwo = ({testimonials}) => {
    return (
        <div className="testimonials-area pt-100 pb-70 bg-fafafb">
            <div className="container">
                <div className="section-title">
                    <span className="sub-title">
                        <img src={starIcon} alt="about" /> 
                        Testimonials
                    </span>
                    <h2>What Our Clients are Saying?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                </div>

                <div className="row">

                    {testimonials.map((doc,i) => (
                        <div className="col-lg-6 col-md-6">
                        <div className="single-testimonials-box">
                            {/* <GatsbyImage image={getImage(doc.person_img.localFile)}className="shadow-sm" alt="about" /> */}
                            <img src={client1} className="shadow-sm" alt="about" />
                            <p>{doc.content}</p>
                            <div className="client-info">
                                <h3>{doc.person_name}</h3>
                                <span>{doc.person_tagline}</span>
                            </div>
                        </div>
                    </div>
                    ))}
                    

                    
                </div>
            </div>

            <div className="shape-img1">
                <img src={shape} alt="about" />
            </div>
        </div>
    )
}

export default TestimonialsStyleTwo