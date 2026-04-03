import React from 'react'

import {Link,graphql, useStaticQuery, } from "gatsby"

import Layout from "../App/Layout"
import Navbar from "../App/Navbar"
import PageBanner from '..//Common/PageBanner'
import Footer from "../App/Footer"
import CaseStudiesDetailsContent from '..//CaseStudiesDetails/CaseStudiesDetailsContent'
import ProjectDetailContent from "./ProjectDetailContent"

export const query = graphql`
  query($slug: String!) {
        allStrapiProjects(filter: {slug: {eq: $slug}}) {
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
                id
                }
            }
        }
    }
  }
`

const ProjectDetailPage = ({data}) => {
    const {project_name} = data.allStrapiProjects.edges[0].node
    return (
        <Layout>
            <Navbar />
            <PageBanner
                pageTitle={project_name}
                homePageText="Home" 
                homePageUrl="/" 
                activePageText="Case Studies Details" 
            />
            <ProjectDetailContent data={data} />
            <Footer />
        </Layout>
    );
}

export default ProjectDetailPage