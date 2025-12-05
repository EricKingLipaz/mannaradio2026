/**
 * Manna Temple Radio - Clean Streaming Implementation
 * Simple, reliable radio player with modern controls
 */

class MannaRadioPlayer {
    constructor() {
        // Radio stream configuration
        this.streamURL = "https://stream-39.zeno.fm/huvatsbzum0uv?zs=QdJvFjEeQ3-JTdgAopEWpg";
        this.audio = null;
        this.isPlaying = false;

        // UI elements
        this.playButton = null;
        this.volumeSlider = null;
        this.muteButton = null;

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('Manna Radio Player initializing...');

        // Create audio element
        this.audio = new Audio(this.streamURL);
        this.audio.volume = 1.0;
        this.audio.preload = 'none';

        // Expose globally for integration with other components
        window.mannaRadioAudio = this.audio;
        window.mannaRadioPlayer = this;

        // Backward compatibility shim
        window.pauseRadio = () => this.pause();

        // Get UI elements
        this.playButton = document.getElementById('playRadio');
        this.volumeSlider = document.getElementById('radioVolume');
        this.muteButton = document.getElementById('muteRadio');

        // Setup event listeners
        this.setupEventListeners();

        // Setup audio events
        this.setupAudioEvents();

        console.log('Manna Radio Player initialized successfully');
    }

    setupEventListeners() {
        // Play/Pause button
        if (this.playButton) {
            this.playButton.addEventListener('click', () => this.togglePlayPause());
        }

        // Volume slider
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                this.setVolume(parseFloat(e.target.value));
            });
        }

        // Mute button
        if (this.muteButton) {
            this.muteButton.addEventListener('click', () => this.toggleMute());
        }
    }

    setupAudioEvents() {
        // Handle audio events for better UX
        this.audio.addEventListener('playing', () => {
            console.log('Radio started playing');
            this.updatePlayButton(true);
        });

        this.audio.addEventListener('pause', () => {
            console.log('Radio paused');
            this.updatePlayButton(false);
        });

        this.audio.addEventListener('error', (e) => {
            console.error('Radio stream error:', e);
            this.handleError();
        });

        this.audio.addEventListener('waiting', () => {
            console.log('Radio buffering...');
        });

        this.audio.addEventListener('canplay', () => {
            console.log('Radio ready to play');
        });
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        console.log('Attempting to play radio...');

        // Stop TV player if it exists and is playing
        if (window.modernPlayer && typeof window.modernPlayer.pause === 'function') {
            window.modernPlayer.pause();
        }

        // Play the radio
        const playPromise = this.audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    this.isPlaying = true;
                    this.updatePlayButton(true);
                    console.log('Radio playing successfully');
                })
                .catch(error => {
                    console.error('Error playing radio:', error);
                    this.handleError(error);
                });
        }
    }

    pause() {
        console.log('Pausing radio...');
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton(false);
    }

    setVolume(value) {
        // Ensure value is between 0 and 1
        const volume = Math.max(0, Math.min(1, value));
        this.audio.volume = volume;

        // Update mute button icon based on volume
        this.updateMuteIcon(volume);

        // If volume is set above 0, unmute
        if (volume > 0 && this.audio.muted) {
            this.audio.muted = false;
        }
    }

    toggleMute() {
        this.audio.muted = !this.audio.muted;

        if (this.audio.muted) {
            this.updateMuteIcon(0);
            if (this.volumeSlider) {
                this.volumeSlider.dataset.previousVolume = this.audio.volume;
            }
        } else {
            const previousVolume = this.volumeSlider ?
                parseFloat(this.volumeSlider.dataset.previousVolume || 1.0) : 1.0;
            this.updateMuteIcon(previousVolume);
        }
    }

    updatePlayButton(playing) {
        if (!this.playButton) return;

        const icon = this.playButton.querySelector('i') || this.playButton;

        if (playing) {
            icon.textContent = 'pause_circle';
            this.playButton.classList.add('playing');
        } else {
            icon.textContent = 'play_circle';
            this.playButton.classList.remove('playing');
        }
    }

    updateMuteIcon(volume) {
        if (!this.muteButton) return;

        const icon = this.muteButton.querySelector('i');
        if (!icon) return;

        if (volume === 0 || this.audio.muted) {
            icon.textContent = 'volume_off';
        } else if (volume < 0.5) {
            icon.textContent = 'volume_down';
        } else {
            icon.textContent = 'volume_up';
        }
    }

    handleError(error) {
        this.isPlaying = false;
        this.updatePlayButton(false);

        const errorMessage = error ? error.message : 'Unable to connect to radio stream';
        console.error('Radio error:', errorMessage);

        // Show user-friendly error (optional)
        // You can uncomment this if you want to show alerts
        // alert('Radio Error: ' + errorMessage);
    }

    // Public API methods for external use
    stop() {
        this.pause();
        this.audio.currentTime = 0;
    }

    getIsPlaying() {
        return this.isPlaying;
    }
}

// Initialize the radio player
const radioPlayer = new MannaRadioPlayer();
