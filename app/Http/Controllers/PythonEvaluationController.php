<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class PythonEvaluationController extends Controller
{
    public function handleRequest(Request $request)
    {
        $user = $request->input('user');

        // Pastikan variabel lingkungan untuk jalur Python telah ditentukan
        $pythonPath = env('PYTHON_PATH');
        if (!$pythonPath) {
            Log::error("Python path is not defined in environment variables.");
            return response()->json(['error' => 'Python path is not set in the environment.'], 500);
        }
        Log::info('Running as: ' . get_current_user());

        // Tentukan jalur skrip Python
        $scriptPath = base_path('src/child_processes/evaluation.py');
        // Prepare the command to execute
        $command = escapeshellcmd($pythonPath . ' ' . $scriptPath . ' --user ' . escapeshellarg($user));

        Log::info('Running Python script: ' . $command);

        try {
            // Execute the command and capture the output
            $output = shell_exec($command);

            // Check if output is empty, indicating an issue
            if ($output === null || $output === false || trim($output) === '') {
                throw new \Exception('Python script did not return any output or failed to run.');
            }

            // Log the raw output for debugging
            Log::info('Python Script Output: ' . $output);

            // Decode the JSON response from the Python script
            $result = json_decode($output, true);

            // If the result is not valid JSON, log an error and throw an exception
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('Failed to decode JSON output: ' . json_last_error_msg());
            }

            // Format hasil untuk dua angka desimal jika tipe datanya adalah number
            foreach ($result as $key => $value) {
                if (is_numeric($value)) {
                    $result[$key] = number_format((float)$value, 2, '.', '');
                }
            }

            Log::info("Result: ", $result);

            // Kirimkan hasil kembali sebagai respons
            return response()->json($result, 200);
        } catch (\Exception $e) {
            Log::error("Error executing Python script: " . $e->getMessage());
            return response()->json(['error' => 'Error getting results, please try again.'], 500);
        }
    }

    public function testPythonExecution()
    {
        // Specify the username for testing
        $username = 'Keren-1730759444011';

        // Create a dummy request to pass to the handleRequest method
        $dummyRequest = new Request();
        $dummyRequest->merge(['user' => $username]);

        // Escape the username to prevent command injection
        $escapedUsername = escapeshellarg($username);

        // Command to execute the Python script with sudo
        $command = "/usr/bin/python3 /var/www/ielts-ai/src/child_processes/evaluation.py --user $escapedUsername 2>&1"; // Capture both stdout and stderr

        // Execute the command
        $output = shell_exec($command);

        // Log the raw output for debugging
        Log::info('Raw Python Script Output: ' . $output);

        // Attempt to decode the JSON output
        $decodedOutput = json_decode($output, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error('Failed to decode JSON output: ' . json_last_error_msg());
            Log::info('Output received: ' . $output);  // Log the actual output for further investigation
        } else {
            Log::info('Python Script Result: ' . print_r($decodedOutput, true));
        }

        // Return both the raw output and the result (or an error message)
        return response()->json([
            'raw_output' => $output,
            'result' => isset($decodedOutput) ? $decodedOutput : null,
            'json_error' => json_last_error_msg() !== JSON_ERROR_NONE ? json_last_error_msg() : null,
        ]);
    }
}
