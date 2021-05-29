class Player{
    constructor(){
        this.score = 0 
        this.name = null
        this.index = null
        this.distance = 0
        this.rank = 0
    }

    getCount(){
        var playerCountRef = database.ref('playerCount')
        playerCountRef.on("value",function(data){
            playerCount = data.val();
        })
   }

   updateCount(data){
       database.ref('/').update({
           playerCount: data
       })
   }

   getHighestRank(){
    var highRankRef = database.ref('highestRank')
    highRankRef.on("value",function(data){
       this.rank = data.val();
    })
   }

    static updateHighestRank(rank){
    database.ref('/').update({
        highestRank: rank
    })
    }


   static getPlayerInfo(){
       database.ref('players').on("value", function(data){
        allPlayers = data.val();
       })
   }

   update(){
    var playerIndex = "players/player" + this.index
    database.ref(playerIndex).update({
        name:this.name,
        score:this.score,
        distance:this.distance
    })
   }


}
