// /pages/index.js
import LandingPage from "./CustomerView/LandingPage";
// import dotenv from "dotenv";

const Home = () => {
  // dotenv.config({
  //   path:
  //     process.env.NODE_ENV === "production"
  //       ? ".env.production"
  //       : ".env.development",
  // });
  return <LandingPage />;
};

export default Home;
