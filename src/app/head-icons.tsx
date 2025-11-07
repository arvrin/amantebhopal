export default function HeadIcons() {
  return (
    <>
      {/* Standard Favicons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="256x256" href="/favicon-256x256.png" />
      <link rel="icon" type="image/png" sizes="128x128" href="/favicon-128x128.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* iOS Web App Capable - Enables full-screen mode when added to home screen */}
      <meta name="apple-mobile-web-app-capable" content="yes" />

      {/* iOS Status Bar Style - Controls status bar appearance in standalone mode */}
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* iOS App Title - Name shown under icon on home screen */}
      <meta name="apple-mobile-web-app-title" content="Amante" />

      {/* Disable automatic phone number detection on iOS */}
      <meta name="format-detection" content="telephone=no" />

      {/* iOS Splash Screen - You can add these later for better loading experience */}
      {/* <link rel="apple-touch-startup-image" href="/splash-iphone.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" /> */}
      {/* <link rel="apple-touch-startup-image" href="/splash-ipad.png" media="(device-width: 768px) and (device-height: 1024px)" /> */}
    </>
  );
}