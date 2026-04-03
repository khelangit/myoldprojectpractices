import React from 'react'
import {Link,graphql, useStaticQuery, } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import img4 from '../../assets/images/blog/blog-img4.jpg'
import img5 from '../../assets/images/blog/blog-img5.jpg'
import img6 from '../../assets/images/blog/blog-img6.jpg'
import img7 from '../../assets/images/blog/blog-img7.jpg'
import img8 from '../../assets/images/blog/blog-img8.jpg'
import img10 from '../../assets/images/blog/blog-img10.jpg'
import user1 from '../../assets/images/user1.jpg'
import user2 from '../../assets/images/user2.jpg'
import user3 from '../../assets/images/user3.jpg'
import user4 from '../../assets/images/user4.jpg'
import user5 from '../../assets/images/user5.jpg'
import user6 from '../../assets/images/user6.jpg'

const query = graphql`
    {
        allStrapiBlogs(sort: {fields: id, order: ASC}) {
            edges {
              node {
                id
                blog_title
                createdAt(formatString: "DD MMMM, YYYY")
                slug
                user {
                  email
                  name
                }
                blog_category {
                  category
                }
                blog_title_img {
                  localFile {
                    childImageSharp {
                      fluid {
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

const BlogCard = () => { 

    const data = useStaticQuery(query)
    // console.log(data.allStrapiBlogs.edges)
    const blogs = data.allStrapiBlogs.edges

    return (
        <div className="blog-area ptb-100">
            <div className="container">
                <div className="row">

                    {blogs.map((blog, i) => (
                        <div key={i} className="col-lg-4 col-md-6">
                            <div className="single-blog-post bg-fffbf5">
                                <div className="post-image">
                                    <Link to={`/blog/${blog.node.slug}`}>
                                        {/* <GatsbyImage image={getImage(blog.node.blog_title_img.localFile.childImageSharp.fluid.src)} alt="image" /> */}
                                        
                                        <img src={blog.node.blog_title_img.localFile?.childImageSharp?.fluid?.src} alt="img" />
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
                    

                    
                    {/* Pagination */}
                    {/* <div className="col-lg-12 col-md-12">
                        
                        <div className="pagination-area text-center">
                            <Link to="#" className="prev page-numbers">
                                <i className='bx bx-chevrons-left'></i>
                            </Link>
                            <span className="page-numbers current" aria-current="page">1</span>
                            <Link to="#" className="page-numbers">
                                2
                            </Link>
                            <Link to="#" className="page-numbers">
                                3
                            </Link>
                            <Link to="#" className="page-numbers">
                                4
                            </Link>
                            <Link to="#" className="next page-numbers">
                                <i className='bx bx-chevrons-right'></i>
                            </Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default BlogCard