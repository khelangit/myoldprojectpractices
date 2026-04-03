import React from 'react'
import {Link,graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import user1 from '../../assets/images/user1.jpg'
import Layout from "../App/Layout"
import Navbar from "../App/Navbar"
import PageBanner from '../Common/PageBanner'
import Footer from "../App/Footer"

export const query = graphql`
  query($slug: String!) {
        allStrapiBlogs(filter: {blog_category: {category: {eq: $slug}}}) {
            edges {
            node {
                blog_title
                id
                blog_title_img {
                localFile {
                    childImageSharp {
                    gatsbyImageData
                    }
                }
                }
                blog_category {
                category
                }
                createdAt(formatString: "DD, MMMM, YYYY")
                slug
                user {
                name
                }
            }
            }
        }
  }
`

const BlogCategoryPage = ({data}) => {
    const blogData = data.allStrapiBlogs.edges;
    return (
        <Layout>
            <Navbar />
            <PageBanner
                pageTitle={`Home`} 
                homePageText="Home" 
                homePageUrl="/" 
                activePageText="Blog" 
            />
            <BlogCard blogData={blogData} />
            <Footer />
        </Layout>
    );
}

export default BlogCategoryPage;

const BlogCard = ({blogData}) => { 

    return (
        <div className="blog-area ptb-100">
            <div className="container">
                <div className="row">

                    {blogData.map((blog, i) => (
                        <div key={i} className="col-lg-4 col-md-6">
                            <div className="single-blog-post bg-fffbf5">
                                <div className="post-image">
                                    <Link to={`/blog/${blog.node.slug}`}>
                                        <GatsbyImage image={getImage(blog.node.blog_title_img.localFile)} alt="image" />
                                    </Link>
                                </div>

                                <div className="post-content">
                                    <ul className="post-meta d-flex justify-content-between align-items-center">
                                        <li>
                                            <div className="post-author d-flex align-items-center">
                                                <img src={user1} className="rounded-circle" alt="image" />
                                                <span>{blog.node.user.name}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <i className='flaticon-calendar'></i> {blog.node.createdAt}
                                        </li>
                                    </ul>
                                    <h3>
                                        <Link to={`/blog/${blog.node.slug}`}>
                                            {blog.node.blog_title}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                  
                </div>
            </div>
        </div>
    )
}
