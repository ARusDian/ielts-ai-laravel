<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CobaController extends Controller
{
    public function index(){
        return Inertia::render('App/Register');
    }
    public function pertama(){
        return 'page pertama';
    }
}
