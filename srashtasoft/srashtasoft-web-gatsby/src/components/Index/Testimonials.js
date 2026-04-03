import React from 'react'
import {Link,graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import starIcon from '../../assets/images/star-icon.png'

import shape from '../../assets/images/shape/shape1.svg'
import Loadable from '@loadable/component'
const OwlCarousel = Loadable(() => import('react-owl-carousel3'))


const options = {
    loop: true,
    nav: true,
    dots: false,
    autoplayHoverPause: true,
    autoplay: true,
    margin: 30,
    navText: [
        "<i class='flaticon-left-1'></i>",
        "<i class='flaticon-right-1'></i>"
    ],
    responsive: {
        0: {
            items: 1,
        },
        768: {
            items: 2,
        },
        992: {
            items: 2,
        }
    }
};

const query = graphql`
    {
        allStrapiTestimonials {
    nodes {
      person_name
      person_tagline
      content
      person_img {
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
`

const Testimonials = () => {

    const data = useStaticQuery(query)
    console.log(data.allStrapiTestimonials.nodes)
    const testimonials = data.allStrapiTestimonials.nodes

    const [display, setDisplay] = React.useState(false);

    React.useEffect(() => {
        setDisplay(true);
    }, [])

    return (
        <div className="testimonials-area pt-100 bg-f1f8fb">
            <div className="container">
                <div className="section-title">
                    <span className="sub-title">
                        <img src={starIcon} alt="testimonial" /> 
                        Testimonials
                    </span>
                    <h2>What Our Clients are Saying?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                </div>

                {display ? <OwlCarousel 
                    className="testimonials-slides owl-carousel owl-theme"
                    {...options}
                > 

                    {testimonials.map((doc,i) => (
                        <div className="single-testimonials-item" key={i}>
                            <p>{doc.content}</p>

                            <div className="client-info">
                                <div className="d-flex justify-content-center align-items-center">
                                    <img src={doc.person_img.localFile.childImageSharp.original.src} alt="testimonial" />
                                    {/* <GatsbyImage image={getImage(doc.person_img.localFile)} alt="testimonial"  /> */}
                                    <div className="title">
                                        <h3>{doc.person_name}</h3>
                                        <span>{doc.person_tagline}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    

                    {/* <div className="single-testimonials-item">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>

                        <div className="client-info">
                            <div className="d-flex justify-content-center align-items-center">
                                <img src={client2} alt="testimonial" />
                                <div className="title">
                                    <h3>David Warner</h3>
                                    <span>CEO at Envato</span>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    
                </OwlCarousel> : ''}

                <div className="testimonials-view-btn text-center">
                    <Link to="/testimonials" className="default-btn">
                        <i className="flaticon-view"></i> 
                        Check Out All Reviews <span></span>
                    </Link>
                </div>
            </div>

            <div className="shape-img1">
                <img src={shape} alt="testimonial" />
            </div>
        </div>
    )
}

export default Testimonials;