import React from "react";
import { Helmet } from "react-helmet-async";


export const HomepageHelmet: React.FC = () => (
  <Helmet>
    <title>Rwamps Credit Finance | Fast Loans in Uganda | Instant Approval</title>
    <meta
      name="description"
      content="Get fast and reliable loans in Uganda with Rwamps Credit Finance. Personal, business & agricultural loans with quick approval and flexible repayment."
    />
    <meta
      name="keywords"
      content="loans Uganda, fast loans Uganda, instant loans Uganda, personal loans Uganda, business loans Uganda, agricultural loans Uganda, quick cash Uganda"
    />
    <link rel="canonical" href="https://rwampscreditfinance.com/" />

    {/* Open Graph */}
    <meta property="og:title" content="Fast Loans in Uganda | Rwamps Credit Finance" />
    <meta
      property="og:description"
      content="Apply for quick loans online in Uganda with fast approval and flexible repayment."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://rwampscreditfinance.com/" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>
);


export const AboutHelmet: React.FC = () => (
  <Helmet>
    <title>About Rwamps Credit Finance | Trusted Loan Provider in Uganda</title>
    <meta
      name="description"
      content="Learn about Rwamps Credit Finance, a trusted provider of personal, business and agricultural loans in Uganda."
    />
    <meta
      name="keywords"
      content="about rwamps finance, loan company Uganda, microfinance Uganda, credit services Uganda"
    />
    <link rel="canonical" href="https://rwampscreditfinance.com/about" />
  </Helmet>
);


export const ServicesHelmet: React.FC = () => (
  <Helmet>
    <title>Our Services | Financial & Loan Services in Uganda</title>
    <meta
      name="description"
      content="Explore financial services including personal loans, business loans, and agricultural financing in Uganda."
    />
    <meta
      name="keywords"
      content="loan services Uganda, financial services Uganda, credit solutions Uganda, lending Uganda"
    />
    <link rel="canonical" href="https://rwampscreditfinance.com/services" />
  </Helmet>
);

export const ProductsHelmet: React.FC = () => (
  <Helmet>
    <title>Loan Products | Personal & Business Loans Uganda</title>
    <meta
      name="description"
      content="Discover loan products including personal loans, SME loans, and agricultural financing tailored for Uganda."
    />
    <meta
      name="keywords"
      content="loan products Uganda, SME loans Uganda, farming loans Uganda, personal finance Uganda"
    />
    <link rel="canonical" href="https://rwampscreditfinance.com/products" />
  </Helmet>
);


export const LoansHelmet: React.FC = () => (
  <Helmet>
    <title>Apply for Loans Online | Fast Loans Uganda</title>
    <meta
      name="description"
      content="Apply for loans online in Uganda with instant approval. Get personal, emergency, or business loans with flexible repayment."
    />
    <meta
      name="keywords"
      content="apply loan Uganda, instant loans Uganda, emergency loans Uganda, online loans Uganda, fast money Uganda"
    />
    <link rel="canonical" href="https://rwampscreditfinance.com/loans" />
  </Helmet>
);

export const ContactHelmet: React.FC = () => (
  <Helmet>
    <title>Contact Rwamps Credit Finance | Loans in Uganda</title>
    <meta
      name="description"
      content="Contact Rwamps Credit Finance for quick loan assistance in Uganda. Apply today and get approved fast."
    />
    <meta
      name="keywords"
      content="contact loan Uganda, apply loan Uganda contact, financial help Uganda"
    />
    <link rel="canonical" href="https://rwampscreditfinance.com/contact" />
  </Helmet>
);

/**
 * 404 Page
 */
export const NotFoundHelmet: React.FC = () => (
  <Helmet>
    <title>Page Not Found | Rwamps Credit Finance</title>
    <meta name="robots" content="noindex, nofollow" />
  </Helmet>
);