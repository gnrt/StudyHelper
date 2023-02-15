

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_QUIZ } from '../utils/mutations';
const CreateQuiz = ()=> {
    const [quizTitle, setQuizTitle] = useState("");
    const [gradeLevel, setGradeLevel] = useState(0);
    const [questions, setQuestions] = useState([{ question: "", answers: [{ answer: "", correct: false }] }]);
  
    const [addQuiz, { loading, error, data }] = useMutation(ADD_QUIZ);
  
    const handleQuestionChange = (event, index) => {
      const newQuestions = [...questions];
      newQuestions[index].question = event.target.value;
      setQuestions(newQuestions);
    };
  
    const handleAnswerChange = (event, questionIndex, answerIndex) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].answers[answerIndex].answer = event.target.value;
      setQuestions(newQuestions);
    };
  
    const handleCorrectChange = (event, questionIndex, answerIndex) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].answers[answerIndex].correct = event.target.checked;
      setQuestions(newQuestions);
    };
  
    const addAnswer = (questionIndex) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].answers.push({ answer: "", correct: false });
      setQuestions(newQuestions);
    };
  
    const addQuestion = () => {
      setQuestions([...questions, { question: "", answers: [{ answer: "", correct: false }] }]);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      addQuiz({
        variables: {
          quizTitle: quizTitle,
          gradeLevel: gradeLevel,
          questions: questions,
        },
      });
    };
  
    if (loading) return <p>Submitting...</p>;
    if (error) return <p>Error  Please try again</p>;
    if (data) return <p>Quiz created successfully!</p>;
  
    return (
       <div> <p> Begin by giving your Quiz a title</p>
       <p>Next select your intended grade level</p>
       <p>Now you can Begin adding your Questions</p>
         <p>For each question you can add as many answers as you like by clicking the add answer button</p>
            <p>Be sure to check the box next to the correct answer</p>
            <p> To add a new Questions click the add question button</p>
            <p>When you are finished click the Submit button</p>

      <form onSubmit={handleSubmit}>
        <label>
          Quiz Title:
          <input
            type="text"
            value={quizTitle}
            onChange={(event) => setQuizTitle(event.target.value)}
          />
        </label>
        <br />
        <label>
          Grade Level:
          <input
            type="number"
            value={gradeLevel}
            onChange={(event) => setGradeLevel (parseInt(event.target.value))}
          />
        </label>
        <br />
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <label>
              Question {questionIndex + 1}:
              <input
                type="text"
                value={question.question}
                onChange={(event) => handleQuestionChange(event, questionIndex)}
              />
            </label>
            <br />
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <label>
                  Answer {answerIndex + 1}:
                  <input
                    type="text"
                    value={answer.answer}
                    onChange={(event) => handleAnswerChange(event, questionIndex, answerIndex)}
                  />
                </label>
                <label>
                  Correct:
                  <input
                    type="checkbox"
                    checked={answer.correct}
                    onChange={(event) => handleCorrectChange(event, questionIndex, answerIndex)}
                  />
                </label>
                <br />
              </div>
            ))}
            <button type="button" onClick={() => addAnswer(questionIndex)}> Add Answer </button>
            </div>
        ))}
        <button type="button" onClick={addQuestion}> Add Question </button>

      <button type="submit">Create Quiz</button>
    </form></div>
  );
}



export default CreateQuiz;