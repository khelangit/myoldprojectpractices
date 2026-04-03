import React, { useState, useEffect } from 'react';
import Layout from "../components/App/Layout"
import Navbar from "../components/App/Navbar"
import Footer from "../components/App/Footer"
import cybersecurity from '../assets/images/cybersecurity.jpg'
import whoweare1 from '../assets/images/whoweare1.jpg'
import whoweare2 from '../assets/images/whoweare1.jpg'
import whoweare3 from '../assets/images/whoweare3.jpg'
import eye from '../assets/images/eye.png'
import vulnerability from '../assets/images/vulnerability.png'
import cybersecuritydiagram from '../assets/images/cybersecuritydiagram.jpg'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
// function scrollToSection(event) {
//   // event.preventDefault();
//   // var $section = $($(this).attr('href')); 
//   var section=event.href;
//   console.log(section);
//   // $('html, body').animate({
//   //   scrollTop: $section.offset().top
//   // }, 500);
// }
// $('[data-scroll]').on('click', scrollToSection);

function CyberSecurity() {
  const scrollToSection = (section) => {
    const positionSection = document.getElementById(section);
    if (positionSection) {
      let offset = getOffset(positionSection);
      window.scrollTo({ top: offset.top, behavior: 'smooth' });
    }
    var elem = document.getElementsByClassName('nav-link');
    for (let i = 0; i < elem.length; i++) {
      elem[i].classList.remove("active");
    }

    positionSection.classList.add("active");
    document.getElementsByClassName(section)[0].classList.add("active");
  };

  const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY-190,
    };
  };

  useEffect(() => {
    var count = 0;
    window.onscroll = function () { myFunction() };
    function myFunction() {
      var navs = document.getElementById("navs");
      // console.log(navs);
      if (navs) {
        var sticky = navs.offsetTop;
        // console.log(sticky);
        // console.log('egwigw');
        if (window.pageYOffset >= sticky) {
          navs.classList.add("sticky");
        } else {
          navs.classList.remove("sticky");
        }
      }
    }
  })
//   function onScroll(event) {
//     var sections = document.querySelectorAll('.page-scroll');
//     console.log(sections);
//     var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//     for (var i = 0; i < sections.length; i++) {
//         var currLink = sections[i];
//         var val = currLink.getAttribute('href');
//         var refElement = document.querySelector(val);
//         var scrollTopMinus = scrollPos + 73;
//         if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
//           console.log("if");  
//           document.querySelector('.page-scroll').classList.remove('active');
//             currLink.classList.add('active');
//         } else {
//           console.log("else");
//             currLink.classList.remove('active');
//         }
//     }
// };
// window.document.addEventListener('scroll', onScroll);


  const [accordianIndex, setAccordianIndex] = useState(0)

  return (

    <Layout>

      <Navbar />
      <>

        <div className='main-image-class'>

          <img className='cyber-image' src={cybersecurity}></img>
          <h1 class="centered">CYBER SECURITY</h1>
        </div>
        <section id='navs' className='nav nav-menubar'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <ul className='nav nav-pills nav-pills-tertiary justify-content-center'>
                  <li className='nav-item' >
                    <a data-scroll className='nav-link nav-actives page-scroll active vapt' style={{ cursor: "pointer" }} onClick={() => scrollToSection("vapt")} >VAPT Audit</a>
                  </li>
                  <li className='nav-item'>
                    <a  data-scroll className='nav-link nav-actives page-scroll forensic' style={{ cursor: "pointer" }} onClick={() => scrollToSection("forensic")}>Forensic Audit</a>
                  </li>
                  <li className='nav-item'>
                  </li>
                  <li className='nav-item'>
                    <a data-scroll className='nav-link nav-actives page-scroll statutory' style={{ cursor: "pointer" }} onClick={() => scrollToSection("statutory")}>Statutory Audit</a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link nav-actives page-scroll edp' style={{ cursor: "pointer" }} onClick={() => scrollToSection("edp")}>EDP Audit</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className='vapt-class' id='vapt'>
          <div className='container'>
            <div className='col-lg-12 text-center'>
              {/* <img className='diagrame-security'src={cybersecuritydiagram}></img> */}
              <h2>VAPT Audit</h2>
              <p>Vulnerability Assessment and Penetration Testing (VAPT) portrays an expansive scope of security testing administrations intended to identify and help address Cyber security exposures. To guarantee that you pick the correct sort of evaluation for your association's necessities, it's essential to comprehend services and the contrasts between them. The different idea of VAPT assessments implies that they can fluctuate fundamentally inside and out, extension and cost.</p>
            </div>
            <div className='row row-space'>
              <div className='col-md-6 div-left'>
                <h5>What is VAPT?</h5>
                <p>Vulnerability Assessment and Penetration Testing (VAPT) are 2 types of vulnerability testing. The tests have totally different strengths and atypically Combined to attain a lot of complete vulnerability analysis. In short, Penetration Testing and Vulnerability Assessments perform 2 totally different tasks, typically with totally different results, at intervals constant space of focus. In order to confirm that you just opt for the proper sort of assessment for your organisation’s desires, it’s vital to know VAPT services and therefore the variations between them. the various nature of VAPT assessments implies that they'll vary considerably comprehensive, breadth, scope and value.</p>
              </div>
              <div className='col-md-6 div-right'>
                <img src={whoweare1}></img>
                <img src={whoweare2}></img>
                <img src={whoweare3}></img>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4'>

                <div className="panel-group wrap" id="bs-collapse">

                  <Accordion allowZeroExpanded>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                        Network substructure testing.
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                        To detect and exploit a wide variety of security flaws, Phoenix IT Park examines the network. This helps us to assess if properties such as documents may be exploited, categorize the threats presented to your overall cyber protection, prioritize vulnerabilities to be resolved, and propose defined risk reduction measures.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                        Security testing of web application.
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                        Web apps play a crucial role in the growth of business and are an enticing choice for cybercriminals. Ethical hacker resources from Phoenix IT Park include website and mobile app intrusion testing to detect bugs such as SQL injection and cross-site scripting challenges, including application logic vulnerabilities and session control flows.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                        Wireless network Testing.
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                        Unsecured wireless networks can allow attackers to access and capture valuable data from your network. Wireless penetration tests detect flaws, measure the harm they can inflict, and decide how to fix them.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                        Security Analysis of Application and API.
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                        Software-contained bugs are widely abused by cybercriminals and are quickly implemented by programmers under strain. To analyze backend program logic and program and API source code, Phoenix IT Park's ethical hackers perform automated and manual penetration tests.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              <div className='col-md-4'>
                <img className='vulnerability-image' src={vulnerability}></img>
              </div>
              <div className='col-md-4'>
                <div className="panel-group wrap" id="bs-collapse">

                  <Accordion allowZeroExpanded>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                        Remote working evaluation.
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                        When, for the first time, your company accepts mass remote working, it is important to ensure that it does so safely. Ensure that the networks, systems and computers with a custom remote working safety test are controlled and completely secured.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                        Mobile security testing.
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                        The use of mobile applications is on the rise, with more and more businesses encouraging clients to access their services easily through tablets and smartphones. Centered on the new programming platforms and security monitoring tools, Phoenix IT Park carries out in-depth mobile device tests.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                        Firewall configure analysis.
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                        Rule sets for firewalls will become obsolete easily. In order to optimize protection and throughput, Phoenix IT Park's penetration testers will identify insecure setups and suggest improvements.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                        Social engineering
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                        People still be one among the weakest links in associate degree organisation’s cyber security. Redscan’s social engineering pen check service includes a spread of email phishing engagements designed to assess the power of your systems and personnel to notice and answer a simulated attack exercise.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='vapt-class forensic-image' id='forensic'>
          <div className='container'>
            <div className='text-center'>
              <h2>Forensic Audit</h2>
              <p>A forensic audit is an analysis and review of the financial records of a company or person to extract facts, which can be used in a court of law. Forensic auditing is a speciality in the accounting industry, and most major accounting firms have a department forensic auditing. Forensic audits include the experience in accounting and auditing practices as well as expert knowledge of forensic audit's legal framework.</p>
              <p>Forensic audits cover a large spectrum of investigative activities. There may be a forensic audit to prosecute a party for fraud, embezzlement or other financial crimes. The auditor may be called in during the process of a forensic audit to serve as an expert witness during trial proceedings. Forensic audits could also include situations that do not involve financial fraud, such as bankruptcy filing disputes, closures of businesses, and divorces.</p>

            </div>

            <div className='row'>
              <div className='col-lg-3 col-sm-6'>
                <div className='box-content px-4'>
                  <div className='dss'>
                    <i class='fa fa-lock' style={{ textAlign: "center" }}></i>
                  </div>

                  <h4 className='content-h4'>Planning the Investigation</h4>
                  <p className='content-para'>The forensic auditor and the team will plan their investigation in order to meet their objectives.</p>
                </div>
              </div>
              <div className='col-lg-3 col-sm-6'>
                <div className='box-content px-4'>
                <div className='dss'>
                <i class="fa fa-eye"></i>
                  </div>
                  <h4 className='content-h4'>Collecting Evidence</h4>
                  <p className='content-para'>The evidence gathered should be sufficient to prove in court the identity of the fraudster(s).</p>
                </div>
              </div>
              <div className='col-lg-3 col-sm-6'>
                <div className='box-content px-4'>
                <div className='dss'>
                <i class='fas fa-file-signature'></i>
                  </div>
                  <h4 className='content-h4'>Reporting</h4>
                  <p className='content-para'>A forensic audit will need a written report on the crime to be given to the client, so that if they desire, they can continue to file a legal case.</p>
                </div>
              </div>
              <div className='col-lg-3 col-sm-6'>
                <div className='box-content px-4'>
                <div className='dss'>
                <i class="fas fa-door-open"></i>
                  </div>
                  <h4 className='content-h4'>Court Proceedings</h4>
                  <p className='content-para'>During court proceedings, the forensic investigator must be present to clarify the evidence collected and how the suspect(s) were found by the team.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='vapt-class' id='statutory'>

          <div className='container'>
            <div className='text-center'>
              <h2>Statutory Audit</h2>
              <p>A statutory audit is a legally required check of the accuracy of the financial statements and records of a company or government. A statutory audit is intended to determine if an organisation delivers an honest and accurate representation of its financial position by evaluating information, such as bank balances, financial transactions, and accounting records.</p>
            </div>
            <h4>How Does a Statutory Audit Function?</h4>
            <p>The term statutory signifies that statutory auditing is necessary. A statute is a regulation or law enacted by the associated government of the organisation's legislative branch. Multilevel laws may be passed by the Centre or State. In a company, a regulation also applies to any law set by the management team or board of directors of the organisation.</p>
            <p>An audit is an examination of records held by an agency, company, government department, or individual. This usually involves analysing different financial records or other areas. During a financial audit, reports of a company with respect to revenue or benefits, returns on investment, expenditures, and other things can be included in the audit process. Often, a variety of these elements are used when determining a cumulative ratio.</p>
            <p>The objective of a financial audit is often to assess whether funds have been properly handled and that all records and filings required are accurate. Undergoing a statutory audit is not an implicit indication of misconduct. Instead, it is also a formality intended to help discourage crimes, such as misappropriating funds by ensuring a professional third party routinely scrutinises various documents. The same applies to other audit forms too.</p>
          </div>

        </section>
        <section className='vapt-class' id='edp'>
          <div className='container'>
            <div className='text-center'>
              <h2>EDP Audit</h2>
              <p>Electronic Data Processing (EDP) refers to the input, processing and output of information. EDP is often called Information Services or Systems (IS) or Management Information Services (MIS), according to Tech Target. The information processed is used and evaluated during an audit.</p>
              <p>An EDP audit is systematic: It follows simple steps to achieve its goal.these steps include:</p>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='border-padding'>
                  <h4 className='left-head'>
                    Planning
                  </h4>
                  <p className='text-align'>During the planning stage, make sure the auditor is familiar with your systems. The scope of work should be defined in detail. This is an important initial step, because an auditor should have access only to records needed to perform their mission and nothing more.</p>
                  </div>
                  </div>
                  <div className='col-md-6'>
                  <div className='border-padding'>
                  <h4 className='right-head'>
                    Reporting
                  </h4>
                  <p className='text-align'>The reporting phase compiles all the information that has been discovered. Ultimately, it's your report card.</p>
                </div>
                </div>
               
                <div className='col-md-6'>
                <div className='border-padding'>
                <h4 className='left-head'>
                    Fieldwork
                  </h4>
                  <p className='text-align'>The dirty work takes place in the fieldwork stage. One way to expedite this process is to have an audit liaison assigned to the project. CSO suggests that an employee in IT, or whoever is most familiar with your systems, should take on this liaison role.</p>
                 </div>
                 </div>
                 <div className='col-md-6'>
                 <div className='border-padding'>
                  <h4 className='right-head'>
                    Follow-up
                  </h4>
                  <p className='text-align'>Finally, if there are any discrepancies, it's important to follow up to correct and improve on procedures and processes.</p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      

      </>
      <Footer />
    </Layout>


  );

}


export default CyberSecurity;
