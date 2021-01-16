<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WordScramblerController;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/users', function (Request $request) {
        if(!$request->user()->admin) {
            return response('Unauthorized',401);
        }
        $users = User::all();
        return $users;
    });
    Route::get('/generate_question', [WordScramblerController::class, 'generateQuestion']);
    Route::post('/guess', [WordScramblerController::class, 'guess']);
    Route::get('/myhistory', [WordScramblerController::class, 'myHistory']);
    Route::get('/history/{userid}', [WordScramblerController::class, 'userHistory']);
});
