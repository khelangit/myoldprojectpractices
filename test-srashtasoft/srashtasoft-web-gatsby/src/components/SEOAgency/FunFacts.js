import React from 'react'
import icon1 from '../../assets/images/funfacts/fun-icon1.png'
import icon2 from '../../assets/images/funfacts/fun-icon2.png'
import icon3 from '../../assets/images/funfacts/fun-icon3.png'
import icon4 from '../../assets/images/funfacts/fun-icon4.png'
import {Link,graphql, useStaticQuery } from "gatsby"

import StarIcon from '../../assets/images/star-icon.png'

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


const FunFacts = () => {

    const data = useStaticQuery(query)
    const companyHighlight = data.strapiCompanyHighlight

    return (
        <section className="funfacts-area bg-image ">
            <div className="container">
                
                <div className="row">
                    <div className="col-lg-3 col-sm-3 col-6">
                        <div className="single-funfacts-item">
                            <div className="icon">
                                <img src={icon1} alt="fun" />
                            </div>
                            <h3>{companyHighlight.year_of_experience} Years</h3>
                            <p>Of experience</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-3 col-6">
                        <div className="single-funfacts-item">
                            <div className="icon">
                                <img src={icon2} alt="fun" />
                            </div>
                            <h3>{companyHighlight.team_members}</h3>
                            <p>Team Members</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-3 col-6">
                        <div className="single-funfacts-item">
                            <div className="icon">
                                <img src={icon3} alt="fun" />
                            </div>
                            <h3>{companyHighlight.projects}</h3>
                            <p>Projects</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-3 col-6">
                        <div className="single-funfacts-item">
                            <div className="icon">
                                <img src={icon4} alt="fun" />
                            </div>
                            <h3>{companyHighlight.clients}</h3>
                            <p>Clients</p>
                        </div>
                    </div>                    
                </div>



            </div>
        </section>
    )
}

export default FunFacts;