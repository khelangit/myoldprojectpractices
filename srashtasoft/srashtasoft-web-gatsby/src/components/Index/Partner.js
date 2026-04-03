import React from 'react'
import ReactWOW from 'react-wow'
import partner1 from '../../assets/images/partner/partner1.png'
import partner2 from '../../assets/images/partner/partner2.png'
import partner3 from '../../assets/images/partner/partner3.png'
import partner4 from '../../assets/images/partner/partner4.png'
import partner5 from '../../assets/images/partner/partner5.png'
import partner6 from '../../assets/images/partner/partner6.png'

import {Link,graphql, useStaticQuery } from "gatsby"
import Loadable from "@loadable/component"
// import OwlCarousel from "react-owl-carousel"
import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.default.css"
const OwlCarousel = Loadable(() => import("react-owl-carousel"))

const query = graphql`
    {
        allStrapiPartners {
            edges {
              node {
                id
                name
                url
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

const Partner = () => {

    const responsive = {
        0: {
            items: 1,
            nav: true,
            loop: true,
          },
          600: {
            items: 3,
            nav: true,
            loop: true,
          },
          1000: {
            items: 6,
            nav: true,
            loop: true,
          },
      }

    const data = useStaticQuery(query)
    const partners = data.allStrapiPartners.edges

    return (
        <div className="partner-area ">
            <div className="container-fluid purvesh">
                <div className="row align-items-center">

                <OwlCarousel
                    className=""
                    loop
                    nav = {false}
                    
                    responsive={responsive}
                    autoplay={true}
                    autoWidth={true}
                    autoplayTimeout={2000}
                >
                
                    {partners.map((doc) => (
                        <div className="item" key={doc.node.id}>
                            <div className="m-4">
                                <div className="single-partner-item">
                                    <img src={doc.node.logo.localFile.childImageSharp?.original.src} alt={doc.node.name} />
                                </div>
                            </div>
                        </div>
                    ))}
                  
              </OwlCarousel>

                    
                </div>
            </div>

            <div className="divider"></div>
        </div>
    )
}

export default Partner