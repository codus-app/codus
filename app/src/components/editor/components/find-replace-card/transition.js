import { delay } from '../../../../helpers';

export default {
  async findReplaceEnter(el, done) {
    // Initial styles
    Object.assign(el.style, {
      height: 0,
      opacity: 0,
    });
    // Reflow
    (() => {})(el.offsetHeight);
    // Hey!
    Object.assign(el.style, {
      transition: 'height .3s, opacity .25s',
      height: `${el.firstElementChild.getBoundingClientRect().height + parseFloat(getComputedStyle(el.firstElementChild).marginBottom)}px`,
      opacity: 1,
    });
    await delay(350);
    el.style.height = '';
    done();
  },

  async findReplaceLeave(el, done) {
    // Initial styles
    Object.assign(el.style, {
      height: `${el.getBoundingClientRect().height}px`,
      opacity: 1,
    });
    // Reflow
    (() => {})(el.offsetHeight);
    // Bye
    Object.assign(el.style, {
      transition: 'height .25s, opacity .15s',
      height: 0,
      opacity: 0,
    });

    await delay(350);
    done();
  },
};
