'use strict';

{
  document.querySelector('ul').addEventListener('click', e => {
    if (e.target.nodeName === 'LI') {
      e.target.classList.toggle('done');
      console.log(e.target.nodeName);
    }
    console.log(e.target.nodeName);
  });
}