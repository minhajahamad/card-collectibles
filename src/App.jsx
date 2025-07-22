import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landin from './Pages/Landin/landin';
// import Registeration from './Pages/Registeration/registeration';
import Profile from './Pages/Profile/profile';
import Affiliates from './Pages/Affiliates/affiliates';
import HelpSupport from './Pages/Help & Support/helpSupport';
import PersonalDetailForm from './Pages/Personal-Details-Form/personalDetailForm';
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landin />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/affiliates" element={<Affiliates />} />
          <Route path="/user/help-support" element={<HelpSupport />} />
          <Route
            path="/user/personal-details"
            element={<PersonalDetailForm />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
