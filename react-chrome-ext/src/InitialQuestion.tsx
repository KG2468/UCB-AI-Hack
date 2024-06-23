import React, { useState } from 'react';
import styled from 'styled-components';

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
`;

const QuestionText = styled.h2`
  font-size: 1.2em;
  margin-bottom: 20px;
  text-align: center;
`;

const InputBox = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

interface InitialQuestionProps {
  onSubmit: (answer: string) => void;
}

const InitialQuestion: React.FC<InitialQuestionProps> = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer);
    }
  };

  return (
    <QuestionContainer>
      <QuestionText>What are you building?</QuestionText>
      <InputBox
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Describe your project..."
      />
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </QuestionContainer>
  );
};

export default InitialQuestion;