import React from 'react';
import Loadable from "@loadable/component"
import {Link,graphql, useStaticQuery } from "gatsby"
import '@fortawesome/fontawesome-free/js/all.js';
import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.default.css"
const OwlCarousel = Loadable(() => import("react-owl-carousel"))
const query = graphql`
    {
      allStrapiTestimonials {
        edges {
          node {
            content
            person_name
            person_tagline
            person_img {
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
function TestimonialComponent() {
  
  const responsive = {
    0: {
        items: 1,
        nav: true,
        loop: false,
      },
      600: {
        items: 3,
        nav: true,
        loop: true,
      },
      1000: {
        items:3,
        nav: true,
        loop: true,
      },
  }

const data = useStaticQuery(query)
const testimonial = data.allStrapiTestimonials.edges

  return <div>
      
  <section className="home-our-product whats-ay-clients">
  <h1 className="h-industry " align="center">WHAT CLIENT SAYS</h1>
				<div className="container-fluid">
          <div className='row'>
					

					<div className="hr">
						<hr className="hr-msar-dark_client hr-industry_client mt-3"/>
					</div>

					<div className="col-md-12">
            
          <div id="testimonial-slider">
          <OwlCarousel
                    className=""
                    loop
                    nav = {false}
                    
                    responsive={responsive}
                    autoplay={true}
                    autoWidth={true}
                    autoplayTimeout={2000}  
                >
                
                    {testimonial.map((doc) => (
                        // <div className="item" key={doc.node.id}>
                        //     <div className="m-4">
                        //         <div className="single-partner-item">
                        //             <img src={doc.node.logo.localFile.childImageSharp?.original.src} alt={doc.node.name} />
                        //         </div>
                        //     </div>
                        // </div>
                        <div className="testimonial">
                        <div className="description">
                          <p className='whats-ay-clients-para'>{doc.node.content}</p>
                        </div>
                        <div className="testimonial-pic">
                          <img src={doc.node.person_img.localFile.childImageSharp.fluid.src} alt=""/>
                        </div>
                        <div className="testimonial-review">
                          {/* <h3 class="testimonial-title">{doc.node.person_name}</h3> */}
                          <span className='whats-ay-clients-span'>{doc.node.person_tagline}</span>
                        </div>
                      </div>
                    ))}
                  
              </OwlCarousel>

						</div>
					</div>
          </div>
				</div>
			</section>
  </div>;
}

export default TestimonialComponent;
