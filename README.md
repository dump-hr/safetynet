# safetynet

Igraj. Uči. Pobjedi. Pokaži svoje znanje i zavladaj SafetyNet kvizom o sigurnosti na Internetu.

## Cookbook

### Generate new icons

change icon in `frontend/assets/logo.png`

```
cd frontend
npx @capacitor/assets generate --iconBackgroundColor '#066490' --splashBackgroundColor '#066490' --android
npx @capacitor/assets generate --iconBackgroundColor '#066490' --splashBackgroundColor '#066490' --ios
```