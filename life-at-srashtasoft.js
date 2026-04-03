import React from 'react'
import Layout from "../components/App/Layout"
import Navbar from "../components/App/Navbar"
import PageBanner from '../components/Common/PageBanner'
import Footer from "../components/App/Footer"
// import gallery1 from '../assets/images/gallery/gallery1.jpg'
// import gallery2 from '../assets/images/gallery/gallery2.jpg'
// import gallery3 from '../assets/images/gallery/gallery3.jpg'
// import gallery4 from '../assets/images/gallery/gallery4.jpg'
// import gallery5 from '../assets/images/gallery/gallery5.jpg'
// import gallery6 from '../assets/images/gallery/gallery6.jpg'
// import gallery7 from '../assets/images/gallery/gallery7.jpg'
// import gallery8 from '../assets/images/gallery/gallery8.jpg'
// import gallery9 from '../assets/images/gallery/gallery9.jpg'
import Lightbox from 'react-image-lightbox'

import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Loadable from '@loadable/component'
const OwlCarousel = Loadable(() => import('react-owl-carousel3'))

const options = {
    loop: true,
    nav: true,
    dots: false,
    autoplayHoverPause: true,
    autoplay: true,
    items: 3,
    navText: [
        // "<i class='flaticon-left-1'></i>",
        // "<i class='flaticon-right-1'></i>"
    ]
};



const query = graphql`
    {
        allStrapiLifeAtCompanies(filter: {}, sort: {fields: createdAt, order: DESC}) {
            nodes {
              festival
              bannerImg {
                localFile {
                  childImageSharp {
                    original {
                      src
                    }
                  }
                }
              }
              Decription
            }
          } 
    }
`

function LifeStSrashtasoft() {
    const [photoIndex, setPhotoIndex] = React.useState(0);
    const [isOpenImage, setIsOpenImage] = React.useState(false);

    const data = useStaticQuery(query)
    const life_at_details = data.allStrapiLifeAtCompanies.nodes
    // const data = life_at_details.map(i => i.bannerImg.localFile.childImageSharp.original.src)

    // console.log(`imgs`, imgs)

    return (
        <Layout>
            <Navbar />
            <PageBanner
                pageTitle="Life At Srashtasoft"
                homePageText="Home"
                homePageUrl="/"
                activePageText="Life At Srashtasoft"
            />

            <div className="gallery-area pt-50 pb-70">
                <div className="container">
                    <div className="row">
                        <div className='col-10 col-lg-8 offset-1 offset-lg-2 px-0'>

                            {life_at_details.map((j, k) => (
                                <div className="row border-rows">
                                    <div className='col-lg-8 col-md-8 col-sm-8 borders-left'>

                                        <h3 class="poppins-bold title text-white my-0">
                                            <span class="d-title d-block my-1">{j.festival}</span>
                                            <span class="d-decription d-block my-1">{j.Decription}</span>
                                            <div class=""></div>
                                        </h3>
                                    </div>

                                    <div className='col-lg-4 col-md-4 col-sm-4'>
                                        <span class="d-md-block button-padding">
                                            <a class=" arrow-with-text pinkbg" href={`/life-at-srashtasoft/${j.festival}`}>
                                                <span class="title">Explore More</span>
                                                <span class="icons">
                                                    <span class="icon-right-arrow">
                                                    </span>
                                                </span>
                                            </a>
                                        </span>

                                    </div>


                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="single-gallery-item">

                                            <a
                                                href={`/life-at-srashtasoft/${j.festival}`}

                                            >
                                                <img src={j.bannerImg.localFile.childImageSharp.original.src} alt="event" />

                                                {/* <div class="middle">

                                               
                                        <Link className='text' to={`/life-at-srashtasoft/${j.festival}`}>{j.festival}</Link>
                                    </div> */}
                                            </a>
                                        </div>
                                    </div>


                                </div>
                            ))}

                        </div>


                        {/* <div className="row">
            <OwlCarousel 
                className=""
                {...options}
            > 
                {imgs.map((j, k) => (
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="single-gallery-item">
                            <Link 
                                to="#"
                                onClick={e => {
                                    e.preventDefault(); 
                                    setIsOpenImage(true); 
                                    setPhotoIndex(k);}
                                }
                            >
                                <img src={j} alt="event" />
                            </Link>
                        </div>
                    </div>
                ))}
            </OwlCarousel>
        </div> */}

                    </div>
                </div>

                {/* Lightbox */}
                {/* {isOpenImage && (
        <Lightbox
            mainSrc={imgs[photoIndex]}
            nextSrc={imgs[(photoIndex + 1) % imgs.length]}
            prevSrc={imgs[(photoIndex + imgs.length - 1) % imgs.length]}
            onCloseRequest={() => setIsOpenImage(false)}
            onMovePrevRequest={() =>
                setPhotoIndex((photoIndex + imgs.length - 1) % imgs.length)
            }
            onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % imgs.length)
            }
        />
    )} */}

            </div>

            <Footer />
        </Layout>
    )
}

export default LifeStSrashtasoft
