<template>
<div class="container">
    <div class="main-body">
        <div class="row gutters-sm">

            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-column align-items-center text-center">
                            <img src="https://www.bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                            <div class="mt-3">
                                <h4>{{ profile.name }}</h4>
                                <p class="text-secondary mb-1">Email: {{ profile.email }} </p>
                                <p class="text-secondary mb-1">Score: {{ profile.score }} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-8">
                <p v-if="message" class="text-primary">{{ message }}</p>
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="d-flex flex-column align-items-center text-center">
                            <PlayButtonModal v-if="!playing" @playAgain="playAgain" />
                            Hint : {{ question.hint }} <br>
                            Score : {{ question.score }}
                            <div class="word">
                                {{ question.question }}
                            </div>
                            <form action="#" @submit.prevent="guess">
                                <input v-model="answer" type="text" :minlength="length" :maxlength="length">
                                <button type="submit">Guess</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import PlayButtonModal from '../components/PlayButtonModal'

export default {
    components: { PlayButtonModal },
    data() {
        return {
            message: '',
            playing: true,
            profile: {
                name: '',
                email: '',
                score: ''
            },
            question: {
                id: '',
                question: '',
                hint: '',
                score: '',
            },
            answer: '',
            length: 1
        }
    },
    methods: {
        guess() {
            var myAnswer = {
                question_id: this.question.id,
                question: this.question.question,
                answer: this.answer
            }
            axios.post('/api/guess', myAnswer).then(res => {
                this.profile.score = res.data.data.score;
                this.playing = false;
                this.message = res.data.message;
            });
        },
        playAgain() {
            axios.get('/api/generate_question').then(res => {
                this.question.id = res.data.id
                this.question.question = res.data.question
                this.question.hint = res.data.hint
                this.question.score = res.data.score
                this.length = res.data.question.length
                this.playing = true;
            })
        }
    },
    mounted() {
        axios.get('/api/generate_question').then(res => {
            this.question.id = res.data.id
            this.question.question = res.data.question
            this.question.hint = res.data.hint
            this.question.score = res.data.score
            this.length = res.data.question.length
        })
        axios.get('/api/user').then(res => {
            this.profile.name = res.data.name
            this.profile.email = res.data.email
            this.profile.score = res.data.score
        })
    }
}
</script>

<style scoped>
body{
    margin-top:20px;
    color: #1a202c;
    text-align: left;
    background-color: #e2e8f0;
}
.main-body {
    padding: 15px;
}
.card {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid rgba(0,0,0,.125);
    border-radius: .25rem;
}

.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1rem;
}

.gutters-sm {
    margin-right: -8px;
    margin-left: -8px;
}

.gutters-sm>.col, .gutters-sm>[class*=col-] {
    padding-right: 8px;
    padding-left: 8px;
}
.mb-3, .my-3 {
    margin-bottom: 1rem!important;
}

.bg-gray-300 {
    background-color: #e2e8f0;
}
.h-100 {
    height: 100%!important;
}
.shadow-none {
    box-shadow: none!important;
}
.word {
    display: inline-block;
    color: #53BDFF;
    margin: 0 10px;
    font-size: 50px;
    padding: 10px;
    transition: .5s;
    text-transform: uppercase;
    text-shadow: 1px 2px 0 #53BDFF;
    font-family: "Londrina Solid";
}
input[type="text"] {
    outline: none;
    padding: 10px;
    font-size: 30px;
    margin-bottom: 20px;
    margin-right: 5px;
    border: 1px solid #aaa;
    color: gray;
    font-family: "Londrina Solid";
}
button {
    border: none;
    font-size: 30px;
    padding: 10px 20px;
    cursor: pointer;
    background: #53BDFF;
    color: white;
    transition: .3s;
    margin: 10px 0;
    text-shadow: 1px 2px 0 #53BDFF;
    font-family: "Londrina Solid";
}
</style>
