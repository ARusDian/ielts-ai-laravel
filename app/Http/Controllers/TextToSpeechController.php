<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Google\Cloud\TextToSpeech\V1\TextToSpeechClient;
use Google\Cloud\Storage\StorageClient;
use Google\Cloud\TextToSpeech\V1\SynthesisInput;
use Google\Cloud\TextToSpeech\V1\VoiceSelectionParams;
use Google\Cloud\TextToSpeech\V1\AudioConfig;
use Google\Cloud\TextToSpeech\V1\AudioEncoding;
use Illuminate\Support\Facades\Storage;

class TextToSpeechController extends Controller
{
    public function handleRequest(Request $request)
    {
        try {
            $client = new TextToSpeechClient();

            $text = $request->input('text');
            $audio = $request->input('audio');
            $user = $request->input('user');
            $chatLogs = $request->input('chatLogs');
            $answer = $request->input('answer');
            $isInit = $request->input('isInit');

            $base64Data = str_replace('data:audio/wav;base64,', '', $audio);
            $currentDate = now()->timestamp;

            // Define the storage paths on public disk
            $recordsDir = 'audio/records';
            $userDir = $recordsDir . '/' . $user;
            $userAudioDir = $userDir . '/user';
            $assistantDir = $userDir . '/assistant';

            // Save user audio file if not isInit
            if (!$isInit) {
                $fileName = $userAudioDir . '/' . $currentDate . '.wav';
                Log::info("Saving user audio to: $fileName");
                Storage::disk('public')->put($fileName, base64_decode($base64Data));
            }

            // Save chat logs
            $chatLogsPath = $userDir . '/chatLogs.txt';
            Log::info("Saving chat logs to: $chatLogsPath");
            Storage::disk('public')->put($chatLogsPath, json_encode([...$chatLogs, ['role' => 'user', 'content' => $answer], ['role' => 'assistant', 'content' => $text]], JSON_PRETTY_PRINT));

            // Setup SynthesisInput
            $input = new SynthesisInput();
            $input->setText($text);

            // Setup VoiceSelectionParams
            $voice = new VoiceSelectionParams();
            $voice->setLanguageCode('en-GB');
            $voice->setName('en-GB-Wavenet-A');

            // Setup AudioConfig
            $audioConfig = new AudioConfig();
            $audioConfig->setAudioEncoding(AudioEncoding::MP3);
            $audioConfig->setPitch(1.20);
            $audioConfig->setSpeakingRate(0.9);
            $audioConfig->setEffectsProfileId(['headphone-class-device']);

            // Generate the speech
            $response = $client->synthesizeSpeech($input, $voice, $audioConfig);
            $assistantAudioPath = $assistantDir . '/' . $currentDate . '.mp3';
            Log::info("Saving assistant audio to: $assistantAudioPath");
            Storage::disk('public')->put($assistantAudioPath, $response->getAudioContent());

            // Return the audio path as response
            return response()->json([
                'src' => Storage::url($assistantAudioPath),  // Generates public URL
            ], 200);
        } catch (\Exception $e) {
            Log::error("An error occurred: " . $e);
            return response()->json(['error' => $e], 500);
        }
    }


    public function testingGCP()
    {
        try {
            // Instantiate the Text-to-Speech client
            $textToSpeechClient = new TextToSpeechClient();

            // Set the text input for synthesis
            $synthesisInput = new SynthesisInput();
            $synthesisInput->setText("Hello! This is a test of the Google Cloud Text-to-Speech API.");

            // Configure the voice settings (e.g., language and gender)
            $voice = new VoiceSelectionParams();
            $voice->setLanguageCode('en-US'); // English, US
            $voice->setSsmlGender(\Google\Cloud\TextToSpeech\V1\SsmlVoiceGender::NEUTRAL);

            // Configure audio output format
            $audioConfig = new AudioConfig();
            $audioConfig->setAudioEncoding(AudioEncoding::MP3);

            // Synthesize speech
            $response = $textToSpeechClient->synthesizeSpeech($synthesisInput, $voice, $audioConfig);

            // Retrieve the audio content from the response
            $audioContent = $response->getAudioContent();

            // Define the file name and save path
            $fileName = 'test_output.mp3';
            Storage::disk('local')->put($fileName, $audioContent);

            Log::info("Audio content has been successfully saved as {$fileName}");

            // Close the client
            $textToSpeechClient->close();
        } catch (\Exception $e) {
            Log::error("Error testing GCP Text-to-Speech API: " . $e->getMessage());
            Log::error($e->getTraceAsString());
        }
    }

    public function authenticateWithGCP()
    {
        try {
            $storage = new StorageClient([
                'projectId' => env('GCP_PROJECT_ID'),
                'keyFile' => json_decode(env('GCP_CREDENTIALS_JSON'), true),
                // 'keyFile' => config('dataku.ini'),
            ]);

            // Log::info(config('dataku.url'));
            $buckets = $storage->buckets();
            // Log::info('Buckets:');
            // foreach ($buckets as $bucket) {
            //     Log::info("- {$bucket->name()}");
            // }
            // Log::info('Listed all storage buckets.');
        } catch (\Exception $e) {
            Log::error("Error authenticating with GCP: " . $e->getMessage());
        }
    }
}
