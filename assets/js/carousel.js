class Carousel{
  constructor(params) {
    
    const settings = this._initConfig(params);
    
    this.container = document.querySelector(settings.containerID);
    this.slides = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlaying = settings.isPlaying;
    }

    _initConfig(params){
      const defaultSettings = {
        containerID: '#carousel',
        slideID: '.slide',
        interval: 2000,
        isPlaying: true
      }

      if(typeof params !== 'undefined'){
      defaultSettings.containerID = params.containerID || defaultSettings.containerID;
      defaultSettings.slideID = params.slideID || defaultSettings.slideID;
      defaultSettings.interval = params.interval || defaultSettings.interval;
      defaultSettings.isPlaying = params.isPlaying || defaultSettings.isPlaying;
      }
     
      return defaultSettings;
    }

    _initProps(){
      this.SLIDES_COUNT = this.slides.length;
      this.CODE_LEFT_ARROW = 'ArrowLeft';
      this.CODE_RIGHT_ARROW = 'ArrowRight';
      this.CODE_SPASE = 'Space';
      this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
      this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
      this.FA_PREV = '<i class="fas fa-angle-left"></i>';
      this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
      
      this.currentSlide = 0;
    }

    _initControls(){
      const controls = document.createElement('div');
      const PAUSE = `<span class="control control-pause" id="pause-btn">${this.FA_PAUSE}</span>`;
      const PREV = `<span class="control control-prev" id="prev-btn">${this.FA_PREV}</span>`;
      const NEXT = `<span class="control control-next" id="next-btn">${this.FA_NEXT}</span>`;

      controls.classList.add('controls')
      controls.innerHTML = PAUSE + PREV + NEXT;

      this.container.append(controls);

      this.pauseBtn = this.container.querySelector('#pause-btn');
      this.prevBtn = this.container.querySelector('#prev-btn');
      this.nextBtn = this.container.querySelector('#next-btn');
    }
    
    _initIndicators(){
      const indicators = document.createElement('div');

      indicators.classList.add('indicators');
      
      for(let i = 0, n = this.SLIDES_COUNT; i < n; i++){
        const indicator = document.createElement('div');

        indicator.classList.add('indicator');
        indicator.dataset.slideTo = `${i}`;
        if(i === 0){indicator.classList.add('active')}
        indicators.append(indicator);
      };
    
      this.container.append(indicators);
      this.indsContainer = this.container.querySelector('.indicators')
      this.indItems = this.container.querySelectorAll('.indicator');
    }

    _initListeners() {
      this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
      this.prevBtn.addEventListener('click', this.prev.bind(this));
      this.nextBtn.addEventListener('click', this.next.bind(this));
      this.indsContainer.addEventListener('click', this._indicate.bind(this));
      document.addEventListener('keydown', this._pressKey.bind(this));
    }

    _gotoNth(n) {
      this.slides[this.currentSlide].classList.toggle('active');
      this.indItems[this.currentSlide].classList.toggle('active');
      this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
      this.slides[this.currentSlide].classList.toggle('active');
      this.indItems[this.currentSlide].classList.toggle('active');
    }
              
    _gotoNext() {
      this._gotoNth(this.currentSlide + 1);
    }
            
    _gotoPrev() {
      this._gotoNth(this.currentSlide - 1);
    }
        
    _pause() {
      if(this.isPlaying){
      clearInterval(this.timerID);
      this.pauseBtn.innerHTML = this.FA_PLAY;
      this.isPlaying = false;
    }
  }
                
    _play() {
      this.timerID = setInterval(() => this._gotoNext(), this.interval);
      this.pauseBtn.innerHTML = this.FA_PAUSE;
      this.isPlaying = true;
    }
        
    _indicate (e) {
      this.target = e.target;
          
      if (this.target.classList.contains('indicator')){
      this._pause();
      this._gotoNth(+this.target.dataset.slideTo);
    };
  }
          
    _pressKey(e) {
      if(e.code === this.CODE_LEFT_ARROW) this.prev();
      if(e.code === this.CODE_RIGHT_ARROW) this.next();
      if(e.code === this.CODE_SPASE) this.pausePlay();
    }
              
    pausePlay() {
      this.isPlaying ? this._pause() : this._play();
    }
        
    next() {
      this._pause();
      this._gotoNext();
    }
              
    prev() {
      this._pause();
      this._gotoPrev();
    }

    init() {
      this._initProps();
      this._initControls();
      this._initIndicators();
      this._initListeners();

      this.timerID = setInterval( () => this._gotoNext(), this.interval); //or =>
      // this.timerID = setInterval(this.gotoNext.bind(this), this.interval);  - restabilirea contextului pentru setInterva, setTimeout
      }
};

export default Carousel;