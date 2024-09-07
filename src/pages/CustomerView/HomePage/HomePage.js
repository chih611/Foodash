import { Container, Row, Col, Button } from "react-bootstrap";
import HomePageNavBar from "./HomePageNavBar";
import HomeCategory from "./HomeCategory";

const HomePage = () => {
  return (
    <div>
      <HomePageNavBar />
      <HomeCategory />
      <h1>Home Page</h1>
      
    </div>
  );
};

export default HomePage;
