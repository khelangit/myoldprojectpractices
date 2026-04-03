import React from 'react'

const ContactInfo = ({companyInformation}) => {
    const {address_canada, address_india,email,phone_canada,phone_india,office_hours} = companyInformation;
    return (
        <div className="contact-info-area pt-100 pb-70">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="contact-info-box">
                            <div className="back-icon">
                                <i className='bx bx-map'></i>
                            </div>
                            <div className="icon">
                                <i className='bx bx-map'></i>
                            </div>
                            <h3>Our Address</h3>
                            <h5  className='country-address'>India</h5>
                            <p>{address_india}</p>
                            <h5 className='country-address'>Canada</h5>
                            <p>{address_canada}</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="contact-info-box">
                            <div className="back-icon">
                                <i className='bx bx-phone-call'></i>
                            </div>
                            <div className="icon">
                                <i className='bx bx-phone-call'></i>
                            </div>
                            <h3>Contact</h3>
                            <p>Mobile: <a href={`tel:${phone_india}`}>{phone_india}</a></p>
                            <p>Mobile: <a href={`tel:${phone_india}`}>{phone_canada}</a></p>
                            <p>E-mail: <a href={`mailto:${email}`}>{email}</a></p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">
                        <div className="contact-info-box">
                            <div className="back-icon">
                                <i className='bx bx-time-five'></i>
                            </div>
                            <div className="icon">
                                <i className='bx bx-time-five'></i>
                            </div>
                            <h3>Hours of Operation</h3>
                            {office_hours.map((doc,i) => (
                                <p>{doc.days}: {doc.time}</p>
                            ))}                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo