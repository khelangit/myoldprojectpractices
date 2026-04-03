import React from 'react'
import {Link} from 'gatsby'
// import ModalVideo from 'react-modal-video'
import learning from '../../assets/images/explore-learning.jpg'

const ExploreLearning = () => {
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
        
            <div className="explore-learning-area ptb-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="explore-learning-content">
                                <h2>Build Your Data Science Analytics Skills Online</h2>
                                <p>Want to learn and earn PDUs or CEUs on your schedule — anytime, anywhere? Or, pick up a new skill quickly like, project team leadership or agile? Browse our most popular online courses.</p>
                                <Link to="#" className="explore-learing-btn">
                                    Explore Learing
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="explore-learning-video">
                                <img src={learning} alt="learning" />
 
                                <Link 
                                    to="#"
                                    onClick={e => {e.preventDefault(); openModal()}}
                                    className="video-btn popup-youtube"
                                >
                                    <i className="flaticon-google-play"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ExploreLearning