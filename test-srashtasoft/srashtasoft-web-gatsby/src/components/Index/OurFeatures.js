import React from 'react'

import {Link,graphql, useStaticQuery, } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import starIcon from '../../assets/images/star-icon.png'
import serviceIcon1 from '../../assets/images/services/service-icon1.png'
import serviceIcon2 from '../../assets/images/services/service-icon2.png'
import serviceIcon3 from '../../assets/images/services/service-icon3.png'
import serviceIcon4 from '../../assets/images/services/service-icon4.png'
import serviceIcon5 from '../../assets/images/services/service-icon5.png'
import serviceIcon6 from '../../assets/images/services/service-icon6.png'

const query = graphql`
    {
        allStrapiCompanyFeatures(limit: 6) {
            edges {
              node {
                title
                description
                img {
                  localFile {
                    childImageSharp {
                      original {
                        src
                      }
                    }
                  }
                }
                id
              }
            }
          }
    }
`
const OurFeatures = () => {
    const data = useStaticQuery(query)
    const features = data.allStrapiCompanyFeatures.edges
    return (
        <section className="services-area  ">
            <div className="container">

                <div className="" style={{padding: '10px', textAlign: 'center'}}>
                <h2>Our features</h2>
                </div>
                <p style={{textAlign: 'center'}}>We offer Application Development & Enterprise Mobile Applications utilizing Technologies.</p>

                <div className="row">

                {features.map(feature => (
                    <div className="col-lg-4 col-sm-6" key={feature.node.id}>
                        <div className="single-solutions-box">
                        <div className="main-single-solutions-box">

                            <div className="icon">
                                {/* <i className="flaticon-rocket"></i> */}
                                {/* <GatsbyImage image={getImage(feature.node.img.localFile)} alt="img" /> */}
                                <img src={feature.node.img.localFile.childImageSharp.original.src}/>
                            </div>
                            <h3 className="our-features-h3">
                                    {feature.node.title}
                            </h3>
                            <p className="our-features-p">{feature.node.description}</p>
                           <p className="our-features-subp"><a href="https://srashtasoft.vercel.app/services">LEARN MORE</a></p>
                        </div>
                        </div>
                    </div>
                ))}
                    {/* <div className="col-lg-4 col-sm-6">
                        <div className="single-services-item-box">
                            <div className="icon">
                                <img src={serviceIcon2} alt="feature" />
                            </div>
                            <h3>Email Notifications</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-sm-6">
                        <div className="single-services-item-box">
                            <div className="icon">
                                <img src={serviceIcon3} alt="feature" />
                            </div>
                            <h3>Simple Dashboard</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-sm-6">
                        <div className="single-services-item-box">
                            <div className="icon">
                                <img src={serviceIcon4} alt="feature" />
                            </div>
                            <h3>Information Retrieval</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-sm-6">
                        <div className="single-services-item-box">
                            <div className="icon">
                                <img src={serviceIcon5} alt="feature" />
                            </div>
                            <h3>Drag and Drop</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-sm-6">
                        <div className="single-services-item-box">
                            <div className="icon">
                                <img src={serviceIcon6} alt="feature" />
                            </div>
                            <h3>Deadline Reminders</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default OurFeatures