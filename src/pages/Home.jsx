// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';
import BannerList from '../components/BannerList';
import LatestProducts from '../components/LatestProducts';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import CartSlide from '../components/CartSlide';

const Home = () => {
  return (
    <>
      <Header />
      <Categories />
      <BannerList />
      <LatestProducts />
      <Newsletter />
      <Footer />
      
    </>
  );
};

export default Home;
