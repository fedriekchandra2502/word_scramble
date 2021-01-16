<template>
    <div class="backdrop">
        <div class="modals">
            <button @click="playAgain">Play Again</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        playAgain() {
            this.$emit('playAgain');
        }
    }
}
</script>

<style scoped>
  .modals {
    width: auto;
    display: inline-block;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
  }
  .backdrop {
    top: 0;
    position: absolute;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    display: block;
  }
  button {
    border: none;
    border-radius: 10px;
    font-size: 30px;
    padding: 10px 20px;
    cursor: pointer;
    background: #53BDFF;
    color: white;
    transition: .3s;
    text-shadow: 1px 2px 0 #53BDFF;
    font-family: "Londrina Solid";
  }
</style>
