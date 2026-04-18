import React, { useState } from 'react';

interface Step1Props {
  onNext: (data: { mbti: string; birthDate: string }) => void;
}

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const [selectedMbti, setSelectedMbti] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const mbtiTypes = [
    { type: 'INFJ', nickname: '绿老头', icon: '🧙‍♂️' },
    { type: 'INFP', nickname: '小蝴蝶', icon: '🦋' },
    { type: 'INTJ', nickname: '建筑师', icon: '🏗️' },
    { type: 'INTP', nickname: '科学家', icon: '🔬' },
    { type: 'ENFJ', nickname: '教导主任', icon: '👨‍🏫' },
    { type: 'ENFP', nickname: '快乐小狗', icon: '🐶' },
    { type: 'ENTJ', nickname: '霸道总裁', icon: '👑' },
    { type: 'ENTP', nickname: '辩论家', icon: '🎭' },
    { type: 'ISFJ', nickname: '守护者', icon: '🛡️' },
    { type: 'ISFP', nickname: '艺术家', icon: '🎨' },
    { type: 'ISTJ', nickname: '公务员', icon: '👔' },
    { type: 'ISTP', nickname: '手艺人', icon: '🔧' },
    { type: 'ESFJ', nickname: '大姐姐', icon: '👩‍❤️‍👩' },
    { type: 'ESFP', nickname: '表演家', icon: '🎪' },
    { type: 'ESTJ', nickname: '企业家', icon: '💼' },
    { type: 'ESTP', nickname: '冒险家', icon: '🧗' }
  ];

  const handleSubmit = () => {
    // 验证日期格式：6位数字
    const dateRegex = /^\d{6}$/;
    if (selectedMbti && dateRegex.test(birthDate)) {
      onNext({ mbti: selectedMbti, birthDate });
    } else {
      alert('请输入正确的出生日期格式（6位数字，如950505）');
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-center">角色创建</h2>
      
      <div className="mb-8">
        <label className="label">选择你的MBTI人格</label>
        <div className="grid-cols-2">
          {mbtiTypes.map((mbti) => (
            <div
              key={mbti.type}
              className={`mbti-option ${selectedMbti === mbti.type ? 'selected' : ''}`}
              onClick={() => setSelectedMbti(mbti.type)}
            >
              <div className="text-4xl mb-2">{mbti.icon}</div>
              <div className="text-lg font-bold">{mbti.type}</div>
              <div className="text-sm text-gray-600">{mbti.nickname}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="label">输入你的出生日期</label>
        <input
          type="text"
          className="input-field"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          placeholder="请输入6位数字，如950101"
        />
        <p className="helper-text">格式：YYMMDD（如950101表示1995年1月1日）</p>
      </div>

      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={!selectedMbti || !birthDate}
      >
        开始冒险
      </button>
    </div>
  );
};

export default Step1;