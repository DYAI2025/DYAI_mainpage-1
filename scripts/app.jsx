/* global React, ReactDOM */
const { useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#d8572a",
  "density": 1.0,
  "motion": 1.0
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  useEffectApp(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  return (
    <>
      <window.IntroLoader />
      <window.SiteNav />
      <window.Hero tweaks={t} />
      <window.PhilosophyDeck />
      <window.ProjectCardsSection />
      <window.Outro />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Accent" />
        <window.TweakColor
          label="Signal color"
          value={t.accent}
          onChange={(v) => setTweak("accent", v)}
          options={["#d8572a", "#e0691f", "#3b82f6", "#7a7b58", "#efe9dc"]}
        />
        <window.TweakSection label="Motion" />
        <window.TweakSlider
          label="Animation speed"
          min={0.2} max={2.0} step={0.1}
          value={t.motion}
          onChange={(v) => setTweak("motion", v)}
        />
        <window.TweakSlider
          label="Particle density"
          min={0.3} max={2.0} step={0.1}
          value={t.density}
          onChange={(v) => setTweak("density", v)}
        />
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
