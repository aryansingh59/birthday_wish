import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const questions = [
  {
    question: "Where did we first meet?",
    options: ["At a cafe", "Through friends", "Online", "At work/school"],
    correct: 2,
  },
  {
    question: "What is my favorite thing about you?",
    options: ["Your smile", "Your intelligence", "Everything", "Your humor"],
    correct: 2,
  },
  {
    question: "What do I always say to you?",
    options: ["I love you", "You're the best", "You're my favorite", "You mean the world to me"],
    correct: 0,
  }
];

export function LoveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    
    const isCorrectForQuestion = currentQuestion === 0 ? index === questions[currentQuestion].correct : true;
    if (isCorrectForQuestion) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ec4899', '#a855f7']
        });
      }
    }, 1000);
  };

  return (
    <section className="py-24 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto glass-panel rounded-[2rem] p-8 md:p-12 border-pink-500/20"
      >
        <span className="text-pink-400 text-sm tracking-widest uppercase mb-4 block">Let's Play a Game</span>
        <h2 className="text-3xl font-serif mb-8 text-pink-50">How well do you know us?</h2>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-left"
            >
              <div className="mb-6 flex justify-between items-center">
                <span className="text-pink-300 text-sm">Question {currentQuestion + 1} of {questions.length}</span>
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === currentQuestion ? 'bg-pink-500' : i < currentQuestion ? 'bg-pink-500/50' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>
              
              <h3 className="text-xl text-white mb-6 font-medium">{questions[currentQuestion].question}</h3>
              
              <div className="flex flex-col gap-3">
                {questions[currentQuestion].options.map((option, index) => {
                  let isCorrect = currentQuestion === 0 ? index === questions[currentQuestion].correct : true;
                  let isSelected = selectedAnswer === index;
                  let bgClass = "bg-white/5 hover:bg-white/10 border-white/10";
                  
                  if (selectedAnswer !== null) {
                    if (isSelected && isCorrect) bgClass = "bg-green-500/20 border-green-500/50 text-green-200";
                    else if (isSelected && !isCorrect) bgClass = "bg-red-500/20 border-red-500/50 text-red-200";
                    else if (isCorrect) bgClass = "bg-green-500/20 border-green-500/50 text-green-200"; // Reveal correct
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => selectedAnswer === null && handleAnswer(index)}
                      className={`p-4 rounded-xl border flex justify-between items-center transition-all ${bgClass}`}
                    >
                      <span>{option}</span>
                      {selectedAnswer !== null && isCorrect && <Check size={18} className="text-green-400" />}
                      {selectedAnswer !== null && isSelected && !isCorrect && <X size={18} className="text-red-400" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8"
            >
              <Heart className="w-16 h-16 mx-auto text-pink-500 mb-6 animate-pulse" fill="currentColor" />
              <h3 className="text-2xl font-serif text-white mb-4">You did amazing!</h3>
              <p className="text-pink-200 font-light mb-8">
                But honestly, it doesn't matter what you answered. You're still my favorite person in the whole world.
              </p>
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setShowResult(false);
                }}
                className="px-8 py-3 rounded-full border border-pink-500/50 text-pink-300 hover:bg-pink-500/10 transition-colors"
              >
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
