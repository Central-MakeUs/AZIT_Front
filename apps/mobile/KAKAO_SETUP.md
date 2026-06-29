# Kakao Android 설정 가이드

`/android` 폴더는 `.gitignore`에 의해 git에서 제외됩니다.  
따라서 아래 설정은 **새 환경 세팅 시 또는 `expo prebuild` 이후 매번 수동으로 적용**해야 합니다.

---

## 1. `android/local.properties` (신규 생성)

Android SDK 경로 지정. 머신마다 다를 수 있으므로 직접 생성합니다.

```properties
sdk.dir=/Users/{사용자명}/Library/Android/sdk
```

---

## 2. `android/gradle.properties` (하단에 추가)

Kakao Native App Key를 Gradle에 전달합니다.

```properties
KAKAO_NATIVE_APP_KEY=<카카오 네이티브 앱 키>
```

> `.env` 파일의 `KAKAO_NATIVE_APP_KEY` 값과 동일한 값을 사용합니다.

---

## 3. `android/build.gradle` (allprojects.repositories에 추가)

Kakao SDK는 자체 Maven 저장소에서 배포되므로 명시적으로 추가해야 합니다.

```groovy
allprojects {
  repositories {
    google()
    mavenCentral()
    maven { url 'https://www.jitpack.io' }
    maven { url 'https://devrepo.kakao.com/nexus/content/groups/public/' }  // 추가
  }
}
```

---

## 4. `android/app/build.gradle`

### 4-1. defaultConfig에 BuildConfig 필드 추가

```groovy
defaultConfig {
    // ... 기존 설정 ...
    buildConfigField "String", "KAKAO_NATIVE_APP_KEY", "\"${System.getenv('KAKAO_NATIVE_APP_KEY') ?: findProperty('KAKAO_NATIVE_APP_KEY') ?: ''}\""
}
```

### 4-2. dependencies에 Kakao SDK 추가

```groovy
dependencies {
    implementation("com.facebook.react:react-android")
    implementation("com.kakao.sdk:v2-common:2.20.1")  // 추가
    // ... 기존 의존성 ...
}
```

---

## 5. `android/app/src/main/java/com/azitcrew/app/MainApplication.kt`

`KakaoSdk.init()`을 `onCreate()`에 추가합니다.

### import 추가

```kotlin
import com.kakao.sdk.common.KakaoSdk
```

### onCreate()에 초기화 코드 추가

```kotlin
override fun onCreate() {
    super.onCreate()
    KakaoSdk.init(this, BuildConfig.KAKAO_NATIVE_APP_KEY)  // 추가
    // ... 기존 코드 ...
}
```

---

## 6. 카카오 개발자 콘솔 — 키해시 등록

디버그 빌드용 키해시를 [카카오 개발자 콘솔](https://developers.kakao.com) → 앱 설정 → 플랫폼 → Android에 등록해야 합니다.

### 키해시 추출 명령어

```bash
keytool -exportcert -alias androiddebugkey \
  -keystore android/app/debug.keystore \
  -storepass android -keypass android 2>/dev/null \
  | openssl sha1 -binary | openssl base64
```

현재 디버그 키해시: `Xo8WBi6jzSxKDVR4drqm84yr9iU=`

> 릴리즈 빌드는 별도의 키스토어를 사용하므로 릴리즈 키해시도 별도 등록이 필요합니다.

---

## 카카오 앱 키 변경 시 수정할 곳

| 파일                        | 변경 내용                                                      |
| --------------------------- | -------------------------------------------------------------- |
| `apps/mobile/.env`          | `KAKAO_NATIVE_APP_KEY=<새 키>`                                 |
| `android/gradle.properties` | `KAKAO_NATIVE_APP_KEY=<새 키>`                                 |
| `app.config.ts`             | 환경변수에서 자동으로 읽으므로 변경 불필요                     |
| 카카오 개발자 콘솔          | Android 플랫폼에서 패키지명(`com.azitcrew.app`) 및 키해시 확인 |

---

## 빠른 세팅 체크리스트

새 환경 또는 `expo prebuild` 후:

- [ ] `android/local.properties` 생성 (SDK 경로)
- [ ] `android/gradle.properties`에 `KAKAO_NATIVE_APP_KEY` 추가
- [ ] `android/build.gradle`에 Kakao Maven 저장소 추가
- [ ] `android/app/build.gradle`에 BuildConfig 필드 및 `v2-common` 의존성 추가
- [ ] `MainApplication.kt`에 `KakaoSdk.init()` 추가
- [ ] 카카오 개발자 콘솔에 키해시 등록
