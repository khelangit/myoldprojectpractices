// import React from 'react'
// import { Link } from "gatsby"

// function JobRequirement({data}) {
//     return (
//         <div className="col-lg-12 col-md-12 col-md-3" style={{backgroundColor:"gray", borderRadius:"5px", margin:"5px"}}>

//             <div style={{padding:"10px"}}>
//                 <h4 style={{color:'white'}}>{data.title}</h4>
//                 <div className="row">
//                     <div className="col-lg-8 ">
//                     <div className="row">
//                             <div className="col">
//                                 Experience
//                             </div>
//                             <div className="col">
//                                 Positions
//                             </div>
//                             <div className="col">
//                                 Qualifications
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col">
//                                 {data.experience}
//                             </div>
//                             <div className="col">
//                                 {data.positions}
//                             </div>
//                             <div className="col">
//                                 {data.qualification}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4">
//                         <div className="row" style={{display:"flex"}}>

//                                 <div className="option-item " style={{padding: 10}}>
//                                     <Link 
//                                         to="/contact" 
//                                         activeClassName=""
//                                         // onClick={() => setCollapsed(true)}
//                                         className="default-btn"
//                                     >
//                                     <i className="flaticon-right"></i> View Details <span></span>
//                                     </Link>
//                                 </div>


//                                 <div className="option-item" style={{padding: 10}}>
//                                     <Link 
//                                         to="/contact" 
//                                         activeClassName="active"
//                                         // onClick={() => setCollapsed(true)}
//                                         className="default-btn"
//                                     >
//                                     <i className="flaticon-right"></i> Apply Now <span></span>
//                                     </Link>
//                                 </div>

//                         </div>

//                     </div>
//                 </div>

//             </div>

//         </div>
//     )
// }

// export default JobRequirement


import React from 'react'
import { Link } from "gatsby"
import scrollTo from 'gatsby-plugin-smoothscroll';
import Swal from 'sweetalert2'
import { useState } from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';
import ReactMarkdown from "react-markdown"

const JobRequirement = ({ vacancies }) => {

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
        Email: ${e.target.elements.email.value}
        Number: ${e.target.elements.number.value}
        Designation:${e.target.elements.designation.value}
        File:${e.target.elements.file.value}
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


        <>
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title popup-title" id="exampleModalLabel">GET IN TOUCH WITH US</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='email-form' onSubmit={sendEmail}>
                                <div className='row'>
                                    <div className='model-column col-lg-6'>
                                        <div className='space-form'>
                                            <input type='text'
                                                className='form-control form-control-popup'
                                                name="name"
                                                required
                                                id="name"
                                                placeholder="Your Name*">

                                            </input>
                                        </div>
                                        <div className='space-form'>
                                            <input type='email'
                                                className='form-control form-control-popup'
                                                name="email"
                                                id="email"
                                                required
                                                placeholder="Your Email*">

                                            </input>
                                        </div>
                                    </div>
                                    <div className='model-column col-lg-6'>
                                        <div className='space-form'>
                                            <input type='number'
                                                className='form-control form-control-popup'
                                                name="number"
                                                id="number"
                                                required
                                                placeholder="Your Mobile Number*">

                                            </input>
                                        </div>
                                        <div className='space-form'>
                                            <input type='text'
                                                className='form-control form-control-popup'
                                                name="designation"
                                                id="designation"
                                                required
                                                placeholder="Your Designation*">

                                            </input>
                                        </div>
                                    </div>
                                    <label className='upload-label'>Upload Resume*</label>
                                    <input type='file'
                                        className='form-control form-control-popup'
                                        name="file"
                                        id="file"

                                        placeholder="Attachment Your CV">

                                    </input>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <Accordion allowZeroExpanded>

                <div className="row">
                    {vacancies.map(data => (
                        <div className="col-md-12">
                            <AccordionItem key={data.node.id}>
                                <AccordionItemHeading style={{ width: '100%' }}>
                                    <AccordionItemButton>
                                        {data.node.title}
                                        <div style={{ marginTop: "10px" }}>
                                            <div className="row">
                                                <div className="col-lg-10 ">
                                                    <div className="row">
                                                        <div className="col">
                                                            Experience
                                                        </div>
                                                        <div className="col">
                                                            Positions
                                                        </div>
                                                        <div className="col">
                                                            Qualifications
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            {data.node.experience}
                                                        </div>
                                                        <div className="col">
                                                            {data.node.positions}
                                                        </div>
                                                        <div className="col">
                                                            {data.node.qualification}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-2">
                                                    <div className="row" style={{ display: "flex", flexDirection: "row" }}>

                                                        {/* <div className="option-item " style={{padding: 10}}>
                                                                <Link 
                                                                    to="/contact" 
                                                                    activeClassName=""
                                                                    // onClick={() => setCollapsed(true)}
                                                                    className="default-btn"
                                                                >
                                                                <i className="flaticon-right"></i> View Details <span></span>
                                                                </Link>
                                                            </div> */}

                                                        <div className="option-item" style={{ padding: 10 }}>

                                                            <button type="button" class="default-btn" data-toggle="modal" data-target="#exampleModal">
                                                                Apply Now
                                                            </button>
                                                            {/* <a href="#needhelpscrool">Apply Now</a> */}
                                                            {/* <button class="default-btn" onClick={() => scrollTo('#needhelpscrool')}>Apply Now</button> */}
                                                            {/* <a class="default-btn" href='#needhelpscrool'>Apply Now</a> */}

                                                            {/* <Link 
                                                                    to={data.node.link} 
                                                                    activeClassName="active"
                                                                    // onClick={() => setCollapsed(true)}
                                                                    className="default-btn" 
                                                                >
                                                              Apply Now <span></span>
                                                                </Link> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <ReactMarkdown
                                        children={data.node.description}
                                        components={{
                                            h1: 'h2',
                                            // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
                                            pre: ({ node, ...props }) => <pre style={{ position: 'relative', backgroundColor: '#03203C', color: 'white', padding: "20px", borderRadius: "10px" }}  {...props} />
                                        }}
                                    />
                                </AccordionItemPanel>
                            </AccordionItem>
                        </div>
                    ))}
                </div>

            </Accordion>
        </>

    )
}

export default JobRequirement

