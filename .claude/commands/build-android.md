# Build Android Production

Android production 빌드를 준비하고 EAS 빌드를 실행합니다.

## 작업 절차

1. `apps/mobile/app.config.js`의 `android.versionCode`를 읽는다.

2. 사용자에게 현재 versionCode를 알리고, +1 증가시킬지 확인한다.
   - 확인 시 versionCode를 1 증가시키고 파일을 수정한다.

3. `apps/mobile/eas.json`의 `production` 프로필을 확인한다.
   - `android.buildType`이 `"app-bundle"`인지 확인한다.
   - env는 EAS Secret으로 관리되므로 eas.json에 없어도 정상이다.

4. 변경 사항을 사용자에게 요약해서 보여준다.

5. 빌드 명령어를 안내한다. 로컬에서 expo config 파싱 시 `KAKAO_NATIVE_APP_KEY`가 필요하므로 인라인으로 주입한다:

```bash
cd apps/mobile && KAKAO_NATIVE_APP_KEY=***REMOVED*** eas build --profile production --platform android
```
