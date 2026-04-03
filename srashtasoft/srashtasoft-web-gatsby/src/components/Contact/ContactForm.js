import React from 'react'
import starIcon from '../../assets/images/star-icon.png'
import contact from '../../assets/images/contact.png'
import Swal from 'sweetalert2'
import { useState } from 'react';


const ContactForm = () => {

    const [inputs, setInputs] = useState({})


    const onInputchange = (event) => {
        setInputs(s => ({
            ...s,
            [event.target.name]: event.target.value
        }));
    }

    /**
     * Handles Send Mesage buttons click evemnt
     * Calles AWS lambda API and sends email with details which are filled by user
     */
    const sendEmail = async (e) => {
        e.preventDefault()
        // alert('sent successfully');

        const messageBody = `

        Hi,
        
        Name: ${inputs.name}
        Phone No: ${inputs.phone}
        Message:${inputs.message}
        `

        try {

            const response = await fetch('https://p8t29dandg.execute-api.ap-south-1.amazonaws.com/prod', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "no-cors", // no-cors, cors, *same-origin
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: inputs.email, messageBody },), // body data type must match "Content-Type" header
            }).then(() => Swal.fire(
                'Mail Sent Successfully!',

            )
            )
            window.location.reload(false);
            ;
            const json = await response.json()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="contact-area pb-100">
            <div className="container">
                <div className="section-title">
                    {/* <span className="sub-title">
                        <img src={starIcon} alt="contact" /> 
                        Get in Touch
                    </span> */}
                    <h2>Ready to Get Started?</h2>
                    {/* <p>Your email address will not be published. Required fields are marked *</p> */}
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="contact-image">
                            <img src={contact} alt="contact" />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="contact-form">
                            <form id="contactForm" onSubmit={sendEmail}>
                                <div className="row">
                                    <div className="col-lg-12 col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                required
                                                placeholder="Your name*"
                                                onChange={onInputchange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                required
                                                placeholder="Your email address*"
                                                onChange={onInputchange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                required
                                                pattern="[1-9]{1}[0-9]{9}"
                                                maxlength="10" size="10"
                                                placeholder="Your phone number*"
                                                onChange={onInputchange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <textarea
                                                name="message"
                                                className="form-control"
                                                cols="30"
                                                rows="6"
                                                required
                                                placeholder="Write your message..."
                                                onChange={onInputchange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12">
                                        <button type="submit" className="default-btn">
                                            Send Message <span></span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm