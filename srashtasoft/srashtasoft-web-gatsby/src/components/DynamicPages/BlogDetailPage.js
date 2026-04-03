import React from 'react'

import {Link,graphql } from "gatsby"


import Layout from "../App/Layout"
import Navbar from "../App/Navbar"
import PageBanner from '../Common/PageBanner'
import Footer from "../App/Footer"
import BlogDetailsContent from '../BlogContent/BlogDetailsContent'

export const query = graphql`
  query($slug: String!) {
        allStrapiBlogs(filter: {slug: {eq: $slug}}) {
        edges {
            node {
                blog_title
                content
                blog_category {
                category
                }
                blog_title_img {
                localFile {
                    childImageSharp {
                    gatsbyImageData
                    }
                }
                }
                slug
                createdAt(formatString: "DD MMMM, YYYY")
                updatedAt(formatString: "DD MMMM, YYYY")
                user {
                name
                email
                tagline
                }
                id
            }
        }
    }
    categoryData: allStrapiBlogs {
        group(field: blog_category___category) {
            fieldValue
            totalCount
        }
    }

    poppularBlogs: allStrapiBlogs(filter: {isPopular: {eq: true}}) {
        edges {
        node {
            blog_title
            blog_title_img {
            localFile {
                childImageSharp {
                gatsbyImageData
                }
            }
            }
            createdAt(formatString: "DD, MMMM, YYYY")
            slug
        }
        }
    }
  }
`

const BlogDetailPage = ({ data }) => {
    const {blog_title} = data.allStrapiBlogs.edges[0].node
    return (
        <Layout>
            <Navbar />
            <PageBanner
                pageTitle={blog_title}
                homePageText="Home" 
                homePageUrl="/" 
                activePageText={`${blog_title}`}
            /> 
            <BlogDetailsContent data={data} />
            <Footer />
        </Layout>
    )
}

export default BlogDetailPage;

