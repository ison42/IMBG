// 获取所有测试结果或创建新测试结果
export const onRequest: PagesFunction<{
  DB: D1Database;
}> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  // CORS 处理
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    if (request.method === 'GET') {
      // 获取所有测试结果，按创建时间倒序排列
      const { results } = await env.DB.prepare(
        'SELECT * FROM test_results ORDER BY created_at DESC'
      ).all();
      
      return new Response(JSON.stringify(results), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (request.method === 'POST') {
      // 创建新的测试结果
      const body = await request.json();
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const createdAt = new Date().toISOString();

      await env.DB.prepare(
        'INSERT INTO test_results (id, mbti, birth_date, wuxing, calibration_answer, created_at) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(id, body.mbti, body.birth_date, body.wuxing, body.calibration_answer, createdAt).run();

      const newResult = { id, ...body, created_at: createdAt };
      
      return new Response(JSON.stringify(newResult), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};
