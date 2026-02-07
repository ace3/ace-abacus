import { useTranslation } from "react-i18next";

const PracticeAudioControls = ({ settings, onChange }) => {
  const { t } = useTranslation();

  return (
    <section className="audio-settings-panel" aria-labelledby="audio-settings-title">
      <div className="practice-panel-header">
        <h2 id="audio-settings-title">{t("audio.title")}</h2>
      </div>

      <div className="toggle-grid">
        <label className="checkbox-field">
          <input
            type="checkbox"
            name="bgmEnabled"
            checked={settings.bgmEnabled}
            onChange={onChange}
          />
          {t("audio.enableBgm")}
        </label>
      </div>

      <div className="practice-field-grid">
        <label>
          {t("audio.masterVolume")}
          <input
            type="range"
            name="masterVolume"
            min="0"
            max="1"
            step="0.05"
            value={settings.masterVolume}
            onChange={onChange}
            disabled={!settings.bgmEnabled}
          />
        </label>

        <label>
          {t("audio.countdownVolume")}
          <input
            type="range"
            name="countdownVolume"
            min="0"
            max="1"
            step="0.05"
            value={settings.countdownVolume}
            onChange={onChange}
            disabled={!settings.bgmEnabled}
          />
        </label>
      </div>

      <p className="muted-note">{t("audio.defaultOffNote")}</p>
    </section>
  );
};

export default PracticeAudioControls;
