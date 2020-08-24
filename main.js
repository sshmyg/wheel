(function () {
  const game = document.querySelector('.js-game');
  const wheel = document.querySelector('.js-wheel');
  const spinButtonEl = document.querySelector('.js-spin');

  const width = wheel.clientWidth;
  const radius = width / 2;
  const sectionsCount = 10;
  const degPerSection = 360 / sectionsCount;
  const spinToSectionIndex = 2;
  const rotationCountToFinish = 0; // aka speed
  const textTopPositionGap = 70;
  const start = -90;
  let deg = 0;

  game.classList.toggle('is-active');

  spinButtonEl.addEventListener('click', () => {
    spinButtonEl.disabled = true;
    deg =
      degPerSection * spinToSectionIndex + deg + rotationCountToFinish * 360;

    game.classList.toggle('is-spinning');
    game.classList.remove('is-stoped');

    wheel.style.transform = `rotate(${-deg}deg)`;
  });

  wheel.addEventListener('transitionend', () => {
    game.classList.toggle('is-spinning');
    game.classList.add('is-stoped');

    spinButtonEl.disabled = false;

    // Actualize degrees
    deg = deg % 360;

    wheel.style.transform = `rotate(${-deg}deg)`;

    fly();
  });

  Array.from(wheel.children).forEach((item, i) => {
    const rotate = degPerSection * i + start;
    const translate = `${radius - textTopPositionGap}px`;
    const rotateReverse = rotate * -1;
    const styleRotate = degPerSection * i;

    item.style.transform = `rotate(${rotate}deg) translate(${translate}) rotate(${rotateReverse}deg) rotate(${styleRotate}deg)`;
    item.style.marginLeft = `-${item.clientWidth / 2}px`;
    item.style.marginTop = `-${item.clientHeight / 2}px`;

    item.style.visibility = 'visible';
  });

  // Animation
  function fly() {
    const root = document.documentElement;
    const iconFrom = document.querySelector('.game__icon');
    const iconTo = document.querySelector('.js-icon');
    const iconFromClone = iconFrom.cloneNode();

    const iconFromPos = iconFrom.getBoundingClientRect();
    const iconToPos = iconTo.getBoundingClientRect();

    root.style.setProperty('--toTop', `${iconToPos.top}px`);
    root.style.setProperty('--toLeft', `${iconToPos.left}px`);
    root.style.setProperty('--toWidth', `${iconToPos.width}px`);
    root.style.setProperty('--toHeight', `${iconToPos.height}px`);

    iconFromClone.style.position = 'fixed';
    iconFromClone.style.top = `${iconFromPos.top}px`;
    iconFromClone.style.left = `${iconFromPos.left}px`;
    iconFromClone.style.width = `${iconFromPos.width}px`;
    iconFromClone.style.height = `${iconFromPos.height}px`;

    iconFrom.style.display = 'none';

    document.body.appendChild(iconFromClone);

    const endHandler = () => {
      iconFromClone.parentElement.removeChild(iconFromClone);
      iconFromClone.removeEventListener('animationend', endHandler);
    };

    iconFromClone.addEventListener('animationend', endHandler);

    iconFromClone.classList.add('fly');
  }
})();
