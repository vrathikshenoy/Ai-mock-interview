'use client';
import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  
    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert('Sorry, Your browser does not support text to speech');
        }
    };

    return mockInterviewQuestion && (
        <div className="container mx-auto px-4 py-8 pt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4 md:mb-0">
                    <div className="space-y-4">
                        {mockInterviewQuestion.map((question, index) => (
                            <div
                                key={index}
                                className={`p-4 border rounded-full text-sm text-center cursor-pointer ${
                                    activeQuestionIndex === index ? 'bg-primary text-white' : ''
                                }`}
                                onClick={() => textToSpeech(question.question)}
                            >
                                Question #{index + 1}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-black rounded-lg shadow-lg p-6">
                    <h2 className="text-lg font-bold mb-4">{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
                    <Volume2 className="cursor-pointer" onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)} />
                </div>
            </div>

            <div className="bg-blue-100 rounded-lg mt-8 p-4">
                <div className="flex items-center">
                    <Lightbulb className="mr-2" />
                    <strong className="text-primary">Note:</strong>
                </div>
                <p className="text-sm text-primary mt-2">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</p>
            </div>
        </div>
    );
}

export default QuestionsSection;
