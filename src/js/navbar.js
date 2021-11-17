/* eslint-disable */
/*-----------------------------------------------
|       Navbar Init
-----------------------------------------------*/


const navbarInit = () => {

  const Selector = {
    SIDEBAR_CLOSE: "[data-sidebar-close='sidebar-close']",
    BASE_CONTENT: "[data-base-content='home'],[data-base-content='nav']",
    PAGE: '.page',
    GALLERY_SWIPER: '.gallerySwiper',
    PAGE_LINK: "[data-sidebar-link='page-link']",
    PORTFOLIO_GALLERY: "#portfolio-gallery"
  };

  const ClassName = {
    TRANSITION_NONE: 'transition-none',
    PAGE: 'page',
    DISPLAY_NONE: 'd-none'
  };

  const events = {
    SHOW_OFFCANVAS: 'show.bs.offcanvas',
    SHOWN_OFFCANVAS: 'shown.bs.offcanvas',
    HIDE_OFFCANVAS: 'hide.bs.offcanvas',
    HIDDEN_OFFCANVAS: 'hidden.bs.offcanvas',
  }

  const closeBtnsList = Array.from(document.querySelectorAll(Selector.SIDEBAR_CLOSE));
  const baseContentElList = Array.from(document.querySelectorAll(Selector.BASE_CONTENT));
  const pageList = Array.from(document.querySelectorAll(Selector.PAGE));
  const portfolioGallery = document.querySelector(Selector.PORTFOLIO_GALLERY)
  const swipers = Array.from(document.querySelectorAll(Selector.GALLERY_SWIPER));

  const location = window.location
  const history = window.history


  const baseContentList = baseContentElList.map(
    el => window.bootstrap.Offcanvas.getInstance(el)
  );

  const showBaseContents = () => {
    baseContentList.forEach(item => {
      item.show();
    });
  }

  const hideBaseContents = () => {
    baseContentList.forEach(item => {
      item.hide();
    });
  }

  const addTransitions = () => {
    baseContentElList.forEach(el => {
      el.classList.remove('transition-none')
    })
  }

  const setBodyPointersEvent = (event) => {
    document.body.style.pointerEvents = event
  }


  const removeTransitions = () => {
    baseContentElList.forEach(el => {
      el.classList.add('transition-none')
    })
  }

  const showPage = (page) => {
    const duration = 500;
    page.classList.remove('d-none');
    page.style.opacity = 0;
    let last = +new Date();
    const fadeIn = () => {
      page.style.opacity = +page.style.opacity + (new Date() - last) / duration;
      last = +new Date();
      if (+page.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(fadeIn)) || setTimeout(fadeIn, 16);
      }
    };
    fadeIn();
  }

  const hidePage = (page) => {
    page.classList.add('d-none');
    page.style.opacity = 0;
  }

  const load = () => {
    showBaseContents();
    if (location.hash && location.hash !== '#!') {
      removeTransitions();
      const currentSection = document.querySelector(location.hash)
      const currentPage = currentSection.closest(Selector.PAGE)
      if (currentPage) {
        hideBaseContents()
        showPage(currentPage)
      }
      addTransitions()
    } else {
      addTransitions()
    }
    closeBtnsList.forEach(item => {
      item.addEventListener('click', e => {
        if (!e.target.closest(Selector.PAGE_LINK)) {
          showBaseContents()
          pageList.forEach(page => {
            if (!page.classList.contains(ClassName.DISPLAY_NONE)) {
              hidePage(page)
            }
          });
          location.replace('#');
          let newUrl = location.href;
          (newUrl.lastIndexOf('#') > -1) && (newUrl = newUrl.slice(0, -1));
          history.replaceState({}, '', newUrl);
        }
      });
    });
  }

  load();

  baseContentElList.forEach(item => {
    item.addEventListener(events.SHOW_OFFCANVAS, () => {
      setBodyPointersEvent('none')
    })
    item.addEventListener(events.HIDE_OFFCANVAS, () => {
      setBodyPointersEvent('none')
    })
    item.addEventListener(events.SHOWN_OFFCANVAS, () => {
      setBodyPointersEvent('all')
    })
    item.addEventListener(events.HIDDEN_OFFCANVAS, () => {
      setBodyPointersEvent('all')
    })
  })

  window.onhashchange = (e) => {
    const newHash = e.newURL.split('#')[1];
    if (newHash && newHash !== '!') {
      const currentPage = document.querySelector('#' + newHash);
      if (currentPage && currentPage.classList.contains(ClassName.PAGE)) {
        window.scrollTo(0,0);
        hideBaseContents()
        pageList.forEach(page => {
          hidePage(page)
        })
        showPage(currentPage)
      }
    }
    if (portfolioGallery) {
      window.Isotope.data(portfolioGallery).arrange()
    }

    swipers.forEach(el => {
      el.swiper.update();
    });
  }
};

export default navbarInit;
