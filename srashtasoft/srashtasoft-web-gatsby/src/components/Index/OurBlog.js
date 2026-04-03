import React from 'react'
import {Link,graphql, useStaticQuery, } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import starIcon from '../../assets/images/star-icon.png'
import blog1 from '../../assets/images/blog/blog-img1.jpg'
import blog5 from '../../assets/images/blog/blog-img5.jpg'
import blog6 from '../../assets/images/blog/blog-img6.jpg'
import user1 from '../../assets/images/user1.jpg'
import user2 from '../../assets/images/user2.jpg'
import user3 from '../../assets/images/user3.jpg'

const query = graphql`
    {
        allStrapiBlogs(limit: 3) {
            nodes {
              updatedAt(formatString: "DD MMMM, YYYY")
              blog_title
              slug
              user {
                name
                email
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
              createdAt(formatString: "DD MMMM, YYYY")
            }
          }
    }
`

const OurBlog = () => {

    const data = useStaticQuery(query)
    // console.log(data.allStrapiBlogs.nodes)
    const blogs = data.allStrapiBlogs.nodes

    return (
        <section className="blog-area bg-fffbf5">
            <div className="container">
                {/* <div className="section-title">
                    <span className="sub-title">
                        <img src={starIcon} alt="blog" /> 
                        Our Blog
                    </span>
                    <h2>Latest Valuable Insights</h2>
                </div> */}

                <div className="" style={{padding: '10px', textAlign: 'center'}}>
                    
                    <h2>Latest Valuable Insights</h2>                
                </div>
                <p style={{textAlign: 'center'}}>We at SrashtaSoft are technology freaks and we are passionate about discussing the latest technologies and its applications. We regularly write blogs and articles related to the field of technology. So, don’t miss our authentic and insightful write-ups.</p>

                <div className="row pb-70"> 

                    {blogs.map((blog,i) => (
                        <div className="col-lg-4 col-md-6" key={i}>
                            <div className="single-blog-post">
                                <div className="post-image">
                                    <Link to={`/blog/${blog.slug}`}>
                                        {/* <GatsbyImage image={getImage(blog.blog_title_img.localFile.childImageSharp.fluid.src)} alt="blog" /> */}
                                       
                                        <img src={blog.blog_title_img.localFile?.childImageSharp?.fluid?.src} alt="img" />
                                    </Link>
                                </div>

                                <div className="post-content">
                                    <ul className="post-meta d-flex justify-content-between align-items-center">
                                        <li>
                                            <div className="post-author d-flex align-items-center">
                                                <img src={user1} className="rounded-circle" alt="blog" />
                                                <span>{blog.user.name}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <i className='flaticon-calendar'></i> {blog.createdAt}
                                        </li>
                                    </ul>
                                    <h3>
                                        <Link to={`/blog/${blog.slug}`}>
                                            {blog.blog_title}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* <div className="col-lg-4 col-md-6">
                        <div className="single-blog-post">
                            <div className="post-image">
                                <Link to="/blog-details">
                                    <img src={blog1} alt="blog" />
                                </Link>
                            </div>

                            <div className="post-content">
                                <ul className="post-meta d-flex justify-content-between align-items-center">
                                    <li>
                                        <div className="post-author d-flex align-items-center">
                                            <img src={user1} className="rounded-circle" alt="blog" />
                                            <span>Alex Morgan</span>
                                        </div>
                                    </li>
                                    <li>
                                        <i className='flaticon-calendar'></i> April 30, 2020
                                    </li>
                                </ul>
                                <h3>
                                    <Link to="/blog-details">
                                        Six Ways to Make Smarter Decisions
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-blog-post">
                            <div className="post-image">
                                <Link to="/blog-details">
                                    <img src={blog5} alt="blog" />
                                </Link>
                            </div>

                            <div className="post-content">
                                <ul className="post-meta d-flex justify-content-between align-items-center">
                                    <li>
                                        <div className="post-author d-flex align-items-center">
                                            <img src={user2} className="rounded-circle" alt="blog" />
                                            <span>Sarah Taylor</span>
                                        </div>
                                    </li>
                                    <li>
                                        <i className='flaticon-calendar'></i> April 28, 2020
                                    </li>
                                </ul>
                                <h3>
                                    <Link to="/blog-details">
                                        The Challenges to Tackle Before You Start With AI
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">
                        <div className="single-blog-post">
                            <div className="post-image">
                                <Link to="/blog-details">
                                    <img src={blog6} alt="blog" />
                                </Link>
                            </div>

                            <div className="post-content">
                                <ul className="post-meta d-flex justify-content-between align-items-center">
                                    <li>
                                        <div className="post-author d-flex align-items-center">
                                            <img src={user3} className="rounded-circle" alt="blog" />
                                            <span>David Warner</span>
                                        </div>
                                    </li>
                                    <li>
                                        <i className='flaticon-calendar'></i> April 29, 2020
                                    </li>
                                </ul>
                                <h3>
                                    <Link to="/blog-details">
                                        Why Organisations Want an Analytics Platform
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default OurBlog