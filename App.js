

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup (1)';
import AccessAuthorized from './Components/AccessAuthorized';
import Admin from './Components/Admin/Admin'; 
import Student from './Components/Student/Student';
import Faculty from './Components/Faculty/Faculty';
import DiscussionForum from './Components/Student/Discussion/DiscussionForum';
import SupervisorList from './Components/Student/Supervisorlist/SupervisorList';
import StudentRequests from './Components/Faculty/StudentRequests';
import { UserProvider } from './Components/LoginSignup/UserContext';
// import Ugh from './ugh';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AcceptedStudents from './Components/Faculty/AcceptedStudents';

import RequestForm from './Components/Student/Supervisorlist/RequestForm';
import Header from './Header';
import './App.css'; 
// import FacultyProfile from './Components/Faculty/FacultyProfile/FacultyProfile';


import Template from './Components/Student/Templates/Templates';
import Phase1ChapterSubmissionHeading from './Components/Student/Phase1/ChapterHeadiong';
import Phase1Chap1 from './Components/Student/Phase1/chapter1';
import Phase1Chap2 from './Components/Student/Phase1/chapter2';
import Phase1Chap3 from './Components/Student/Phase1/chapter3';
import Phase1Chap4 from './Components/Student/Phase1/chapter4';
import Phase1Chap5 from './Components/Student/Phase1/chapter5';


import Phase2ChapterSubmissionHeading from './Components/Student/Phase2/ChapterHeadiong2';
import Phase2Chap1 from './Components/Student/Phase2/chapter1';
import Phase2Chap2 from './Components/Student/Phase2/chapter2';
import Phase2Chap3 from './Components/Student/Phase2/chapter3';
import Phase2Chap4 from './Components/Student/Phase2/chapter4';
import Phase2Chap5 from './Components/Student/Phase2/chapter5';

import AnnouncementSection from './Components/Student/Announcement/AnnoucementSection';
import NotificationDropdown from './Components/notification';


import Phase1Chapters from './Components/Faculty/Phase1/Phase1Chapters/Phase1Chapters';
import ChapterReview1 from './Components/Faculty/Phase1/chapter1';
import ChapterReview2 from './Components/Faculty/Phase1/chapter2';
import ChapterReview3 from './Components/Faculty/Phase1/chapter3';
import ChapterReview4 from './Components/Faculty/Phase1/chapter4';
import ChapterReview5 from './Components/Faculty/Phase1/chapter5';
import Phase1Documentations from './Components/Faculty/Phase1/Phase1Documentations/Phase1Documentations';
import Phase1StudentDocument from './Components/Student/Phase1StudentDocument';

import Phase2StudentDocument from './Components/Student/Phase2StudentDocument';

import Phase2Chapters from './Components/Faculty/Phase2/Phase2Chapters/Phase2Chapters';
import Phase2ChapterReview6 from './Components/Faculty/Phase1/chapter6';
import Phase2ChapterReview7 from './Components/Faculty/Phase1/chapter7';
import Phase2ChapterReview8 from './Components/Faculty/Phase1/chapter8';
import Phase2ChapterReview9 from './Components/Faculty/Phase1/chapter9';
import Phase2Documentations from './Components/Faculty/Phase2/Phase2Documentations/Phase2Documentations';
import FacultyProfile from './Components/Faculty/FacultyProfile/FacultyProfile';

import StudentList from './Components/Admin/studentList';
import FacultyList from './Components/Admin/facultyList';
import GradingList from './Components/Admin/gradesList';
import StudentProjects from './Components/Admin/studentProjects';
import ProtectedRoute from './ProtectedRoute';

// import ChaptersGrading from './Components/Student/Grading/ChaptersGrading';
function App() {
    return (
        <>
       
            <UserProvider  >
                <Router>
                    <div style={{ marginBottom: '150px' }}>
                        <Header/>
                    </div>        
<Routes>
  {/* Public Routes */}
  <Route path="/" element={<LoginSignup />} />
  <Route path="/AccessAuthorized" element={<AccessAuthorized />} />

  {/* Protected Routes */}
  <Route path="/Admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
  <Route path="/DiscussionForum" element={<ProtectedRoute><DiscussionForum /></ProtectedRoute>} />

  <Route path="/Student" element={<ProtectedRoute><Student /></ProtectedRoute>} />
  <Route path="/SupervisorList" element={<ProtectedRoute><SupervisorList /></ProtectedRoute>} />
  <Route path="/RequestForm" element={<ProtectedRoute><RequestForm /></ProtectedRoute>} />
  <Route path="/Template" element={<ProtectedRoute><Template /></ProtectedRoute>} />
  <Route path="/AnnouncementSection" element={<ProtectedRoute><AnnouncementSection /></ProtectedRoute>} />
  <Route path="/NoticationDropdown" element={<ProtectedRoute><NotificationDropdown /></ProtectedRoute>} />
  <Route path="/AcceptedStudents" element={<ProtectedRoute><AcceptedStudents /></ProtectedRoute>} />
  {/* <Route path="/ChaptersGrading" element={<ProtectedRoute><ChaptersGrading /></ProtectedRoute>} /> */}

  <Route path="/Phase1ChapterSubmissionHeading" element={<ProtectedRoute><Phase1ChapterSubmissionHeading /></ProtectedRoute>} />
  <Route path="/Phase1Chap1" element={<ProtectedRoute><Phase1Chap1 /></ProtectedRoute>} />
  <Route path="/Phase1Chap2" element={<ProtectedRoute><Phase1Chap2 /></ProtectedRoute>} />
  <Route path="/Phase1Chap3" element={<ProtectedRoute><Phase1Chap3 /></ProtectedRoute>} />
  <Route path="/Phase1Chap4" element={<ProtectedRoute><Phase1Chap4 /></ProtectedRoute>} />
  <Route path="/Phase1Chap5" element={<ProtectedRoute><Phase1Chap5 /></ProtectedRoute>} />
    <Route path="/Phase1StudentDocument" element={<ProtectedRoute><Phase1StudentDocument/></ProtectedRoute>} />
    <Route path="/Phase2StudentDocument" element={<ProtectedRoute><Phase2StudentDocument/></ProtectedRoute>} />

 
  <Route path="/Phase2ChapterSubmissionHeading" element={<ProtectedRoute><Phase2ChapterSubmissionHeading /></ProtectedRoute>} />
  <Route path="/Phase2Chap1" element={<ProtectedRoute><Phase2Chap1 /></ProtectedRoute>} />
  <Route path="/Phase2Chap2" element={<ProtectedRoute><Phase2Chap2 /></ProtectedRoute>} />
  <Route path="/Phase2Chap3" element={<ProtectedRoute><Phase2Chap3 /></ProtectedRoute>} />
  <Route path="/Phase2Chap4" element={<ProtectedRoute><Phase2Chap4 /></ProtectedRoute>} />
  <Route path="/Phase2Chap5" element={<ProtectedRoute><Phase2Chap5 /></ProtectedRoute>} />

  <Route path="/Faculty" element={<ProtectedRoute><Faculty /></ProtectedRoute>} />
  <Route path="/StudentRequests" element={<ProtectedRoute><StudentRequests /></ProtectedRoute>} />
  <Route path="/Phase1Chapters" element={<ProtectedRoute><Phase1Chapters /></ProtectedRoute>} />
  <Route path="/ChapterReview1" element={<ProtectedRoute><ChapterReview1 /></ProtectedRoute>} />
  <Route path="/ChapterReview2" element={<ProtectedRoute><ChapterReview2 /></ProtectedRoute>} />
  <Route path="/ChapterReview3" element={<ProtectedRoute><ChapterReview3 /></ProtectedRoute>} />
  <Route path="/ChapterReview4" element={<ProtectedRoute><ChapterReview4 /></ProtectedRoute>} />
  <Route path="/ChapterReview5" element={<ProtectedRoute><ChapterReview5 /></ProtectedRoute>} />
  <Route path="/Phase1Documentations" element={<ProtectedRoute><Phase1Documentations /></ProtectedRoute>} />
  <Route path="/Phase2Chapters" element={<ProtectedRoute><Phase2Chapters /></ProtectedRoute>} />
  <Route path="/Phase2ChapterReview6" element={<ProtectedRoute><Phase2ChapterReview6 /></ProtectedRoute>} />
  <Route path="/Phase2ChapterReview7" element={<ProtectedRoute><Phase2ChapterReview7 /></ProtectedRoute>} />
  <Route path="/Phase2ChapterReview8" element={<ProtectedRoute><Phase2ChapterReview8 /></ProtectedRoute>} />
  <Route path="/Phase2ChapterReview9" element={<ProtectedRoute><Phase2ChapterReview9 /></ProtectedRoute>} />
  <Route path="/Phase2Documentations" element={<ProtectedRoute><Phase2Documentations /></ProtectedRoute>} />
  <Route path="/FacultyProfile" element={<ProtectedRoute><FacultyProfile /></ProtectedRoute>} />

  <Route path="/studentList" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
  <Route path="/FacultyList" element={<ProtectedRoute><FacultyList /></ProtectedRoute>} />
  <Route path="/GradingList" element={<ProtectedRoute><GradingList /></ProtectedRoute>} />
   <Route path="/StudentProjects" element={<ProtectedRoute><StudentProjects /></ProtectedRoute>} />
 
</Routes>
                </Router>
               
            </UserProvider>
        </>
    );
}

export default App;




        