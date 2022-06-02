// import components
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Groups from './components/Pages/Groups';
import Profile from './components/Pages/Profile';
import Login from './components/Pages/Login';
import SignUp from './components/Pages/SignUp';

// import styles
import './styles/reset.css';
import './styles/fonts.css';
import './styles/variables.css';
import './styles/animations.css';
import './styles/style.css';

function App() {

    const [currentPage, setCurrentPage] = useState('Groups');

    const renderPage = () => {

        if (currentPage === 'Groups') {
            return <Groups currentPage={currentPage} setCurrentPage={setCurrentPage} />;
        }
        if (currentPage === 'Profile') {
            return <Profile currentPage={currentPage} setCurrentPage={setCurrentPage} />;
        }
        if (currentPage === 'Login') {
            return <Login currentPage={currentPage} setCurrentPage={setCurrentPage} />;
        }
        if (currentPage === 'SignUp') {
            return <SignUp currentPage={currentPage} setCurrentPage={setCurrentPage} />;
        }
        return <Groups />;

    };

    return (

        <div className={"App " + currentPage}>
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {renderPage()}
            <Footer />
        </div>

    );
}

export default App;
