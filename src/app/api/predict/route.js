import { PythonShell } from 'python-shell';
import path from 'path';

export async function POST(request) {
  const inputData1 = await request.json();
  const inputData = inputData1.movie_title
  try {
    const pythonOptions = {
      mode: 'text',
      pythonPath: 'python', // Use 'python' on Windows
      scriptPath: path.join(process.cwd(), 'pyth'),
      args: [inputData], // Wrap in array for correct argument passing
      timeout: 5000
    };

    // Test with a fixed input
    // const inputData = JSON.stringify("Avatar");
    
    // Execute Python script
    const output = await new Promise((resolve, reject) => {
      const pyshell = new PythonShell('predict.py', pythonOptions);
      
      // No need to send via stdin if reading from argv
      // pyshell.send(inputData); 
      // pyshell.end();
      
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
    const parsed = JSON.parse(output);

// Print recommendations to Node console

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