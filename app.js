new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunnig: false,
    },
    methods: {
        startGame: function () {
            this.gameIsRunnig = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
        },
        attack: function () {
            this.monsterHealth -= this.calculateDamage(3, 10);
            this.playerHealth -= this.calculateDamage(5, 12);
            this.checkWin();

        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm("you won. play again?")) {
                    this.startGame();
                } else {
                    this.gameIsRunnig = false;
                }
            } else if (this.playerHealth <= 0) {
                if (confirm("you lost. play again?")) {
                    this.startGame();
                } else {
                    this.gameIsRunnig = false;
                }
            }
        }
    }
})