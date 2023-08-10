// ------------------- 中介者模式 -----------------------
(function () {
  function Player(name, color) {
    this.partners = [];
    this.enemies = [];
    this.state = 'live';
    this.name = name;
    this.team_color = color;
  }
  Player.prototype.win = function () {
    console.log('winner:', this.name)
  }
  Player.prototype.lose = function () {
    console.log('loser:', this.name)
  }
  Player.prototype.die = function () {
    let all_died = true
    this.state = 'died'
    for (const player of this.partners) {
      if (player.state !== 'died') {
        all_died = false
        break
      }
    }
    if (all_died) {
      console.log('全死了吗')
      this.lose()
      for (const player of this.partners) {
        player.lose()
      }
      for (const emeny of this.enemies) {
        emeny.win()
      }
    }
  }
  const players = []
  const playerFactory = function(name, color) {
    const new_player = new Player(name, color)
    for (let i = 0; i < players.length; i++) {
      const player = players[i]
      if (new_player.team_color === player.team_color) {
        player.partners.push(new_player)
        new_player.partners.push(player)
      } else {
        player.enemies.push(new_player)
        new_player.enemies.push(player)
      }
    }
    players.push(new_player)
    return new_player
  }
  const p1 = playerFactory('小王', 'red')
  const p2 = playerFactory('小李', 'red')
  const p3 = playerFactory('小张', 'red')

  const q1 = playerFactory('王一', 'blue')
  const q2 = playerFactory('王二', 'blue')
  const q3 = playerFactory('王三', 'blue')
  p1.die()
  q1.die()
  q2.die()
  q3.die()
})();

// --------------------- 使用中介者模式 改写 ----------------------
(function () {
  // 中介者
  const playerDirector = (function () {
    const players = {}
    const operators = {
      addPlayer: function(player) {
        const teamColor = player.teamColor
        players[teamColor] = players[teamColor] || []
        players[teamColor].push(player)
      },
      removePlayer: function(player) {
        const teamList = players[player.teamColor] || []
        for (let i = 0; i < teamList.length; i++) {
          if (teamList[i] === player) {
            teamList.splice(i, 1)
            break
          }
        }
        players[player.teamColor] = teamList
      },
      changeTeam: function(player, newTeamColor) {
        this.removePlayer(player)
        player.teamColor = newTeamColor
        this.addPlayer(player)
      }
    };
  })()
  function Player(name, teamColor) {
    this.name = name
    this.teamColor = teamColor
    this.state = 'alive'
  }
  Player.prototype.win = function () {
    console.log(`${this.name} - win`)
  }
  Player.prototype.lose = function () {
    console.log(`${this.name} - lose`)
  }
  Player.prototype.die = function () {
    this.state = 'died'
    playDirector.receiveMessage('playerDied', this)
  }
  Player.prototype.remove = function() {
    playerDirector.receiveMessage('removePlayer', this)
  }
  Player.prototype.changeTeam = function() {
    playerDirector.receiveMessage('changeTeam', this)
  }
  function playerFactory(name, teamColor) {
    const player = new Player(name, teamColor)
    playerDirector.receiveMessage('addPlayer', player)
    return player
  }
})();