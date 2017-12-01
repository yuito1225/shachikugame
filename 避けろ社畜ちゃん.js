  'use strict';
    var context;
    
    var image = new Image(); 
    image.src = 'shachiku.png';
    var yoko = 270;
    var tate = 220;
    var move = 0;
    
    var enemyImage = new Image();
    enemyImage.src = 'enemy.png';
    var enemyYoko = 0;
    var enemyTate = 330;
    var enemyMove = 5;
    var gameover = 0;
    
    function checkHit(){
      var sx1 = yoko;
      var sx2 = yoko + 100;
      var ex1 = enemyYoko;
      var ex2 = enemyYoko + 43;
      var ashi = tate + 140;
    
      if( sx1 < ex2 && ex1 < sx2 ){
        if( ashi > 330 ){
          gameover = 1;
        }
      }
    }
    
    function fireEnemy(){
      var rand = Math.floor(Math.random() * 2);
      if( rand == 1 ){
         enemyYoko = -43;
         enemyMove = 5;
      }else{
        enemyYoko = 640;
        enemyMove = -5;
      }
    }
    
    function moveShachiku(){
      if( tate < 100 ){
        move = 4;
      }
      tate = tate + move;
      if( tate > 220  ){
        tate = 220;
        move = 0;
      }
    }
    
    function start(){
      var canvas = document.getElementById('canvas');
      context = canvas.getContext('2d');
      canvas.addEventListener('click', function(e){
        if( move == 0){
          move = -4;
        }
      });
      loop();
    }
    
    function loop(){
      moveShachiku();
    
      if( enemyMove == 0 ){
        fireEnemy();
      }
      enemyYoko = enemyYoko + enemyMove;
      if( enemyYoko < -43 || enemyYoko > 640 ){
        enemyMove = 0;
      }
      context.clearRect(0, 0, 640, 360);
      context.drawImage(image, yoko, tate);
      context.drawImage(enemyImage, enemyYoko, enemyTate);
      checkHit();
    
      if( gameover == 1 ){
        context.fillText('ゲームオーバー！', 50, 100);
      }else{
        window.requestAnimationFrame(loop);
      }
    }