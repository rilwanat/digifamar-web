import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";


import HomePage from "./components/HomePage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import MarketPage from "./components/MarketPage.jsx";
import JoinFarmersPage from "./components/JoinFarmersPage.jsx";
import PressPage from "./components/PressPage.jsx";
import ContactPage from "./components/ContactPage.jsx";


import LoginUserPage from "./components/LoginUserPage.jsx";
import CreateUserWithEmailPage from "./components/CreateUserWithEmailPage.jsx";
import UserVerifyEmailPage from "./components/user/UserVerifyEmailPage.jsx";
import UserDashboardPage from './components/user/UserDashboardPage.jsx';

import LoginFarmerPage from "./components/LoginFarmerPage.jsx";
import CreateFarmerWithEmailPage from "./components/CreateFarmerWithEmailPage.jsx";
import FarmerVerifyEmailPage from "./components/farmer/FarmerVerifyEmailPage.jsx";
import FarmerDashboardPage from './components/farmer/FarmerDashboardPage.jsx';

import LoginAdminPage from './components/LoginAdminPage.jsx';
import AdminDashboardPage from './components/admin/AdminDashboardPage.jsx';

//
import axiosInstance from './auth/axiosConfig'; // Ensure the correct relative path
import { setCookie } from './auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from './auth/authUtils'; // Import getCookie function
//


import ProtectedUserRoute from './auth/protectedUserRoute';
import ProtectedFarmerRoute from './auth/protectedFarmerRoute';
import ProtectedAdminRoute from './auth/protectedAdminRoute';


function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  //USER DETAILS
      const [userDetails, setUserDetails] = useState(null);
          const refreshUserDetails = async () => {
              // setIsLoading(true);
              // setError(null);              
              try {
                  // Option 1: If you only need to refresh from cookies
                  const storedUserDetails = getCookie('dgf-user-details');
                  const parsedUserDetails = setUserDetails ? JSON.parse(storedUserDetails) : null;
                  setUserDetails(parsedUserDetails);
                  // alert(JSON.stringify(parsedUserDetails), null, 2);
              } catch (err) {
                  // setError('Failed to refresh user details');
                  alert('Refresh User error: ' + err);
              } finally {
                  // setIsLoading(false);
              }
          };
          // Initial load
          useEffect(() => {
              refreshUserDetails();
          }, []);
      //USER DETAILS

//FARMER DETAILS
      const [farmerDetails, setFarmerDetails] = useState(null);
          const refreshFarmerDetails = async () => {
              // setIsLoading(true);
              // setError(null);              
              try {
                  // Option 1: If you only need to refresh from cookies
                  const storedFarmerDetails = getCookie('dgf-farmer-details');
                  const parsedFarmerDetails = setFarmerDetails ? JSON.parse(storedFarmerDetails) : null;
                  setFarmerDetails(parsedFarmerDetails);
                  // alert(JSON.stringify(parsedMemberDetails), null, 2);
              } catch (err) {
                  // setError('Failed to refresh user details');
                  alert('Refresh farmer error: ' + err);
              } finally {
                  // setIsLoading(false);
              }
          };
          // Initial load
          useEffect(() => {
              refreshFarmerDetails();
          }, []);
      //FARMER DETAILS


      //ADMIN DETAILS
      const [adminDetails, setAdminDetails] = useState(null);
          const refreshAdminDetails = async () => {
              // setIsLoading(true);
              // setError(null);              
              try {
                  // Option 1: If you only need to refresh from cookies
                  const storedAdminDetails = getCookie('dgf-admin-details');
                  const parsedAdminDetails = setAdminDetails ? JSON.parse(storedAdminDetails) : null;
                  setAdminDetails(parsedAdminDetails);
                  // alert(JSON.stringify(parsedAdminDetails), null, 2);
              } catch (err) {
                  // setError('Failed to refresh admin details');
                  alert('Refresh Admin error: ' + err);
              } finally {
                  // setIsLoading(false);
              }
          };
          // Initial load
          useEffect(() => {
              refreshAdminDetails();
          }, []);
      //ADMIN DETAILS




  return (
    <Router 
    // basename="/digifamar"
    basename="/"
     >
      <div>
        <div>
          <Routes>
            
            <Route path="/" element={<HomePage isMobile={isMobile}  userDetails={userDetails} refreshUserDetails={refreshUserDetails}/>} />
            <Route path="/market" element={<MarketPage isMobile={isMobile}  userDetails={userDetails} refreshUserDetails={refreshUserDetails}/>} />
            <Route path="/about-us" element={<AboutPage isMobile={isMobile}  userDetails={userDetails} refreshUserDetails={refreshUserDetails}/>} />
            <Route path="/join-farmers" element={<JoinFarmersPage isMobile={isMobile}  userDetails={userDetails} refreshUserDetails={refreshUserDetails}/>} />
            <Route path="/press" element={<PressPage isMobile={isMobile}  userDetails={userDetails} refreshUserDetails={refreshUserDetails}/>} />
            <Route path="/contact-us" element={<ContactPage isMobile={isMobile}  userDetails={userDetails} refreshUserDetails={refreshUserDetails}/>} />
            

<Route path="/user-login" element={<LoginUserPage isMobile={isMobile} />} />
            <Route path="/create-user-with-email" element={<CreateUserWithEmailPage isMobile={isMobile} />} />
            <Route path="/user-verify-email" element={
                // <ProtectedUserRoute>
                <UserVerifyEmailPage isMobile={isMobile} userDetails={userDetails} refreshUserDetails={refreshUserDetails}/>
                // </ProtectedUserRoute>
            } />
            <Route path="/user-dashboard" element={
                // <ProtectedMemberRoute>
                    <UserDashboardPage isMobile={isMobile} userDetails={userDetails} refreshUserDetails={refreshUserDetails}/>
                    // </ProtectedMemberRoute>
                } />
            
            

<Route path="/farmer-login" element={<LoginFarmerPage isMobile={isMobile} />} />
            <Route path="/create-farmer-with-email" element={<CreateFarmerWithEmailPage isMobile={isMobile} />} />
            <Route path="/farmer-verify-email" element={
                // <ProtectedFarmerRoute>
                <FarmerVerifyEmailPage isMobile={isMobile} farmerDetails={farmerDetails} refreshFarmerDetails={refreshFarmerDetails}/>
                // </ProtectedFarmerRoute>
            } />
            <Route path="/farmer-dashboard" element={
                // <ProtectedFarmerRoute>
                    <FarmerDashboardPage isMobile={isMobile} farmerDetails={farmerDetails} refreshFarmerDetails={refreshFarmerDetails}/>
                    // </ProtectedFarmerRoute>
                } />



<Route path="/admin-login" element={<LoginAdminPage isMobile={isMobile} />} />
            <Route path="/admin-dashboard" element={
                // <ProtectedAdminRoute>
                    <AdminDashboardPage isMobile={isMobile} adminDetails={adminDetails} refreshAdminDetails={refreshAdminDetails}/>
                    // </ProtectedAdminRoute>
                } />


            
            {/* <Route path="/about-us" element={<AboutUsPage isMobile={isMobile}  userDetails={userDetails} refreshUserDetails={refreshUserDetails}/>} /> */}
            {/* <Route path="/contact-us" element={<ContactUsPage isMobile={isMobile}  userDetails={userDetails} refreshUserDetails={refreshUserDetails}/>} /> */}
            
            
{/* <Route path="/privacy-policy" element={<PrivacyPolicyPage isMobile={isMobile}  userDetails={userDetails} refreshUserDetails={refreshUserDetails}/>} /> */}
{/* <Route path="/terms-of-service" element={<TermsOfServicePage isMobile={isMobile}  userDetails={userDetails} refreshUserDetails={refreshUserDetails}/>} /> */}

            
            
            {/* <Route path="/create-membership" element={<CreateMembershipPage isMobile={isMobile} />} />
            
            
            <Route path="/login-with-phone" element={<LoginWithPhonePage isMobile={isMobile} />} />
            
            <Route path="/user-complete-profile" element={<ProtectedMemberRoute><UserCompleteProfilePage isMobile={isMobile} memberDetails={memberDetails} refreshMemberDetails={refreshMemberDetails}/></ProtectedMemberRoute>} />
            <Route path="/user-profile" element={<ProtectedMemberRoute><UserProfilePage isMobile={isMobile} memberDetails={memberDetails} refreshMemberDetails={refreshMemberDetails}/></ProtectedMemberRoute>} />
            <Route path="/user-messages" element={<ProtectedMemberRoute><UserMessagesPage isMobile={isMobile} memberDetails={memberDetails} refreshMemberDetails={refreshMemberDetails}/></ProtectedMemberRoute>} />
            

            <Route path="/admin-login-with-phone" element={<LoginWithPhonePageAdmin isMobile={isMobile} />} />
            <Route path="/admin-dashboard" element={<ProtectedAdminRoute><AdminDashboardPage isMobile={isMobile} adminDetails={adminDetails} refreshAdminDetails={refreshAdminDetails} /></ProtectedAdminRoute>} />
            <Route path="/admin-profile" element={<ProtectedAdminRoute><AdminProfilePage isMobile={isMobile} adminDetails={adminDetails} refreshAdminDetails={refreshAdminDetails}/></ProtectedAdminRoute>} />
            <Route path="/admin-messages" element={<ProtectedAdminRoute><AdminMessagesPage isMobile={isMobile} adminDetails={adminDetails} refreshAdminDetails={refreshAdminDetails}/></ProtectedAdminRoute>} />
             */}
            
            <Route path="/*" element={<div>NOT FOUND</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
