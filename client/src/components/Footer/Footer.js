import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className='section bg-dark text-white mt-3'>
      <div className="container mb-4">
        <div className="row d-flex justify-content-around ">
          <div className="col-lg-3">
            <h5 className='text-uppercase  mt-4'>information</h5>
            <ul className="list-unstyled mt-2">
              <li><a href="">Pages</a></li>
              <li><a href="">Team</a></li>
              <li><a href="">Feuchers</a></li>
              <li><a href="">Pricing</a></li>
            </ul>
          </div>
          <div className="col-lg-3">
            <h5 className='text-uppercase  mt-4'>Services</h5>
            <ul className="list-unstyled mt-2">
              <li><a href="">Branding</a></li>
              <li><a href="">Design</a></li>
              <li><a href="">Marketing</a></li>
              <li><a href="">Advertisement</a></li>
            </ul>
          </div>
          <div className="col-lg-3">
            <h5 className='text-uppercase  mt-4'>Services</h5>
            <ul className="list-unstyled mt-2">
              <li><a href="">Branding</a></li>
              <li><a href="">Design</a></li>
              <li><a href="">Marketing</a></li>
              <li><a href="">Advertisement</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='copyright text-center mt-3  border-top border-secondary'>
          <p>Copyright 2024-All copyrights reserved</p>
        </div>

    </footer>
  )
}

export default Footer