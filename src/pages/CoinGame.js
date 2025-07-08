import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const CoinGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [coins, setCoins] = useState([]);
  const [player, setPlayer] = useState({ x: 50, y: 50, size: 20 });
  const [keys, setKeys] = useState({});
  const [gameStarted, setGameStarted] = useState(false);

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const COIN_SIZE = 15;
  const BASE_PLAYER_SPEED = 15;
  const COIN_COUNT = 10;

  // Calculate player speed based on score
  const playerSpeed = BASE_PLAYER_SPEED + Math.floor(score / 30);

  // Generate random coins
  const generateCoins = useCallback(() => {
    const newCoins = [];
    for (let i = 0; i < COIN_COUNT; i++) {
      newCoins.push({
        x: Math.random() * (CANVAS_WIDTH - COIN_SIZE),
        y: Math.random() * (CANVAS_HEIGHT - COIN_SIZE),
        collected: false,
        id: i
      });
    }
    setCoins(newCoins);
  }, []);

  // Initialize game
  const startGame = useCallback(() => {
    setScore(0);
    setGameOver(false);
    setPlayer({ x: 50, y: 50, size: 20 });
    generateCoins();
    setGameStarted(true);
  }, [generateCoins]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: true }));
    };

    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = () => {
      setPlayer(prevPlayer => {
        let newX = prevPlayer.x;
        let newY = prevPlayer.y;

        // Handle movement
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
          newX = Math.max(0, prevPlayer.x - playerSpeed);
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
          newX = Math.min(CANVAS_WIDTH - prevPlayer.size, prevPlayer.x + playerSpeed);
        }
        if (keys['ArrowUp'] || keys['w'] || keys['W']) {
          newY = Math.max(0, prevPlayer.y - playerSpeed);
        }
        if (keys['ArrowDown'] || keys['s'] || keys['S']) {
          newY = Math.min(CANVAS_HEIGHT - prevPlayer.size, prevPlayer.y + playerSpeed);
        }

        return { ...prevPlayer, x: newX, y: newY };
      });

      // Check coin collisions
      setCoins(prevCoins => {
        const updatedCoins = prevCoins.map(coin => {
          if (!coin.collected) {
            const playerCenterX = player.x + player.size / 2;
            const playerCenterY = player.y + player.size / 2;
            const coinCenterX = coin.x + COIN_SIZE / 2;
            const coinCenterY = coin.y + COIN_SIZE / 2;

            const distance = Math.sqrt(
              Math.pow(playerCenterX - coinCenterX, 2) + 
              Math.pow(playerCenterY - coinCenterY, 2)
            );

            if (distance < (player.size / 2 + COIN_SIZE / 2)) {
              setScore(prev => prev + 10);
              return { ...coin, collected: true };
            }
          }
          return coin;
        });

        // Check if all coins collected
        const collectedCount = updatedCoins.filter(coin => coin.collected).length;
        if (collectedCount === COIN_COUNT) {
          setGameOver(true);
        }

        return updatedCoins;
      });
    };

    const interval = setInterval(gameLoop, 16); // ~60 FPS
    return () => clearInterval(interval);
  }, [keys, player, gameStarted, playerSpeed]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw grid pattern
    ctx.strokeStyle = '#16213e';
    ctx.lineWidth = 1;
    for (let i = 0; i < CANVAS_WIDTH; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let i = 0; i < CANVAS_HEIGHT; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_WIDTH, i);
      ctx.stroke();
    }

    // Draw coins
    coins.forEach(coin => {
      if (!coin.collected) {
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(coin.x + COIN_SIZE / 2, coin.y + COIN_SIZE / 2, COIN_SIZE / 2, 0, 2 * Math.PI);
        ctx.fill();
        
        // Coin shine effect
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(coin.x + COIN_SIZE / 2 - 2, coin.y + COIN_SIZE / 2 - 2, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    // Draw player
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    // Player eyes
    ctx.fillStyle = '#fff';
    ctx.fillRect(player.x + 4, player.y + 4, 4, 4);
    ctx.fillRect(player.x + 12, player.y + 4, 4, 4);
    
    // Player mouth
    ctx.fillStyle = '#fff';
    ctx.fillRect(player.x + 6, player.y + 12, 8, 2);

  }, [player, coins]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🪙 Coin Collector
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Use arrow keys or WASD to move and collect all the coins!
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Game Stats */}
          <div className="lg:w-64 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Game Stats
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Score:</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {score}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Coins Left:</span>
                  <span className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                    {coins.filter(coin => !coin.collected).length}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Progress:</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {Math.round((score / (COIN_COUNT * 10)) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Speed:</span>
                  <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
                    {playerSpeed}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Controls
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div>🔼 Arrow Up / W</div>
                <div>🔽 Arrow Down / S</div>
                <div>◀️ Arrow Left / A</div>
                <div>▶️ Arrow Right / D</div>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={startGame}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
            >
              {gameStarted ? 'Restart Game' : 'Start Game'}
            </motion.button>
          </div>

          {/* Game Canvas */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
            >
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="border-2 border-gray-300 dark:border-gray-600 rounded-lg mx-auto block"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              
              {gameOver && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-xl">
                    <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                      🎉 Congratulations!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      You collected all {COIN_COUNT} coins!
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Final Score: {score}
                    </p>
                    <button
                      onClick={startGame}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Play Again
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinGame; 