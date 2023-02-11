import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    
       <div className="homepage">
            <div class="card text-center  border border-primary mt-4">
                <div class="card-header">
                    Featured
                </div>
                <div class="card-body">
                    <h5 class="card-title">Explore content</h5>
                    <p class="card-text">blah blah blah about us and the quizes</p>
                    <Link className="btn btn-lg btn-info m-2" to="/Courses">
                Explore content
              </Link>
                </div>
                <div class="card-footer text-muted"></div>
            </div>
            <div class="card text-center border border-primary mt-5">
                <div class="card-header">
                    Featured
                </div>
                <div class="card-body">
                    <h5 class="card-title">Make a quiz</h5>
                    <p class="card-text">Talk about creating a teacher acount and making your own quizes</p>
                    <Link className="btn btn-lg btn-info m-2" to="/CreateQuiz">
                CreateQuiz
              </Link>
                </div>
                <div class="card-footer text-muted"></div>
            </div>
        </div>
  );
};

export default Home;