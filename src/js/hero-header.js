// import utils from './utils';

/* -------------------------------------------------------------------------- */
/*                                  Hero header                                  */
/* -------------------------------------------------------------------------- */

const heroHeaderInit = () => {
  const topNav = document.getElementById('topNav');
  const heroCarouselContainer = document.getElementById('heroCarouselContainer');

  const setCarouselContainerMargin = ()=>{
    heroCarouselContainer.style.marginLeft = getComputedStyle(topNav).marginLeft;
  }
  setCarouselContainerMargin()
  window.addEventListener('resize', () => {
    setCarouselContainerMargin()
  })
};

export default heroHeaderInit;