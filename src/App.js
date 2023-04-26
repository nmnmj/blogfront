import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Card from './components/BlogList';
import Layout from './components/Layout';
import { useGetallblogQuery } from './services/post';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import BlogList from './components/BlogList';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<About/>} />
        <Route path="/allblogs" element={<BlogList />} />
        <Route path="/home" element={<Home/>} />


        </Route>
      </Routes>
    </div>
  );
}

export default App;