import React from 'react'
import {Link} from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ReactMarkdown from "react-markdown"
import BlogSidebar from './BlogSidebar'
import img6 from '../../assets/images/blog/blog-img6.jpg'
import img4 from '../../assets/images/blog/blog-img4.jpg'
import img5 from '../../assets/images/blog/blog-img5.jpg'
import img7 from '../../assets/images/blog/blog-img7.jpg'
import img11 from '../../assets/images/blog/blog-img11.jpg'
import img12 from '../../assets/images/blog/blog-img12.jpg'
import user1 from '../../assets/images/user1.jpg'
import user2 from '../../assets/images/user2.jpg'
import user3 from '../../assets/images/user3.jpg'
import user4 from '../../assets/images/user4.jpg'


const BlogDetailsContent = ({data}) => {

    const {blog_title, blog_category, blog_title_img, createdAt, slug, user, updatedAt, content,} = data.allStrapiBlogs.edges[0].node
    return (
        <section className="blog-details-area ptb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="blog-details-desc">
                            <div className="article-image">
                                <GatsbyImage image={getImage(blog_title_img.localFile)} alt="bb" />
                            </div>

                            <div className="article-content">
                                
                                <div className="entry-meta">
                                    <ul>
                                        <li>
                                            <i className='bx bx-folder-open'></i>
                                            <span>Category</span>
                                            
                                            <Link to="#">
                                                {blog_category.category}
                                            </Link>
                                        </li>
                                        <li>
                                            <i className='bx bx-calendar'></i>
                                            <span>Published At</span>
                                            <Link to="#">
                                                {createdAt}
                                            </Link>
                                        </li>
                                        <li>
                                            <i className='bx bx-calendar'></i>
                                            <span>Last Updated</span>
                                            <Link to="#">
                                                {updatedAt}
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
        
                                <ReactMarkdown
                                    children={content}
                                    components={{
                                        h1: 'h2',
                                        // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
                                        pre: ({node, ...props}) => <pre style={{position: 'relative', backgroundColor: '#03203C', color: 'white', padding:"20px", borderRadius:"10px"}}  {...props} />
                                    }}
                                />

                                {/* <ul className="wp-block-gallery columns-3">
                                    <li className="blocks-gallery-item">
                                        <figure>
                                            <img src={img4} alt="bb" />
                                        </figure>
                                    </li>

                                    <li className="blocks-gallery-item">
                                        <figure>
                                            <img src={img5} alt="bb" />
                                        </figure>
                                    </li>

                                    <li className="blocks-gallery-item">
                                        <figure>
                                            <img src={img7} alt="bb" />
                                        </figure>
                                    </li>
                                </ul> */}

                                {/* <h3>Four major elements that we offer:</h3> */}

                                {/* <ul className="features-list">
                                    <li><i className='bx bx-badge-check'></i> Scientific skills for getting a better result</li>
                                    <li><i className='bx bx-badge-check'></i> Communication skills to getting in touch</li>
                                    <li><i className='bx bx-badge-check'></i> A career overview opportunity available</li>
                                    <li><i className='bx bx-badge-check'></i> A good work environment for work</li>
                                </ul>

                                <h3>Setting the mood with incense</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in  sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>

                                <h3>The rise of marketing and why you need it</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p> */}
                            </div>

                            <div className="article-footer">
                                <div className="article-tags">
                                    <span><i className='bx bx-purchase-tag'></i></span>

                                    <Link to="#">Fashion</Link>
                                    <Link to="#">Games</Link>
                                    <Link to="#">Travel</Link>
                                </div>

                                <div className="article-share">
                                    <ul className="social">
                                        <li><span>Share:</span></li>
                                        <li>
                                            <Link to="#" className="facebook">
                                                <i className='bx bxl-facebook'></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="twitter">
                                                <i className='bx bxl-twitter'></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="linkedin">
                                                <i className='bx bxl-linkedin'></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="instagram">
                                                <i className='bx bxl-instagram'></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="article-author">
                                <div className="author-profile-header"></div>
                                <div className="author-profile">
                                    <div className="author-profile-title">
                                        <img src={user1} className="shadow-sm" alt="uu" />
                                        <h4>{user.name}</h4>
                                        <span className="d-block">{user.tagline}</span>
                                        {/* <p>Chris Orwig is a celebrated photographer, author, and writer who brings passion to everything he does. Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor.</p> */}
                                    </div>
                                </div>
                            </div>

                            <div className="tracer-post-navigation">
                                <div className="prev-link-wrapper">
                                    <div className="info-prev-link-wrapper">
                                        <Link to="#">
                                            <span className="image-prev">
                                                <img src={img11} alt="bb" />
                                                <span className="post-nav-title">Prev</span>
                                            </span>
        
                                            <span className="prev-link-info-wrapper">
                                                <span className="prev-title">What Is The MLB Summer Slugger Program?</span>
                                                <span className="meta-wrapper">
                                                    <span className="date-post">January 21, 2020</span>
                                                </span>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
        
                                <div className="next-link-wrapper">
                                    <div className="info-next-link-wrapper">
                                        <Link to="#">
                                            <span className="next-link-info-wrapper">
                                                <span className="next-title">28 Student-Centered Instructional Strategies</span>
                                                <span className="meta-wrapper">
                                                    <span className="date-post">January 19, 2020</span>
                                                </span>
                                            </span>
        
                                            <span className="image-next">
                                                <img src={img12} alt="bb" />
                                                <span className="post-nav-title">Next</span>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="comments-area">
                                <h3 className="comments-title">2 Comments:</h3>

                                <ol className="comment-list">
                                    <li className="comment">
                                        <div className="comment-body">
                                            <div className="comment-meta">
                                                <div className="comment-author vcard">
                                                    <img src={user1} className="avatar" alt="uu" />
                                                    <b className="fn">John Jones</b>
                                                    <span className="says">says:</span>
                                                </div>

                                                <div className="comment-metadata">
                                                    <span>April 24, 2019 at 10:59 am</span>
                                                </div>
                                            </div>

                                            <div className="comment-content">
                                                <p>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>
                                            </div>

                                            <div className="reply">
                                                <Link to="#" className="comment-reply-link">
                                                    Reply
                                                </Link>
                                            </div>
                                        </div>

                                        <ol className="children">
                                            <li className="comment">
                                                <div className="comment-body">
                                                    <div className="comment-meta">
                                                        <div className="comment-author vcard">
                                                            <img src={user2} className="avatar" alt="uu" />
                                                            <b className="fn">Steven Smith</b>
                                                            <span className="says">says:</span>
                                                        </div>
            
                                                        <div className="comment-metadata">
                                                            <a href="#">
                                                                <span>April 24, 2019 at 10:59 am</span>
                                                            </a>
                                                        </div>
                                                    </div>
            
                                                    <div className="comment-content">
                                                        <p>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>
                                                    </div>
            
                                                    <div className="reply">
                                                        <a href="#" className="comment-reply-link">Reply</a>
                                                    </div>
                                                </div>

                                                <ol className="children">
                                                    <li className="comment">
                                                        <div className="comment-body">
                                                            <div className="comment-meta">
                                                                <div className="comment-author vcard">
                                                                    <img src={user3} className="avatar" alt="uu" />
                                                                    <b className="fn">Sarah Taylor</b>
                                                                    <span className="says">says:</span>
                                                                </div>
                    
                                                                <div className="comment-metadata">
                                                                    <a href="#">
                                                                        <span>April 24, 2019 at 10:59 am</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                    
                                                            <div className="comment-content">
                                                                <p>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>
                                                            </div>
                    
                                                            <div className="reply">
                                                                <Link to="#" className="comment-reply-link">
                                                                    Reply
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ol>
                                            </li>
                                        </ol>
                                    </li>

                                    <li className="comment">
                                        <div className="comment-body">
                                            <div className="comment-meta">
                                                <div className="comment-author vcard">
                                                    <img src={user4} className="avatar" alt="uu" />
                                                    <b className="fn">John Doe</b>
                                                    <span className="says">says:</span>
                                                </div>

                                                <div className="comment-metadata">
                                                    <a href="#">
                                                        <span>April 24, 2019 at 10:59 am</span>
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="comment-content">
                                                <p>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>
                                            </div>

                                            <div className="reply">
                                                <Link to="#" className="comment-reply-link">
                                                    Reply
                                                </Link>
                                            </div>
                                        </div>

                                        <ol className="children">
                                            <li className="comment">
                                                <div className="comment-body">
                                                    <div className="comment-meta">
                                                        <div className="comment-author vcard">
                                                            <img src={user1} className="avatar" alt="uu" />
                                                            <b className="fn">James Anderson</b>
                                                            <span className="says">says:</span>
                                                        </div>
            
                                                        <div className="comment-metadata">
                                                            <a href="#">
                                                                <span>April 24, 2019 at 10:59 am</span>
                                                            </a>
                                                        </div>
                                                    </div>
            
                                                    <div className="comment-content">
                                                        <p>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>
                                                    </div>
            
                                                    <div className="reply">
                                                        <Link to="#" className="comment-reply-link">
                                                            Reply
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </ol>
                                    </li>
                                </ol>

                                <div className="comment-respond">
                                    <h3 className="comment-reply-title">Leave a Reply</h3>

                                    <form className="comment-form">
                                        <p className="comment-notes">
                                            <span id="email-notes">Your email address will not be published.</span>
                                            Required fields are marked 
                                            <span className="required">*</span>
                                        </p>
                                        <p className="comment-form-author">
                                            <label>Name <span className="required">*</span></label>
                                            <input type="text" id="author" placeholder="Your Name*" name="author" required="required" />
                                        </p>
                                        <p className="comment-form-email">
                                            <label>Email <span className="required">*</span></label>
                                            <input type="email" id="email" placeholder="Your Email*" name="email" required="required" />
                                        </p>
                                        <p className="comment-form-url">
                                            <label>Website</label>
                                            <input type="url" id="url" placeholder="Website" name="url" />
                                        </p>
                                        <p className="comment-form-comment">
                                            <label>Comment</label>
                                            <textarea name="comment" id="comment" cols="45" placeholder="Your Comment..." rows="5" required="required"></textarea>
                                        </p>
                                        <p className="comment-form-cookies-consent">
                                            <input type="checkbox" value="yes" name="comment-cookies-consent" id="comment-cookies-consent" />
                                            <label>Save my name, email, and website in this browser for the next time I comment.</label>
                                        </p>
                                        <p className="form-submit">
                                            <input type="submit" name="submit" id="submit" className="submit" value="Post A Comment" />
                                        </p>
                                    </form>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                        <BlogSidebar data={data} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogDetailsContent