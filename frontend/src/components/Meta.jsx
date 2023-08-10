import { Helmet } from "react-helmet-async";

const Meta = ({ title, desc, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Ecommerce",
  description: "Here you can find best quality products",
  keywords: "electronics, cloths, wearable, quality electronic",
};

export default Meta;
