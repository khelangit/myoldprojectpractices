import React from 'react'
import {Link} from 'gatsby'
import {GatsbyImage, getImage} from "gatsby-plugin-image"
const slugify = require('slugify')

const BlogSidebar = ({data}) => {
    const sidebarData = data.categoryData.group
    const popularblogs = data.poppularBlogs.edges

    return (
        <div className="widget-area">
            <div className="widget widget_search">
                <h3 className="widget-title">Search</h3>

                <form className="search-form">
                    <label>
                        <span className="screen-reader-text">Search for:</span>
                        <input type="search" className="search-field" placeholder="Search..." />
                    </label>
                    <button type="submit">
                        <i className="bx bx-search-alt"></i>
                    </button>
                </form>
            </div>

            <div className="widget widget_tracer_posts_thumb">
                <h3 className="widget-title">Popular Posts</h3>

                {popularblogs.map((doc,i) => (
                    <article key={i} className="item">
                        <Link to={`/blog/${doc.node.slug}`} className="thumb">
                            <span className="fullimage cover bg1" role="img"></span>
                            {/* <GatsbyImage image={doc.node.blog_title_img.localFile}  /> */}
                        </Link>
                        <div className="info">
                            <span>June 10, 2020</span>
                            <h4 className="title usmall">
                                <Link to={`/blog/${doc.node.slug}`}>
                                    {doc.node.blog_title}
                                </Link>
                            </h4>
                        </div>

                        <div className="clear"></div>
                    </article>
                ))}

                
            </div>

            <div className="widget widget_categories">
                <h3 className="widget-title">Categories</h3>

                <ul>
                    {sidebarData.map((doc,i) => (
                        <li key={i} >
                            <Link to={`/blog-categories/${slugify(doc.fieldValue)}/`}>
                                {doc.fieldValue} <span className="post-count">({doc.totalCount})</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="widget widget_tag_cloud">
                <h3 className="widget-title">Popular Tags</h3>

                <div className="tagcloud">
                    <Link to="#">
                        Business <span className="tag-link-count">(3)</span>
                    </Link>
                    <Link to="#">
                        Design <span className="tag-link-count">(3)</span>
                    </Link>
                    <Link to="#">
                        Braike <span className="tag-link-count">(2)</span>
                    </Link>
                    <Link to="#">
                        Fashion <span className="tag-link-count">(2)</span>
                    </Link>
                    <Link to="#">
                        Travel <span className="tag-link-count">(1)</span>
                    </Link>
                    <Link to="#">
                        Smart <span className="tag-link-count">(1)</span>
                    </Link>
                    <Link to="#">
                        Marketing <span className="tag-link-count">(1)</span>
                    </Link>
                    <Link to="#">
                        Tips <span className="tag-link-count">(2)</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BlogSidebar