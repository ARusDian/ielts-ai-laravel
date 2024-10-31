<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CobaController extends Controller
{
    // public function index(){
    //     return Inertia::render('App/Register');
    // }
    public function index()
    {
        return 'ehehee';
    }
    public function pertama()
    {
        // return 'page pertama';
        // if ($request->input('username') == null) {
        //     return redirect()->route('app');
        // }
        // $username = $request->input('username');
        $username = 'Yudhaaaa';
        $openai_api_key = env('OPENAI_API_KEY');
        // return Inertia::render('App/Coba', ['username' => $username, 'openai_api_key' => $openai_api_key]);
        return Inertia::render('App/Coba', ['username' => $username, 'openai_api_key' => $openai_api_key]);
    }
}
