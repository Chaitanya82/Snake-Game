var cvs = document.getElementById("board");
        var ctx = cvs.getContext("2d");
        ctx.fillStyle='rgb(46, 0, 0)';
        ctx.fillRect(0,0,400,400);
        
        var grid=16;
        var fruit = {
            x: 320,
            y:320,
        };
        var snake = {
            x:0,
            y:0,
            dx:16,
            dy:0,
            cells: [],
            maxlength: 3 //This is the default length of the snake
        };
        var score = 0;
        var speed = 2;
        var lastPaintTime = 0;
        document.getElementById('score').innerHTML=score;
        function getRandom(min, max){
            return Math.floor(Math.random()*(max-min))+min;
        }
        //loop for game
        function loop(ctime){
            window.requestAnimationFrame(loop);
            if((ctime-lastPaintTime)/1000 < 1/speed){
                return;
            }
            
            lastPaintTime=ctime;
            console.log(ctime);

            ctx.clearRect(0,0,cvs.width,cvs.height);
            ctx.fillStyle='#500000';
            ctx.fillRect(0,0,400,400);
           

            snake.x+=snake.dx;
            snake.y+=snake.dy;

            // wrap snake position horizontally on edge of screen
            if (snake.x < 0) {
                snake.x = cvs.width - grid;
            }
            else if (snake.x >= cvs.width) {
                snake.x = 0;
            }
  
            // wrap snake position vertically on edge of screen
            if (snake.y < 0) {
                snake.y = cvs.height - grid;
            }
            else if (snake.y >= cvs.height) {
                snake.y = 0;
            }
            snake.cells.unshift({x: snake.x, y: snake.y});
            if(snake.cells.length > snake.maxlength){
                snake.cells.pop();
            }
            
           
            ctx.fillStyle = '#100000';
            ctx.fillRect(fruit.x, fruit.y, grid-1, grid-1);
            ctx.fillStyle = 'red';
            snake.cells.forEach(function(cell, index){
                ctx.fillRect(cell.x, cell.y, grid-1, grid-1);

                if(cell.x===fruit.x && cell.y===fruit.y){
                    snake.maxlength++;
                    score+=10;
                    document.getElementById("score").innerHTML = score;
                    fruit.x=getRandom(0, 25)*grid;
                    fruit.y=getRandom(0, 25)*grid;
                }

                for(var i = index+1; i<snake.cells.length; i++){
                    if(cell.x===snake.cells[i].x && cell.y===snake.cells[i].y){
                        snake.x=0;
                        snake.y=0;
                        snake.cells = [];
                        snake.maxlength=3;
                        snake.dx=grid;
                        snake.dy=0;

                        fruit.x = getRandom(0, 25) * grid;
                        fruit.y = getRandom(0, 25) * grid;
                        score = 0;
                        document.getElementById('score').innerHTML = score;
                }
            }});
            
            document.addEventListener('keydown', function(e) {
                // left arrow key
                if (e.which === 37 && snake.dx === 0) {
                    snake.dx = -grid;
                    snake.dy = 0;
                }
                // up arrow key
                else if (e.which === 38 && snake.dy === 0) {
                    snake.dy = -grid;
                    snake.dx = 0;
                }
                // right arrow key
                else if (e.which === 39 && snake.dx === 0) {
                    snake.dx = grid;
                    snake.dy = 0;
                }
                // down arrow key
                else if (e.which === 40 && snake.dy === 0) {
                    snake.dy = grid;
                    snake.dx = 0;
                }
                });
            
        }
        window.requestAnimationFrame(loop);