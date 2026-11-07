/**
 * Web Audio API synthesizer for Vietnamese Pagoda soundscape
 * Synthesizes: Wooden Fish (Mõ), Bronze Pagoda Bell (Chuông Bát),
 * Singing Bowl, Bamboo Shaker, Water Drops, and Merit Coins.
 */

class PagodaAudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.7;
  private ambientOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isAmbientPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isAmbientPlaying) {
      this.stopAmbient();
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume() {
    return this.volume;
  }

  /**
   * Synthesize authentic Wooden Fish (Mõ Gỗ) tap
   * Realistic hollow wooden cavity resonance with sharp initial transient click
   */
  public playWoodenFish() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume * 0.9, t);
    masterGain.connect(this.ctx.destination);

    // 1. Initial click / impact transient (noise burst)
    const bufferSize = this.ctx.sampleRate * 0.015;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1400, t);
    noiseFilter.Q.setValueAtTime(3.0, t);
    noise.connect(noiseFilter);
    noiseFilter.connect(masterGain);
    noise.start(t);

    // 2. Main resonant cavity (Hollow wooden body pitch around 520Hz - 640Hz)
    const osc1 = this.ctx.createOscillator();
    const oscGain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(580, t);
    osc1.frequency.exponentialRampToValueAtTime(420, t + 0.12);

    oscGain1.gain.setValueAtTime(1.0, t);
    oscGain1.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc1.connect(oscGain1);
    oscGain1.connect(masterGain);
    osc1.start(t);
    osc1.stop(t + 0.16);

    // 3. Sub-harmonic body thump (~260Hz)
    const osc2 = this.ctx.createOscillator();
    const oscGain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(290, t);
    osc2.frequency.exponentialRampToValueAtTime(210, t + 0.1);

    oscGain2.gain.setValueAtTime(0.6, t);
    oscGain2.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc2.connect(oscGain2);
    oscGain2.connect(masterGain);
    osc2.start(t);
    osc2.stop(t + 0.13);
  }

  /**
   * Synthesize resonant bronze temple bell (Chuông Bát / Đại Hồng Chung)
   * With authentic Tibetan/Buddhist singing bell overtones (fundamental + 2.76x + 5.4x)
   */
  public playTempleBell(tone: 'low' | 'high' = 'low') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume * 0.85, t);
    masterGain.connect(this.ctx.destination);

    const baseFreq = tone === 'low' ? 216 : 432; // Hz (A3 / A4 sacred harmonic)
    const harmonics = [
      { ratio: 1.0, gain: 0.8, decay: 4.5 },
      { ratio: 2.76, gain: 0.45, decay: 3.2 },
      { ratio: 4.07, gain: 0.25, decay: 2.0 },
      { ratio: 5.4, gain: 0.15, decay: 1.5 },
      { ratio: 0.5, gain: 0.35, decay: 4.8 }, // Sub-bass hum
    ];

    harmonics.forEach(({ ratio, gain, decay }) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();

      osc.type = 'sine';
      // subtle vibrato/shimmer
      osc.frequency.setValueAtTime(baseFreq * ratio, t);
      osc.frequency.linearRampToValueAtTime(baseFreq * ratio - 0.8, t + decay);

      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(gain, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + decay);

      osc.connect(g);
      g.connect(masterGain);
      osc.start(t);
      osc.stop(t + decay);
    });
  }

  /**
   * Sound of dropping coins into Merit Box (Hòm Công Đức)
   */
  public playCoin() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume * 0.7, t);
    masterGain.connect(this.ctx.destination);

    [1850, 2400, 3100].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      const delay = idx * 0.04;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + delay);

      g.gain.setValueAtTime(0.4, t + delay);
      g.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.25);

      osc.connect(g);
      g.connect(masterGain);
      osc.start(t + delay);
      osc.stop(t + delay + 0.26);
    });
  }

  /**
   * Shaking bamboo divination tube (Lắc ống xăm)
   */
  public playBambooRattle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    for (let i = 0; i < 5; i++) {
      const delay = i * 0.07 + Math.random() * 0.03;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(750 + Math.random() * 400, t + delay);
      filter.Q.setValueAtTime(6.0, t + delay);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 + Math.random() * 300, t + delay);

      g.gain.setValueAtTime(this.volume * 0.35, t + delay);
      g.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.08);

      osc.connect(filter);
      filter.connect(g);
      g.connect(this.ctx.destination);

      osc.start(t + delay);
      osc.stop(t + delay + 0.09);
    }
  }

  /**
   * Water scoop & splash for Bathing the Buddha & Fish Release
   */
  public playWaterSplash() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const dur = 0.6;
    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, t);
    filter.frequency.exponentialRampToValueAtTime(400, t + dur);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.volume * 0.45, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
  }

  /**
   * Gentle background ambient drone (Om meditation hum)
   */
  public toggleAmbient(): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public isAmbientOn() {
    return this.isAmbientPlaying;
  }

  public startAmbient() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || this.isAmbientPlaying) return;

    this.stopAmbient();
    const t = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, t);
    masterGain.gain.linearRampToValueAtTime(this.volume * 0.18, t + 2);
    masterGain.connect(this.ctx.destination);

    // Warm peaceful chord (C# - G# - C# - F - G# drone)
    const freqs = [138.59, 207.65, 277.18, 349.23, 415.3];
    this.ambientOscillators = [];

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.8, t);

      g.gain.setValueAtTime(1 / freqs.length, t);
      osc.connect(g);
      g.connect(masterGain);
      osc.start();

      this.ambientOscillators.push({ osc, gain: masterGain });
    });

    this.isAmbientPlaying = true;
  }

  public stopAmbient() {
    if (!this.isAmbientPlaying) return;
    this.ambientOscillators.forEach(({ osc, gain }) => {
      try {
        if (this.ctx) {
          gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
          setTimeout(() => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
          }, 1200);
        }
      } catch {
        // ignore
      }
    });
    this.ambientOscillators = [];
    this.isAmbientPlaying = false;
  }
}

export const pagodaAudio = new PagodaAudioService();
