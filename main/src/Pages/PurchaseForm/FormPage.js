import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardCarousel from "../Card/CardCarousel";
import { planContents } from "../Plans/PlansData";
import './FormPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../Components/Loading";


const FormPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numberOfComments, setNumberOfComments] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = 'https://frontend-task-orpin.vercel.app';
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const planIndex = Math.floor(value / 10);

    if (planContents[planIndex - 1]) {
      const selectedHeader = planContents[planIndex - 1].header;
      setNumberOfComments(value);
      navigate(`/form?planId=${selectedHeader}`);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setNumberOfComments(10);
  };

  const toastOptions = {
    position: 'top-center',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setIsLoading(true)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;

  if (!name) {
    toast.error('Please enter your name', toastOptions);
    return;
  }

  if (!email || !emailPattern.test(email)) {
    toast.error('Please enter a valid email address', toastOptions);
    return;
  }

  try {
    const formData = {
      firstname: name.toString(),
      email: email.toString(),
      message: numberOfComments.toString(),
    };

    const response = await fetch(`${apiUrl}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    setIsLoading(false)
    if (response.status >= 200 && response.status < 300) {
      resetForm();
      setTimeout(() => {
        toast.success('Product Purchased!', toastOptions);        
      }, 400);
      navigate('/');
    } else if (response.status === 400) {
      const responseData = await response.json();
      setIsLoading(false)
      toast.error(responseData.message, toastOptions);
    } else {
      setIsLoading(false)
      toast.error('Form submission failed. Please try again later.', toastOptions);
    }
  } catch (err) {

    console.error(err);
    setIsLoading(false)
    toast.error('An error occurred. Please try again later.', toastOptions);
  }
};
  

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const planId = searchParams.get("planId");

    const planIndex = planContents.findIndex((plan) => plan.header === planId);

    if (planIndex >= 0) {
      const initialNumberOfComments = (planIndex + 1) * 10;
      setNumberOfComments(initialNumberOfComments);
    }

    setTimeout(() => {
      setIsLoading(false); 
    }, 1500);
  }, []);

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

      <div className="container mt-5 vh-100">
      {isLoading ? (
          <Loading /> 
        ) : (
        <div className="row justify-content-around">
          <div className="col-md-4">
            <CardCarousel numberOfComments={numberOfComments} />
          </div>
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Order Form</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}

                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="numberOfComments">Order Comments</label>
                    <input
                      type="range"
                      className="form-control-range custom-slider"
                      id="numberOfComments"
                      min="10"
                      max="30"
                      step={10}
                      value={numberOfComments}
                      onChange={handleSliderChange}
                    />
                    <p className="mt-2 selected-value">Selected: {numberOfComments} Comments</p>
                  </div>
                  <div className="d-flex justify-content-center">

                    <button type="submit" className="btn btn-primary btn-block w-50">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
        )}
      </div>
    </>
  );
};

export default FormPage;
