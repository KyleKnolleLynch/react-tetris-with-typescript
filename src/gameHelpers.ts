import { PLAYER } from './hooks/usePlayer'
import { STAGE } from './components/Stage/Stage'
import { STAGE_WIDTH, STAGE_HEIGHT } from './setup'
import { TETROMINOS } from './setup'

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']))

export const randomTetromino = () => {
  const tetrominos = [
    'I',
    'J',
    'L',
    'O',
    'S',
    'T',
    'Z',
  ] as (keyof typeof TETROMINOS)[]
  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)]
  console.log(randTetromino)
  return TETROMINOS[randTetromino]
}

export const isColliding = (
  player: PLAYER,
  stage: STAGE,
  { x: moveX, y: moveY }: { x: number; y: number }
) => {
  // Using for loops to be able to return (and break) , not possible with forEach
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. Check that we're on actual tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check that our move is inside the game area's height (y)
          // That we're not moving through the bottom of the grid
          !stage[y + player.pos.y + moveY] ||
          // 3. Check that out move is inside the game area's width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check that the cell we're moving to isn't set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            'clear'
        ) {
          return true
        }
      }
    }
  }

  // 5. If everything above is false
  return false
}
