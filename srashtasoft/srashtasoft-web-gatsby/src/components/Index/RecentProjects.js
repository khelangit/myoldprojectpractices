import React from 'react'

import { Link, graphql, useStaticQuery, } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import starIcon from '../../assets/images/star-icon.png'


const query = graphql`
    {
        allStrapiRecentWorks(limit: 2, sort: {fields: id, order: ASC}) {
            edges {
                node {
                  name
                  link
                  title
                  id
                  
                  client_name
                  client_role
                  client_words
                  img {
                    localFile {
                        childImageSharp {
                        gatsbyImageData
                        }
                    }
                  }
                  client_img {
                    localFile {
                      childImageSharp {
                        original {
                          src
                        }
                      }
                    }
                  }
                }
              }
        }
    }
`

const RecentProjects = () => {

    const data = useStaticQuery(query)
    // console.log(data.allStrapiBlogs.nodes)
    const recentWorks = data.allStrapiRecentWorks.edges

    return (
        <section className="projects-area bg-color pt-70">
            <div className="container">
                <div className="section-title">
                    {/* <span className="sub-title">
                        <img src={starIcon} alt="project" /> Our Work
                    </span> */}
                    <h2 className="black-c"> Our Recent Work</h2>
                    <p className="black-cc">Explore how Srashtasoft shaped multiple businesses with innovation and technology enabled solutions. Take a look at our case-studies.</p>
                </div>

                <div className="row">

                    {recentWorks.map((project) => (

                        <div key={project.node.id} className="col-lg-12 col-md-12">


                            <a href={project.node.link} >
                                <div className="single-projects-box">
                                    <div className="main-divclass">
                                        <div className="main-div">
                                            <div className="text-justify">

                                                <p className="bcolor">{project.node.name}</p>
                                                <h2 className="bcolor">{project.node.title}</h2>
                                            </div>
                                            <div class="testimonial box-testimonial">
                                                <p class="testimonial__text mb-25">
                                                    {project.node.client_words}
                                                </p>

                                                <div class="testimonial__details">
                                                    <div class="testimonial__img">
                                                        <img src={project.node.client_img.localFile.childImageSharp.original.src} alt="Timmy Dicki" />
                                                    </div>
                                                    <div class="testimonial__info">
                                                        <h4 class="testimonial__name">{project.node.client_name}</h4>
                                                        <h5 class="testimonial__job">{project.node.client_role}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="main-button-boxs">
                                                <a className="btn-oranges" aria-label="View All" href="/portfolio"> View All  <i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                                            </div>

                                        </div>
                                        <div className="main-div">
                                            <div className="image recent-project-image home-image">
                                                <GatsbyImage image={getImage(project.node.img.localFile)} alt="project" />

                                                <Link className="link-btn" to={`/project/${project.node.slug}/`}>
                                                    <i className='bx bx-plus'></i>
                                                </Link>
                                            </div>


                                        </div>

                                    </div>

                                </div>
                            </a>

                        </div>

                    ))}
                </div>


            </div>
        </section>
    )
}

export default RecentProjects; 