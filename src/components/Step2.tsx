import React, { useState } from 'react';

interface Step2Props {
  onNext: (data: { calibrationAnswer: string; wuxing: string }) => void;
  onPrev: () => void;
}

const Step2: React.FC<Step2Props> = ({ onNext, onPrev }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const questions = [
    {
      id: 1,
      question: '当你面对一个重要决定时，你更倾向于：',
      options: [
        {
          letter: 'A',
          title: '跟随直觉，快速做决定',
          description: '相信自己的第六感，凭感觉行动'
        },
        {
          letter: 'B',
          title: '分析利弊，谨慎考虑',
          description: '权衡各种可能性，做出理性判断'
        },
        {
          letter: 'C',
          title: '参考他人意见',
          description: '询问朋友或家人的建议'
        },
        {
          letter: 'D',
          title: '顺其自然，走一步看一步',
          description: '不刻意规划，随机应变'
        }
      ]
    }
  ];

  // 简单的五行计算函数（基于年份最后一位）
  const calculateWuxing = (): string => {
    // 从本地存储获取出生日期（YYMMDD格式）
    const birthDate = localStorage.getItem('birthDate') || '';
    let yearLastDigit = new Date().getFullYear() % 10;
    
    // 如果有出生日期，提取年份的最后一位
    if (birthDate.length === 6) {
      const yearPart = birthDate.substring(0, 2);
      yearLastDigit = parseInt(yearPart) % 10;
    }
    
    const wuxingMap = {
      0: '金', 1: '木', 2: '水', 3: '火', 4: '土',
      5: '金', 6: '木', 7: '水', 8: '火', 9: '土'
    };
    return wuxingMap[yearLastDigit as keyof typeof wuxingMap];
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      const wuxing = calculateWuxing();
      onNext({ calibrationAnswer: selectedAnswer, wuxing });
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-center">冒险测试</h2>
      
      <div className="test-task">
        <div className="test-task-title">校准任务</div>
        <div className="test-task-description">
          请回答以下问题，帮助我们更准确地分析你的性格特质
        </div>
      </div>

      {questions.map((q) => (
        <div key={q.id} className="mb-8">
          <h3 className="text-lg font-bold mb-4">{q.question}</h3>
          <div>
            {q.options.map((option) => (
              <div
                key={option.letter}
                className={`question-option ${selectedAnswer === option.letter ? 'selected' : ''}`}
                onClick={() => setSelectedAnswer(option.letter)}
              >
                <div className="option-content">
                  <div className="option-letter">{option.letter}</div>
                  <div className="option-text">
                    <div className="option-title">{option.title}</div>
                    <div className="option-description">{option.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="button-container">
        <button className="btn-secondary" onClick={onPrev}>
          上一步
        </button>
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!selectedAnswer}
        >
          完成测试
        </button>
      </div>
    </div>
  );
};

export default Step2;