@echo off

title BUILD_APK

:: java 24
:: Gradle 8.14.3
:: Android SDK Build-Tools 35 v.35.0.0

set ANDROID_HOME=C:\Users\Admin\AppData\Local\Android\Sdk
set PATH=D:/Apps/Java/jdk-25/bin;%PATH%

cd ../android

call gradlew assembleDebug

pause
::timeout /t 5
