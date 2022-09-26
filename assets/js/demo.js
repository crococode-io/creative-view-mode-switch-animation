/**
 * demo.js
 * https://www.instagram.com/croco.code/
 * https://www.tiktok.com/@croco.code 
 * https://github.com/crococode-io 
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2022, CROCO.CODE
 * https://www.instagram.com/croco.code/
 * https://www.tiktok.com/@croco.code 
 * https://github.com/crococode-io 
 */

  // masonry ====================
  const $grid = new Masonry('.grid', {
    itemSelector: '.masonry__item'
  });
  
  // hide loader
  setTimeout(() => {
    document.querySelector('.loader').classList.add('is-loaded');
  }, 750);

  // find each first, second and third item in grid and give them special classes
  var classes = ['top', 'middle', 'bottom'];
  document.querySelectorAll('.masonry__item').forEach(function(element, index) {
    element.classList.add(classes[index % 3]);
  });


  // call this function if "LIST" icon clicked
  function listLayout(element) {

    // init vars
    var masterTimeline = new TimelineMax({ paused: true }),
        topTimeline = new TimelineMax(),
        middleTimeline = new TimelineMax(),
        bottomTimeline = new TimelineMax(),
        topPosition = parseInt(element.offsetTop),
        topPositionSecond = topPosition+80,
        topPositionThird = topPosition+160;
    
    // update position: top for each item in grid 
    if( element.classList.contains('top') ) { topTimeline.to(element, 1.05, { top: topPosition, ease: Expo.easeInOut }); }
    if( element.classList.contains('middle') ) { middleTimeline.to(element, 1.05, { top: topPositionSecond, ease: Expo.easeInOut }); }
    if( element.classList.contains('bottom') ) { bottomTimeline.to(element, 1.05, { top: topPositionThird, ease: Expo.easeInOut }); }
    
    // populate master timeline ...
    masterTimeline
      .to(element.querySelector('.date'), 0.35, { autoAlpha: 0, ease: Expo.easeInOut })
      .to(element.querySelector('.tags'), 0.35, { autoAlpha: 0, ease: Expo.easeInOut }, '-=0.35')
      .to(element, 0.35, { height: 80, ease: Expo.easeInOut })
      .add(topTimeline, -0.35)
      .add(middleTimeline, -0.35)
      .add(bottomTimeline, -0.35)
      .to(element, 0.35, { width: '100%', left: 0, ease: Expo.easeInOut })
      .to(element.querySelector('.date'), 0.35, { autoAlpha: 1, ease: Expo.easeInOut })
      .to(element.querySelector('.tags'), 0.35, { y: -24, autoAlpha: 1, ease: Expo.easeInOut }, '-=0.35');
      
    // ... and play it
    masterTimeline.play();
  }


  // call this function if "GRID" icon clicked
  function gridLayout(element){

    // init vars
    var masterTimeline = new TimelineMax({ paused: true }),
        topTimeline = new TimelineMax(),
        middleTimeline = new TimelineMax(),
        bottomTimeline = new TimelineMax(),
        topPosition = parseInt(element.offsetTop),
        topPositionSecond = topPosition-80,
        topPositionThird = topPosition-160;
      
    // update position: left ...  
    if( element.classList.contains('top') ) { topTimeline.to(element, 1.05, { left: 0, ease: Expo.easeInOut }); }
    if( element.classList.contains('middle') ) { middleTimeline.to(element, 1.05, { left: '33.3333%', ease: Expo.easeInOut }); }
    if( element.classList.contains('bottom') ) { bottomTimeline.to(element, 1.05, { left: '66.6666%', ease: Expo.easeInOut }); }
    // .. then update position: top ( to prevent overlapping )
    if( element.classList.contains('top') ) { topTimeline.to(element, 0.7, { top: topPosition, ease: Expo.easeInOut }); }
    if( element.classList.contains('middle') ) { middleTimeline.to(element, 0.7, { top: topPositionSecond, ease: Expo.easeInOut }); }
    if( element.classList.contains('bottom') ) { bottomTimeline.to(element, 0.7, { top: topPositionThird, ease: Expo.easeInOut }); }
    
    // populate master timeline ...
    masterTimeline
      .to(element.querySelector('.date'), 0.35, { autoAlpha: 0, ease: Expo.easeInOut })
      .to(element.querySelector('.tags'), 0.35, { autoAlpha: 0, ease: Expo.easeInOut }, '-=0.35')
      .to(element, 0.7, { width: '33.3333%', ease: Expo.easeInOut })
      .add(topTimeline, -0.35)
      .add(middleTimeline, -0.35)
      .add(bottomTimeline, -0.35)
      .to(element, 0.35, { height: 240, ease: Expo.easeInOut }, '-=0.5')
      .to(element.querySelector('.date'), 0.35, { autoAlpha: 1, ease: Expo.easeInOut })
      .to(element.querySelector('.tags'), 0.35, { y: 0, autoAlpha: 1, ease: Expo.easeInOut }, '-=0.35');
    // ... and play it
    masterTimeline.play();
  }


  // grid to list trigger
  document.querySelector('.list-layout').addEventListener('click', function() {
    // add/remove active class
    document.querySelector('.grid-layout').classList.remove('active');
    document.querySelector('.list-layout').classList.add('active');
    // call list function
    const elements = document.querySelectorAll('.masonry__item');
    for (let i=0; i < elements.length; i++) {
      listLayout(elements[i]);
    }
  });


  // list to grid trigger
  document.querySelector('.grid-layout').addEventListener('click', function() {
    // add/remove active class
    document.querySelector('.list-layout').classList.remove('active');
    document.querySelector('.grid-layout').classList.add('active');
    // call list function
    const elements = document.querySelectorAll('.masonry__item');
    for (let i=0; i < elements.length; i++) {
      gridLayout(elements[i]);
    }
  });


  // EXTRAS - CLICK ON ITEM TO SHOW/HIDE TAGS 
  const tags = document.querySelectorAll('.tags');
  for (let i=0; i < tags.length; i++) {
    tags[i].querySelector('li:nth-child(1) a').classList.add('active');
    tags[i].querySelector('li:nth-child(2) a').classList.add('active');
  };