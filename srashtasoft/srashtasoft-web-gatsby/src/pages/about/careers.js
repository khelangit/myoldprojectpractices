import React from 'react'
import Layout from "../../components/App/Layout"
import Navbar from "../../components/App/Navbar"
import PageBanner from '../../components/Common/PageBanner'
import Footer from "../../components/App/Footer"
import { Link, graphql, useStaticQuery, } from "gatsby"
import Swal from 'sweetalert2'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import FunIcon1 from '../../assets/images/funfacts/fun-icon1.png'
import { useState } from 'react';
import Advanced_Resources from '../../assets/images/career/Advanced_Resources.png'
import Employee_First from '../../assets/images/career/Employee_First.png'
import Fun_Connect from '../../assets/images/career/Fun_Connect.png'
import Groundbreaking_Projects from '../../assets/images/career/Groundbreaking_Projects.png'
import Learning_Sessions from '../../assets/images/career/Learning_Sessions.png'
import Leaves_Encashment from '../../assets/images/career/Leaves_Encashment.png'
import Onsite_Opportunities from '../../assets/images/career/Onsite_Opportunities.png'
import Positive_Environment from '../../assets/images/career/Positive_Environment.png'
import Referral_Program from '../../assets/images/career/Referral_Program.png'
import Rewards_Benefits from '../../assets/images/career/Rewards_Benefits.png'
import Six_Days_a_Week from '../../assets/images/career/Six_Days_a_Week.png'
import Transparent_Communication from '../../assets/images/career/Transparent_Communication.png'
import phonecalls from '../../assets/images/phonecall.png'
import consistents from '../../assets/images/consistent.png'


import JobRequirement from '../../components/Common/JobRequirement'

// const links = document.querySelectorAll(".apply-btn");

// for (const link of links) {
//     link.addEventListener("click", clickHandler);
// }

// function clickHandler(e) {
//     e.preventDefault();
//     //   const href = this.getAttribute("href");
//     //   const offsetTop = document.querySelector(href).offsetTop;

//     var uploadValue = this.getAttribute("data-value");
//     const offsetTop = document.querySelector(uploadValue).offsetTop;
//     console.log(uploadValue);
//     // console.log(offsetTop);



//     //   scroll({
//     //     top: offsetTop,
//     //     behavior: "smooth"
//     //   });

//     window.scroll({
//         top: offsetTop,
//         left: 0,
//         behavior: 'smooth'
//     });


// }

const query = graphql`
    {
        allStrapiVacancies(sort: {fields: order}) {
            edges {
              node {
                id
                experience
                positions
                title
                qualification
                description
                link
              }
            }
          }
    }
`

const Careers = () => {

    const data = useStaticQuery(query)
    // console.log(data.allStrapiBlogs.nodes)
    const vacancies = data.allStrapiVacancies.edges

    const [inputs, setInputs] = useState({})

    // // Copycopy code to clipboard
    // handleChange(event) {
    //     this.setState({ value: event.target.value });
    // }

    // shouldComponentUpdate(nextProps) {
    //     // Rendering the component only if 
    //     // passed props value is changed

    //     if (nextProps.value !== this.props.value) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }

    const onInputchange = (event) => {
        setInputs(s => ({
            ...s,
            [event.target.name]: event.target.value
        }));
    }



    const sendEmail = async (e) => {
        e.preventDefault()
        // alert('sent successfully');

        const messageBody = `

        Hi,
        
        Name: ${e.target.elements.name.value}
        Phone No: ${e.target.elements.email.value}
        Message: ${e.target.elements.message.value}
        technology:${e.target.elements.technology.value}
        `
        console.log(messageBody);
        try {

            const response = await fetch('https://p8t29dandg.execute-api.ap-south-1.amazonaws.com/prod', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "no-cors", // no-cors, cors, *same-origin
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: e.target.elements.email.value, messageBody },), // body data type must match "Content-Type" header
            }).then(() => Swal.fire(
                'Mail Sent Successfully!',

            )
            )
            window.location.reload(false);
            ;
            // const json = await response.json()

        } catch (error) {
            console.log(error);  
        }
    }


    return (
        <Layout>

            <Navbar />
            <PageBanner
                pageTitle="Career"  
                homePageText="Home"
                homePageUrl="/"
                activePageText="Career"
            />



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

            {vacancies && vacancies.length > 0 && (
                <div className=" pt-30 pb-30 bg-f1f8fb">
                    <div className="container">

                        <div className="headin-h2">
                            {/* <span className="sub-title">
                                <img src={starIcon} alt="project" /> Recent Projects
                            </span> */}
                            <h2 style={{ textAlign: "center", paddingTop: "20px" }}>We're Hiring! Your skills are valued </h2>
                        </div>
                        <p>Srashtasoft is looking for talented and skillful professionals from tech and design domain to be a part of a reputed web & mobile application development firm that has developed more than 300+ projects.</p>


                        <div className="row" >
                            <JobRequirement vacancies={vacancies} />
                        </div>


                    </div>

                </div>
            )}

            <section class="need-help-section" id='needhelpscrool'>
                <div className='container'>
                    <div className='row quote-formss'>
                        <div className='col-lg-6 col-md-6'>
                            <h1>NEED HELP ?</h1>
                            <p className='need-paragraph'>Choosing The Right Package</p>
                            <div className='row padding-class'>
                                <div className='col-md-6'>
                                    <div class="icon-need-div">
                                        <div class="icon">
                                            <img src={consistents} />
                                        </div>
                                        <p className='normal-p'>	Contact a <strong class="yello-colors"> Flutter, IOT and  web Specialist</strong></p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div class="icon-need-div">
                                        <div class="icon">
                                            <img src={phonecalls} />
                                        </div>
                                        <p className='normal-p'>	<a classname="ancher-link" href="tel:+(91) 9898582705">Schedule <strong class="yello-colors"> a call with us  </strong></a></p>
                                    </div>
                                </div>
                            </div>
                            <span className='heading-text'>+(91) 9898582705</span>
                        </div>
                        <div className='col-lg-2 col-md-2'></div>
                        <div className='col-lg-4 col-md-4'>
                            <section id="quote" className="bg-msar msar-quote-form">
                                <section className="row">

                                    <form id="careerForm" onSubmit={sendEmail}  >

                                        <div className="col-md-12">
                                            <div className="mt-4 white-text">Get Your Free</div>
                                            <h4 className='white-text'>Consultation &amp; Quote</h4>
                                            <div id="frm-quote">
                                                <div className="form-group mt-4">
                                                    <input type="text"
                                                        className="form-control w-100 border-0"
                                                        placeholder="Name*"
                                                        id='name'
                                                        name="name"
                                                        required
                                                    // onChange={onInputchange}

                                                    />
                                                </div>


                                                <div className="form-group">

                                                    <input type="text"
                                                        className="form-control w-100 border-0"
                                                        placeholder="Email*"
                                                        name="email"
                                                        required
                                                    // onChange={onInputchange}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <select class="form-control w-100 border-0 p-2 " name='technology'  >
                                                        {/* onChange={onInputchange} */}
                                                        <option value="Service">Service Required </option>
                                                        <option value="ReactJs">ReactJs Development</option>
                                                        <option value="NodeJs">NodeJs Developement</option>
                                                        <option value="WordPress">WordPress Development</option>
                                                        <option value="PHP">PHP Development</option>
                                                        <option value="Laravel">Laravel Development</option>
                                                        <option value="Flutter">Flutter Development</option>
                                                        <option value="Reactnative">React Native Development</option>
                                                        <option value="Android">Android Development</option>
                                                        <option value="IOS">IOS Development</option>
                                                        <option value="graIOTpefruit">IOT Development</option>
                                                        <option value="UIUX">UI/UX Development</option>
                                                        <option value="Shopify">Shopify Development</option>
                                                        <option value="Magento">Magento Development</option>
                                                        <option value="Layout">Layout Design</option>
                                                        <option value="Html">Html Development</option>
                                                        <option value="Logo">Logo Design</option>
                                                        <option value="Python">Python Development</option>
                                                    </select>
                                                </div>

                                                <div className="form-group mb-0">
                                                    <textarea className="form-group w-100 border-0 p-2 mb-0"
                                                        rows="2"
                                                        placeholder="Your Text"
                                                        name="message"
                                                        required
                                                    // onChange={onInputchange}
                                                    >
                                                    </textarea>
                                                </div>
                                                <div className="mt-0 pt-0 small white-text">* Need to fill marked. Make a call more details required.</div>
                                                <button type="submit" className="btn-white-custom btn btn-sm mt-3"> Send Message </button>
                                            </div>
                                        </div>
                                    </form>

                                </section>
                            </section>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </Layout>
    )
}

export default Careers
