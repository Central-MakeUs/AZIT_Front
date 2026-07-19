# Build Android Production

Android production 빌드를 준비하고 EAS 빌드를 실행합니다.

## 작업 절차

1. `apps/mobile/app.config.js`의 `android.versionCode`를 읽는다.

2. 사용자에게 현재 versionCode를 알리고, +1 증가시킬지 확인한다.
   - 확인 시 versionCode를 1 증가시키고 파일을 수정한다.

3. `apps/mobile/eas.json`의 `production` 프로필을 확인한다.
   - `android.buildType`이 `"app-bundle"`인지 확인한다.
   - `env.KAKAO_NATIVE_APP_KEY`가 있는지 확인한다.
   - `env.EXPO_PUBLIC_WEB_PROD_URL`이 `"https://azitcrew.com/"`인지 확인한다.
   - 누락된 항목이 있으면 추가한다.

4. 변경 사항을 사용자에게 요약해서 보여준다.

5. 빌드 명령어를 안내한다:

```bash
cd apps/mobile && eas build --profile production --platform android
```
