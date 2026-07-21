import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_NAME = "ODA";
const DEFAULT_TITLE = `${SITE_NAME} — Interior Design & Architecture Studio in Dnipro, Ukraine`;
const DEFAULT_DESCRIPTION =
  "ODA is an interior design and architecture studio in Dnipro, Ukraine. We design apartments, private houses, and public interiors, from concept to finished space.";

const Seo = ({ title, description }) => {
  const cleanTitle = title?.trim();
  const cleanDescription = description?.trim();
  const fullTitle = cleanTitle ? `${cleanTitle} — ${SITE_NAME}` : DEFAULT_TITLE;
  const metaDescription = cleanDescription || DEFAULT_DESCRIPTION;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  );
};

export default Seo;
