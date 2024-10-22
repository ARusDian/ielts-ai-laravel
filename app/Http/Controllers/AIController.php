<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI;

class AIController extends Controller
{
    public function generateQuestion(Request $request)
    {
        $chatLogs = $request->input('chatLogs');
        $transcript = $request->input('transcript', '');

        // Setup prompt based on transcript
        $prompt = $transcript !== ""
            ? "generate one question without quotes marks according to the response statement: " . $transcript
            : "generate one question that is commonly used in IELTS without quotes marks";

        // Call OpenAI API
        $openai = OpenAI::client(env('OPENAI_API_KEY'));
        $completion = $openai->chat()->create([
            'model' => 'gpt-3.5-turbo-0125',
            'messages' => array_merge($chatLogs, [
                ['role' => 'assistant', 'content' => $prompt]
            ]),
        ]);

        $newQuestion = $completion['choices'][0]['message']['content'];

        // Update chat logs
        if (count($chatLogs) > 0) {
            array_push($chatLogs, ['role' => 'user', 'content' => $transcript], ['role' => 'assistant', 'content' => $newQuestion]);
        } else {
            array_push($chatLogs, ['role' => 'assistant', 'content' => $newQuestion]);
        }

        // Return response to frontend
        return response()->json([
            'newQuestion' => $newQuestion,
            'chatLogs' => $chatLogs
        ]);
    }
}
