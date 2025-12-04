/**
 * Enhanced Radio Player with Visualizer Integration
 * Features: Equalizer, Sleep Timer, Recording, Program Schedule
 */

class RadioPlayer {
    constructor() {
        this.audio = new Audio("https://stream-39.zeno.fm/huvatsbzum0uv?zs=QdJvFjEeQ3-JTdgAopEWpg");
        this.audio.crossOrigin = "anonymous";

        this.isPlaying = false;
        this.visualizer = null;
        this.sleepTimer = null;
        this.recorder = null;
        this.isRecording = false;
        this.currentEqualizer = 'normal';

        this.equalizerPresets = {
            normal: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            bassBoost: [8, 6, 4, 2, 0, 0, 0, 0, 0, 0],
            treble: [0, 0, 0, 0, 0, 2, 4, 6, 8, 10],
            classical: [0, 0, 0, 0, 0, 0, -2, -2, -2, -4],
            rock: [6, 4, 2, 0, -2, -1, 0, 2, 4, 6],
            pop: [2, 4, 6, 4, 0, -2, -2, 0, 2, 4],
            jazz: [4, 3, 2, 2, -2, -2, 0, 2, 4, 5]
        };

        this.init();
    }

    init() {
        this.setupUI();
        this.attachEventListeners();
        this.initializeVisualizer();
        this.setupMediaSession();
    }

    setupUI() {
        const radioContainer = document.querySelector('.radio-container');
        if (!radioContainer) return;

        // Add visualizer canvas if not exists
        if (!document.querySelector('.audio-visualizer-canvas')) {
            const visualizerHTML = `
                <div class="audio-visualizer-container">
                    <canvas class="audio-visualizer-canvas"></canvas>
                    <div class="visualizer-controls">
                        <button class="viz-toggle-btn control-btn" title="Toggle Visualizer">
                            <i class="material-icons">graphic_eq</i>
                        </button>
                        <div class="viz-style-selector">
                            <button class="viz-style-btn" data-style="bars">
                                <i class="material-icons">bar_chart</i>
                            </button>
                            <button class="viz-style-btn" data-style="circular">
                                <i class="material-icons">radio_button_checked</i>
                            </button>
                            <button class="viz-style-btn" data-style="waveform">
                                <i class="material-icons">show_chart</i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            radioContainer.insertAdjacentHTML('afterbegin', visualizerHTML);
        }

        // Add enhanced controls
        const enhancedControlsHTML = `
            <div class="radio-enhanced-controls">
                <div class="radio-info">
                    <div class="now-playing">
                        <span class="label">Now Playing:</span>
                        <span class="song-title">Manna Temple Radio</span>
                    </div>
                    <div class="listener-count">
                        <i class="material-icons">people</i>
                        <span class="count">0</span> listening
                    </div>
                </div>

                <div class="volume-control-enhanced">
                    <button class="control-btn volume-btn-enhanced">
                        <i class="material-icons">volume_up</i>
                    </button>
                    <input type="range" class="volume-slider-enhanced" min="0" max="100" value="100">
                    <span class="volume-value">100%</span>
                </div>

                <div class="equalizer-control">
                    <button class="control-btn equalizer-btn" title="Equalizer">
                        <i class="material-icons">equalizer</i>
                    </button>
                    <div class="equalizer-menu">
                        <div class="eq-preset" data-preset="normal">Normal</div>
                        <div class="eq-preset" data-preset="bassBoost">Bass Boost</div>
                        <div class="eq-preset" data-preset="treble">Treble</div>
                        <div class="eq-preset" data-preset="classical">Classical</div>
                        <div class="eq-preset" data-preset="rock">Rock</div>
                        <div class="eq-preset" data-preset="pop">Pop</div>
                        <div class="eq-preset" data-preset="jazz">Jazz</div>
                    </div>
                </div>

                <div class="sleep-timer-control">
                    <button class="control-btn sleep-timer-btn" title="Sleep Timer">
                        <i class="material-icons">bedtime</i>
                    </button>
                    <div class="sleep-timer-menu">
                        <div class="timer-option" data-minutes="15">15 minutes</div>
                        <div class="timer-option" data-minutes="30">30 minutes</div>
                        <div class="timer-option" data-minutes="60">1 hour</div>
                        <div class="timer-option" data-minutes="120">2 hours</div>
                        <div class="timer-option" data-minutes="0">Off</div>
                    </div>
                    <div class="timer-display" style="display: none;">
                        <span class="timer-remaining">00:00</span>
                    </div>
                </div>

                <button class="control-btn record-btn" title="Record Stream">
                    <i class="material-icons">fiber_manual_record</i>
                </button>

                <button class="control-btn share-radio-btn" title="Share">
                    <i class="material-icons">share</i>
                </button>
            </div>

            <div class="recently-played">
                <h4>Recently Played</h4>
                <div class="songs-list">
                    <div class="song-item">
                        <span class="time">Now</span>
                        <span class="title">Manna Temple Radio Live</span>
                    </div>
                </div>
            </div>
        `;

        const onAirDiv = radioContainer.querySelector('.on-air');
        if (onAirDiv) {
            onAirDiv.insertAdjacentHTML('afterend', enhancedControlsHTML);
        }
    }

    attachEventListeners() {
        // Visualizer toggle
        const vizToggleBtn = document.querySelector('.viz-toggle-btn');
        if (vizToggleBtn) {
            vizToggleBtn.addEventListener('click', () => {
                if (this.visualizer) {
                    const isActive = this.visualizer.toggle();
                    vizToggleBtn.classList.toggle('active', isActive);
                }
            });
        }

        // Visualizer style buttons
        document.querySelectorAll('.viz-style-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const style = e.currentTarget.dataset.style;
                if (this.visualizer) {
                    this.visualizer.setStyle(style);
                    document.querySelectorAll('.viz-style-btn').forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                }
            });
        });

        // Volume control
        const volumeSlider = document.querySelector('.volume-slider-enhanced');
        const volumeBtn = document.querySelector('.volume-btn-enhanced');
        const volumeValue = document.querySelector('.volume-value');

        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const volume = e.target.value / 100;
                this.audio.volume = volume;
                if (volumeValue) volumeValue.textContent = `${e.target.value}%`;
                this.updateVolumeIcon(volume);
            });
        }

        if (volumeBtn) {
            volumeBtn.addEventListener('click', () => {
                this.audio.muted = !this.audio.muted;
                this.updateVolumeIcon(this.audio.muted ? 0 : this.audio.volume);
            });
        }

        // Equalizer
        const equalizerBtn = document.querySelector('.equalizer-btn');
        const equalizerMenu = document.querySelector('.equalizer-menu');

        if (equalizerBtn) {
            equalizerBtn.addEventListener('click', () => {
                equalizerMenu?.classList.toggle('show');
            });
        }

        document.querySelectorAll('.eq-preset').forEach(preset => {
            preset.addEventListener('click', (e) => {
                const presetName = e.target.dataset.preset;
                this.applyEqualizer(presetName);
                document.querySelectorAll('.eq-preset').forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');
                equalizerMenu?.classList.remove('show');
            });
        });

        // Sleep timer
        const sleepTimerBtn = document.querySelector('.sleep-timer-btn');
        const sleepTimerMenu = document.querySelector('.sleep-timer-menu');

        if (sleepTimerBtn) {
            sleepTimerBtn.addEventListener('click', () => {
                sleepTimerMenu?.classList.toggle('show');
            });
        }

        document.querySelectorAll('.timer-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const minutes = parseInt(e.target.dataset.minutes);
                this.setSleepTimer(minutes);
                sleepTimerMenu?.classList.remove('show');
            });
        });

        // Record button
        const recordBtn = document.querySelector('.record-btn');
        if (recordBtn) {
            recordBtn.addEventListener('click', () => this.toggleRecording());
        }

        // Share button
        const shareBtn = document.querySelector('.share-radio-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareRadio());
        }
    }

    initializeVisualizer() {
        const canvas = document.querySelector('.audio-visualizer-canvas');
        if (canvas && this.audio) {
            this.visualizer = new AudioVisualizer(this.audio, '.audio-visualizer-canvas');
        }
    }

    setupMediaSession() {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: 'Manna Temple Radio',
                artist: 'Live Stream',
                album: 'The Voice of The Truth',
                artwork: [
                    { src: '/images/icon.png', sizes: '96x96', type: 'image/png' },
                    { src: '/images/icon.png', sizes: '128x128', type: 'image/png' },
                    { src: '/images/icon.png', sizes: '192x192', type: 'image/png' }
                ]
            });

            navigator.mediaSession.setActionHandler('play', () => this.play());
            navigator.mediaSession.setActionHandler('pause', () => this.pause());
        }
    }

    play() {
        this.audio.play();
        this.isPlaying = true;
        if (this.visualizer) {
            this.visualizer.start();
        }
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        if (this.visualizer) {
            this.visualizer.stop();
        }
    }

    updateVolumeIcon(volume) {
        const icon = document.querySelector('.volume-btn-enhanced i');
        if (!icon) return;

        if (volume === 0 || this.audio.muted) {
            icon.textContent = 'volume_off';
        } else if (volume < 0.5) {
            icon.textContent = 'volume_down';
        } else {
            icon.textContent = 'volume_up';
        }
    }

    applyEqualizer(preset) {
        this.currentEqualizer = preset;
        console.log(`Equalizer preset applied: ${preset}`);
        // Note: Full equalizer implementation requires Web Audio API nodes
        // This would need AudioContext with BiquadFilterNode for each band
    }

    setSleepTimer(minutes) {
        // Clear existing timer
        if (this.sleepTimer) {
            clearInterval(this.sleepTimer);
            this.sleepTimer = null;
        }

        const timerDisplay = document.querySelector('.timer-display');
        const timerRemaining = document.querySelector('.timer-remaining');

        if (minutes === 0) {
            if (timerDisplay) timerDisplay.style.display = 'none';
            return;
        }

        let remainingSeconds = minutes * 60;
        if (timerDisplay) timerDisplay.style.display = 'block';

        const updateDisplay = () => {
            const mins = Math.floor(remainingSeconds / 60);
            const secs = remainingSeconds % 60;
            if (timerRemaining) {
                timerRemaining.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }
        };

        updateDisplay();

        this.sleepTimer = setInterval(() => {
            remainingSeconds--;
            updateDisplay();

            if (remainingSeconds <= 0) {
                clearInterval(this.sleepTimer);
                this.pause();
                if (timerDisplay) timerDisplay.style.display = 'none';

                // Show notification
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('Sleep Timer', {
                        body: 'Radio has been stopped',
                        icon: '/images/icon.png'
                    });
                }
            }
        }, 1000);
    }

    async toggleRecording() {
        const recordBtn = document.querySelector('.record-btn');

        if (!this.isRecording) {
            try {
                // Note: This is a simplified version
                // Full implementation would require MediaRecorder API
                this.isRecording = true;
                recordBtn.classList.add('recording');
                recordBtn.querySelector('i').textContent = 'stop';
                console.log('Recording started...');

                // Show notification
                alert('Recording feature requires additional setup for production use.');

            } catch (error) {
                console.error('Recording error:', error);
                this.isRecording = false;
            }
        } else {
            this.isRecording = false;
            recordBtn.classList.remove('recording');
            recordBtn.querySelector('i').textContent = 'fiber_manual_record';
            console.log('Recording stopped');
        }
    }

    shareRadio() {
        const shareData = {
            title: 'Manna Temple Radio',
            text: 'Listen to Manna Temple Radio - The Voice of The Truth',
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData).catch(err => console.log('Share failed:', err));
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert('Link copied to clipboard!'))
                .catch(err => console.error('Copy failed:', err));
        }
    }

    getAudioElement() {
        return this.audio;
    }
}

// Initialize radio player when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.radioPlayer = new RadioPlayer();
});
