import { useQuery } from '@apollo/client';
import { QUERY_QUIZS } from '../utils/queries';
import { Link } from 'react-router-dom';
const Grade1 = () => {
  const { loading, data } = useQuery(QUERY_QUIZS, {
    variables: { gradeLevel: 1 },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const { quizs } = data;

  return (
    <div>
      <h1>Grade 1</h1>
      {quizs.map((quiz) => (
        <div key={quiz._id} className="cards text-center border border-primary mt-4">
          <div className="card-header">{quiz.quizAuthor}</div>
          <div className="card-body">
            <h5 className="card-title">{quiz.quizTitle}</h5>
            <p className="card-text">Ready to learn?! </p>
            <Link className="btn btn-lg btn-danger m-2" to={`/Quiz/${quiz._id}`}>
                Begin Quiz
              </Link>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grade1;