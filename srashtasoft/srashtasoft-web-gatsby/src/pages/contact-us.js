import React from 'react'
import {Link,graphql, useStaticQuery, } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/App/Layout"
import Navbar from "../components/App/Navbar"
import PageBanner from '../components/Common/PageBanner'
import Footer from "../components/App/Footer"
import ContactInfo from '../components/Contact/ContactInfo'
import ContactForm from '../components/Contact/ContactForm'


const query = graphql`
    {
        strapiCompanyInformation {
            address_canada
            address_india
            email
            phone_canada
            phone_india
            office_hours {
                days
                time
            }
        }
    }
`

const Contact = () => {

    const data = useStaticQuery(query)
    const companyInformation = data.strapiCompanyInformation

    return (
        <Layout>
            <Navbar />
            <PageBanner
                pageTitle="Contact" 
                homePageText="Home" 
                homePageUrl="/" 
                activePageText="Contact" 
            />
            <ContactForm />
            <ContactInfo companyInformation={companyInformation} />
            
            <Footer />
        </Layout>
    );
}

export default Contact