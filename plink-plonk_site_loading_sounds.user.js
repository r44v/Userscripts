// ==UserScript==
// @name         plink-plonk site loading sounds
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  autoloads https://gist.github.com/MarkArts/3d4217f957df8a30802a8cbf962fa204
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

// origin: https://gist.github.com/tomhicks/6cb5e827723c4eaef638bf9f7686d2d8 ,  tomhicks/plink-plonk.js

/*
Copy this into the console of any web page that is interactive and doesn't
do hard reloads. You will hear your DOM changes as different pitches of
audio.
I have found this interesting for debugging, but also fun to hear web pages
render like UIs do in movies.
*/

// dorian (-)   C     E      F     G-     A     B-
let scale = [
  264, 330, 352, 391.1, 440, 488.9
]
scale = scale.concat(scale.map(x=>x*2))

console.log(scale)

function quantize(scale, freq) {
  return scale.reduce(function(prev, curr){
    return (Math.abs(curr - freq) < Math.abs(prev - freq) ? curr : prev);
  });
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
const observer = new MutationObserver(observe)

function observe(mutationsList) {
  // with delay
  delayNote(gain => playNote(mutationsList, gain), 300, 0.2)
  // without
  // playNote(mutationsList)
}


// Compressor as final stage to prevent clipping
const compressor = audioCtx.createDynamicsCompressor()
compressor.threshold.setValueAtTime(-40, audioCtx.currentTime);
compressor.knee.setValueAtTime(40, audioCtx.currentTime);
compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
compressor.attack.setValueAtTime(0, audioCtx.currentTime);
compressor.release.setValueAtTime(0.25, audioCtx.currentTime);
compressor.connect(audioCtx.destination)

async function playNote(mutationsList, gain = 1) {
  audioCtx.resume()

  const oscillator = audioCtx.createOscillator()
  oscillator.type = "triangle"
  const biquadFilter = audioCtx.createBiquadFilter();
  biquadFilter.type = "lowpass";
  const gainNode = audioCtx.createGain();
  const panNode = audioCtx.createStereoPanner();

  // Setup audio chain
  oscillator.connect(biquadFilter);
  biquadFilter.connect(gainNode);
  gainNode.connect(panNode);
  panNode.connect(compressor)

  let freq = quantize(scale, 440 * (Math.random() * 3))

  oscillator.frequency.setValueAtTime(
    quantize(scale, freq),
    audioCtx.currentTime,
  )

  // Low pass gate
  biquadFilter.frequency.setValueAtTime(
    quantize(scale, freq * 4),
    audioCtx.currentTime
  );

  biquadFilter.frequency.setTargetAtTime(
    freq,
    audioCtx.currentTime,
    0.09,
  );

  // accend the low pass gate with normal attenuatiob
  gainNode.gain.setValueAtTime(
    gain,
    audioCtx.currentTime
  );

  gainNode.gain.setTargetAtTime(
    0,
    audioCtx.currentTime,
    0.1,
  );

  // random stereo pan
  panNode.pan.setValueAtTime(
    Math.random() * 2 - 1,
    audioCtx.currentTime
  );

  oscillator.start()
  oscillator.stop(audioCtx.currentTime + 1)
}

async function delayNote(f, time, decay, gain = 1){
  if (gain <= 0) {
    return // stop repeats when they become inaudible
  }

  f(gain)

  setTimeout( _ => delayNote(f, time, decay, gain - decay), time);
}

observer.observe(document, {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
})