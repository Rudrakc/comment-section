import React from 'react';
import CommentsList from './components/CommentsList';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto">
        <Navbar />
        <CommentsList />
      </div>
    </div>
  );
}

export default App;
