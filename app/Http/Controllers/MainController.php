<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MainController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('App/Register');
    }

    public function testSpeaking(Request $request){
        // return $request->all();
        // return 'testspeaking stop';
        if ($request->input('username') == null) {
            return redirect()->route('app');
        }
        $username = $request->input('username');
        $openai_api_key = env('OPENAI_API_KEY');
        return Inertia::render('App/TestSpeaking', ['username' => $username, 'openai_api_key' => $openai_api_key]);
    }


    public function guide()
    {
        return Inertia::render('App/Guide');
    }
}
