import React from 'react'
import {Link,graphql, useStaticQuery, } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import starIcon from '../../assets/images/star-icon.png'
import caseStudy1 from '../../assets/images/case-study/case-study1.jpg'
import Loadable from '@loadable/component'
const OwlCarousel = Loadable(() => import('react-owl-carousel3'))

const options = {
    loop: true,
    nav: true,
    dots: false,
    autoplayHoverPause: true,
    autoplay: true,
    items: 1,
    navText: [
        "<i class='flaticon-left-1'></i>",
        "<i class='flaticon-right-1'></i>"
    ]
};

const query = graphql`
    {
        allStrapiHeropageSlider {
            edges {
            node {
                title
                subtitle1
                subtitle2
                img {
                localFile {
                    childImageSharp {
                    gatsbyImageData(blurredOptions: {toFormat: AUTO, width: 10})
                    }
                }
                }
            }
            }
        }
    }
`

const CaseStudy = () => {

    
    const data = useStaticQuery(query)
    // console.log(data.allStrapiHeropageSlider.edges)
    const heros = data.allStrapiHeropageSlider.edges

    const [display, setDisplay] = React.useState(false);

    React.useEffect(() => {
        setDisplay(true);
    }, [])

    return (
        <div className="case-study-area bg-fffbf5">
            {display ? <OwlCarousel 
                className="case-study-slides owl-carousel owl-theme"
                {...options}
            > 

                {heros.map((hero, i) => (
                    <div key={i} className="single-case-study-item ptb-100">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-12">
                                    <div className="case-study-content">
                                        {/* <span className="sub-title">
                                            <img src={starIcon} alt="case-study" /> 
                                            Case study #1
                                        </span> */}
                                        <h2>{hero.node.title}</h2>
                                        <p>{hero.node.subtitle1 ? hero.node.subtitle1: '' }</p>
                                        <p>{hero.node.subtitle2 ? hero.node.subtitle2: '' }</p>

                                        {/* <Link to="/case-studies-details" className="default-btn">
                                            <i className="flaticon-view"></i>
                                            Details More
                                            <span></span>
                                        </Link> */}
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="case-study-image">
                                        <Link to="/case-studies-details" className="d-block">
                                             <GatsbyImage image={getImage(hero.node.img.localFile)} alt="case-study" /> 
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
            </OwlCarousel> : ''}
        </div>
    )
}

export default CaseStudy