import React from "react"
import Layout from "../components/App/Layout"
import Navbar from "../components/App/Navbar"
import PageBanner from "../components/Common/PageBanner"
import Footer from "../components/App/Footer"
//import ServicesOne from '../components/Services/ServicesOne'
import StartProject from "../components/Common/StartProject"
import { Link, graphql, useStaticQuery } from "gatsby"
//import { GatsbyImage, getImage } from "gatsby-plugin-image"

const query = graphql`
  {
    allStrapiTechnologies {
      group(field: tech_category___name) {
        fieldValue
        totalCount
        nodes {
          title
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
    <Layout>
      <Navbar />
      <PageBanner
        pageTitle="Services"
        homePageText="Home"
        homePageUrl="/"
        activePageText="Services"
      />
      <Technologies technologies={technologies} />
      {/* <ServicesOne /> */}
      <StartProject />
      <Footer />
    </Layout>
  )
}

export default Services

const Technologies = ({ technologies }) => {
  return (
    <section className="pricing-area pb-70 bg-f4f7fe">
      <div className="container" style={{ paddingBottom: "20px" }}>
        <div className="" style={{ padding: "10px", textAlign: "center" }}>
          <h2>Services That We Provide</h2>
        </div>
        <p>
          Srashtasoft is a “team” of high-end professionals having expertise in
          web-eCommerce-software-app design and development. We focus on
          development ranging from eCommerce website development to software
          ERP, CRM development to CMS development, Web app development up to IoT
          (Internet of Things).
        </p>

        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="single-pricing-box">
              <div className="pricing-header">
                <h3>Web Technologies</h3>
              </div>

              <ul className="pricing-features">
                {technologies
                  .find(i => i.fieldValue === "web")
                  ?.nodes?.map(tech => (
                    <li key={tech.id}>
                      <Link
                        to={`/services/web-application-development/${tech.slug}/`}
                      >
                        <img
                          width="25px"
                          src={
                            tech.logo?.localFile.childImageSharp?.original.src
                          }
                          alt={tech.name}
                          style={{ marginRight: "10px" }}
                        />{" "}
                        {`    ${tech.name}`}
                      </Link>
                      {/* {tech.logo ? <GatsbyImage width="1px" image={getImage(tech.logo.localFile)} alt="project" />:(null)  } */}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-pricing-box">
              <div className="pricing-header">
                <h3>Mobile Apps</h3>
              </div>

              {/* <div className="price">
                                <sup>$</sup> 840 <sub>/ Per month</sub>
                            </div> */}

              <ul className="pricing-features">
                {technologies
                  .find(i => i.fieldValue === "mobile")
                  ?.nodes?.map(tech => (
                    <li key={tech.id}>
                      <Link
                        to={`/services/mobile-application-development/${tech.slug}/`}
                      >
                        <img
                          width="25px"
                          src={
                            tech.logo?.localFile.childImageSharp?.original.src
                          }
                          alt={tech.name}
                          style={{ marginRight: "10px" }}
                        />{" "}
                        {`    ${tech.name}`}
                      </Link>
                    </li>
                  ))}
                {/* <li><i className='bx bxs-badge-check'></i> SEO & Branding</li>
                                <li><i className='bx bxs-badge-check'></i> Digital Marketing</li>
                                <li><i className='bx bxs-badge-check'></i> Google Analytics</li>
                                <li><i className='bx bxs-badge-check'></i> Branding Solutions</li>
                                <li><i className='bx bxs-badge-check'></i> Digital Accounts</li>
                                <li><i className='bx bxs-badge-check'></i> Pay-per-Click</li>
                                <li><i className='bx bxs-x-circle red'></i> 24/7 Support</li> */}
              </ul>

              {/* <div className="btn-box">
                                <Link to="#" className="default-btn">
                                    <i className="flaticon-tick"></i> 
                                    Select the Plan 
                                    <span></span>
                                </Link>
                            </div> */}
            </div>
          </div>

          <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">
            <div className="single-pricing-box">
              <div className="pricing-header">
                <h3>Ecommerce</h3>
              </div>

              {/* <div className="price">
                                <sup>$</sup> 3,600 <sub> / Per yearly</sub>
                            </div> */}

              <ul className="pricing-features">
                {technologies
                  .find(i => i.fieldValue === "eccomerce")
                  ?.nodes?.map(tech => (
                    <li key={tech.id}>
                      <Link
                        to={`/services/eccomerce-development/${tech.slug}/`}
                      >
                        <img
                          width="25px"
                          src={
                            tech.logo?.localFile.childImageSharp?.original.src
                          }
                          alt={tech.name}
                          style={{ marginRight: "10px" }}
                        />{" "}
                        {`    ${tech.name}`}
                      </Link>
                    </li>
                  ))}
                {/* <li><i className='bx bxs-badge-check'></i> SEO & Branding</li>
                                <li><i className='bx bxs-badge-check'></i> Digital Marketing</li>
                                <li><i className='bx bxs-badge-check'></i> Google Analytics</li>
                                <li><i className='bx bxs-badge-check'></i> Branding Solutions</li>
                                <li><i className='bx bxs-badge-check'></i> Digital Accounts</li>
                                <li><i className='bx bxs-badge-check'></i> Pay-per-Click</li>
                                <li><i className='bx bxs-badge-check'></i> 24/7 Support</li> */}
              </ul>

              {/* <div className="btn-box">
                                <Link to="#" className="default-btn">
                                    <i className="flaticon-tick"></i> 
                                    Select the Plan 
                                    <span></span>
                                </Link>
                            </div> */}
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-pricing-box">
              <div className="pricing-header">
                <h3>web design</h3>
              </div>

              {/* <div className="price">
                                <sup>$</sup> 840 <sub>/ Per month</sub>
                            </div> */}

              <ul className="pricing-features">
                {technologies
                  .find(i => i.fieldValue === "webdesign")
                  ?.nodes?.map(tech => (
                    <li key={tech.id}>
                      <Link
                        to={`/services/webdesign-development/${tech.slug}/`}
                      >
                        <img
                          width="25px"
                          src={
                            tech.logo?.localFile.childImageSharp?.original.src
                          }
                          alt={tech.name}
                          style={{ marginRight: "10px" }}
                        />{" "}
                        {`    ${tech.name}`}
                      </Link>
                    </li>
                  ))}
                {/* <li><i className='bx bxs-badge-check'></i> SEO & Branding</li>
                                <li><i className='bx bxs-badge-check'></i> Digital Marketing</li>
                                <li><i className='bx bxs-badge-check'></i> Google Analytics</li>
                                <li><i className='bx bxs-badge-check'></i> Branding Solutions</li>
                                <li><i className='bx bxs-badge-check'></i> Digital Accounts</li>
                                <li><i className='bx bxs-badge-check'></i> Pay-per-Click</li>
                                <li><i className='bx bxs-x-circle red'></i> 24/7 Support</li> */}
              </ul>

              {/* <div className="btn-box">
                                <Link to="#" className="default-btn">
                                    <i className="flaticon-tick"></i> 
                                    Select the Plan 
                                    <span></span>
                                </Link>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
