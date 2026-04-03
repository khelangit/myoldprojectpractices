import React from "react"
import Navbar from "../components/App/Navbar"
import Footer from "../components/App/Footer"
import Layout from "../components/App/Layout"
import Banner from "../components/Index/Banner"
import OurSolutions from "../components/Index/OurSolutions"
import OurServices from "../components/Index/OurServices"
import OurFeatures from "../components/Index/OurFeatures"
import TeamMember from "../components/Index/TeamMember"
import RecentProjects from "../components/Index/RecentProjects"
import Pricing from "../components/Index/Pricing"
import Testimonials from "../components/Index/Testimonials"
import Partner from "../components/Index/Partner"
import ProjectStartArea from "../components/Index/ProjectStartArea"
import OurBlog from "../components/Index/OurBlog"
import CaseStudy from '../components/BigDataAnalysisStartup/CaseStudy'
import Services from "../components/DigitalMarketingAgency/Services"
import Subscribe from "../components/DataScienceOnlineCourses/Subscribe"
import AnalysisForm from '../components/SEOAgency/AnalysisForm'
import FunFacts from '../components/SEOAgency/FunFacts'
import Chooseus from "../components/Index/Chooseus"
import StartProjectTwo from '../components/Common/StartProjectTwo';
import MainBanner from '../components/MachineLearningAISolutions/MainBanner';
import FunfactComponent from "../components/DynamicPages/FunfactComponent"
import TestimonialComponent from "../components/TestimonialComponent"


const Home = () => {
  return (
    <Layout>
      <Navbar />
      <MainBanner />
      {/* <CaseStudy /> */}
      {/* <Banner /> */}
      {/* <OurSolutions /> */}
      <Services />
      {/* <OurServices /> */}
      <OurFeatures />
      {/* <TeamMember /> */}
      <RecentProjects />
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
     
      <Partner />
   
      
      {/* <OurBlog /> */}
      {/* <ProjectStartArea /> */}
      <TestimonialComponent />
      <Chooseus />
      {/* <FunFacts /> */}
      <FunfactComponent />

      
      {/* <AnalysisForm /> */}
      <StartProjectTwo />
      <Footer />
    </Layout>
  )
}

export default Home