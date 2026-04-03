import React from 'react'
import Layout from "../components/App/Layout"
import Navbar from "../components/App/Navbar"
import PageBanner from '../components/Common/PageBanner'
import Footer from "../components/App/Footer"
// import AboutUsContent from '../components/AboutUs/AboutUsContent'
// import OurHistory from '../components/AboutUs/OurHistory'
// import WhyChooseUs from '../components/AboutUs/WhyChooseUs'
// import HowItWork from '../components/AboutUs/HowItWork'
// import TeamMembers from '../components/AboutUs/TeamMembers'
// import Testimonials from '../components/AboutUs/Testimonials'
// import Partner from '../components/AboutUs/Partner'
import FunfactComponent from "../components/DynamicPages/FunfactComponent"
import Advanced_Resources from '../assets/images/career/Advanced_Resources.png'
import Employee_First from '../assets/images/career/Employee_First.png'
import Fun_Connect from '../assets/images/career/Fun_Connect.png'
import Groundbreaking_Projects from '../assets/images/career/Groundbreaking_Projects.png'
import Learning_Sessions from '../assets/images/career/Learning_Sessions.png'
import Leaves_Encashment from '../assets/images/career/Leaves_Encashment.png'
import Onsite_Opportunities from '../assets/images/career/Onsite_Opportunities.png'
import Positive_Environment from '../assets/images/career/Positive_Environment.png'
import Referral_Program from '../assets/images/career/Referral_Program.png'
import Rewards_Benefits from '../assets/images/career/Rewards_Benefits.png'
import Six_Days_a_Week from '../assets/images/career/Six_Days_a_Week.png'
import Transparent_Communication from '../assets/images/career/Transparent_Communication.png'
import year from '../assets/images/7years.svg'
import {useStaticQuery, graphql } from "gatsby"

const query = graphql`
    {
        strapiAbouts {
            aboutheading
            aboutdecription
            ourvisionimage {
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            visiondecription
            visiontitle
            missionimage {
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            misiontitle
            misiondecription
            tabs16head
            tabs16heading
            tabs16title
            tabs22decription
            tabs22head
            tabs22heading
            tabs22title
            title
            tabs16decription
            lifeatrashtaofttitle
            about16title
            about16image
            about16heading
            about16decription
            about22decription
            about22heading
            about22title
            brainsrashtasoftheading
            lifeimage {
              localFile {
                childImageSharp {
                  fixed {
                    src
                  }
                }
              }
            }
            about22paragrapg {
              aboutparagraph
            }
            aboutparagraph {
              about16paragrapg
            }
            decription
            image {
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            paragraph
            aboutimage16 {
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            aboutimage162 {
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            about22image {
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            about22image2 {
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
`
const showtab2016 = e =>{

    var element = document.getElementById("tabmenus1");
    element.classList.add("active");
    
    var element2 = document.getElementById("tabmenus2");
    element2.classList.remove("active");

   
    
  }

  const showtab2022 = e =>{
    
    var element = document.getElementById("tabmenus2");
    element.classList.add("active");
    
    var element2 = document.getElementById("tabmenus1");
    element2.classList.remove("active");
   
    
  }


// function showhide(id){

//     if (document.getElementById) {
//       var divid = document.getElementById(id);
//       var divs = document.getElementsByClassName("hide");
//       for(var i=0;i<divs.length;i++) {
//         divs[i].style.display = "none";
//       }
//       divid.style.display = "block";
//     } 
//     return false;
// }


// function AboutUs({ data }) {
const AboutUs = () => {
    const data = useStaticQuery(query)
    const {tabs16head, tabs16heading,aboutimage16, aboutimage162, about22image, about22image2, about16title, paragraph, decription, title, about16decription,brainsrashtasoftheading,image, about16heading,about22title,about22heading,about22decription, aboutheading, tabs22title, tabs22heading, tabs22head, tabs22decription, aboutdecription, ourvisionimage, visiontitle, visiondecription, mission, misiontitle, missionimage, misiondecription, tabs16decription, lifeimage} = data.strapiAbouts
    const about22paragrapg = data.strapiAbouts.about22paragrapg;
    const aboutparagraph = data.strapiAbouts.aboutparagraph;
    return (
        <Layout>
            <Navbar />
            <PageBanner
                pageTitle="About Us"
                homePageText="Home"
                homePageUrl="/"
                activePageText="About Us"
            />
            <section className='about-section'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-10 col-md-10 col-lg-8 col-xl-8 offset-1 offset-lg-2 px-0 mb-4 mb-lg-0'>
                            <h1 className='about-color'>{aboutheading}</h1>

                            <p className='about-section paragaph'> {aboutdecription}</p>
                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-10 col-md-10 col-lg-8 col-xl-8 offset-1 offset-lg-2 px-0 mt-5 mb-4 mb-lg-0'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='vision-div'>
                                        <img className="vision-img" src={ourvisionimage.localFile.childImageSharp.fluid.src}></img>
                                        <h1 className='mt-3 vision_head'>{visiontitle}</h1>
                                        <p className='mt-3 vision_paragaph'>{visiondecription}</p>


                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='vision-div'>
                                        <img className="vision-img" src={missionimage.localFile.childImageSharp.fluid.src}></img>
                                        <h1 className='mt-3 vision_head'>{misiontitle}</h1>
                                        <p className='mt-3 vision_paragaph'>{misiondecription}</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-10 col-lg-8 offset-1 offset-lg-2 px-0 journey-header'>
                            <div className='row'>
                                <div className='col-md-6'>

                                    <div className="tab-content">
                                        <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                            <h1>Since</h1>
                                            <span className='journey-span'>{tabs16heading}</span>
                                            <h1 className='journey-heading'>{tabs16head}</h1>
                                            <p className='vision_paragaphs'>{tabs16decription}</p>

                                        </div>
                                        <div className="tab-pane" id="tabs-2" role="tabpanel">
                                            <h1>{tabs22title}</h1>
                                            <span className='journey-span'>{tabs22heading}</span>
                                            <h1 className='journey-heading'>{tabs22head}</h1>
                                            <p className='vision_paragaphs'>{tabs22decription}</p>

                                        </div>



                                    </div>

                                </div>
                                <div className='col-md-6'>
                                    <div class="no-of-years mobile-none">
                                        <span class="yrs">
                                            <div class="years-text"><img  id="loading" src={year} alt="10 years" class="text-right"></img></div>
                                            <div class="years-number"><span class="poppins-bold">7</span></div>                </span>
                                    </div>
                                    <ul class="nav nav-tabss" role="tablist">
                                        <li class="nav-items">
                                            <a class="navs-links active" onClick={showtab2016} id="showtabmenu1" data-toggle="tab" data-target="#tabmenus1, #tabs-1" role="tab">2016</a>
                                        </li>
                                        <li class="nav-items">
                                            <a class="navs-links" onClick={showtab2022} id="showtabmenu2" data-toggle="tab"  data-target="#tabmenus2, #tabs-2"role="tab">2023</a>
                                        </li>

                                    </ul>

                                   



                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='row' id='tabmenu1'>
                        <div className='col-10 col-lg-8 offset-1 offset-lg-2 px-0 journey-header'>
                        <div class="tab-content">
                            <div className='box-shadow tab-pane active' id="tabmenus1" role="tabpanel">
                                <div className='row'>

                                    <div className='col-md-6'>
                                        <h1 className='head-text'>{about16title}</h1>
                                        <h1>{about16heading}</h1>
                                        <p className='vision_paragaphs'>{about16decription}</p>

                                      

                                    </div>
                                    <div className='col-md-6'>

                                        <ul className='ul-bullets'>
                                        {aboutparagraph?.map((hats, index) => (
                                            <li className='li-bullets'>{hats.about16paragrapg}</li>
                                            ))}
                                           
                                        </ul>
                                        {/* <div class="started-points">
                                            <p className='vision_paragaphs'>Started With 5 Engineeers</p>
                                            <p className='vision_paragaphs'>Started with 75 Square Feet Office</p>
                                            <p className='vision_paragaphs'>Started with one programming language</p>
                                           
                                        </div> */}
                                    </div>

                                </div>
                                <div className='row mt-5'>
                                <div className='col-md-6'>
                                <img className="srashtasoft-img" src={aboutimage16.localFile.childImageSharp.fluid.src} alt=""></img>
                                    </div>
                                    <div className='col-md-6'>
                                    <img className="srashtasoft-img" src={aboutimage162[0].localFile.childImageSharp.fluid.src} alt=""></img>
                                    </div>

                                </div>
                            </div>
                            
                            <div className='box-shadow tab-pane' id="tabmenus2" role="tabpanel">
                                <div className='row'>

                                    <div className='col-md-6'>
                                        <h1 className='head-text'>{about22title}</h1>
                                        <h1>{about22heading}</h1>
                                        <p className='vision_paragaphs'>{about22decription}</p>

                                      

                                    </div>
                                    <div className='col-md-6'>
                                    <ul className='ul-bullets'>
                                        {about22paragrapg?.map((hats, index) => (
                                            <li className='li-bullets'>{hats.aboutparagraph}</li>
                                            ))}
                                           
                                        </ul>
                                        {/* <div class="started-points">
                                            <p className='vision_paragaphs'>Grown to 35+ inHouse Employees</p>
                                            <p className='vision_paragaphs'>Moved to 150 Square Feet Office</p>
                                            <p className='vision_paragaphs'>Delivered more than 200+ Project</p>
                                            <p className='vision_paragaphs'>Served 80+ Clients till date</p>
                                           
                                        </div> */}
                                    </div>

                                </div>
                                <div className='row mt-5'>
                                <div className='col-md-6'>
                                <img className="srashtasoft-img" src={about22image.localFile.childImageSharp.fluid.src} alt=""></img>
                                    </div>
                                    <div className='col-md-6'>
                                    <img className="srashtasoft-img" src={about22image2.localFile.childImageSharp.fluid.src} alt=""></img>
                                    </div>

                                </div>
                            </div>
                            </div>
                        </div>
                    </div>


                </div>


            </section>

           

            <section className='about-section'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-10 col-md-10 col-lg-8 col-xl-8 offset-1 offset-lg-2 px-0 mb-4 mb-lg-0'>
                            <h1 className='about-section-head'>{brainsrashtasoftheading}</h1>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <img src={image.localFile.childImageSharp.fluid.src}></img>
                                </div>
                                <div className='col-md-6'>
                                    <h1 className=''>{title}</h1>
                                    <p className='vision_paragaphs'>{paragraph}</p>
                                    <p className='vision_paragaphs'>{decription}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FunfactComponent />
            

            <div className="funfacts-area bg-image pb-70">
                <div className="container">

                    <div className="section-title">
                        <span className="sub-title">
                            {/* <img src={starIcon} alt="project" /> Recent Projects */}
                        </span>
                        <h2 style={{ color: 'white', paddingTop: '20px' }}>Why should you join us ?</h2>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p> */}
                    </div>


                    <div className="row">
                        <div className="col-lg-4 col-sm-6 col-6 col-md-3">
                            <div className="single-funfacts-box">
                                <div className="icon">
                                    <img src={Six_Days_a_Week} alt="funfacts" />
                                </div>
                                <h5>5 Days a Week</h5>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-6 col-md-3">
                            <div className="single-funfacts-box">
                                <div className="icon">
                                    <img src={Employee_First} alt="funfacts" />
                                </div>
                                <h5>Employee First</h5>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-6 col-md-3">
                            <div className="single-funfacts-box">
                                <div className="icon">
                                    <img src={Rewards_Benefits} alt="funfacts" />
                                </div>
                                <h5>Rewards & Benefits</h5>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-6 col-md-3">
                            <div className="single-funfacts-box">
                                <div className="icon">
                                    <img src={Leaves_Encashment} alt="funfacts" />
                                </div>
                                <h5>Leaves Encashment</h5>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-6 col-md-3">
                            <div className="single-funfacts-box">
                                <div className="icon">
                                    <img src={Fun_Connect} alt="funfacts" />
                                </div>
                                <h5>Fun Connect</h5>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-6 col-md-3">
                            <div className="single-funfacts-box">
                                <div className="icon">
                                    <img src={Onsite_Opportunities} alt="funfacts" />
                                </div>
                                <h5>Onsite Opportunities</h5>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-6 col-md-3">
                            <div className="single-funfacts-box">
                                <div className="icon">
                                    <img src={Advanced_Resources} alt="funfacts" />
                                </div>
                                <h5>Advanced Resources</h5>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-6 col-md-3">
                            <div className="single-funfacts-box">
                                <div className="icon">
                                    <img src={Transparent_Communication} alt="funfacts" />
                                </div>
                                <h5>Clear Communication</h5>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-6 col-md-3">
                            <div className="single-funfacts-box">
                                <div className="icon">
                                    <img src={Positive_Environment} alt="funfacts" />
                                </div>
                                <h5>Positive Environment</h5>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-6 col-md-3">
                            <div className="single-funfacts-box">
                                <div className="icon">
                                    <img src={Groundbreaking_Projects} alt="funfacts" />
                                </div>
                                <h5>Groundbreaking Projects</h5>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-6 col-md-3">
                            <div className="single-funfacts-box">
                                <div className="icon">
                                    <img src={Referral_Program} alt="funfacts" />
                                </div>
                                <h5>Referral Programs</h5>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-6 col-md-3">
                            <div className="single-funfacts-box">
                                <div className="icon">
                                    <img src={Learning_Sessions} alt="funfacts" />
                                </div>
                                <h5>Learning Sessions</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <h1 className='life-srashtasoft'>Life & Culture at Srashtasoft</h1>
            <section className='life-at-srashtasoft'>

                <div className='container-fluid'>


                    <marquee width="100%" behavior="alternate">
                        {lifeimage?.map((life, index) => (
                            <img className="srashtasoft-img" src={life.localFile.childImageSharp.fixed.src} alt=""></img>
                        ))}

{/*                         
                        <img className="srashtasoft-img" src={img17} alt=""></img>
                        <img className="srashtasoft-img" src={img6} alt=""></img>
                        <img className="srashtasoft-img" src={img7} alt=""></img>
                        <img className="srashtasoft-img" src={img18} alt=""></img>
                        <img className="srashtasoft-img" src={img9} alt=""></img>
                        <img className="srashtasoft-img" src={img10} alt=""></img>
                        <img className="srashtasoft-img" src={img11} alt=""></img>
                        <img className="srashtasoft-img" src={img12} alt=""></img>
                        <img className="srashtasoft-img" src={img13} alt=""></img> */}

                    </marquee>



                </div>
            </section>

            {/* <AboutUsContent />
            <OurHistory />
            <WhyChooseUs />
            <HowItWork />
            <TeamMembers />
            <Testimonials />
            <Partner /> */}
            <Footer />
        </Layout>
    );
}

export default AboutUs;