import React from "react"
import { useRecoilState } from "recoil"
import { collapsedState } from "../../utils/recoil-atoms"
import { Link } from "gatsby"
import logo from "../../assets/images/logo.svg"
import flutter from "../../assets/images/flutter.png"
import genai from "../../assets/images/genai.png"
import android from "../../assets/images/android.png"
import html from "../../assets/images/html.png"
import ios from "../../assets/images/ios.png"
import iot from "../../assets/images/iot.png"
import layout from "../../assets/images/layout.png"
import logos from "../../assets/images/logos.png"
import magento from "../../assets/images/magento.png"
import reactnativ from "../../assets/images/reactnativ.png"
import shopify from "../../assets/images/shopify.png"
import uiux from "../../assets/images/uiux.png"
import reactjs from "../../assets/images/reactjs.png"
import nodejs from "../../assets/images/nodejs.png"
import php from "../../assets/images/php.png"
import wordpress from "../../assets/images/wordpress.png"
import laravel from "../../assets/images/laravel.png"
import pythone from "../../assets/images/pythone.png"

import asana from "../../assets/images/asana.png"
import googlehangouts from "../../assets/images/googlehangouts.png"
import basecamp from "../../assets/images/basecamp.png"
import email from "../../assets/images/email.png"
import invision from "../../assets/images/invision.png"
import phone from "../../assets/images/phone.png"
import skype from "../../assets/images/skype.png"
import slack from "../../assets/images/slack.png"

const Navbar = () => {
  const [collapsed, setCollapsed] = useRecoilState(collapsedState)

  const toggleNavbar = () => {
    setCollapsed(!collapsed)
  }

  React.useEffect(() => {
    let elementId = document.getElementById("navbar")
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky")
      } else {
        elementId.classList.remove("is-sticky")
      }
    })
    window.scrollTo(0, 0)
  })

  const classOne = collapsed
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show"
  const classTwo = collapsed
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right"

  return (
    <React.Fragment>
      <div id="navbar" className="navbar-area navbar-style-two">
        <div className="tarn-nav">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
              <Link
                to="/"
                onClick={() => setCollapsed(true)}
                className="navbar-brand"
              >
                <img src={logo} alt="logo" />
              </Link>

              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    {/* <Link 
                                            to="/" 
                                            activeClassName="active"
                                            onClick={e => e.preventDefault()} 
                                            className="nav-link"
                                        >
                                            Home <i className='bx bx-chevron-down'></i>
                                        </Link> */}

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          to="/"
                          activeClassName="active"
                          onClick={() => setCollapsed(true)}
                          className="nav-link"
                        >
                          IT Services
                        </Link>
                      </li>

                      {/* <li className="nav-item">
                                                <Link
                                                    to="/seo-agency"
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    SEO Agency
                                                </Link>
                                            </li> */}
                      {/* 
                                            <li className="nav-item">
                                                <Link
                                                    to="/data-science-ml-company"
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Data Science ML Company
                                                </Link>
                                            </li> */}

                      {/* <li className="nav-item">
                                                <Link
                                                    to="/data-analytics-ai-startup"
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Data Analytics & AI Startup
                                                </Link>
                                            </li> */}

                      {/* <li className="nav-item">
                                                <Link
                                                    to="/digital-marketing-agency"
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Digital Marketing Agency
                                                </Link>
                                            </li> */}

                      {/* <li className="nav-item">
                                                <Link
                                                    to="/data-science-online-courses"
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Data Science Online Courses
                                                </Link>
                                            </li> */}

                      {/* <li className="nav-item">
                                                <Link
                                                    to="/big-data-analysis-startup"
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Big Data Analysis Startup
                                                </Link>
                                            </li> */}

                      {/* <li className="nav-item">
                                                <Link
                                                    to="/data-analytics-ml-consulting"
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Data Analytics ML Consulting
                                                </Link>
                                            </li> */}

                      {/* <li className="nav-item">
                                                <Link
                                                    to="/machine-learning-ai-solutions"
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Machine Learning AI Solutions
                                                </Link>
                                            </li> */}
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="#"
                      activeClassName="active"
                      onClick={e => e.preventDefault()}
                      className="nav-link"
                    >
                      Company <i className="bx bx-chevron-down"></i>
                    </Link>

                    <ul className="dropdown-menu">
                      {/* <li className="nav-item">
                                                <Link 
                                                    to="/our-story" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                   Our Story
                                                </Link>
                                            </li> */}
                      <li className="nav-item">
                        <Link
                          to="/about/careers"
                          activeClassName="active"
                          onClick={() => setCollapsed(true)}
                          className="nav-link"
                        >
                          Careers
                        </Link>
                      </li>
                      {/* <li className="nav-item">
                                                <Link 
                                                    to="/testimonials" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                   Testimonials
                                                </Link>
                                            </li> */}
                      <li className="nav-item">
                        <Link
                          to="/life-at-srashtasoft"
                          activeClassName="active"
                          onClick={() => setCollapsed(true)}
                          className="nav-link"
                        >
                          Life at Srashtasoft
                        </Link>
                      </li>

                      {/* <li className="nav-item">
                                                <Link
                                                    to="/cyber-security"
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Cyber security
                                                </Link>
                                            </li> */}
                    </ul>
                  </li>

                  {/* <li className="nav-item">
                                        <Link 
                                            to="#" 
                                            activeClassName="active"
                                            onClick={e => e.preventDefault()}
                                            className="nav-link"
                                        >
                                            About Us <i className='bx bx-chevron-down'></i>
                                        </Link>
                                        
                                        <ul className="dropdown-menu">
                                            <li className="nav-item">
                                                <Link 
                                                    to="/about" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                   About Us
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link 
                                                    to="/history" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    History
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link 
                                                    to="/testimonials" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Testimonials
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link 
                                                    to="/team" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Team One
                                                </Link>
                                            </li>
                                        </ul>
                                    </li> */}

                  <li className="nav-item dropdown">
                    <Link
                      to=""
                      activeClassName="active"
                      // onClick={e => e.preventDefault()}
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                    >
                      Services
                      {/*<i className='bx bx-chevron-down'></i>*/}
                    </Link>
                    <ul className="dropdown-menu megamenu">
                      <div className="container main-container-subfield">
                        <div className="row">
                          <li className="col-lg-3 col-sm-12 main-ul">
                            <div className="div-box">
                              <ul>
                                <h6 className="list-header">
                                  Web Technologies
                                </h6>

                                <li>
                                  <Link
                                    to="/services/web-application-development/ReactJs-Development/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={reactjs}></img>
                                    </span>
                                    ReactJs Development
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/services/web-application-development/NodeJs-Developement/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={nodejs}></img>
                                    </span>
                                    NodeJs Developement
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/services/web-application-development/WordPress-Development/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={wordpress}></img>
                                    </span>
                                    WordPress Development
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/services/web-application-development/PHP-Development/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={php}></img>
                                    </span>
                                    PHP Development
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/services/web-application-development/Laravel-Development/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={laravel}></img>
                                    </span>
                                    Laravel Development
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/services/web-application-development/Python-Development/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={pythone}></img>
                                    </span>
                                    Python Development
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </li>

                          <li className="col-lg-3 col-sm-12  main-ul">
                            <div className="div-box">
                              <ul>
                                <h6 className="list-header">Mobile Apps</h6>

                                <li>
                                  <Link
                                    to="/services/mobile-application-development/flutter/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={flutter}></img>
                                    </span>
                                    Flutter Development
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/iot-development"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={flutter}></img>
                                    </span>
                                    IOT Development
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/generative-ai-development"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={flutter}></img>
                                    </span>
                                    AI Development
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/ui-ux-development"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={flutter}></img>
                                    </span>
                                    UI & UX Development
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    to="/services/mobile-application-development/android-app/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={android}></img>
                                    </span>
                                    Android Development
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/services/mobile-application-development/ios-app/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={ios}></img>
                                    </span>
                                    IOS Development
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/services/mobile-application-development/IOT-Development/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={iot}></img>
                                    </span>
                                    IOT Development
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    to="/services/mobile-application-development/React-Native-Development/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={reactnativ}></img>
                                    </span>
                                    React Native
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/services/mobile-application-development/Gen-AI-Development/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={genai}></img>
                                    </span>
                                    Gen Ai
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="col-lg-3 col-sm-12  main-ul">
                            <div className="div-box">
                              <ul>
                                <h6 className="list-header">Ecommerce</h6>

                                <li>
                                  <Link
                                    to="/services/ecommerce-development/Shopify/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={shopify}></img>
                                    </span>
                                    Shopify Development
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/services/ecommerce-development/Magento/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={magento}></img>
                                    </span>
                                    Magento Development
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="col-lg-3 col-sm-12  main-ul">
                            <div className="div-box">
                              <ul>
                                <h6 className="list-header">Web Design</h6>
                                <li>
                                  <Link
                                    to="/services/webdesign-development/UIUX-Development/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={uiux}></img>
                                    </span>
                                    UI/UX Development
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    to="/services/webdesign-development/Layout-Design/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={layout}></img>
                                    </span>
                                    Layout Design
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/services/webdesign-development/Html-Development/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={html}></img>
                                    </span>
                                    Html Development
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/services/webdesign-development/Logo-Design/"
                                    activeClassName="active"
                                    onClick={() => setCollapsed(true)}
                                    className="nav-link"
                                  >
                                    <span className="span-right">
                                      <img width="25px" src={logos}></img>
                                    </span>
                                    Logo Design
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </div>
                        <div className="row border-tops">
                          <ul className="project-update-ul">
                            <li className="project-update-li margin-li">
                              PROJECT UPDATES
                            </li>
                            <li className="project-update-li">
                              <img src={asana} alt="asana"></img>
                            </li>
                            <li className="project-update-li">
                              <img src={slack} alt="slack"></img>
                            </li>
                            <li className="project-update-li">
                              <img src={invision} alt="invision"></img>
                            </li>
                            <li className="project-update-li">
                              <img src={basecamp} alt="Basecamp"></img>
                            </li>
                            <li className="project-update-li  margin-li">
                              COMMUNICATIONS
                            </li>
                            <li className="project-update-li">
                              <img src={phone} alt="phone"></img>
                            </li>
                            <li className="project-update-li">
                              <img src={skype} alt="skype"></img>
                            </li>
                            <li className="project-update-li">
                              <img
                                src={googlehangouts}
                                alt="googlehangouts"
                              ></img>
                            </li>
                            <li className="project-update-li">
                              <img src={email} alt="email"></img>
                            </li>
                          </ul>
                          <ul className="project-update-uls">
                            <li className="project-update-lis">
                              {" "}
                              <a
                                className="project-update-li"
                                href="/hire-a-team/"
                              >
                                <button
                                  type="button"
                                  className="btn btn-success"
                                >
                                  Hire Experts
                                </button>
                              </a>
                            </li>
                            <li className="project-update-lis">
                              {" "}
                              <a
                                className="project-update-li"
                                href="/cyber-security/"
                              >
                                <button
                                  type="button"
                                  className="btn btn-success"
                                >
                                  Cyber Security
                                </button>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </ul>

                    {/* <div className="dropdown-menu" style={{width: '300px'}}> */}

                    {/* {<ul className="dropdown-menu">
                                            <li className="nav-item">
                                                <Link
                                                    to="/cyber-security"
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Cyber security
                                                </Link>
                                            </li>
                                        </ul>} */}
                    {/* </div> */}
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/portfolio"
                      activeClassName="active"
                      className="nav-link"
                    >
                      Portfolio
                    </Link>

                    {/* <ul className="dropdown-menu">
                                            <li className="nav-item">
                                                <Link 
                                                    to="/case-studies" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Case Studies
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link 
                                                    to="/case-studies-details" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Case Studies Details
                                                </Link>
                                            </li>
                                        </ul> */}
                  </li>

                  {/* <li className="nav-item">
                                        <Link 
                                            to="#" 
                                            activeClassName="active"
                                            onClick={e => e.preventDefault()}
                                            className="nav-link"
                                        >
                                            Pages <i className='bx bx-chevron-down'></i>
                                        </Link>

                                        <ul className="dropdown-menu">
                                            <li className="nav-item">
                                                <Link 
                                                    to="#" 
                                                    activeClassName="active"
                                                    onClick={e => e.preventDefault()}
                                                    className="nav-link"
                                                >
                                                    Courses <i className='bx bx-chevron-down'></i>
                                                </Link>

                                                <ul className="dropdown-menu">
                                                    <li className="nav-item">
                                                        <Link 
                                                            to="/courses" 
                                                            activeClassName="active"
                                                            onClick={() => setCollapsed(true)}
                                                            className="nav-link"
                                                        >
                                                            Courses
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link 
                                                            to="/course-details" 
                                                            activeClassName="active"
                                                            onClick={() => setCollapsed(true)}
                                                            className="nav-link"
                                                        >
                                                            Course Details
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li className="nav-item">
                                                <Link 
                                                    to="#" 
                                                    activeClassName="active"
                                                    onClick={e => e.preventDefault()}
                                                    className="nav-link"
                                                >
                                                    Events <i className='bx bx-chevron-down'></i>
                                                </Link>

                                                <ul className="dropdown-menu">
                                                    <li className="nav-item">
                                                        <Link 
                                                            to="/events" 
                                                            activeClassName="active"
                                                            onClick={() => setCollapsed(true)}
                                                            className="nav-link"
                                                        >
                                                            Events
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link 
                                                            to="/event-details" 
                                                            activeClassName="active"
                                                            onClick={() => setCollapsed(true)}
                                                            className="nav-link"
                                                        >
                                                            Event Details
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li className="nav-item">
                                                <Link 
                                                    to="/contact" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Contact
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link 
                                                    to="/gallery" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Gallery
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link 
                                                    to="/faq" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    FAQ
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link 
                                                    to="/coming-soon" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Coming Soon
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link 
                                                    to="/membership-levels" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Membership Levels
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link 
                                                    to="/profile-authentication" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Login/Register
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link 
                                                    to="/privacy-policy" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Privacy Policy
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link 
                                                    to="/terms-of-service" 
                                                    activeClassName="active"
                                                    onClick={() => setCollapsed(true)}
                                                    className="nav-link"
                                                >
                                                    Terms of Service
                                                </Link>
                                            </li>
                                        </ul>
                                    </li> */}

                  {/* <li className="nav-item">
                                        <Link 
                                            to="/blog" 
                                            activeClassName="active"
                                            // onClick={e => e.preventDefault()}
                                            className="nav-link"
                                        >
                                            Blog 
                                        </Link>
                                    </li> */}
                  <li className="nav-item">
                    <Link
                      to="/about"
                      activeClassName="active"
                      // onClick={e => e.preventDefault()}
                      className="nav-link"
                    >
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/hire-a-team"
                      activeClassName="active"
                      // onClick={e => e.preventDefault()}
                      className="nav-link"
                    >
                      Hire a Team
                    </Link>
                  </li>
                </ul>

                <div className="others-option d-flex align-items-center">
                  {/* <div className="option-item">
                                        <form className="search-box">
                                            <input type="text" className="input-search" placeholder="Search for anything" />
                                            <button type="submit">
                                                <i className="flaticon-loupe"></i>
                                            </button>
                                        </form>
                                    </div> */}

                  <div className="option-item">
                    <Link
                      to="/contact-us"
                      activeClassName="active"
                      onClick={() => setCollapsed(true)}
                      className="default-btn"
                    >
                      Contact Us<span></span>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Navbar
