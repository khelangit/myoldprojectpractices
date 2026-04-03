import React from 'react';
import {Link,graphql, useStaticQuery } from "gatsby"
import our_experience from '../../assets/images/our_experience.png'
import team_member from '../../assets/images/team_member.png'
import our_client from '../../assets/images/our_client.png'
import our_project from '../../assets/images/our_project.png'


const query = graphql`
    {
        strapiCompanyHighlight {
            team_members
            projects
            clients
            year_of_experience
          }
    }
`


function FunfactComponent() {
    const data = useStaticQuery(query)
    const companyHighlight = data.strapiCompanyHighlight

  return (
    <section className='why-choose-sarshtasoft'>
    <h1>WHY CHOOSE <span>SRASHTASOFT</span></h1>
    <p> Strength </p>
    <div className='container'>
    <div className='row'>
      <div className='col-md-3'>
        <div className='icon-div'>
        <div class="icon"><img class="iconss-image" src={our_experience} alt="project completed" />                 
        </div>
        <span>{companyHighlight.year_of_experience}</span>
        Our Experience
      </div>
      </div>
      <div className='col-md-3'>
      <div className='icon-div'>
        <div class="icon"><img class="iconss-image" src={team_member} alt="project completed" />                 
        </div>
        <span>{companyHighlight.team_members}</span>
        Our Team Member
      </div>
      </div>
      <div className='col-md-3'>
      <div className='icon-div'>
        <div class="icon"><img class="iconss-image" src={our_project} alt="project completed" />                 
        </div>
        <span>{companyHighlight.projects}</span>
       Our Project
      </div>
      </div>
      <div className='col-md-3'>
      <div className='icon-div'>
        <div class="icon"><img  class="iconss-image" src={our_client} alt="project completed" />                 
        </div>
        <span>{companyHighlight.clients}</span>
        Our Client
      </div>
      </div>
    </div>
    </div>
  </section>
  );
}

export default FunfactComponent;
