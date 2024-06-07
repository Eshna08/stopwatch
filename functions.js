const timer = document.getElementById('timer');
    const startBtn = document.getElementById('start');
    const pauseBtn = document.getElementById('pause');
    const resetBtn = document.getElementById('reset');
    const lapBtn = document.getElementById('lap');
    const lapList = document.getElementById('lap-list');

    let startTime;
    let elapsedTime = 0;
    let intervalId;
    let laps = [];

    function formatTime(time) {
      const hours = Math.floor(time / 3600000);
      const minutes = Math.floor((time % 3600000) / 60000);
      const seconds = Math.floor((time % 60000) / 1000);
      const milliseconds = Math.floor((time % 1000) / 10);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
    }

    function updateTimer() {
      const currentTime = Date.now();
      const timeDiff = currentTime - startTime;
      timer.textContent = formatTime(elapsedTime + timeDiff);
    }

    startBtn.addEventListener('click', () => {
      if (!intervalId) {
        startTime = Date.now();
        intervalId = setInterval(updateTimer, 10);
      }
    });

    pauseBtn.addEventListener('click', () => {
      if (intervalId) {
        clearInterval(intervalId);
        elapsedTime += Date.now() - startTime;
        intervalId = null;
      }
    });

    resetBtn.addEventListener('click', () => {
      clearInterval(intervalId);
      intervalId = null;
      elapsedTime = 0;
      timer.textContent = '00:00:00:00';
      laps = [];
      lapList.innerHTML = '';
    });

    lapBtn.addEventListener('click', () => {
      if (intervalId) {
        const currentTime = Date.now();
        const lapTime = elapsedTime + (currentTime - startTime);
        const listItem = document.createElement('li');
        listItem.textContent = formatTime(lapTime);
        lapList.appendChild(listItem);
        laps.push(lapTime);
      }
    });