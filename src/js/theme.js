import { docReady } from './utils';
import swiperInit from './swiper';
import countupInit from './countup';
// import navbarInit from './navbar';
import detectorInit from './detector';


/* -------------------------------------------------------------------------- */
/*                            Theme Initialization                            */
/* -------------------------------------------------------------------------- */
docReady(detectorInit);
docReady(countupInit);
// docReady(navbarInit);
docReady(swiperInit);
