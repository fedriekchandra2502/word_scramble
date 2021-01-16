<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Word;
use App\Models\User;
use App\Models\History;
use Illuminate\Support\Facades\Auth;

class WordScramblerController extends Controller
{
    public function generateQuestion() {
        $randomWord = Word::all()->random();
        $question = [
            'id' => $randomWord->id,
            'question' => str_shuffle($randomWord->word),
            'hint' => $randomWord->hints,
            'score' => $randomWord->score
        ];

        return response()->json($question);
    }

    public function guess(Request $request) {
        $user = User::find(Auth::user()->id);
        $answer = $request->input('answer');
        $question_id = $request->input('question_id');

        $word = Word::find($question_id);

        if(strtolower($answer) == strtolower($word->word)) {
            $points = $word->score;
            $score = $user->score + $points;
            $status = true;

            $user->score = $score;
            $user->save();

            $data['message'] = 'Your answer is correct';
        } else {
            $points = -1;
            $score = $user->score + $points;
            $status = false;
            if($score<0) {
                $score = 0;
            }

            $user->score = $score;
            $user->save();

            $data['message'] = 'Your answer is wrong, the answer is ' . $word->word;
        }

        $history = History::create([
            'user_id' => $user->id,
            'word' => $word->word,
            'question' => $request->input('question'),
            'hints' => $word->hints,
            'answer' => $answer,
            'status' => $status,
            'points' => $points
        ]);
        $data['data'] = $user;
        return response()->json($data);
    }

    public function myHistory() {
        $history = History::with('user')->where('user_id',Auth::user()->id)->get();

        return $history;
    }

    public function userHistory(Request $request, $userid) {
        if(!$request->user()->admin) {
            return response('Unauthorized',401);
        }
        $history = History::with('user')->where('user_id',$userid)->get();

        return $history;
    }
}
