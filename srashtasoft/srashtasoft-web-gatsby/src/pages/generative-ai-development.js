import React, { useState } from "react"
import Layout from "../components/App/Layout"
import Navbar from "../components/App/Navbar"
// import PageBanner from '../components/Common/PageBanner'; // <-- Remove this line
import Footer from "../components/App/Footer"

import ai_image from "../assets/images/ai_image.jpg"
import ai_banner2 from "../assets/images/ai-banner2.jpg"
import ai_banner3 from "../assets/images/ai_banner3.png"
import iot_1 from "../assets/images/iot_1.jpg"
import iot_2 from "../assets/images/iot_2.jpg"
import iot_3 from "../assets/images/iot_3.jpg"
import Custom_aps from "../assets/images/Custom_aps.png"
import data_preparation from "../assets/images/data_preparation.png"
import Industry_pecific from "../assets/images/Industry_pecific.png"
import Integration from "../assets/images/Integration.png"
import Ongoing_support from "../assets/images/Ongoing_support.png"
import Text_image from "../assets/images/Text_image.png"

// Add these imports at the top with other image imports
import step1_icon from "../assets/images/step1.png"
import step2_icon from "../assets/images/step2.png"
import step3_icon from "../assets/images/step3.png"
import step4_icon from "../assets/images/step4.png"
import step5_icon from "../assets/images/step5.png"

import Agriculture from "../assets/images/Agriculture.png"
import Automotive from "../assets/images/Automotive.png"
import Education from "../assets/images/Education.png"
import Energy from "../assets/images/Energy.png"
import Finance from "../assets/images/Finance.png"
import Government_public_sector from "../assets/images/Government_public_sector.png"
import Healthcare from "../assets/images/Healthcare.png"
import Legal_compliance from "../assets/images/Legal_compliance.png"
import Logistics from "../assets/images/Logistics.png"
import Manufacturing from "../assets/images/Manufacturing.png"
import Media from "../assets/images/Media.png"
import Retail from "../assets/images/Retail.png"

const services = [
  {
    title: "Custom AI-powered solutions",
    text: "Hire top Generative AI experts from SrashtaSoft to build intelligent, scalable, and automated solutions tailored to your business needs.",
    icon: Custom_aps,
  },
  {
    title: "Text, Image, Video, & Code Generation",
    text: "Our AI developers create powerful generative solutions that can produce text, images, videos, and even code with precision. Using GPT-4, DeepSeek, Gimini, Grok, Gum loop & other cutting-edge models.",
    icon: Text_image,
  },
  {
    title: "Industry-Specific Model Development",
    text: "We deliver AI models tailored specifically to your industry needs — be it healthcare, real estate, e-commerce, fintech, or education.",
    icon: Industry_pecific,
  },
  {
    title: "Integration & Automation Support",
    text: "Integrate powerful generative AI models seamlessly into your existing systems with help from our experienced team.",
    icon: Integration,
  },
  {
    title: "Data Preparation & Synthetic Data Generation",
    text: "High-quality data is the foundation of great AI. We help you analyze, clean, and structure your datasets for better AI training.",
    icon: data_preparation,
  },
  {
    title: "Ongoing Support & Optimization",
    text: "Our work doesn’t stop after deployment. We provide continuous monitoring, optimization, and support.",
    icon: Ongoing_support,
  },
]

const industries = [
  {
    title: "Finance",
    icon: Finance,
  },
  {
    title: "Manufacturing",
    icon: Manufacturing,
  },
  {
    title: "Media & Entertainment",
    icon: Media,
  },
  {
    title: "Retail & E-Commerce",
    icon: Retail,
  },
  {
    title: "Energy & Utilities",
    icon: Energy,
  },
  {
    title: "Legal & Compliance",
    icon: Legal_compliance,
  },
  {
    title: "Automotive",
    icon: Automotive,
  },
  {
    title: "Healthcare",
    icon: Healthcare,
  },
  {
    title: "Agriculture",
    icon: Agriculture,
  },
  {
    title: "Logistics & Supply Chain",
    icon: Logistics,
  },
  {
    title: "Education",
    icon: Education,
  },
  {
    title: "Government & Public Sector",
    icon: Government_public_sector,
  },
]

// Update the executionSteps array to include icons
const executionSteps = [
  { text: "Project Initiation & Requirements", icon: step1_icon },
  { text: "Solution Design", icon: step2_icon },
  { text: "Development & Training", icon: step3_icon },
  { text: "Testing & QA", icon: step4_icon },
  { text: "Deployment & Support", icon: step5_icon },
]

const faqData = [
  {
    question: "What AI development services do you offer?",
    answer:
      "We offer services like natural language processing, machine learning model development, computer vision, AI consulting, and custom AI solution development.",
  },
  {
    question: "How can AI benefit my business?",
    answer:
      "AI can streamline operations, improve customer service, provide predictive analytics, and automate routine tasks, increasing overall efficiency and innovation.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We specialize in healthcare, finance, e-commerce, manufacturing, and logistics, among other industries.",
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
        className="hero-section"
        style={{
          background: `url(${ai_image}) no-repeat center center/cover`,
          height: "500px",
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="bg-overlay d-flex align-items-center w-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <h2 className="fw-bold">
                  Generative AI Development, LLM Integration, <br />
                  and Gum loop Automation
                </h2>
                <p className="mt-3 text-white">
                  Generative AI empowers businesses with automation,
                  personalization, & <br />
                  data-driven decision-making. By leveraging advanced AI models,
                  companies can <br />
                  enhance content creation, streamline operations, & improve
                  user engagement.
                </p>
                <button
                  type="button"
                  className="btn btn-custom mt-4"
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
              <h2 className="h1 fw-bold text-headings mb-4">
                Partner With a Leading Generative AI Development Company to
                Power Your Innovation
              </h2>
              <p className="text-secondary mb-3">
                A high-performance business strategy today demands smart,
                scalable AI solutions to deliver engaging experiences, automate
                operations, and unlock new growth.
              </p>
              <p className="text-secondary mb-4">
                Whether you're looking for standalone services such as AI
                consulting, model development, synthetic data generation, or
                integration with your existing apps — we’ve got you covered.
              </p>
              <button
                type="button"
                className="btn btn-white px-4 py-2"
                style={{
                  color: "#1A2B5F",
                  border: "0.6px solid #1A2B5F",
                }}
              >
                Let’s Talk About Your Requirements
              </button>
            </div>
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
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section
        className="py-5 text-white position-relative"
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
            backgroundColor: "#007bff40",
            zIndex: 1,
          }}
        ></div>

        <div
          className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start"
          style={{ position: "relative", zIndex: 2 }}
        >
          <h2 className="h3 fw-bold mb-4 mb-md-0" style={{ fontSize: "46px" }}>
            Looking to build on
            <br />
            AI product in the industry?
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
            className="mb-5 fw-bold text-center"
            style={{ color: "#1A2B5F", fontSize: "40px" }}
          >
            Generative AI Development
          </h2>
          <div className="row g-4">
            {services.map((service, index) => (
              <div
                className="col-md-6 col-lg-6"
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
          height: "660px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div
          className="container text-center"
          style={{ height: "663px", alignContent: "center" }}
        >
          <h2
            className="fw-bold mb-5"
            style={{
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: "40px",
              letterSpacing: "2%",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            How We Execute Your Project
          </h2>
          <div
            className="row justify-content-center gy-4"
            style={{ height: "313px" }}
          >
            {executionSteps.map((step, index) => (
              <div
                className="col-6 col-sm-4 col-md-2"
                key={index}
                style={index % 2 !== 0 ? { marginTop: "70px" } : {}}
              >
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={step.icon}
                    alt={step.text}
                    className="mb-3"
                    style={{
                      width: "155px",
                      height: "155px",
                      objectFit: "contain",
                    }}
                  />
                  <p
                    className="fw-semibold small text-white mb-0"
                    style={{
                      fontWeight: 700,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "4%",
                      textAlign: "center",
                      verticalAlign: "middle",
                      textTransform: "capitalize",
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
            FAQs: Artificial Intelligence (AI) Development Services
          </h2>
          <div className="accordion" id="faqAccordion">
            {faqData.map((faq, index) => (
              <div className="accordion-item mb-3" key={index}>
                <h2 className="accordion-header" id={`faq${index}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faqCollapse${index}`}
                    style={{
                      backgroundColor: "#F8F9FA",
                      padding: "20px 30px",
                      fontWeight: "600",
                      fontSize: "18px",
                      color: "#1A2B5F",
                      borderRadius: "8px",
                    }}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`faqCollapse${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div
                    className="accordion-body"
                    style={{
                      padding: "20px 30px",
                      color: "#666",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  )
}

export default IotDevelopment
