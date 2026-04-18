import React, { useState, useEffect } from 'react';

interface TestResult {
  id: string;
  mbti: string;
  birth_date: string;
  wuxing: string;
  calibration_answer: string;
  created_at: string;
}

const Admin: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载测试数据
  useEffect(() => {
    const fetchTestResults = () => {
      try {
        // 从 localStorage 获取测试数据
        const existingData = localStorage.getItem('testResults');
        const testResults = existingData ? JSON.parse(existingData) : [];
        
        // 按创建时间倒序排序
        testResults.sort((a: TestResult, b: TestResult) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        
        setTestResults(testResults);
      } catch (error) {
        console.error('获取数据错误:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestResults();
  }, []);

  return (
    <div className="container">
      <h1 className="title">测试数据管理</h1>
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">测试结果列表</h2>
        
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>加载数据中...</p>
          </div>
        ) : testResults.length === 0 ? (
          <p className="text-center text-gray-500">暂无测试数据</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4">MBTI</th>
                  <th className="text-left py-3 px-4">出生日期</th>
                  <th className="text-left py-3 px-4">五行</th>
                  <th className="text-left py-3 px-4">校准答案</th>
                  <th className="text-left py-3 px-4">测试时间</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((result) => (
                  <tr key={result.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">{result.mbti}</td>
                    <td className="py-3 px-4">{result.birth_date}</td>
                    <td className="py-3 px-4">{result.wuxing}</td>
                    <td className="py-3 px-4">{result.calibration_answer}</td>
                    <td className="py-3 px-4">
                      {new Date(result.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;