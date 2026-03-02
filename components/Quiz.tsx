'use client';

import React, { useState, useEffect } from 'react';
import { verbs, type Verb } from '@/data/verbs';
import PronunciationButton from './PronunciationButton';

interface QuizState {
  currentVerb: Verb;
  options: string[];
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  questionCount: number;
  correctCount: number;
  incorrectCount: number;
  currentStreak: number;
}

function getRandomVerb(): Verb {
  return verbs[Math.floor(Math.random() * verbs.length)];
}

function generateOptions(correctVerb: Verb): string[] {
  const options = [correctVerb.english];
  const usedIndices = new Set([verbs.indexOf(correctVerb)]);

  while (options.length < 4) {
    const randomIndex = Math.floor(Math.random() * verbs.length);
    if (!usedIndices.has(randomIndex)) {
      options.push(verbs[randomIndex].english);
      usedIndices.add(randomIndex);
    }
  }

  // Shuffle the options
  return options.sort(() => Math.random() - 0.5);
}

export default function Quiz() {
  const [quizState, setQuizState] = useState<QuizState>(() => {
    const verb = getRandomVerb();
    return {
      currentVerb: verb,
      options: generateOptions(verb),
      selectedAnswer: null,
      isCorrect: null,
      questionCount: 1,
      correctCount: 0,
      incorrectCount: 0,
      currentStreak: 0,
    };
  });

  const handleAnswerClick = (answer: string) => {
    if (quizState.selectedAnswer !== null) return; // Already answered

    const correct = answer === quizState.currentVerb.english;
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answer,
      isCorrect: correct,
      correctCount: correct ? prev.correctCount + 1 : prev.correctCount,
      incorrectCount: correct ? prev.incorrectCount : prev.incorrectCount + 1,
      currentStreak: correct ? prev.currentStreak + 1 : 0,
    }));
  };

  const handleNextQuestion = () => {
    const verb = getRandomVerb();
    setQuizState(prev => ({
      ...prev,
      currentVerb: verb,
      options: generateOptions(verb),
      selectedAnswer: null,
      isCorrect: null,
      questionCount: prev.questionCount + 1,
    }));
  };

  const getButtonClass = (option: string) => {
    const baseClass = "w-full p-4 text-left rounded-lg border-2 transition-all font-medium";

    if (quizState.selectedAnswer === null) {
      return `${baseClass} border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer`;
    }

    if (option === quizState.currentVerb.english) {
      return `${baseClass} border-green-500 bg-green-100 text-green-800`;
    }

    if (option === quizState.selectedAnswer) {
      return `${baseClass} border-red-500 bg-red-100 text-red-800`;
    }

    return `${baseClass} border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Japanese Vocabulary Quiz
          </h1>
          <p className="text-gray-600">Learn 200 high-frequency Japanese verbs</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-blue-600">{quizState.questionCount}</div>
            <div className="text-sm text-gray-600">Question</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-green-600">{quizState.correctCount}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-red-600">{quizState.incorrectCount}</div>
            <div className="text-sm text-gray-600">Incorrect</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-purple-600">{quizState.currentStreak}</div>
            <div className="text-sm text-gray-600">Streak</div>
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl text-gray-700 mb-4">
              What does this verb mean?
            </h2>
            <div className="flex items-center justify-center">
              <div className="text-6xl font-bold text-gray-900">
                {quizState.currentVerb.japanese}
              </div>
              <PronunciationButton text={quizState.currentVerb.japanese} />
            </div>
            <div className="text-center mt-3 text-xl text-gray-500">
              {quizState.currentVerb.romaji}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {quizState.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={quizState.selectedAnswer !== null}
                className={getButtonClass(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {quizState.selectedAnswer !== null && (
            <div className="space-y-4">
              <div
                className={`text-center p-4 rounded-lg ${
                  quizState.isCorrect
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                <div className="text-2xl font-bold mb-1">
                  {quizState.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </div>
                {!quizState.isCorrect && (
                  <div className="text-lg">
                    The correct answer is: {quizState.currentVerb.english}
                  </div>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-md"
              >
                Next Question →
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Practice mode - questions continue indefinitely</p>
          <p className="mt-1">Total verbs available: {verbs.length}</p>
        </div>
      </div>
    </div>
  );
}
