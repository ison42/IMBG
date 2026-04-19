import React, { useState } from 'react';

interface Step1Props {
  onNext: (data: { mbti: string; birthDate: string }) => void;
}

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const [selectedMbti, setSelectedMbti] = useState('');
  const [birthDate, setBirthDate] = useState('');
  
  // 智能日期解析函数
  const parseDate = (input: string): string | null => {
    // 去除所有非数字和非中文数字
    const cleaned = input.replace(/[^0-9零〇一二三四五六七八九十百千万年月日\/\-]/g, '');
    
    // 尝试各种格式解析
    let year: number | null = null;
    let month: number | null = null;
    let day: number | null = null;
    
    // 格式1: 8位数字 (YYYYMMDD)
    if (/^\d{8}$/.test(cleaned)) {
      year = parseInt(cleaned.slice(0, 4));
      month = parseInt(cleaned.slice(4, 6));
      day = parseInt(cleaned.slice(6, 8));
    } 
    // 格式2: 6位数字 (YYMMDD)
    else if (/^\d{6}$/.test(cleaned)) {
      year = parseInt(cleaned.slice(0, 2));
      month = parseInt(cleaned.slice(2, 4));
      day = parseInt(cleaned.slice(4, 6));
      // 处理年份，假设1900-2099
      year = year >= 50 ? 1900 + year : 2000 + year;
    }
    // 格式3: 带分隔符 (YYYY/MM/DD 或 YYYY-MM-DD)
    else if (/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(cleaned)) {
      const parts = cleaned.split(/[\/\-]/);
      year = parseInt(parts[0]);
      month = parseInt(parts[1]);
      day = parseInt(parts[2]);
    }
    // 格式4: 中文日期 (如：1995年1月1日)
    else if (cleaned.includes('年') && cleaned.includes('月') && cleaned.includes('日')) {
      const yearMatch = cleaned.match(/(\d{2,4})年/);
      const monthMatch = cleaned.match(/(\d{1,2})月/);
      const dayMatch = cleaned.match(/(\d{1,2})日/);
      
      if (yearMatch && monthMatch && dayMatch) {
        year = parseInt(yearMatch[1]);
        month = parseInt(monthMatch[1]);
        day = parseInt(dayMatch[1]);
        
        // 处理两位年份
        if (year < 100) {
          year = year >= 50 ? 1900 + year : 2000 + year;
        }
      }
    }
    
    // 验证日期有效性
    if (year && month && day) {
      if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        const yy = (year % 100).toString().padStart(2, '0');
        const mm = month.toString().padStart(2, '0');
        const dd = day.toString().padStart(2, '0');
        return `${yy}${mm}${dd}`;
      }
    }
    
    return null;
  };

  const mbtiTypes = [
    { type: 'INTJ', nickname: '建筑师', icon: '🏗️' },
    { type: 'INTP', nickname: '逻辑学家', icon: '🔬' },
    { type: 'ENTJ', nickname: '指挥官', icon: '👑' },
    { type: 'ENTP', nickname: '辩论家', icon: '🎭' },
    { type: 'INFJ', nickname: '提倡者', icon: '🧙‍♂️' },
    { type: 'INFP', nickname: '调停者', icon: '🦋' },
    { type: 'ENFJ', nickname: '主人公', icon: '👨‍🏫' },
    { type: 'ENFP', nickname: '竞选者', icon: '🐶' },
    { type: 'ISTJ', nickname: '物流师', icon: '👔' },
    { type: 'ISFJ', nickname: '守卫者', icon: '🛡️' },
    { type: 'ESTJ', nickname: '总经理', icon: '💼' },
    { type: 'ESFJ', nickname: '执政官', icon: '👩‍❤️‍👩' },
    { type: 'ISTP', nickname: '鉴赏家', icon: '🔧' },
    { type: 'ISFP', nickname: '探险家', icon: '🎨' },
    { type: 'ESTP', nickname: '企业家', icon: '💼' },
    { type: 'ESFP', nickname: '表演者', icon: '🎪' }
  ];

  const handleSubmit = () => {
    if (!selectedMbti) {
      alert('请先选择你的MBTI人格');
      return;
    }
    if (!birthDate) {
      alert('请先输入你的出生日期');
      return;
    }
    const parsedDate = parseDate(birthDate);
    if (parsedDate) {
      onNext({ mbti: selectedMbti, birthDate: parsedDate });
    } else {
      alert('请输入正确的出生日期格式（如950101）');
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
          placeholder="如：950101"
        />
      </div>

      <button
        className="btn-primary"
        onClick={handleSubmit}
      >
        开始冒险
      </button>
    </div>
  );
};

export default Step1;