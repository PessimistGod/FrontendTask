import React from 'react'
import PricingHeader from './PricingHeading'
import {Plans} from './Plans/Plans'
import { ToastContainer } from 'react-toastify'

const Landing = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <PricingHeader/>
    <div className="container ">

    <Plans/>
    </div>
    </>
  )
}

export default Landing