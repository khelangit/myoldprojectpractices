import React from 'react'
import ReactWOW from 'react-wow'
// import ModalVideo from 'react-modal-video'
import { Link } from 'gatsby'
import img1 from '../../assets/images/main-banner/banner-one/banner-one-shape1.png'
import img2 from '../../assets/images/main-banner/banner-one/banner-one-shape2.png'
import img3 from '../../assets/images/main-banner/banner-one/banner-one-shape3.png'
import img4 from '../../assets/images/main-banner/banner-one/banner-one-shape4.png'
import img5 from '../../assets/images/main-banner/banner-one/banner-one-shape5.png'
import img6 from '../../assets/images/main-banner/banner-one/banner-one-shape6.png'
import img7 from '../../assets/images/main-banner/banner-one/banner-one-shape7.png'
import img8 from '../../assets/images/main-banner/banner-one/banner-one-shape8.png'
import img9 from '../../assets/images/main-banner/banner-one/banner-one-shape9.png'
import img10 from '../../assets/images/main-banner/banner-one/banner-one-shape10.png'
import img11 from '../../assets/images/main-banner/banner-one/banner-one-shape11.png'
import img12 from '../../assets/images/main-banner/banner-one/banner-one-shape12.png'
import img13 from '../../assets/images/main-banner/banner-one/banner-one-main-img.png'

const MainBanner = () => {
    const [isOpen, setIsOpen] = React.useState(true);
    const openModal = () => {
        setIsOpen(!isOpen);
    }
    return (
        <React.Fragment>
            {/* If you want to change the video need to update videoID */}
            {/* <ModalVideo 
                channel='youtube' 
                isOpen={!isOpen} 
                videoId='bk7McNUjWgw' 
                onClose={() => setIsOpen(!isOpen)} 
            /> */}

            <div className="main-banner">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5 col-md-12">
                            <div className="main-banner-content">
                                <ReactWOW delay='.1s' animation='fadeInLeft'>
                                    <h1>Data Science Consulting Services</h1>
                                </ReactWOW>
                                
                                <ReactWOW delay='.1s' animation='fadeInLeft'>
                                    <p>Get professional & reliable research oriented solutions for Data Science and Machine Learning business needs. Enjoy stress free decesion making!</p>
                                </ReactWOW>

                                <ReactWOW delay='.1s' animation='fadeInRight'>
                                    <div className="btn-box">
                                        <Link 
                                            to="/about-us"
                                            className="default-btn"
                                        >
                                            <i className="flaticon-structure"></i> 
                                            About Us <span></span>
                                        </Link>

                                        <Link 
                                            to="#"
                                            onClick={e => {e.preventDefault(); openModal()}}
                                            className="video-btn popup-youtube"
                                        >
                                            <i className="flaticon-google-play"></i> Watch Video
                                        </Link>
                                    </div>
                                </ReactWOW>
                            </div>
                        </div>

                        <div className="col-lg-7 col-md-12">
                            <div className="main-banner-animation-image">
                                <ReactWOW delay='.1s' animation='fadeInDown'>
                                    <img src={img1} alt="banner" />
                                </ReactWOW>
                                <ReactWOW delay='.1s' animation='fadeInDown'>
                                    <img src={img2} alt="banner" />
                                </ReactWOW>
                                <ReactWOW delay='.1s' animation='fadeInDown'>
                                    <img src={img3} alt="banner" />
                                </ReactWOW>
                                <ReactWOW delay='.1s' animation='fadeInDown'>
                                    <img src={img4} alt="banner" />
                                </ReactWOW>
                                <ReactWOW delay='.1s' animation='fadeInUp'>
                                    <img src={img5} alt="banner" />
                                </ReactWOW>
                                <ReactWOW delay='.1s' animation='fadeInDown'>
                                    <img src={img6} alt="banner" />
                                </ReactWOW>
                                <ReactWOW delay='.1s' animation='fadeInDown'>
                                    <img src={img7} alt="banner" />
                                </ReactWOW>
                                <ReactWOW delay='.1s' animation='fadeInDown'>
                                    <img src={img8} alt="banner" />
                                </ReactWOW>
                                <ReactWOW delay='.1s' animation='fadeInDown'>
                                    <img src={img9} alt="banner" />
                                </ReactWOW>
                                <ReactWOW delay='.1s' animation='fadeInDown'>
                                    <img src={img10} alt="banner" />
                                </ReactWOW>
                                <ReactWOW delay='.1s' animation='fadeInDown'>
                                    <img src={img11} alt="banner" />
                                </ReactWOW>
                                <ReactWOW delay='.1s' animation='fadeInLeft'>
                                    <img src={img12} alt="banner" />
                                </ReactWOW>

                                <img src={img13} alt="banner" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MainBanner