import { PythonShell } from 'python-shell';
import path from 'path';

export async function POST() {
  try {
    const pythonOptions = {
      mode: 'text',
      pythonPath: 'python', // Use 'python' on Windows
      scriptPath: path.join(process.cwd(), 'ml'),
      timeout: 5000
    };

    // Test with a fixed input
    const inputData = JSON.stringify({"test": "123"});
    
    // Execute Python script
    const output = await new Promise((resolve, reject) => {
      const pyshell = new PythonShell('test.py', pythonOptions);
      
      // Send input
      pyshell.send(inputData);
      pyshell.end();
      
      let result = [];
      
      pyshell.on('message', (message) => {
        result.push(message);
      });
      
      pyshell.on('close', () => {
        resolve(result.join(''));
      });
      
      pyshell.on('error', (error) => {
        reject(error);
      });
    });

    return new Response(output, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: "API Error",
      details: error.message,
      type: "test_route"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({
    message: "Use POST to test Python integration"
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}