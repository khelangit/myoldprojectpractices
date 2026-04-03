import React from 'react'

import { Link, graphql, useStaticQuery, } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import service4 from '../../assets/images/services/service4.png'
import service5 from '../../assets/images/services/service5.png'
import service6 from '../../assets/images/services/service6.png'

const query = graphql`
    {
        allStrapiTechnologies {
            group(field: tech_category___name) {
              fieldValue
              totalCount
              nodes {
                slug
                name
                id
                logo {
                    localFile {
                      childImageSharp {
                        original {
                          src
                        }
                      }
                    }
                  }
              }
            }
          }
    }
`

const Services = () => {
    const data = useStaticQuery(query)
    const technologies = data.allStrapiTechnologies.group
    return (
        <section className="overview-area ptb-100 pt-0">

            <div className="container">
            <div className="row">
        
                {/* Left Image Style */}
                <div className="overview-box">
                    <div className="overview-image">
                        <div className="image">
                            <img src={service4} alt="features" />
                        </div>
                    </div>

                    <div className="overview-content">
                        <div className="content right-content">
                            <span className="sub-title">Design & Development</span>
                            <h2>Solving problems, building brands</h2>
                            <p>We believe brand interaction is key in communication. Real innovations and a positive customer experience are the heart of successful communication.</p>

                            <ul className="features-list">
                                {technologies.find(i => i.fieldValue === "mobile")?.nodes?.map(tech => (
                                    <li key={tech.td} style={{ cursor: "pointer" }}>
                                        <Link to={`/services/mobile-application-development/${tech.slug}/`}>
                                            <span>
                                                <img width="25px" src={tech.logo?.localFile.childImageSharp?.original.src} alt={tech.name} style={{ marginRight: "10px" }} />  {`  ${tech.name}`}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                                {/* <li><span><i className='bx bx-check'></i> Recommender systems</span></li>
                                <li><span><i className='bx bx-check'></i> Demand prediction</span></li>
                                <li><span><i className='bx bx-check'></i> Omnichannel analytics</span></li>
                                <li><span><i className='bx bx-check'></i> Lead generation</span></li>
                                <li><span><i className='bx bx-check'></i> Dedicated Developers</span></li>
                                <li><span><i className='bx bx-check'></i> 24/7 Support</span></li> */}
                            </ul>
                        </div>
                    </div>
                </div>

                </div>
                {/* End Left Image Style */}

                {/* Right Image Style */}
                <div className="row">
                <div className="overview-box">
                    <div className="overview-content">
                        <div className="content">
                            <span className="sub-title">Digital Media Marketing </span>
                            <h2>Solving problems, building brands</h2>
                            {/* <h2>We are the next generation of the advertising world</h2> */}
                            {/* <p>The new generation of customers is more mobile, technologically savvy and sensitive to the way companies behave. Focus your marketing efforts on what next generation customers care about, how they communicate and what type of marketing campaigns will blow their minds.</p> */}

                            <div className="features-text">
                                <h4><i className="flaticon-tick"></i> SEO</h4>
                                <p>Search engine optimization is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic.</p>
                            </div>

                            <div className="features-text">
                                <h4><i className="flaticon-tick"></i> PPC</h4>
                                <p>Pay-per-click is an internet advertising model used to drive traffic to websites, in which an advertiser pays a publisher when the ad is clicked. Pay-per-click is commonly associated with first-tier search engines.</p>
                            </div>

                            <div className="features-text">
                                <h4><i className="flaticon-tick"></i> SMO</h4>
                                <p>Social media optimization is the use of a number of outlets and communities to generate publicity to increase the awareness of a product, service brand or event.</p>
                            </div>
                        </div>
                    </div>

                    <div className="overview-image">
                        <div className="image">
                            <img src={service5} alt="features" />
                        </div>
                    </div>
                </div>
                </div>
                {/* End Right Image Style */}

                {/* Left Image Style */}
                <div className="row">
                <div className="overview-box reverce">
                    <div className="overview-image">
                        <div className="image">
                            <img src={service6} alt="features" />
                        </div>
                    </div>

                    <div className="overview-content">
                        <div className="content right-content">
                            <span className="sub-title">Web Designing & Development</span>
                            <h2>Solving problems, building brands</h2>
                            <p>We have the solution, the cure to every ailing brand. Our approach has been proven to offer solutions to marketing problems.</p>

                            <ul className="features-list">
                                {technologies.find(i => i.fieldValue === "web")?.nodes?.map(tech => (
                                    <li key={tech.td} style={{ cursor: "pointer" }}>
                                        <Link to={`/services/web-application-development/${tech.slug}/`}><span>
                                            {/* {tech.logo ? <GatsbyImage width="1px" image={getImage(tech.logo.localFile)} alt="project" />:<i className='bx bx-check'></i>  } */}
                                            <img width="25px" src={tech.logo?.localFile.childImageSharp?.original.src} alt={tech.name} style={{ marginRight: "10px" }} />  {`  ${tech.name}`}
                                        </span>
                                        </Link>
                                    </li>
                                ))}
                                {technologies.find(i => i.fieldValue === "eccomerce")?.nodes?.map(tech => (
                                    <li key={tech.td} style={{ cursor: "pointer" }}>
                                        <Link to={`/services/eccomerce-development/${tech.slug}/`}><span>
                                            {/* {tech.logo ? <GatsbyImage width="1px" image={getImage(tech.logo.localFile)} alt="project" />:<i className='bx bx-check'></i>  } */}
                                            <img width="25px" src={tech.logo?.localFile.childImageSharp?.original.src} alt={tech.name} style={{ marginRight: "10px" }} />  {`  ${tech.name}`}
                                        </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
                     {/* End Left Image Style */}
            
            </div>
        </section>
    )
}

export default Services