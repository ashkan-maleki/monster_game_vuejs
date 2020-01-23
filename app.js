new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunnig: false,
        turns: [],
    },
    methods: {
        startGame: function () {
            this.gameIsRunnig = true;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.turns = [];
        },
        attack: function () {
            this.playerAttack(false);
            this.monsterAttack();
            this.checkWin();

        },
        specialAttack: function () {
            this.playerAttack(true);
            this.monsterAttack();
            this.checkWin();
        },
        heal: function () {
            this.playerHealth = Math.min(this.playerHealth + 10, 100);
            this.log(true, "player healed for " + 10);
            this.monsterAttack();
            this.checkWin();
        },
        giveUp: function () {
            this.gameIsRunnig = false;
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
        },
        log: function (isPlayer, text) {
            this.turns.unshift({
                isPlayer: isPlayer,
                text: text
            })
        },
        playerAttack: function (isSpecialAttack) {
            var damage = 0;
            if (isSpecialAttack) {
                damage = this.calculateDamage(10, 20);
            } else {
                damage = this.calculateDamage(3, 10);
            }
            this.monsterHealth -= damage;
            this.log(true, "player hit monster for " + damage);
        },
        monsterAttack: function () {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.log(false, "monster hit player for " + damage);
        },
    }
})