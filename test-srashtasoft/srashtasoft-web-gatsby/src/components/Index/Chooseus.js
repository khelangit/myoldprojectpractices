import React from 'react'
import StarIcon from '../../assets/images/star-icon.png'
import {Link,graphql, useStaticQuery, } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const query = graphql`
    {
        allStrapiWhySrashtasofts {
    edges {
      node {
        id
        title
        description
        img {
          localFile {
            childImageSharp {
              fluid {
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

function Chooseus() {

    const data = useStaticQuery(query)
    // console.log(data.allStrapiBlogs.nodes)
    const chooseusdata = data.allStrapiWhySrashtasofts.edges

    return (
        <div>
                <section className="solutions-area pb-70">
                    <div className="container">
                        <div className="section-title1">
                            <span className="sub-title">
                                {/* <img src={StarIcon} alt="icon" /> 
                                Our Solutions */}
                            </span>
                            <h2>Why Srashtasoft ?</h2>
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p> */}
                        </div>

                        <div className="row">
                            {chooseusdata.map((data) => (
                                <div className="col-lg-3 col-sm-6 margin-space" key={data.node.id}>
                                    <div className="single-solutions-box1">
                                        <div className="icon">
                                            {/* <i className="flaticon-rocket"></i> */}
                                            {
                                                console.log("(data.node.",data.node.img.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src)
                                            }
                                            <img src={data.node.img.localFile?.childImageSharp?.fluid?.src} alt="img" />
                                            
                                            
                                        </div>
                                        <h3 className="why-h3">
                                            <Link to="/service-details">
                                                {data.node.title}
                                            </Link>
                                        </h3>
                                        <p>{data.node.description}</p>
                                    </div>
                                </div>
                            ))}            

                        </div>
                    </div>
                </section>
        </div>
    )
}

export default Chooseus
