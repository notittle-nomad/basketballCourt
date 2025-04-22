const ball = document.querySelector('#ball');
const court = document.querySelector('#court');
const teamAScoreElement = document.querySelector('.team-a-score');
const teamBScoreElement = document.querySelector('.team-b-score');
const notification = document.querySelector('#notification');

const courtLeft = court.getBoundingClientRect().left;
const courtTop = court.getBoundingClientRect().top;

const scoringZoneSize = 15;

const teamAScoringZone = {
  left: 0,
  top: 155,
};

const teamBScoringZone = {
  left: 585,
  top: 155,
};

let teamAScore = 0;
let teamBScore = 0;

court.addEventListener('click', moveBall);

court.addEventListener('goalScored', (e) => {
  console.log(`${e.detail.team} scored a goal!`);
});

function moveBall(event) {
  const clickLeft = event.clientX;
  const clickTop = event.clientY;

  const leftCoordinate = Math.round(clickLeft - courtLeft);
  const topCoordinate = Math.round(clickTop - courtTop);

  const ballOffset = 20; 

  ball.style.left = `${leftCoordinate - ballOffset}px`;
  ball.style.top = `${topCoordinate - ballOffset}px`;

  if (
    leftCoordinate >= teamAScoringZone.left &&
    leftCoordinate <= teamAScoringZone.left + scoringZoneSize &&
    topCoordinate >= teamAScoringZone.top &&
    topCoordinate <= teamAScoringZone.top + scoringZoneSize
  ) {
    teamAScore++;
    teamAScoreElement.innerText = `Team A: ${teamAScore}`;
    dispatchGoalEvent('Team A');
    showNotification('Team A scored!');
    return;
  }

  if (
    leftCoordinate >= teamBScoringZone.left &&
    leftCoordinate <= teamBScoringZone.left + scoringZoneSize &&
    topCoordinate >= teamBScoringZone.top &&
    topCoordinate <= teamBScoringZone.top + scoringZoneSize
  ) {
    teamBScore++;
    teamBScoreElement.innerText = `Team B: ${teamBScore}`;
    dispatchGoalEvent('Team B');
    showNotification('Team B scored!');
    return;
  }

  showNotification('Missed!');
}

function dispatchGoalEvent(team) {
  const goalEvent = new CustomEvent('goalScored', {
    detail: { team },
  });
  court.dispatchEvent(goalEvent);
}

function showNotification(message) {
  notification.innerText = message;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}