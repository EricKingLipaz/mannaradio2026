/**
 * Audio Visualizer using Web Audio API
 * Features: Spectrum Analyzer, Waveform, Multiple Styles
 */

class AudioVisualizer {
    constructor(audioElement, canvasSelector) {
        this.audio = audioElement;
        this.canvas = document.querySelector(canvasSelector);

        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.analyser = null;
        this.audioContext = null;
        this.dataArray = null;
        this.bufferLength = null;
        this.animationId = null;
        this.isActive = false;
        this.visualizationStyle = 'bars'; // 'bars', 'circular', 'waveform'

        this.setupCanvas();
    }

    setupCanvas() {
        // Set canvas size
        this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
        this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        // Handle resize
        window.addEventListener('resize', () => {
            this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
            this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
            this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        });
    }

    async initialize() {
        if (this.audioContext) return; // Already initialized

        try {
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Create analyser node
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);

            // Connect audio source
            const source = this.audioContext.createMediaElementSource(this.audio);
            source.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);

            console.log('Audio visualizer initialized');
        } catch (error) {
            console.error('Failed to initialize audio visualizer:', error);
        }
    }

    start() {
        if (!this.audioContext) {
            this.initialize().then(() => {
                this.isActive = true;
                this.draw();
            });
        } else {
            this.isActive = true;
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            this.draw();
        }
    }

    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.clearCanvas();
    }

    toggle() {
        this.isActive ? this.stop() : this.start();
        return this.isActive;
    }

    setStyle(style) {
        this.visualizationStyle = style;
    }

    draw() {
        if (!this.isActive) return;

        this.animationId = requestAnimationFrame(() => this.draw());
        this.analyser.getByteFrequencyData(this.dataArray);

        switch (this.visualizationStyle) {
            case 'bars':
                this.drawBars();
                break;
            case 'circular':
                this.drawCircular();
                break;
            case 'waveform':
                this.drawWaveform();
                break;
            default:
                this.drawBars();
        }
    }

    drawBars() {
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;

        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(26, 26, 46, 0.2)';
        this.ctx.fillRect(0, 0, width, height);

        const barWidth = (width / this.bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < this.bufferLength; i++) {
            barHeight = (this.dataArray[i] / 255) * height * 0.8;

            // Create gradient
            const gradient = this.ctx.createLinearGradient(0, height, 0, height - barHeight);
            gradient.addColorStop(0, '#8b5cf6');
            gradient.addColorStop(0.5, '#a78bfa');
            gradient.addColorStop(1, '#c4b5fd');

            this.ctx.fillStyle = gradient;

            // Draw bar with rounded top
            this.ctx.beginPath();
            this.ctx.roundRect(x, height - barHeight, barWidth - 2, barHeight, [4, 4, 0, 0]);
            this.ctx.fill();

            // Add glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#8b5cf6';

            x += barWidth + 1;
        }

        this.ctx.shadowBlur = 0;
    }

    drawCircular() {
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.3;

        // Clear canvas
        this.ctx.fillStyle = 'rgba(26, 26, 46, 0.2)';
        this.ctx.fillRect(0, 0, width, height);

        const bars = 100;
        const step = Math.floor(this.bufferLength / bars);

        for (let i = 0; i < bars; i++) {
            const value = this.dataArray[i * step];
            const percent = value / 255;
            const barHeight = radius * percent * 0.5;

            const angle = (i / bars) * Math.PI * 2;
            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle) * (radius + barHeight);
            const y2 = centerY + Math.sin(angle) * (radius + barHeight);

            // Create gradient
            const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, '#8b5cf6');
            gradient.addColorStop(1, '#c4b5fd');

            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 3;
            this.ctx.lineCap = 'round';

            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }

        // Draw center circle
        const gradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 0.8);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawWaveform() {
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;

        // Clear canvas
        this.ctx.fillStyle = 'rgba(26, 26, 46, 0.2)';
        this.ctx.fillRect(0, 0, width, height);

        // Get time domain data for waveform
        const timeData = new Uint8Array(this.bufferLength);
        this.analyser.getByteTimeDomainData(timeData);

        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#8b5cf6';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#8b5cf6';

        this.ctx.beginPath();

        const sliceWidth = width / this.bufferLength;
        let x = 0;

        for (let i = 0; i < this.bufferLength; i++) {
            const v = timeData[i] / 128.0;
            const y = (v * height) / 2;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.ctx.lineTo(width, height / 2);
        this.ctx.stroke();

        // Add filled area under waveform
        this.ctx.lineTo(width, height);
        this.ctx.lineTo(0, height);
        this.ctx.closePath();

        const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        this.ctx.shadowBlur = 0;
    }

    clearCanvas() {
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, width, height);
    }
}

// Polyfill for roundRect if not available
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radii) {
        const radius = Array.isArray(radii) ? radii : [radii, radii, radii, radii];

        this.beginPath();
        this.moveTo(x + radius[0], y);
        this.lineTo(x + width - radius[1], y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius[1]);
        this.lineTo(x + width, y + height - radius[2]);
        this.quadraticCurveTo(x + width, y + height, x + width - radius[2], y + height);
        this.lineTo(x + radius[3], y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius[3]);
        this.lineTo(x, y + radius[0]);
        this.quadraticCurveTo(x, y, x + radius[0], y);
        this.closePath();
    };
}

// Export for use in other modules
window.AudioVisualizer = AudioVisualizer;
