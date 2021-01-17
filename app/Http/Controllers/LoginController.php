<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    //

    public function login(Request $request) {
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string'],
        ]);
        $credentials = $request->only(['email','password']);
        if(Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json(Auth::user(),200);
        }

        return response()->json('The provided credentials are incorrect',401);
    }

    public function logout(Request $request) {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'logged out successfully']);
    }
}
