import React, { useState } from "react"
import Layout from "../components/App/Layout"
import Navbar from "../components/App/Navbar"
import Footer from "../components/App/Footer"
import Swal from "sweetalert2"

// Use existing images from the original code
import ai_image from "../assets/images/ai_image.jpg"
import ai_banner2 from "../assets/images/ai-banner2.jpg"
import ai_banner3 from "../assets/images/ai_banner3.jpg"
import iot_1 from "../assets/images/iot_1.jpg"
import iot_2 from "../assets/images/iot_2.jpg"
import iot_3 from "../assets/images/iot_3.jpg"

const sendEmail = async e => {
  e.preventDefault()

  const messageBody = `
    Hi,
    
    Name: ${e.target.elements.name.value}
    Email: ${e.target.elements.email.value}
    Message: ${e.target.elements.message.value}
    Service: ${e.target.elements.service.value}
  `

  try {
    const response = await fetch(
      "https://p8t29dandg.execute-api.ap-south-1.amazonaws.com/prod",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.elements.email.value,
          messageBody,
        }),
      }
    )

    Swal.fire("Mail Sent Successfully!")
    window.location.reload(false)
  } catch (error) {
    console.log(error)
  }
}

const aiAgents = [
  {
    title: "Dental Clinic Appointment",
    subtitle: "Book a Dental Appointment",
    image: iot_1,
    buttonText: "Create an agent like this",
    tags: [
      "Health & Wellness",
      "Appointment & Scheduling",
      "Telehealth",
      "Chatbots & Virtual Assistants",
    ],
  },
  {
    title: "Hotel Concierge",
    subtitle: "Ask about hotel amenities",
    image: iot_2,
    buttonText: "Create an agent like this",
    tags: [
      "Health & Wellness",
      "Appointment & Scheduling",
      "Telehealth",
      "Chatbots & Virtual Assistants",
    ],
  },
  {
    title: "Archive Assistant",
    subtitle: "Help find your archives",
    image: iot_3,
    buttonText: "Create an agent like this",
    tags: [
      "Health & Wellness",
      "Appointment & Scheduling",
      "Telehealth",
      "Chatbots & Virtual Assistants",
    ],
  },
]

const aiSolutions = [
  {
    title: "AI Lead Generator",
    description:
      "Our advanced AI-powered lead generation and prospecting approach to your customers.",
    image: ai_banner2,
    buttonText: "Contact Us FREE",
    videoText: "Watch a demo",
  },
  {
    title: "AI Appointment Setter",
    description:
      "Designed to help you streamline appointments efficiently, our AI tools assist your business in booking and managing appointments with ease.",
    image: ai_banner3,
    buttonText: "Contact Us FREE",
    reversed: true,
  },
  {
    title: "AI Support Agent",
    description:
      "Designed to help you provide customer support with AI. Let customers reach out to you with questions through email, chat, and social media.",
    image: ai_image,
    buttonText: "Contact Us FREE",
    videoText: "Watch a demo",
  },
]

const faqItems = [
  "What happens after the free consultation?",
  "Do I need to pay the full 40$ Service fee upfront?",
  "Can I customize the package after pushing a request?",
  "How long does an AI agent take to develop?",
  "I have a specific AI project in mind that's not listed. Can you help me with it?",
  "I want to bring my AI Action Plan to life. What steps should I take next?",
]

const AIDevelopment = () => {
  const [expandedFaq, setExpandedFaq] = useState(null)

  const toggleFaq = index => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <Layout>
      <Navbar />

      {/* Hero Section */}
      <section
        className="hero-section position-relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)`,
          minHeight: "100vh",
          paddingTop: "120px",
          paddingBottom: "80px",
        }}
      >
        {/* Geometric background pattern */}
        <div
          className="position-absolute"
          style={{
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            background: `url(${ai_image}) no-repeat center center/cover`,
            opacity: 0.1,
          }}
        ></div>

        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <p
                className="text-muted mb-3"
                style={{ fontSize: "16px", fontWeight: "400" }}
              >
                Transform your business with
              </p>
              <h1
                className="display-1 fw-bold mb-4"
                style={{
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  lineHeight: "1.1",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AI<span style={{ color: "#2d3748" }}>DEVELOPMENT</span>
              </h1>
              <p
                className="lead text-muted mb-5"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.6",
                  maxWidth: "600px",
                }}
              >
                What is AI Development? Together you can opt-in to increase the
                potent, make sales, and growth business. AI is a cost-effective
                solution to your daily business problems and streamlines your
                work process. Let's see how deep building AI needed as a
                business the same for AI development in 2024.
              </p>
              <a
                href="/contact-us"
                className="btn btn-primary btn-lg px-5 py-3 rounded-pill"
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                }}
              >
                Contact us at once
              </a>
            </div>
          </div>

          {/* Arrow pointing down */}
          <div className="text-center mt-5">
            <div
              style={{
                fontSize: "40px",
                color: "#667eea",
                animation: "bounce 2s infinite",
              }}
            >
              ↓
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6">
              <h2 className="h2 fw-bold mb-0" style={{ color: "#2d3748" }}>
                Try out an AI agent for yourself
              </h2>
            </div>
            <div className="col-lg-6 text-end">
              <span className="text-muted">Powered by</span>
              <span className="ms-2 fw-bold" style={{ color: "#667eea" }}>
                Retail AI
              </span>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-2">
              {[
                "Health & Wellness",
                "Appointment & Scheduling",
                "Telehealth",
                "Chatbots & Virtual Assistants",
              ].map((tag, index) => (
                <span
                  key={index}
                  className="badge bg-light text-dark border px-3 py-2 rounded-pill"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* AI Agent Cards */}
          <div className="row g-4">
            {aiAgents.map((agent, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                  <div className="position-relative">
                    <img
                      src={agent.image}
                      alt={agent.title}
                      className="card-img-top"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div
                      className="position-absolute top-0 start-0 p-3 w-100"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                      }}
                    >
                      <h5 className="text-white fw-bold mb-1">{agent.title}</h5>
                      <p className="text-white-50 mb-0">{agent.subtitle}</p>
                    </div>
                  </div>
                  <div className="card-body text-center">
                    <button className="btn btn-primary rounded-pill px-4">
                      {agent.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-secondary me-2 rounded-circle"
              style={{ width: "40px", height: "40px" }}
            >
              ←
            </button>
            <button
              className="btn btn-outline-secondary rounded-circle"
              style={{ width: "40px", height: "40px" }}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Excited Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="h2 fw-bold mb-4" style={{ color: "#2d3748" }}>
                Excited, but not sure where to begin?
              </h2>
              <p className="text-muted mb-4" style={{ fontSize: "16px" }}>
                Get started with a comprehensive AI Action Plan. Get experts who
                identify how to leverage AI for your business and provide a
                clear roadmap.
              </p>
              <a
                href="/contact-us"
                className="btn btn-primary rounded-pill px-4 py-2"
              >
                Get yours FREE now
              </a>
            </div>
            <div className="col-lg-6 text-center">
              <div className="position-relative">
                <div
                  style={{
                    fontSize: "120px",
                    fontWeight: "800",
                    color: "#f7fafc",
                    WebkitTextStroke: "2px #e2e8f0",
                    textStroke: "2px #e2e8f0",
                  }}
                >
                  AI
                </div>
                <div className="position-absolute top-50 start-50 translate-middle">
                  <div
                    className="bg-primary text-white p-4 rounded-3 shadow"
                    style={{
                      width: "200px",
                      height: "250px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h5 className="text-white fw-bold mb-2">AI</h5>
                    <p className="text-white-50 mb-0">Action Plan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Solutions */}
      <section className="py-5 bg-light">
        <div className="container">
          {aiSolutions.map((solution, index) => (
            <div
              key={index}
              className={`row align-items-center mb-5 ${
                solution.reversed ? "flex-row-reverse" : ""
              }`}
            >
              <div className="col-lg-6">
                <h3 className="h3 fw-bold mb-3" style={{ color: "#2d3748" }}>
                  {solution.title}
                </h3>
                <p className="text-muted mb-4" style={{ fontSize: "16px" }}>
                  {solution.description}
                </p>
                <a
                  href="/contact-us"
                  className="btn btn-primary rounded-pill px-4 py-2"
                >
                  {solution.buttonText}
                </a>
              </div>
              <div className="col-lg-6 text-center">
                <div className="position-relative">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="img-fluid rounded-3 shadow"
                    style={{
                      maxHeight: "300px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                  {solution.videoText && (
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <button
                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center mb-2"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <span style={{ fontSize: "20px", marginLeft: "3px" }}>
                          ▶
                        </span>
                      </button>
                      <p className="text-white fw-bold mb-0 text-shadow">
                        {solution.videoText}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Solutions */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="h2 fw-bold mb-3">Enterprise Solutions</h2>
              <p className="mb-4" style={{ fontSize: "16px" }}>
                All-in-one solutions for large-scale operations
              </p>

              <div className="bg-dark bg-opacity-25 p-4 rounded-3 mb-4">
                <h4 className="h5 fw-bold mb-2">AI Call Center</h4>
                <p className="mb-3" style={{ fontSize: "14px" }}>
                  Transform your customer service with AI-powered call center
                  solutions that handle multiple languages and provide 24/7
                  support.
                </p>
                <a
                  href="/contact-us"
                  className="btn btn-light rounded-pill px-4 py-2"
                >
                  Contact Us FREE
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src={ai_banner3}
                alt="AI Call Center"
                className="img-fluid rounded-3"
                style={{
                  maxHeight: "400px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2
            className="h2 fw-bold text-center mb-5"
            style={{ color: "#2d3748" }}
          >
            Frequently Asked Questions
          </h2>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              {faqItems.map((question, index) => (
                <div key={index} className="border-bottom py-3">
                  <button
                    className="btn btn-link text-start w-100 text-decoration-none p-0 fw-semibold d-flex align-items-center"
                    style={{ color: "#2d3748" }}
                    onClick={() => toggleFaq(index)}
                  >
                    <span
                      className="me-3"
                      style={{
                        transform:
                          expandedFaq === index
                            ? "rotate(90deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      ▶
                    </span>
                    {question}
                  </button>
                  {expandedFaq === index && (
                    <div className="mt-3 ps-4 text-muted">
                      <p>
                        This is the answer to the question. We provide
                        comprehensive support and detailed explanations for all
                        your AI development needs.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="h2 fw-bold mb-3" style={{ color: "#2d3748" }}>
            Got something else in mind?
          </h2>
          <p className="text-muted mb-4" style={{ fontSize: "16px" }}>
            Why wait? Post your project today and let our AI-powered freelancers
            bring your vision to life.
          </p>
          <a
            href="/contact-us"
            className="btn btn-primary rounded-pill px-5 py-3 mb-5"
          >
            Send a Quote
          </a>

          {/* Decorative trees placeholder */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="d-flex justify-content-center align-items-end gap-4"
                style={{ opacity: 0.3 }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "120px",
                    background: "linear-gradient(to top, #22c55e, #16a34a)",
                    borderRadius: "30px 30px 0 0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "6px",
                      height: "20px",
                      background: "#92400e",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    width: "80px",
                    height: "160px",
                    background: "linear-gradient(to top, #22c55e, #16a34a)",
                    borderRadius: "40px 40px 0 0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "8px",
                      height: "20px",
                      background: "#92400e",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    width: "60px",
                    height: "140px",
                    background: "linear-gradient(to top, #22c55e, #16a34a)",
                    borderRadius: "30px 30px 0 0",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "6px",
                      height: "20px",
                      background: "#92400e",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translateY(0);
          }
          40%,
          43% {
            transform: translateY(-15px);
          }
          70% {
            transform: translateY(-7px);
          }
          90% {
            transform: translateY(-3px);
          }
        }

        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </Layout>
  )
}

export default AIDevelopment
