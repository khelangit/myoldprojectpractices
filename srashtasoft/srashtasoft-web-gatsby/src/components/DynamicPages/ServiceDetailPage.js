import React from 'react'
import { Link, graphql } from "gatsby"
import Layout from "../App/Layout"
import Navbar from "../App/Navbar"
import Footer from "../App/Footer"
import { useState } from 'react';
import Swal from 'sweetalert2'
import phonecall from '../../assets/images/phonecall.png'
import consistent from '../../assets/images/consistent.png'
import Flutterimage from '../../assets/images/Flutterimage.jpg'
import FunfactComponent from './FunfactComponent'
import { AnchorLink } from "gatsby-plugin-anchor-links";

export const query = graphql`

  query($slug: String!) {
    allStrapiTechnologies(filter: {slug: {eq: $slug}}) {
      edges {
        node {
          id
          name
          slug
          title
          logo {
            localFile {
              childImageSharp {
                original {
                  src
                }
              }
            }
          }
          tech_category {
            name
            slug
          }
          solutions_we_offered {
            title
            description
            id
            img {
              localFile {
                childImageSharp {
                  original {
                    src
                  }
                }
              }
            }
          }
          Dedicted_Developer_Section_Title
          Dedicted_Developer_section_subtitle
          Dedicted_Developer_section_subtitle_1
          Dedicted_Developer_section_subtitle_2
          Why_choose_srashtasoft_Title
          Why_choose_srashtasoft_subtitle
          Programmer_can_help_repeter {
            title
          }
          Programmers_can_help_section
          sub_title
        }
      }
      }

      strapiCompanyHighlight {
        team_members
        projects
        clients
        year_of_experience
      }
  }
`
const ServiceDetailPage = ({ data }) => {
  const [inputs, setInputs] = useState({})
  const { title, name, slug, Slugname, tech_category, solutions_we_offered, Programmer_can_help_repeter, description, Dedicted_Developer_Section_Title, Dedicted_Developer_section_subtitle, Dedicted_Developer_section_subtitle_1, Dedicted_Developer_section_subtitle_2, Programmers_can_help_section, sub_title } = data.allStrapiTechnologies.edges[0].node
  const companyHighlight = data.strapiCompanyHighlight;


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
      {/* <PageBanner
            pageTitle={title}
            homePageText="Home" 
            homePageUrl="/" 
            activePageText={`${title}`}
        />  */}
      <section className=''>
        <div className="jumbotron in-ban blue-ban clearfix">
          <div className="left">
            <div className="text-x">
              <h1>
                <span>{name}</span>

              </h1>
              <p>{sub_title}</p>
            </div>
          </div>
          <div className="right">
            <img defer="" className="lazyload" src={Flutterimage} alt="Hire iPhone App Developer" />
          </div>
        </div>
      </section>
      <section className='main-section'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 col-lg-12'>
              <h4>{name}</h4>
              <p>{description}</p>

              <div className='row'>
                {solutions_we_offered?.map((swo, index) => (

                  <div className='col-md-4 col-lg-4'>
                    <div className="single-solutions-detail-box1">
                      <div className="icon"><img src={swo.img.localFile.childImageSharp.original.src} alt="img" /></div>
                      <h3 className="why-detail-h3">{swo.title}</h3>
                      <p className="why-detail-paragraph">{swo.description}</p>
                    </div>
                  </div>
                ))}

              </div>


            </div>



          </div>
          {Dedicted_Developer_Section_Title ?
            <section className='package-detail'>
              <div className='row'>
                <div className='col-lg-12'>
                  <div class="package">

                    <h2 class="persian-green">{Dedicted_Developer_Section_Title}</h2>
                    <h4 class="h4">{Dedicted_Developer_section_subtitle}</h4>
                    <div class="clearfix">
                      <ul class="package-list">
                        <li>{Dedicted_Developer_section_subtitle_1}</li>
                      </ul>
                      <ul class="package-list">
                        <li> {Dedicted_Developer_section_subtitle_2}</li>
                      </ul>
                    </div>
                    <div class="pack-btn clearfix">
                      {/* <a class="getprice pink-btn" href="#">GET PRICE</a> */}
                      <AnchorLink className='get-button' to={`/services/${tech_category.slug}/${slug}/#need-help`} title="Get Price" />
                      <a href="https://srashtasoft.vercel.app/contact-us/" class="white-btn-new">Contact Us</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            : null}

          <section className='package-detail'>
            <div className='row'>
              <div className='col-lg-12'>
                <h3>{Programmers_can_help_section}</h3>
                {Programmer_can_help_repeter?.map((pchr, index) => (
                  <ul class="pricing-ul">
                    <li>{pchr.title}</li>

                  </ul>
                ))}
              </div>
            </div>
          </section>
          <FunfactComponent />
        </div>
      </section>

      <section className='need-help-section' id='need-help'>
        <div className='container'>
          <div className='row quote-formss'>
            <div className='col-lg-6 col-md-12'>
              <h1>NEED HELP ?</h1>
              <p className='need-paragraph'>Choosing The Right Package</p>
              <div className='row padding-class'>
                <div className='col-md-6'>
                  <div class="icon-need-div">
                    <div class="icon">
                      <img src={consistent} />
                    </div>
                    <p className='normal-p'>	Contact a <strong class="yello-colors"> Flutter, IOT and  web Specialist</strong></p>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div class="icon-need-div">
                    <div class="icon">
                      <img src={phonecall} />
                    </div>
                    <p className='normal-p'>	<a classname="ancher-link" href="tel:+(91) 9898582705">Schedule <strong class="yello-colors"> a call with us  </strong></a></p>
                  </div>
                </div>

              </div>
              <span className='heading-text'>+(91) 9898582705</span>
            </div>
            <div className='col-lg-2 col-md-0'></div>
            <div className='col-lg-4 col-md-12'>
              <section id="quote" className="bg-msar msar-quote-form">
                <section className="row">
                  <form onSubmit={sendEmail}>

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
                          //  onChange={onInputchange}
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
                            // onChange={onInputchange}
                            name="message"
                            required
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

export default ServiceDetailPage
