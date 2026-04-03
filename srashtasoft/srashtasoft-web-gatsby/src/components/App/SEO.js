import React from 'react'
import { Helmet } from "react-helmet"

const SEO = () => {
    return (
        <div>
            <Helmet>
                <title>Srashtasoft - A software development company</title>
                <meta name="description" content="Srashtasoft - A software development company" />
                <meta name="og:title" property="og:title" content="Srashtasoft - A software development company"></meta>
                <meta name="twitter:card" content="Srashtasoft - A software development company"></meta>
                <link rel="canonical" href="https://srashtasoft.com/"></link>
                <meta property="og:image" content="https://res.cloudinary.com/dev-empty/image/upload/v1593069801/explore-learning.jpg" />
            </Helmet>
        </div>
    )
}

export default SEO
