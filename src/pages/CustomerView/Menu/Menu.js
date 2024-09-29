import React from 'react';
import HomePageNavBar from '../HomePage/HomePageNavBar';
import { Container, Carousel } from 'react-bootstrap';
import ViewMenuButton from './ViewMenuButton';
import OrderNowButton from './OrderNowButton';
import CorporateMenu from './CorporateMenu';
import WeddingMenu from './WeddingMenu';
import FamilyMenu from './FamilyMenu';
import IntroductionBanquet from './IntroductionBanquet';

const Menu = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <div className="navBar border border-success">
        <HomePageNavBar />
      </div>

      {/* Carousel Section */}
      <div style={{ flexGrow: 1 }}>
        <Carousel>
          {/* Slide 1: Introduction to Banquet Menu */}
          <Carousel.Item>
            <div
              style={{
                backgroundImage: `url('/pexels-fidel-2814828.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                padding: '100px 20px',
              }}
            >
              <Container className="text-center">
                {/* Use the IntroductionBanquet component */}
                <IntroductionBanquet />
                <ViewMenuButton />
              </Container>
            </div>
          </Carousel.Item>

          {/* Slide 2: Corporate Events */}
          <Carousel.Item>
            <div
              style={{
                backgroundImage: `url('/pexels-naimbic-2291367.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                padding: '100px 20px',
              }}
            >
              <Container className="text-center">
                <CorporateMenu />
                <OrderNowButton />
              </Container>
            </div>
          </Carousel.Item>

          {/* Slide 3: Weddings */}
          <Carousel.Item>
            <div
              style={{
                backgroundImage: `url('/pexels-rdne-6518674.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                padding: '100px 20px',
              }}
            >
              <Container className="text-center">
                <WeddingMenu />
                <OrderNowButton />
              </Container>
            </div>
          </Carousel.Item>

          {/* Slide 4: Family */}
          <Carousel.Item>
            <div
              style={{
                backgroundImage: `url('/pexels-fidel-2814828.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                padding: '100px 20px',
              }}
            >
              <Container className="text-center">
                <FamilyMenu />
                <OrderNowButton />
              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Menu;
