import React from 'react'
import './Footer.css'
import { FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
function Footer() {
  return (
    <footer className='section bg-dark text-white'>
      <div className="container mb-4">
        <div className="row d-flex justify-content-around ">
          <div className="col-lg-3 col-sm-2">
            <h5 className='text-uppercase  mt-4'>information</h5>
            <ul className="list-unstyled mt-4">
              <li><a href="">Pages</a></li>
              <li><a href="">Team</a></li>
              <li><a href="">Feuchers</a></li>
              <li><a href="">Pricing</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-sm-2">
            <h5 className='text-uppercase  mt-4'>Services</h5>
            <ul className="list-unstyled mt-4">
              <li><a href="">Branding</a></li>
              <li><a href="">Design</a></li>
              <li><a href="">Marketing</a></li>
              <li><a href="">Advertisement</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-sm-2 ">
            <h5 className='text-uppercase  mt-4'>Contact</h5>
            <ul className="list-unstyled mt-4 ">
              <li><a href=""><FaHome className='fs-4 me-2 '/>India,Telangana</a></li>
              <li><a href=""><MdEmail className='fs-4 me-2 ' />blog@gmail.com</a></li>
              <li><a href=""><FaPhoneAlt className='fs-4 me-2 ' />+91 1234467845</a></li>
              <li><a href=""></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='copyright justify-content-around text-center align-items-center  mt-3  border-top border-secondary d-flex'>
          <p>Copyright 2024-All copyrights reserved</p>
          <div className='social_media'>
            <ul className=' list-unstyled d-flex '>
              <li><a href=""><FaTwitter /></a></li>
              <li><a href=""><FaLinkedin /></a></li>
              <li><a href=""><FaInstagram /></a></li>
              <li><a href=""><FaGithub /></a>
</li>
            </ul>

          </div>
        </div>
        

    </footer>
  )
}

export default Footer