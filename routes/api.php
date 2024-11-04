<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use function Pest\Laravel\json;
use App\Http\Controllers\TextToSpeechController;
use App\Http\Controllers\AIController;
use App\Http\Controllers\PythonEvaluationController;

Route::post('/evaluate', [PythonEvaluationController::class, 'handleRequest'])->name('api.evaluate');
Route::post('/generate-question', [AIController::class, 'generateQuestion'])->name('api.generate.question');
Route::post('/text-to-speech', [TextToSpeechController::class, 'handleRequest'])->name('api.text-to-speech');
Route::get('test-python-execution', [PythonEvaluationController::class, 'testPythonExecution']);
Route::get('/test', function () {
    return response()->json([
        'message' => 'Hello World',
    ], 200);
});
