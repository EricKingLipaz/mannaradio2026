/**
 * Modern HTML5 Video Player with Advanced Controls
 * Features: Custom UI, Quality Selector, Speed Control, PiP, Keyboard Shortcuts
 */

class ModernPlayer {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.video = this.container.querySelector('video');
        if (!this.video) return;

        this.isPlaying = false;
        this.isMuted = false;
        this.currentQuality = 'auto';
        this.playbackSpeed = 1;

        this.init();
    }

    init() {
        this.createControls();
        this.attachEventListeners();
        this.setupKeyboardShortcuts();
        this.setupMediaSession();
    }

    createControls() {
        const controlsHTML = `
            <div class="modern-player-controls">
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-filled"></div>
                        <div class="progress-buffered"></div>
                        <div class="progress-handle"></div>
                    </div>
                    <div class="time-tooltip">00:00</div>
                </div>
                
                <div class="controls-bottom">
                    <div class="controls-left">
                        <button class="control-btn play-btn" title="Play (Space)">
                            <i class="material-icons">play_arrow</i>
                        </button>
                        <button class="control-btn skip-back" title="Rewind 10s (←)">
                            <i class="material-icons">replay_10</i>
                        </button>
                        <button class="control-btn skip-forward" title="Forward 10s (→)">
                            <i class="material-icons">forward_10</i>
                        </button>
                        <div class="volume-control">
                            <button class="control-btn volume-btn" title="Mute (M)">
                                <i class="material-icons">volume_up</i>
                            </button>
                            <input type="range" class="volume-slider" min="0" max="100" value="100">
                        </div>
                        <div class="time-display">
                            <span class="current-time">00:00</span> / 
                            <span class="duration">00:00</span>
                        </div>
                    </div>
                    
                    <div class="controls-right">
                        <div class="speed-control">
                            <button class="control-btn speed-btn" title="Playback Speed">
                                <span class="speed-value">1x</span>
                            </button>
                            <div class="speed-menu">
                                <div class="speed-option" data-speed="0.5">0.5x</div>
                                <div class="speed-option" data-speed="0.75">0.75x</div>
                                <div class="speed-option active" data-speed="1">1x</div>
                                <div class="speed-option" data-speed="1.25">1.25x</div>
                                <div class="speed-option" data-speed="1.5">1.5x</div>
                                <div class="speed-option" data-speed="2">2x</div>
                            </div>
                        </div>
                        <div class="quality-control">
                            <button class="control-btn quality-btn" title="Quality">
                                <i class="material-icons">settings</i>
                            </button>
                            <div class="quality-menu">
                                <div class="quality-option active" data-quality="auto">Auto</div>
                                <div class="quality-option" data-quality="1080">1080p</div>
                                <div class="quality-option" data-quality="720">720p</div>
                                <div class="quality-option" data-quality="480">480p</div>
                                <div class="quality-option" data-quality="360">360p</div>
                            </div>
                        </div>
                        <button class="control-btn pip-btn" title="Picture-in-Picture (P)">
                            <i class="material-icons">picture_in_picture_alt</i>
                        </button>
                        <button class="control-btn fullscreen-btn" title="Fullscreen (F)">
                            <i class="material-icons">fullscreen</i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="player-loading">
                <div class="spinner"></div>
            </div>
            
            <div class="player-overlay">
                <button class="big-play-btn">
                    <i class="material-icons">play_arrow</i>
                </button>
            </div>
        `;

        this.container.insertAdjacentHTML('beforeend', controlsHTML);
        this.cacheElements();
    }

    cacheElements() {
        this.playBtn = this.container.querySelector('.play-btn');
        this.bigPlayBtn = this.container.querySelector('.big-play-btn');
        this.skipBackBtn = this.container.querySelector('.skip-back');
        this.skipForwardBtn = this.container.querySelector('.skip-forward');
        this.volumeBtn = this.container.querySelector('.volume-btn');
        this.volumeSlider = this.container.querySelector('.volume-slider');
        this.progressBar = this.container.querySelector('.progress-bar');
        this.progressFilled = this.container.querySelector('.progress-filled');
        this.progressBuffered = this.container.querySelector('.progress-buffered');
        this.currentTimeEl = this.container.querySelector('.current-time');
        this.durationEl = this.container.querySelector('.duration');
        this.speedBtn = this.container.querySelector('.speed-btn');
        this.speedMenu = this.container.querySelector('.speed-menu');
        this.speedOptions = this.container.querySelectorAll('.speed-option');
        this.qualityBtn = this.container.querySelector('.quality-btn');
        this.qualityMenu = this.container.querySelector('.quality-menu');
        this.qualityOptions = this.container.querySelectorAll('.quality-option');
        this.pipBtn = this.container.querySelector('.pip-btn');
        this.fullscreenBtn = this.container.querySelector('.fullscreen-btn');
        this.playerLoading = this.container.querySelector('.player-loading');
        this.playerOverlay = this.container.querySelector('.player-overlay');
        this.timeTooltip = this.container.querySelector('.time-tooltip');
    }

    attachEventListeners() {
        // Play/Pause
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.bigPlayBtn.addEventListener('click', () => this.togglePlay());
        this.video.addEventListener('click', () => this.togglePlay());
        this.video.addEventListener('dblclick', () => this.toggleFullscreen());

        // Skip
        this.skipBackBtn.addEventListener('click', () => this.skip(-10));
        this.skipForwardBtn.addEventListener('click', () => this.skip(10));

        // Volume
        this.volumeBtn.addEventListener('click', () => this.toggleMute());
        this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));

        // Progress
        this.progressBar.addEventListener('click', (e) => this.seek(e));
        this.progressBar.addEventListener('mousemove', (e) => this.showTimeTooltip(e));
        this.progressBar.addEventListener('mouseleave', () => this.hideTimeTooltip());

        // Speed
        this.speedBtn.addEventListener('click', () => this.toggleSpeedMenu());
        this.speedOptions.forEach(option => {
            option.addEventListener('click', (e) => this.setSpeed(e.target.dataset.speed));
        });

        // Quality
        this.qualityBtn.addEventListener('click', () => this.toggleQualityMenu());
        this.qualityOptions.forEach(option => {
            option.addEventListener('click', (e) => this.setQuality(e.target.dataset.quality));
        });

        // PiP
        this.pipBtn.addEventListener('click', () => this.togglePiP());

        // Fullscreen
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

        // Video events
        this.video.addEventListener('play', () => this.onPlay());
        this.video.addEventListener('pause', () => this.onPause());
        this.video.addEventListener('timeupdate', () => this.updateProgress());
        this.video.addEventListener('loadedmetadata', () => this.onLoadedMetadata());
        this.video.addEventListener('waiting', () => this.showLoading());
        this.video.addEventListener('canplay', () => this.hideLoading());
        this.video.addEventListener('ended', () => this.onEnded());
        this.video.addEventListener('progress', () => this.updateBuffered());

        // Hide controls on inactivity
        let controlsTimeout;
        this.container.addEventListener('mousemove', () => {
            this.container.classList.add('show-controls');
            clearTimeout(controlsTimeout);
            controlsTimeout = setTimeout(() => {
                if (this.isPlaying) {
                    this.container.classList.remove('show-controls');
                }
            }, 3000);
        });

        // Close menus when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.speedBtn.contains(e.target) && !this.speedMenu.contains(e.target)) {
                this.speedMenu.classList.remove('show');
            }
            if (!this.qualityBtn.contains(e.target) && !this.qualityMenu.contains(e.target)) {
                this.qualityMenu.classList.remove('show');
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.key.toLowerCase()) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    this.togglePlay();
                    break;
                case 'arrowleft':
                    e.preventDefault();
                    this.skip(-10);
                    break;
                case 'arrowright':
                    e.preventDefault();
                    this.skip(10);
                    break;
                case 'arrowup':
                    e.preventDefault();
                    this.changeVolume(5);
                    break;
                case 'arrowdown':
                    e.preventDefault();
                    this.changeVolume(-5);
                    break;
                case 'm':
                    this.toggleMute();
                    break;
                case 'f':
                    this.toggleFullscreen();
                    break;
                case 'p':
                    this.togglePiP();
                    break;
            }
        });
    }

    setupMediaSession() {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: 'Manna Temple TV',
                artist: 'Manna Temple Church',
                artwork: [
                    { src: '/images/icon.png', sizes: '96x96', type: 'image/png' },
                    { src: '/images/icon.png', sizes: '128x128', type: 'image/png' },
                    { src: '/images/icon.png', sizes: '192x192', type: 'image/png' },
                    { src: '/images/icon.png', sizes: '256x256', type: 'image/png' }
                ]
            });

            navigator.mediaSession.setActionHandler('play', () => this.play());
            navigator.mediaSession.setActionHandler('pause', () => this.pause());
            navigator.mediaSession.setActionHandler('seekbackward', () => this.skip(-10));
            navigator.mediaSession.setActionHandler('seekforward', () => this.skip(10));
        }
    }

    togglePlay() {
        this.isPlaying ? this.pause() : this.play();
    }

    play() {
        this.video.play();
    }

    pause() {
        this.video.pause();
    }

    onPlay() {
        this.isPlaying = true;
        this.playBtn.querySelector('i').textContent = 'pause';
        this.bigPlayBtn.style.display = 'none';
        this.playerOverlay.style.opacity = '0';
        this.container.classList.add('playing');
    }

    onPause() {
        this.isPlaying = false;
        this.playBtn.querySelector('i').textContent = 'play_arrow';
        this.bigPlayBtn.style.display = 'flex';
        this.playerOverlay.style.opacity = '1';
        this.container.classList.remove('playing');
    }

    skip(seconds) {
        this.video.currentTime += seconds;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.video.muted = this.isMuted;
        this.updateVolumeIcon();
    }

    setVolume(value) {
        this.video.volume = value / 100;
        this.volumeSlider.value = value;
        this.isMuted = value == 0;
        this.updateVolumeIcon();
    }

    changeVolume(delta) {
        const newVolume = Math.max(0, Math.min(100, this.video.volume * 100 + delta));
        this.setVolume(newVolume);
    }

    updateVolumeIcon() {
        const icon = this.volumeBtn.querySelector('i');
        if (this.isMuted || this.video.volume === 0) {
            icon.textContent = 'volume_off';
        } else if (this.video.volume < 0.5) {
            icon.textContent = 'volume_down';
        } else {
            icon.textContent = 'volume_up';
        }
    }

    seek(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.video.currentTime = percent * this.video.duration;
    }

    updateProgress() {
        const percent = (this.video.currentTime / this.video.duration) * 100;
        this.progressFilled.style.width = `${percent}%`;
        this.currentTimeEl.textContent = this.formatTime(this.video.currentTime);
    }

    updateBuffered() {
        if (this.video.buffered.length > 0) {
            const bufferedEnd = this.video.buffered.end(this.video.buffered.length - 1);
            const percent = (bufferedEnd / this.video.duration) * 100;
            this.progressBuffered.style.width = `${percent}%`;
        }
    }

    showTimeTooltip(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const time = percent * this.video.duration;

        this.timeTooltip.textContent = this.formatTime(time);
        this.timeTooltip.style.left = `${e.clientX - rect.left}px`;
        this.timeTooltip.style.display = 'block';
    }

    hideTimeTooltip() {
        this.timeTooltip.style.display = 'none';
    }

    toggleSpeedMenu() {
        this.speedMenu.classList.toggle('show');
        this.qualityMenu.classList.remove('show');
    }

    setSpeed(speed) {
        this.playbackSpeed = parseFloat(speed);
        this.video.playbackRate = this.playbackSpeed;
        this.speedBtn.querySelector('.speed-value').textContent = `${speed}x`;

        this.speedOptions.forEach(opt => opt.classList.remove('active'));
        this.container.querySelector(`[data-speed="${speed}"]`).classList.add('active');
        this.speedMenu.classList.remove('show');
    }

    toggleQualityMenu() {
        this.qualityMenu.classList.toggle('show');
        this.speedMenu.classList.remove('show');
    }

    setQuality(quality) {
        this.currentQuality = quality;
        console.log(`Quality changed to: ${quality}`);
        // Implement actual quality switching based on your video sources

        this.qualityOptions.forEach(opt => opt.classList.remove('active'));
        this.container.querySelector(`[data-quality="${quality}"]`).classList.add('active');
        this.qualityMenu.classList.remove('show');
    }

    async togglePiP() {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else {
                await this.video.requestPictureInPicture();
            }
        } catch (error) {
            console.error('PiP error:', error);
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.container.requestFullscreen();
            this.fullscreenBtn.querySelector('i').textContent = 'fullscreen_exit';
        } else {
            document.exitFullscreen();
            this.fullscreenBtn.querySelector('i').textContent = 'fullscreen';
        }
    }

    onLoadedMetadata() {
        this.durationEl.textContent = this.formatTime(this.video.duration);
    }

    onEnded() {
        this.isPlaying = false;
        this.playBtn.querySelector('i').textContent = 'replay';
    }

    showLoading() {
        this.playerLoading.style.display = 'flex';
    }

    hideLoading() {
        this.playerLoading.style.display = 'none';
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';

        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
}

// Initialize player when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.main-video')) {
        window.modernPlayer = new ModernPlayer('.main-video');
    }
});
