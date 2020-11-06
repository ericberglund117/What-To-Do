import React from 'react';
import MichaelScott from '../images/michaelScott.png'
import './Header.css'

const Header = () => {
  return (
    <section className='header-area'>
      <section className='background' title='background'>
        <h1>What To Do?</h1>
        <img alt='michael-logo' src={MichaelScott} />
      </section>
    </section>
  )
}

export default Header;
