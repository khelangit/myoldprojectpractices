import React from "react"
import Layout from "../components/App/Layout"
import Navbar from "../components/App/Navbar"
// import PageBanner from '../components/Common/PageBanner'; // <-- Remove this line
import Footer from "../components/App/Footer"

import ai_image from "../assets/images/iot_image.png"
import ai_banner2 from "../assets/images/iot_banner.png"
import ai_banner3 from "../assets/images/iot_banner.png"
import iot_1 from "../assets/images/iot1.png"
import iot_2 from "../assets/images/iot2.png"
import iot_3 from "../assets/images/iot3.png"
import Custom_aps from "../assets/images/IOT_app.png"
import data_preparation from "../assets/images/IOT_plateform.png"
import Industry_pecific from "../assets/images/Flexible_IOT.png"
import Integration from "../assets/images/IOT_Support.png"
import Ongoing_support from "../assets/images/IOT_devices.png"
import Text_image from "../assets/images/Hardware_con_api.png"

// Add these imports at the top with other image imports
import step1_icon from "../assets/images/step1.png"
import step2_icon from "../assets/images/step2.png"
import step3_icon from "../assets/images/step3.png"
import step4_icon from "../assets/images/step4.png"
import step5_icon from "../assets/images/step5.png"
import step6_icon from "../assets/images/step6.png"

import Agriculture from "../assets/images/agri_iot.png"
import Automotive from "../assets/images/env_moni.png"
import Education from "../assets/images/Education.png"
import Energy from "../assets/images/smart_enegry.png"
import Finance from "../assets/images/smart-city.png"
import Government_public_sector from "../assets/images/Travel_&_Hospitality.png"
import Healthcare from "../assets/images/health_iot.png"
import Legal_compliance from "../assets/images/on_dem_ser.png"
import Logistics from "../assets/images/smart-sensors.png"
import Manufacturing from "../assets/images/Manufacturing.png"
import Media from "../assets/images/smart-lock.png"
import Retail from "../assets/images/smart-retail.png"

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"

const services = [
  {
    title: "IoT Application Development",
    text: "The Internet of Things (IoT) system is essential for increasing business intelligence. We can create new and diverse IoT applications while maintaining high security.",
    icon: Custom_aps,
  },
  {
    title: "Hardware connect API Development",
    text: "We design and develop a wide range of applications for the Android mobile platform, taking advantage of current trends and technology. We have the knowledge and experience to develop APIs.",
    icon: Text_image,
  },
  {
    title: "Flexible IoT Models",
    text: "We can create IoT programs that are adaptable to your requirements.",
    icon: Industry_pecific,
  },
  {
    title: "IoT support & Help",
    text: "We will always be available to assist and support you in accordance with your needs.",
    icon: Integration,
  },
  {
    title: "IoT Platform for Future",
    text: "The Internet of Things (IoT) will be huge in the future. As a result, you can use our team's expertise to build your products on the IoT platform.",
    icon: data_preparation,
  },
  {
    title: "Wear IoT devices",
    text: "Our team of IoT developers will assist in the development of products that will be linked to wearables in the future.",
    icon: Ongoing_support,
  },
]

const industries = [
  {
    title: "Smart Cities",
    icon: Finance,
  },
  {
    title: "Industrial IoT",
    icon: Manufacturing,
  },
  {
    title: "Smart Home",
    icon: Media,
  },
  {
    title: "Smart Retail",
    icon: Retail,
  },
  {
    title: "Agricultural IoT",
    icon: Agriculture,
  },
  {
    title: "On-Demand Service",
    icon: Legal_compliance,
  },
  {
    title: "Smart Energy",
    icon: Energy,
  },
  {
    title: "Healthcare IoT",
    icon: Healthcare,
  },
  {
    title: "Environmental Monitoring",
    icon: Automotive,
  },
  {
    title: "Smart Sensors",
    icon: Logistics,
  },
  {
    title: "Education & eLearning",
    icon: Education,
  },
  {
    title: "Travel & Hospitality",
    icon: Government_public_sector,
  },
]

// Update the executionSteps array to include icons
const executionSteps = [
  { text: "Project Initiation & Goal Definition", icon: step1_icon },
  { text: "Planning & Strategy", icon: step2_icon },
  { text: "Execution & Task Management", icon: step3_icon },
  { text: "Monitoring Control", icon: step4_icon },
  { text: "Quality Assurance & Testing", icon: step5_icon },
  { text: "Closure & Review", icon: step6_icon },
]

const faqData = [
  {
    question:
      "What is Internet Of Things (IoT) Software Solutions for a Smarter Future?",
    answer:
      "IoT software solutions are comprehensive systems that connect and manage smart devices, sensors, and applications. We provide end-to-end IoT solutions including device connectivity, data collection, cloud integration, and smart applications that help businesses automate processes, gather insights, and create innovative connected experiences.",
  },
  {
    question: "How Does an IoT App Development Company Help?",
    answer:
      "An IoT app development company helps by creating custom solutions that connect your devices, collect and analyze data, and provide meaningful insights. We assist with hardware integration, develop secure communication protocols, create user-friendly interfaces, implement cloud solutions, and ensure scalability of your IoT ecosystem.",
  },
  {
    question: "Why do you Think an IoT Development Company is good for us?",
    answer:
      "An IoT development company brings expertise in creating connected solutions across various industries including smart manufacturing, healthcare monitoring, agricultural automation, smart cities, and energy management. We have the technical knowledge to handle complex IoT architectures, ensure security compliance, and deliver scalable solutions that grow with your business needs.",
  },
]

const IotDevelopment = () => {
  // Removed unused openIndex and setOpenIndex state

  // const toggleIndex = (index) => { // <-- Remove this function
  //   setOpenIndex(openIndex === index ? null : index);
  // };

  return (
    <Layout>
      <Navbar />

      {/* Hero Section */}
      <section
        className="hero-section bg-overlay"
        style={{
          background: `url(${ai_image}) no-repeat center center/cover`,
          height: "500px",
          color: "white",
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="d-flex align-items-center w-100">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <h2 className="fw-bold">
                  Empowering Tomorrow's <br />
                  Connected World
                </h2>
                <p className="mt-3 text-white">
                  A cutting-edge IoT solution demands a robust, scalable
                  software <br /> ecosystem that fully leverages your advanced
                  embedded hardware <br /> while delivering a seamless user
                  experience
                </p>
                <button
                  type="button"
                  className="btn btn-custom bg-light mt-4"
                  // onClick={() => { /* Add your action here */ }}
                >
                  Let’s talk Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <div className="row">
                <div className="col-6">
                  <img
                    src={iot_1}
                    loading="lazy"
                    className="img-fluid rounded shadow"
                    alt="Generative AI Illustration 1"
                  />
                </div>
                <div className="col-6">
                  <img
                    src={iot_2}
                    loading="lazy"
                    className="img-fluid rounded shadow"
                    alt="Generative AI Illustration 2"
                  />
                </div>
                <div className="col-12 pt-4">
                  <img
                    src={iot_3}
                    loading="lazy"
                    className="img-fluid rounded shadow"
                    alt="Generative AI Illustration 3"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="h1 fw-bold text-headings mb-4">
                Partner with a top IoT <br /> software development company to
                bring your product to life.
              </h2>
              <p className="text-secondary mb-3">
                A powerful embedded hardware system demands a robust and
                scalable software solution to unlock its full potential and
                deliver a seamless user experience. By partnering with Excellent
                Web world, you can enjoy effortless usability, unmatched
                adaptability, secure connectivity, and seamless interoperability
                ensuring that future upgrades become a smooth transition for
                your project.
              </p>
              <p className="text-secondary mb-4">
                Whether you’re in need of a standalone service—covering areas
                like technical feasibility, device connectivity, firmware
                development, cloud integration, or connected mobile application
                development—or seeking a comprehensive suite of IoT software
                development services, our expertise spans every facet to support
                your innovation.
              </p>
              <button
                type="button"
                className="btn btn-white px-4 py-2"
                style={{
                  color: "#1A2B5F",
                  border: "0.6px solid #1A2B5F",
                }}
              >
                Let’s talk IoT development
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section
        className="py-5 bg-blue-500 text-white position-relative"
        style={{
          background: `url(${ai_banner2}) no-repeat center center/cover`,
          height: "350px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 72, 186, 0.85)", // Changed to a more solid blue overlay
            zIndex: 1,
          }}
        ></div>

        <div
          className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start"
          style={{ position: "relative", zIndex: 2 }}
        >
          <h2 className="h3 fw-bold mb-4 mb-md-0" style={{ fontSize: "46px" }}>
            Looking to build an <br />
            IOT product in the industry? 
            <br />
            We’ve done it before
          </h2>
          <a
            href="#contact"
            className="btn btn-light fw-semibold text-dark"
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "2%",
              width: "180PX",
              height: "56",
              borderRadius: "6px",
            }}
          >
            Let’s talk Now!
          </a>
        </div>
      </section>

      {/* Services */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2
            className="mb-5 fw-bold"
            style={{ color: "#1A2B5F", fontSize: "40px" }}
          >
            IOT Development
          </h2>
          <div className="row g-4">
            {services.map((service, index) => (
              <div
                className="col-md-4 col-lg-4"
                key={index}
                style={{ marginTop: "30px" }}
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <img
                      src={service.icon}
                      loading="lazy"
                      className="mb-3"
                      alt={service.title}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "contain",
                      }}
                    />
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text text-muted">{service.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4" style={{ color: "#1A2B5F" }}>
            Industries We Serve
          </h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-4">
            {industries.map((industry, index) => (
              <div
                className="col"
                key={index}
                style={{
                  height: "160px !important",
                  marginTop: "24px",
                }}
              >
                <div
                  className="p-4 shadow-sm h-100 text-center"
                  style={{ borderRadius: "12px", border: "1px solid #E3E3E3" }}
                >
                  <img
                    src={industry.icon}
                    alt={industry.title}
                    className="mb-3"
                    loading="lazy"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                  <h5 className="fw-semibold font_size mb-2">
                    {industry.title}
                  </h5>
                  <p className="text-muted small mb-0">{industry.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Execution Steps */}
      <section
        className="bg-primary text-white py-5"
        style={{
          background: `url(${ai_banner3}) no-repeat center center/cover`,
          minHeight: "660px", // Changed from fixed height to minHeight
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "40px 0", // Added padding for better mobile spacing
        }}
      >
        {/* Add overlay div */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 72, 186, 0.85)",
            zIndex: 1,
          }}
        ></div>

        <div
          className="container text-center"
          style={{
            minHeight: "663px", // Changed from fixed height to minHeight
            alignContent: "center",
            position: "relative", // Added for z-index to work
            zIndex: 2, // Added to place content above overlay
          }}
        >
          <h2
            className="fw-bold mb-5"
            style={{
              fontWeight: 700,
              fontSize: "clamp(28px, 5vw, 40px)", // Responsive font size
              lineHeight: "1.2",
              letterSpacing: "2%",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            How We Execute Your Project
          </h2>
          <div
            className="row justify-content-center g-4"
            style={{ 
              minHeight: "313px", // Changed from fixed height
              margin: "0 -12px" // Added negative margin to counter padding
            }}
          >
            {executionSteps.map((step, index) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-2" // Updated responsive columns
                key={index}
                style={{
                  marginTop: index % 2 !== 0 ? "clamp(30px, 5vw, 70px)" : "0", // Responsive margin
                  padding: "0 12px" // Added padding for better spacing
                }}
              >
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={step.icon}
                    alt={step.text}
                    className="mb-3"
                    style={{
                      width: "clamp(100px, 15vw, 155px)", // Responsive image size
                      height: "clamp(100px, 15vw, 155px)", // Responsive image size
                      objectFit: "contain",
                    }}
                  />
                  <p
                    className="fw-semibold small text-white mb-0"
                    style={{
                      fontWeight: 700,
                      fontSize: "clamp(14px, 2vw, 16px)", // Responsive font size
                      lineHeight: "1.5",
                      letterSpacing: "4%",
                      textAlign: "center",
                      verticalAlign: "middle",
                      textTransform: "capitalize",
                      maxWidth: "200px", // Added max-width for better text wrapping
                      margin: "0 auto"
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2
            className="text-center fw-bold mb-4"
            style={{
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textTransform: "capitalize",
            }}
          >
            FAQs: Internet of Things (IoT) Development Services
          </h2>
          <div
            className="panel-group wrap"
            id="bs-collapse"
            style={{ width: "90%", justifySelf: "center" }}
          >
            <Accordion allowZeroExpanded>
              {faqData.map((faq, index) => (
                <AccordionItem key={index}>
                  <AccordionItemHeading>
                    <AccordionItemButton>{faq.question}</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>{faq.answer}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  )
}

export default IotDevelopment
