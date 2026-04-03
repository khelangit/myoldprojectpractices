import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../App/Layout"
import Navbar from "../App/Navbar"
import PageBanner from "../Common/PageBanner"
import Footer from "../App/Footer"
export const query = graphql`
  query ($slug: String!) {
    allStrapiLifeAtCompanies(filter: { festival: { eq: $slug } }) {
      edges {
        node {
          festival
          images {
            localFile {
              childImageSharp {
                original {
                  src
                }
              }
            }
          }
          bannerImg {
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
function LifeAtCompanyDynamic({ data }) {
  // Check if data exists and has edges
  const hasData = data?.allStrapiLifeAtCompanies?.edges?.length > 0
  // If no data found, show a fallback UI
  if (!hasData) {
    return (
      <Layout>
        <Navbar />
        <PageBanner
          pageTitle="Life At Srashtasoft"
          homePageText="Home"
          homePageUrl="/"
          activePageText="Life At Srashtasoft"
        />
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-12 text-center">
              <h2>No data found for this event</h2>
              <p>Sorry, we couldn't find any information about this event.</p>
              <Link to="/life-at-srashtasoft" className="btn btn-primary mt-3">
                Back to Life at Srashtasoft
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    )
  }
  // Now we can safely destructure the data
  const { festival, images } = data.allStrapiLifeAtCompanies.edges[0].node
  const { bannerImg } = data.allStrapiLifeAtCompanies.edges[0].node
  return (
    <Layout>
      <Navbar />
      <PageBanner
        pageTitle={festival || "Life At Srashtasoft"}
        homePageText="Home"
        homePageUrl="/"
        activePageText={festival || "Life At Srashtasoft"}
      />
      <section>
        {bannerImg && (
          <img
            src={bannerImg.localFile.childImageSharp.original.src}
            alt={`${festival} banner`}
            className="img-fluid w-100"
          />
        )}
      </section>
      <div>
        <div className="gallery-area pt-50 pb-70">
          <div className="container-fluid">
            <div className="row">
              {images?.map((img, index) => (
                <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                  <div className="single-gallery-item">
                    <div className="img-wrapper">
                      <img
                        className="inner-img"
                        src={img.localFile.childImageSharp.original.src}
                        alt={`${festival} image ${index + 1}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}
export default LifeAtCompanyDynamic
