import React, {useEffect} from 'react'
import {Link} from 'gatsby'
import logo from "../../assets/images/logo.svg"
import footerMap from "../../assets/images/footer-map.png"
import { graphql, useStaticQuery } from "gatsby"

const query = graphql`
    {
        strapiCompanyInformation {
            id
            about
            address_canada
            address_india
            email
            facebook_url
            instagram_url
            linkedin_url
            phone_canada
            phone_india
            twitter_url
        }
    }
`
const Footer = () => {

    useEffect(() => {
   
        const interval = setInterval(() => {
            const d = convertTZ(new Date(), 'Canada/Eastern'); //object of date()
                const hr = d.getHours();
                const min = d.getMinutes();
                const sec = d.getSeconds();
                const hr_rotation = 30 * hr + min / 2; //converting current time
                const min_rotation = 6 * min;
                const sec_rotation = 6 * sec;
    
                document.getElementById('hour').style.transform = `rotate(${hr_rotation}deg)`;
                document.getElementById('minute').style.transform =  `rotate(${min_rotation}deg)`;
                document.getElementById('second').style.transform = `rotate(${sec_rotation}deg)`;
    
        }, 1000);

    //     const intervals = setInterval(() => {
    //         const d = convertTZ(new Date(),'Asia/Kolkata'); //object of date()
    //         const hr = d.getHours();
    //         const min = d.getMinutes();
    //         const sec = d.getSeconds();
    //         const hr_rotation = 30 * hr + min / 2; //converting current time
    //         const min_rotation = 6 * min;
    //         const sec_rotation = 6 * sec;

    //         document.getElementById('hourindia').style.transform = `rotate(${hr_rotation}deg)`;
    //         document.getElementById('minuteindia').style.transform =  `rotate(${min_rotation}deg)`;
    //         document.getElementById('secondindia').style.transform = `rotate(${sec_rotation}deg)`;

    // }, 1000);


//         const secondHand = document.querySelector('.second-hand');
// const minsHand = document.querySelector('.min-hand');
// const hourHand = document.querySelector('.hour-hand');

// function setDate() {
//   const now = new Date();

//   const seconds = now.getSeconds();
//   const secondsDegrees = ((seconds / 60) * 360) + 90;
//   secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

//   const mins = now.getMinutes();
//   const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
//   minsHand.style.transform = `rotate(${minsDegrees}deg)`;

//   const hour = now.getHours();
//   const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
//   hourHand.style.transform = `rotate(${hourDegrees}deg)`;
// }

// setInterval(setDate, 1000);

// setDate();
        return () => {
          clearInterval(interval);
        };
      }, []);
        const convertTZ = (date, tzString) => {
            return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
        }


    const currentYear = new Date().getFullYear();

    const data = useStaticQuery(query)
    // console.log(data.strapiCompanyInformation)
    const {strapiCompanyInformation: {about, address_canada, address_india, email, facebook_url, instagram_url, linkedin_url, phone_canada, phone_india, twitter_url}} = data

    return (
        <footer className="footer-area bg-color">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-sm-12">
                        <div className="single-footer-widget">
                            <a href="/" className="logo">
                                <img src={logo} alt="logo" />
                            </a>
                            <p>{about}</p>

                            <ul className="social-link">
                                <li>
                                    <Link to={facebook_url} className="d-block" target="_blank" rel="noreferrer">
                                        <i className='bx bxl-facebook'></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={twitter_url} className="d-block" target="_blank" rel="noreferrer">
                                        <i className='bx bxl-twitter'></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={instagram_url} className="d-block" target="_blank" rel="noreferrer">
                                        <i className='bx bxl-instagram'></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={linkedin_url} className="d-block" target="_blank" rel="noreferrer">
                                        <i className='bx bxl-linkedin'></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <div className="single-footer-widget pl-5">
                            <h3>Explore</h3>
                            
                            <ul className="footer-links-list">
                                <li>
                                    <Link to="/"> 
                                        Home
                                    </Link>
                                </li>
                                    <li>
                                    <Link to="/about">
                                        About
                                    </Link>
                                </li>

                                     <li>
                                    <Link to="/services">
                                        Our Services
                                    </Link>
                                </li> 

                                 <li>
                                    <Link to="/portfolio">
                                     Portfolio
                                    </Link>
                                </li> 
                                <li>
                                    <Link to="/contact-us">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* <div className="col-lg-2 col-sm-6">
                        <div className="single-footer-widget">
                            <h3>Resources</h3>

                            <ul className="footer-links-list">
                                <li>
                                    <Link to="/team">
                                        Our Scientists
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/services">
                                        Our Services
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/testimonials">
                                        Testimonials
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/services">
                                        SaaS Solutions
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/case-studies">
                                        Case Studies
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div> */ }
                    
                    <div className="col-lg-4 col-sm-6">
                        <div className="single-footer-widget">
                            <h3>Address</h3>

                            <ul className="footer-contact-info">
                                <li>
                                    <i className='bx bx-map'></i> 
                                    {address_india}
                                </li>
                                <li>
                                    <i className='bx bx-phone-call'></i>
                                    <a href={`tel:${phone_india}`}>{phone_india}</a>
                                </li>
                                 <li>
                                    <i className='bx bx-map'></i> 
                                    {address_canada}
                                </li>
                                <li>
                                    <i className='bx bx-phone-call'></i>
                                    <a href={`tel:${phone_canada}`}>{phone_canada}</a>
                                </li>

                                <li>
                                    <i className='bx bx-envelope'></i>
                                    <a href={`mailto:${email}`}>{email}</a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                   
                        <div className="col-lg-3 col-sm-6">
                        <div id="clockContainerindia">
                    <div id="hourindia"></div>
                    <div id="minuteindia"></div>
                    <div id="secondindia"></div>
                    
                    </div>
                       
                        <div className="colock-text"><p>{address_india}</p></div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            
                    <div id="clockContainer">
                    <div id="hour"></div>
                    <div id="minute"></div>
                    <div id="second"></div>
                    
                    </div>
                        <div className="colock-text"><p>{address_canada}</p></div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                        </div>
                        <div className="col-lg-3 col-sm-6">
                        </div>
                        </div>
                <div className="footer-bottom-area">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <p>Copyright @{currentYear} All rights reserved <a target="_blank" href="https://srashtasoft.com/" rel="noreferrer">Srashtasoft</a></p>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            {/* <ul>
                                <li>
                                    <Link to="/privacy-policy">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/terms-of-service">
                                        Terms & Conditions
                                    </Link>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-map">
                <img src={footerMap} alt="footer-logo" />
            </div>
        </footer>
    );
}

export default Footer;