// 获取、更新、删除单个测试结果
export const onRequest: PagesFunction<{
  DB: D1Database;
}> = async (context) => {
  const { request, env, params } = context;
  const id = params.id as string;

  // CORS 处理
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    // 确保数据库表存在
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS test_results (
        id TEXT PRIMARY KEY,
        mbti TEXT NOT NULL,
        birth_date TEXT NOT NULL,
        wuxing TEXT NOT NULL,
        calibration_answer TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `).run();

    if (request.method === 'GET') {
      // 获取单个测试结果
      const result = await env.DB.prepare(
        'SELECT * FROM test_results WHERE id = ?'
      ).bind(id).first();
      
      if (!result) {
        return new Response(JSON.stringify({ error: 'Result not found' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
      
      return new Response(JSON.stringify(result), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (request.method === 'PUT') {
      // 更新测试结果
      const body = await request.json();
      
      await env.DB.prepare(
        'UPDATE test_results SET mbti = ?, birth_date = ?, wuxing = ?, calibration_answer = ? WHERE id = ?'
      ).bind(body.mbti, body.birth_date, body.wuxing, body.calibration_answer, id).run();
      
      const updatedResult = await env.DB.prepare(
        'SELECT * FROM test_results WHERE id = ?'
      ).bind(id).first();
      
      return new Response(JSON.stringify(updatedResult), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (request.method === 'DELETE') {
      // 删除测试结果
      await env.DB.prepare(
        'DELETE FROM test_results WHERE id = ?'
      ).bind(id).run();
      
      return new Response(JSON.stringify({ success: true }), {
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
