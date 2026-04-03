import React, { useState, useEffect } from 'react'
import Layout from "../components/App/Layout"
import Navbar from "../components/App/Navbar"
import PageBanner from '../components/Common/PageBanner'
import Footer from "../components/App/Footer"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const query = graphql`
    {
        allStrapiProjects(sort: {fields: id, order: DESC}) {
            edges {
                node {
                    slug
                    project_name
                    project_title
                    project_type
                    website
                    technologies
                    location
                    content
                    client
                    project_img {
                        localFile {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                    }
                    AppIcon {
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
            distinct(field: project_type)
        }
    }
`

function Work() {
    const data = useStaticQuery(query)
    const allProjects = data.allStrapiProjects.edges
    const project_types = data.allStrapiProjects.distinct

    const [projects, setProjects] = useState([...allProjects])
    const [filter, setFilter] = useState("All")

    useEffect(() => {
        if (filter === "All") {
            setProjects([...allProjects])
        } else {
            setProjects([...allProjects.filter(i => i.node.project_type === filter)])
        }
    }, [filter, allProjects])

    return (
        <Layout>
            <Navbar />
            <PageBanner
                pageTitle="Projects"
                homePageText="Home"
                homePageUrl="/"
                activePageText="Work"
            />

            <section id='main-div' className="projects-area bg-color pt-50 pb-70">
                <div className="container">
                    <div className="section-title">
                        <h2>Check Some Of Our Recent Work</h2>
                        <p className='section-parag'>
                            Explore how Srashtasoft shaped multiple businesses with innovation and technology-enabled solutions. Take a look at our case-studies.
                        </p>
                    </div>

                    <div className="button-box filtter-button">
                        <button
                            className={filter === "All" ? "btn-orange all active" : "btn-orange all"}
                            onClick={() => setFilter("All")}
                        >
                            All
                        </button>
                        {project_types.map((t, index) => (
                            <button
                                key={index}
                                className={filter === t ? `btn-orange ${t} active` : `btn-orange ${t}`}
                                onClick={() => setFilter(t)}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="row">
                        {projects.map((project, i) => (
                            <div key={i} className="col-lg-4 col-md-6">
                                <div className="single-projects-box">
                                    <div className="image work-height">
                                        <GatsbyImage
                                            image={getImage(project.node.project_img.localFile)}
                                            alt={project.node.project_name || "Project image"}
                                        />
                                        <Link className="link-btn" to={`/project/${project.node.slug}/`}>
                                            <i className='bx bx-plus'></i>
                                        </Link>
                                    </div>

                                    <div className="content">
                                        <h3>
                                            <Link to={`/project/${project.node.slug}/`}>
                                                {project.node.project_name}
                                            </Link>
                                        </h3>
                                        <span>{project.node.project_type}</span>
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

export default Work
