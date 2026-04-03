import React from 'react'
import Layout from "../components/App/Layout"
import Navbar from "../components/App/Navbar"
import PageBanner from '../components/Common/PageBanner'
import Footer from "../components/App/Footer"
import purvesh from '../assets/images/bgimage.jpg'
import { useState } from 'react';
import Swal from 'sweetalert2'
// import iot from '../assets/images/icon/iot.png'
// import android from '../assets/images/icon/android.png'
// import graphicdesign from '../assets/images/icon/graphicdesign.png'
// import flutter from '../assets/images/icon/flutter.png'
// import IOS from '../assets/images/icon/IOS.png'
// import laravel from '../assets/images/icon/laravel.png'
// import shopify from '../assets/images/icon/shopify.png'
// import nodejs from '../assets/images/icon/nodejs.png'
// import php from '../assets/images/icon/php.png'
// import reactnative from '../assets/images/icon/reactnative.png'
// import react from '../assets/images/icon/react.png'
// import wordpress from '../assets/images/icon/wordpress.png'
import { Link, graphql, useStaticQuery } from "gatsby"
const query = graphql`
    {
        allStrapiHireATeams {
            edges {
              node {
                hire_a_team_section {
                  Decription
                  Title
                  image {
                    localFile {
                      childImageSharp {
                        original {
                          src
                        }
                      }
                    }
                  }
                }
                Title
              }
            }
          }
    }
`
// const clickonsubmit = e => {

//     var element = document.getElementById("message-button");
//     alert('');
//     element.classList.show("active");


//     var element2 = document.getElementById("message-button");
//     alert('hello');
//     element2.classList.hide("active");


// }

const HireATeam = () => {
    const data = useStaticQuery(query)
    const hire_a_team_section = data.allStrapiHireATeams.edges[0].node.hire_a_team_section;

    const [inputs, setInputs] = useState({})
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
    // console.log('hire_a_team_section', hire_a_team_section);
    return (
        <Layout>
            <Navbar />
            {/* <PageBanner
                pageTitle="Hire a Team"
                homePageText="Home"
                homePageUrl="/"
                activePageText="Hire a Team"
            /> */}
            <section className='section-image'>
                <img src={purvesh} alt="banner" />
                <div className='container'>
                    <div className='row main-row'>
                        <h1 className='hire-heading'></h1>
                        {hire_a_team_section?.map((hats, index) => (

                            <div className='col-lg-4 col-md-4'>

                                <div className='main-boxs'>
                                    <div className="single-solutions-box-hire">
                                        <div className="main-single-solutions-box-hire">
                                            <div className="icon-hire"><img src={hats.image[0].localFile.childImageSharp.original.src} /></div>
                                            <h3 className="our-features-hire-h3">{hats.Title}</h3>
                                            <p className="our-features-hire-p">{hats.Decription}</p>
                                            <a href="#quoate-form"><button type="button" className="btn btn-primary ancher-button">HIRE DEVELOPER</button></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                        {/* <div className='col-lg-4 col-md-4'>
                            <div className='main-boxs'>
                                <div className="single-solutions-box-hire">
                                    <div className="main-single-solutions-box-hire">
                                        <div className="icon-hire"><img src={flutter} /></div>
                                        <h3 className="our-features-hire-h3">CUSTOM SOFTWARE DEVELOPMENT</h3>
                                        <p className="our-features-hire-p">Translate unique client requirements into custom solutions with premier quality and advanced technology.</p>
                                        <a href=""><button type="button" className="btn btn-primary ancher-button">HIRE DEVELOPER</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='main-boxs'>
                                <div className="single-solutions-box-hire">
                                    <div className="main-single-solutions-box-hire">
                                        <div className="icon-hire"><img src={reactnative} /></div>
                                        <h3 className="our-features-hire-h3">CUSTOM SOFTWARE DEVELOPMENT</h3>
                                        <p className="our-features-hire-p">Translate unique client requirements into custom solutions with premier quality and advanced technology.</p>
                                        <a href=""><button type="button" className="btn btn-primary ancher-button">HIRE DEVELOPER</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='main-boxs'>
                                <div className="single-solutions-box-hire">
                                    <div className="main-single-solutions-box-hire">
                                        <div className="icon-hire"><img src={IOS} /></div>
                                        <h3 className="our-features-hire-h3">CUSTOM SOFTWARE DEVELOPMENT</h3>
                                        <p className="our-features-hire-p">Translate unique client requirements into custom solutions with premier quality and advanced technology.</p>
                                        <a href=""><button type="button" className="btn btn-primary ancher-button">HIRE DEVELOPER</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='main-boxs'>
                                <div className="single-solutions-box-hire">
                                    <div className="main-single-solutions-box-hire">
                                        <div className="icon-hire"><img src={android} /></div>
                                        <h3 className="our-features-hire-h3">CUSTOM SOFTWARE DEVELOPMENT</h3>
                                        <p className="our-features-hire-p">Translate unique client requirements into custom solutions with premier quality and advanced technology.</p>
                                        <a href=""><button type="button" className="btn btn-primary ancher-button">HIRE DEVELOPER</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='main-boxs'>
                                <div className="single-solutions-box-hire">
                                    <div className="main-single-solutions-box-hire">
                                        <div className="icon-hire"><img src={react} /></div>
                                        <h3 className="our-features-hire-h3">CUSTOM SOFTWARE DEVELOPMENT</h3>
                                        <p className="our-features-hire-p">Translate unique client requirements into custom solutions with premier quality and advanced technology.</p>
                                        <a href=""><button type="button" className="btn btn-primary ancher-button">HIRE DEVELOPER</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='main-boxs'>
                                <div className="single-solutions-box-hire">
                                    <div className="main-single-solutions-box-hire">
                                        <div className="icon-hire"><img src={nodejs} /></div>
                                        <h3 className="our-features-hire-h3">CUSTOM SOFTWARE DEVELOPMENT</h3>
                                        <p className="our-features-hire-p">Translate unique client requirements into custom solutions with premier quality and advanced technology.</p>
                                        <a href=""><button type="button" className="btn btn-primary ancher-button">HIRE DEVELOPER</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='main-boxs'>
                                <div className="single-solutions-box-hire">
                                    <div className="main-single-solutions-box-hire">
                                        <div className="icon-hire"><img src={shopify} /></div>
                                        <h3 className="our-features-hire-h3">CUSTOM SOFTWARE DEVELOPMENT</h3>
                                        <p className="our-features-hire-p">Translate unique client requirements into custom solutions with premier quality and advanced technology.</p>
                                        <a href=""><button type="button" className="btn btn-primary ancher-button">HIRE DEVELOPER</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='main-boxs'>
                                <div className="single-solutions-box-hire">
                                    <div className="main-single-solutions-box-hire">
                                        <div className="icon-hire"><img src={php} /></div>
                                        <h3 className="our-features-hire-h3">CUSTOM SOFTWARE DEVELOPMENT</h3>
                                        <p className="our-features-hire-p">Translate unique client requirements into custom solutions with premier quality and advanced technology.</p>
                                        <a href=""><button type="button" className="btn btn-primary ancher-button">HIRE DEVELOPER</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='main-boxs'>
                                <div className="single-solutions-box-hire">
                                    <div className="main-single-solutions-box-hire">
                                        <div className="icon-hire"><img src={wordpress} /></div>
                                        <h3 className="our-features-hire-h3">CUSTOM SOFTWARE DEVELOPMENT</h3>
                                        <p className="our-features-hire-p">Translate unique client requirements into custom solutions with premier quality and advanced technology.</p>
                                        <a href=""><button type="button" className="btn btn-primary ancher-button">HIRE DEVELOPER</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='main-boxs'>
                                <div className="single-solutions-box-hire">
                                    <div className="main-single-solutions-box-hire">
                                        <div className="icon-hire"><img src={laravel} /></div>
                                        <h3 className="our-features-hire-h3">CUSTOM SOFTWARE DEVELOPMENT</h3>
                                        <p className="our-features-hire-p">Translate unique client requirements into custom solutions with premier quality and advanced technology.</p>
                                        <a href=""><button type="button" className="btn btn-primary ancher-button">HIRE DEVELOPER</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='main-boxs'>
                                <div className="single-solutions-box-hire">
                                    <div className="main-single-solutions-box-hire">
                                        <div className="icon-hire"><img src={graphicdesign} /></div>
                                        <h3 className="our-features-hire-h3">CUSTOM SOFTWARE DEVELOPMENT</h3>
                                        <p className="our-features-hire-p">Translate unique client requirements into custom solutions with premier quality and advanced technology.</p>
                                        <a href=""><button type="button" className="btn btn-primary ancher-button">HIRE DEVELOPER</button></a>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            <section className='need-help-section' id="quoate-form" >
                <div className='container'>
                    <div className='row quote-formss'>

                        <div className='col-lg-6 col-md-12'>
                            <h1>NEED HELP ?</h1>
                            <p>Choosing The Right Package</p>
                            <div className='row padding-class'>
                                <div className='col-md-6'>
                                    <div class="icon-need-div">
                                        <div class="icon">
                                            <img src="https://www.asset.alakmalak.com/images/need-help-icon1.png" />
                                        </div>
                                        <p className='normal-p'>	Contact a <strong class="yello-colors"> Flutter, IOT and  web Specialist</strong></p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div class="icon-need-div">
                                        <div class="icon">
                                            <img src="https://www.asset.alakmalak.com/images/need-help-icon2.png" />
                                        </div>
                                        <p className='normal-p'><a classname="ancher-link" href="tel:+(91) 9898582705">Schedule <strong class="yello-colors"> a call with us  </strong></a></p>
                                    </div>
                                </div>

                            </div>
                            <span className='heading-text'>+(91) 9898582705</span>
                        </div>
                        <div className='col-lg-2 col-md-0'></div>
                        <div className='col-lg-4 col-md-12'>
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
                                                    <select class="form-control w-100 border-0 p-2 " name='technology'
                                                    // onChange={onInputchange}
                                                    >
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
                                                <button type="submit" className="btn-white-custom btn btn-sm mt-3 message-button"> Send Message </button>
                                            </div>
                                        </div>
                                    </form>
                                </section>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
            <section className='section-request'>
                <div className='container'>
                    <div className="row align-items-center">
                        <div className="col-lg-9 col-md-12">
                            <div className="project-start-content">
                                <h2>We Like to Start Your Project With Us</h2>
                                <p>Ready to build your custom application solution? Send us your requirement on info@srashtasoft.com or call on</p>
                                <p> +(91) 9898582705</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12"><a className="default-btn" href="/contact-us"><i className="flaticon-web"></i>Request a Proposal<span></span></a></div>
                    </div>
                </div>
            </section>
            <Footer />
        </Layout>
    )
}

export default HireATeam
