const fill = [
  'rgba(255, 0, 0, 1)',
  'rgba(255, 127, 0, 1)',
  'rgba(255, 255, 0, 1)',
  'rgba(0, 255, 0, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(75, 0, 130, 1)',
  'rgba(148, 0, 211, 1)',
];

let tempPulsation = -1;

export function pulsation() {
  if (tempPulsation === 6) {
    tempPulsation = -1;
  }

  const element = document.querySelector('.icon-type');
  element.style.fill = `${fill[tempPulsation]}`;
  tempPulsation++;
}

let tempChange = 0;

export const change = () => {
  if (tempChange === 6) {
    tempChange = -1;
  }
  tempChange++;
  return fill[tempChange];
};
