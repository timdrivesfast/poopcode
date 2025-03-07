'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getQuizById, trackQuizCompletion } from '@/lib/services/quizService';
import { Quiz, QuizQuestion } from '@/lib/types/Quiz';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { quizId } = params;
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  
  useEffect(() => {
    // Load quiz data
    const quizData = getQuizById(quizId as string);
    setQuiz(quizData);
    
    if (quizData?.timeLimit) {
      setTimeLeft(quizData.timeLimit * 60); // Convert to seconds
    }
  }, [quizId]);
  
  useEffect(() => {
    // Timer countdown when quiz is started
    if (!isQuizStarted || isQuizFinished || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isQuizStarted, isQuizFinished, timeLeft]);
  
  const startQuiz = () => {
    setIsQuizStarted(true);
  };
  
  const selectOption = (questionId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };
  
  const finishQuiz = () => {
    if (!quiz) return;
    
    // Calculate score
    let correctAnswers = 0;
    
    quiz.questions.forEach(question => {
      const selectedOption = selectedOptions[question.id];
      const correctOption = question.options.find(o => o.isCorrect)?.id;
      
      if (selectedOption === correctOption) {
        correctAnswers++;
      }
    });
    
    const calculatedScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(calculatedScore);
    setIsQuizFinished(true);
    
    // Save progress
    trackQuizCompletion(quizId as string, calculatedScore);
  };
  
  const nextQuestion = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  if (!quiz) {
    return <div className="flex justify-center items-center h-screen">Loading quiz...</div>;
  }
  
  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const currentQuestionData = quiz.questions[currentQuestion];
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {!isQuizStarted ? (
        // Quiz intro screen
        <div className="bg-gray-800 rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
          <p className="text-gray-300 mb-6">{quiz.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Category</h3>
              <p className="font-medium">{quiz.category}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Difficulty</h3>
              <p className="font-medium">{quiz.difficulty}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Questions</h3>
              <p className="font-medium">{quiz.questions.length} questions</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Time Limit</h3>
              <p className="font-medium">{quiz.timeLimit} minutes</p>
            </div>
          </div>
          
          <button
            onClick={startQuiz}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium"
          >
            Start Quiz
          </button>
        </div>
      ) : isQuizFinished ? (
        // Quiz results
        <div className="bg-gray-800 rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
          
          <div className="flex justify-center items-center mb-8">
            <div className="w-48 h-48 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={score >= 70 ? "#4ade80" : score >= 40 ? "#facc15" : "#ef4444"}
                  strokeWidth="10"
                  strokeDasharray={`${(score / 100) * 283} 283`}
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="24"
                  fontWeight="bold"
                  fill="white"
                >
                  {score}%
                </text>
              </svg>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-xl font-bold mb-2">
              {score >= 70 ? "Great job!" : score >= 40 ? "Good effort!" : "Keep practicing!"}
            </p>
            <p className="text-gray-400">
              You answered {Math.round((score / 100) * quiz.questions.length)} out of {quiz.questions.length} questions correctly.
            </p>
          </div>
          
          <div className="mt-4 mb-8">
            <button
              onClick={() => setIsReviewMode(true)}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Review Questions
            </button>
          </div>
          
          <div className="flex space-x-4">
            <Link href="/quizzes" className="flex-1">
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium">
                Back to Quizzes
              </button>
            </Link>
            <button
              onClick={() => {
                setIsQuizStarted(false);
                setIsQuizFinished(false);
                setCurrentQuestion(0);
                setSelectedOptions({});
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium"
            >
              Retry Quiz
            </button>
          </div>
        </div>
      ) : (
        // Quiz taking interface
        <div className="bg-gray-800 rounded-lg">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <div>
              <span className="font-medium">{quiz.title}</span>
              <div className="text-sm text-gray-400">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </div>
            </div>
            
            {quiz.timeLimit && (
              <div className={`font-mono font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-gray-300'}`}>
                {formatTime(timeLeft)}
              </div>
            )}
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-6">{currentQuestionData.text}</h2>
              
              <div className="space-y-3">
                {currentQuestionData.options.map(option => (
                  <div
                    key={option.id}
                    onClick={() => selectOption(currentQuestionData.id, option.id)}
                    className={`p-4 rounded-lg cursor-pointer hover:bg-gray-700 ${
                      selectedOptions[currentQuestionData.id] === option.id
                        ? 'bg-blue-700'
                        : 'bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-6 h-6 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${
                        selectedOptions[currentQuestionData.id] === option.id
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-500'
                      }`}>
                        {selectedOptions[currentQuestionData.id] === option.id && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="text-gray-100">{option.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`px-4 py-2 rounded ${
                  currentQuestion === 0
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Previous
              </button>
              
              <button
                onClick={nextQuestion}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
              >
                {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {isReviewMode && (
        <div className="mt-8 border-t border-gray-700 pt-6">
          <h2 className="text-xl font-bold mb-6">Question Review</h2>
          
          <div className="space-y-8">
            {quiz.questions.map((question, index) => {
              const selectedOption = selectedOptions[question.id];
              const correctOption = question.options.find(o => o.isCorrect);
              const isCorrect = selectedOption === correctOption?.id;
              
              return (
                <div key={question.id} className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-start mb-4">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{index + 1}. {question.text}</h3>
                    </div>
                  </div>
                  
                  <div className="ml-9 space-y-2">
                    {question.options.map(option => (
                      <div 
                        key={option.id}
                        className={`p-3 rounded ${
                          option.isCorrect 
                            ? 'bg-green-900/30 border border-green-600' 
                            : selectedOption === option.id
                              ? 'bg-red-900/30 border border-red-600'
                              : 'bg-gray-800'
                        }`}
                      >
                        {option.text}
                        {option.isCorrect && (
                          <span className="ml-2 text-green-400 text-sm">✓ Correct answer</span>
                        )}
                        {!option.isCorrect && selectedOption === option.id && (
                          <span className="ml-2 text-red-400 text-sm">✗ Your answer</span>
                        )}
                      </div>
                    ))}
                    
                    <div className="bg-gray-800 p-3 rounded mt-3 text-sm text-gray-300">
                      <strong className="text-white">Explanation:</strong> {question.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button
            onClick={() => setIsReviewMode(false)}
            className="mt-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Back to Results
          </button>
        </div>
      )}
    </div>
  );
} 