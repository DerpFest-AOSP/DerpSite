import { Link, Navigate, useParams } from 'react-router-dom'
import { formatPostDate, getPostBySlug } from '../data/blog'

const postBodies = {
  '2026-10-18-october': OctoberBody,
  '2026-09-19-mid-september': MidSeptemberBody,
  '2026-09-07-android-17': Android17Body,
}

const BlogPost = () => {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const Body = postBodies[post.slug]

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-6 w-64 h-64 bg-gradient-to-r from-[#33bbff] to-[#1de099] rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
        <div className="absolute top-48 right-8 w-80 h-80 bg-gradient-to-r from-[#1de099] to-[#33bbff] rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <article className="relative z-10 py-10 px-4 max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-white/55 hover:text-white transition-colors duration-300 mb-8"
        >
          ← Back to Blog
        </Link>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/55 mb-4">
          {post.author ? (
            <Link
              to={post.author.href || post.author.github}
              className="inline-flex items-center gap-2 text-white hover:text-[#1de099] transition-colors duration-300"
            >
              <img
                src={post.author.avatar}
                alt=""
                className="h-8 w-8 rounded-full object-cover ring-1 ring-white/20"
              />
              {post.author.name}
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 text-white">
              <img src="/img/logo.png" alt="" className="h-7 w-7 rounded-full bg-white/10 p-1" />
              DerpFest Team
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-[#1de099]">
            <CalendarIcon />
            {formatPostDate(post.date, 'long')}
          </span>
        </div>
        <p className="inline-flex items-center gap-1.5 text-sm text-white/50 mb-10">
          <ClockIcon />
          {post.readMinutes} min read
        </p>

        {Body ? <Body /> : null}
      </article>
    </div>
  )
}

function OctoberBody() {
  return (
    <div className="blog-prose text-gray-300 leading-relaxed text-lg space-y-6">
      <p>
        A month after the mid-September drop, the October update is in the tree: October security patches, synced lyrics on the dynamic island, dynamic bar, and lockscreen, and four weeks of fixes on top of the scene container work.
      </p>
      <p>
        This post covers the highlights. Every change, day by day, is on the new <Link to="/changelog">Changelog</Link> page.
      </p>

      <h2>October security patches</h2>
      <p>
        This tree carries the October 2026 security patches. Google published the{' '}
        <a href="https://source.android.com/docs/security/bulletin/pixel/2026/2026-10-01" target="_blank" rel="noopener noreferrer">
          Pixel Update Bulletin
        </a>{' '}
        on October 6, with a patch level of 2026-10-05. On top of the regular Android Security Bulletin, it lists:
      </p>
      <ul className="list-disc pl-6 space-y-2 marker:text-[#1de099]">
        <li>
          <strong className="text-white">Kernel:</strong> two high-severity elevation-of-privilege fixes, in the filesystem code and the Wacom HID driver.
        </li>
        <li>
          <strong className="text-white">Bluetooth:</strong> a critical elevation-of-privilege fix.
        </li>
        <li>
          <strong className="text-white">GDMC:</strong> a critical elevation-of-privilege fix and a high-severity information disclosure fix.
        </li>
        <li>
          <strong className="text-white">GSA:</strong> a critical information disclosure fix.
        </li>
      </ul>
      <p>
        The platform side is merged into the public Android 17 tree. Kernel and firmware fixes reach your device through the kernel and vendor images your maintainer ships with the build.
      </p>

      <h2>Lyrics that follow the song</h2>
      <p>
        The headline feature: synced lyrics. Play a song and the dynamic island or dynamic bar opens into the media card with a lyrics card underneath, in Accord style. The current line sits in the middle, the previous and next lines fade out above and below, and the card scrolls on its own as the song moves.
      </p>
      <p>
        Lyrics are timed down to the word. When the source has word-level timing, the highlight sweeps through the line as each word is sung — karaoke style — instead of jumping a whole line at a time. Watch the bold line in the clip below.
      </p>

      <div className="flex justify-center py-2">
        <PhoneVideo
          src="/img/video5319249101253027048.mp4"
          poster="/img/video5319249101253027048-poster.jpg"
          label="DerpFest dynamic island expanded into a media card for Shake It Off by Taylor Swift, with a lyrics card whose current line highlights word by word"
          caption="Dynamic island with the lyrics card. The bold line lights up word by word as it is sung."
        />
      </div>

      <p>
        The lockscreen gets the same treatment. Three lines sit between the clock and the media player, the current one bright, and the same word-by-word sweep runs there too. In the shot below, <em>I&apos;m a</em> has been sung and the rest of the line is still waiting.
      </p>

      <div className="flex justify-center py-2">
        <PhoneShot
          src="/img/5359581606286402055.jpg"
          alt="DerpFest lock screen with the text clock, and synced lyrics for Rockstar by LISA above the media player"
          caption="Lockscreen lyrics with the text clock. The highlight is partway through the current line."
          wide
        />
      </div>

      <h2>Where the lyrics come from</h2>
      <p>
        Lyrics are fetched by LyricTicker, and the sources are configurable. The default is now{' '}
        <a href="https://lrclib.net/" target="_blank" rel="noopener noreferrer">
          LRCLIB
        </a>
        , an open, community-run lyrics database, instead of Netease. Word-timed YRC lyrics are supported, word-timed display is configurable, and timestamps written with colon-separated fractions parse correctly now. The status bar lyric uses the Material 3 font, so it matches the rest of the bar.
      </p>

      <h2>Now Playing, on every device</h2>
      <p>
        In September we brought Pixel&apos;s Now Playing — the song playing around you, not a media widget — to the lockscreen and said other devices would follow. They have: lockscreen Now Playing works on all devices now. It stays off until you turn it on, and the switches live in DerpFestCustomizations under lockscreen settings.
      </p>

      <h2>Dual shade, reworked</h2>
      <p>
        Dual shade got a lot of attention this month. You can set where the top edge splits between notifications and Quick Settings, swipe sideways to move between the two panels, and pick the shade panel mode on large screens. Split shade works with the Dual Shade flag on, combined shade stays put on wide screens when Dual Shade is off, and gestures and panel transitions were reworked in the latest drop.
      </p>

      <h2>Also in this update</h2>
      <ul className="list-disc pl-6 space-y-2 marker:text-[#1de099]">
        <li>
          <strong className="text-white">Obscura v2</strong> and advanced CPU/GPU model spoofing. The features come from{' '}
          <a href="https://github.com/Pixelify-AOSP" target="_blank" rel="noopener noreferrer">
            ASCP
          </a>
          , with the UI for both redesigned by us in Material 3 Expressive, so they look at home in DerpFestCustomizations.
        </li>
        <li>
          <strong className="text-white">Custom fonts:</strong> a new fonts section in DerpFestCustomizations that imports a single font file, or lets you pick one out of a ZIP archive. Thanks to{' '}
          <a href="https://uwuaosp.uwuniverse.org/" target="_blank" rel="noopener noreferrer">
            uwuAOSP
          </a>{' '}
          for the fonts work.
        </li>
        <li>
          <strong className="text-white">DerpLauncher:</strong> app rename, a per-app icon picker, app drawer styles and sort options, custom app drawer backgrounds, and pinning apps in recents are back. App rename comes from{' '}
          <a href="https://github.com/Lunaris-AOSP" target="_blank" rel="noopener noreferrer">
            LunarisAOSP
          </a>
          . Plus performance work from Yaap and a stack of layout fixes for large screens and cutouts.
        </li>
        <li>
          <strong className="text-white">Pixel live wallpapers</strong> can be downloaded straight from the wallpaper picker.
        </li>
        <li>
          <strong className="text-white">Simple View</strong>, the accessibility option from Pixels, is in Settings.
        </li>
        <li>
          <strong className="text-white">Pulse</strong> gets custom color and height, and fades in and out. The Pulse additions come from{' '}
          <a href="https://github.com/Lunaris-AOSP" target="_blank" rel="noopener noreferrer">
            LunarisAOSP
          </a>
          .
        </li>
      </ul>
      <p>
        That is far from all of it. The <Link to="/changelog">Changelog</Link> has every fix since September 21.
      </p>

      <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-6 md:p-8 mt-10">
        <h2 className="!mt-0">Get the source</h2>
        <p>
          Initialize against the Android 17 branch of the official manifest:
        </p>
        <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 overflow-x-auto">
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
            <code>
{`repo init -u https://github.com/DerpFest-AOSP/android_manifest.git -b 17 --git-lfs
repo sync`}
            </code>
          </pre>
        </div>
        <p className="mb-0">
          From there it is the usual <code className="text-[#1de099]">. build/envsetup.sh</code>, lunch, and{' '}
          <code className="text-[#1de099]">m derp</code>. Full notes are on the <Link to="/build">Build</Link> page, and trees live under{' '}
          <a href="https://github.com/DerpFest-AOSP" target="_blank" rel="noopener noreferrer">
            DerpFest-AOSP
          </a>
          .
        </p>
      </div>
    </div>
  )
}

function MidSeptemberBody() {
  return (
    <div className="blog-prose text-gray-300 leading-relaxed text-lg space-y-6">
      <p>
        Two weeks after the Android 17 tree went public, another source drop. Call it the mid-September update: September security patches, a lot of bugfixes around the scene container flag from the first drop, a redesigned recovery, and a few new features.
      </p>
      <p>
        Official images still follow the maintainers. The tree is there now if you want to compile it. Same{' '}
        <a href="https://github.com/DerpFest-AOSP/android_manifest" target="_blank" rel="noopener noreferrer">
          official manifest
        </a>
        , same <Link to="/build">Build</Link> page.
      </p>

      <h2>September security patches</h2>
      <p>
        This tree pulls in the September 2026 security patches. Google published the{' '}
        <a href="https://source.android.com/docs/security/bulletin/pixel/2026/2026-09-01" target="_blank" rel="noopener noreferrer">
          Pixel Update Bulletin
        </a>{' '}
        on September 15. Newest patches, on the public Android 17 tree.
      </p>

      <h2>Scene container, after the first drop</h2>
      <p>
        The first Android 17 source drop force-enabled the scene container aconfig flag. That flag turns on the modern scene-based architecture for core SystemUI surfaces — lockscreen, shade, and Quick Settings. Dual shade and the new Panels page came with it.
      </p>
      <p>
        Enabling it on QPR0 was the right call. This drop is the follow-through: lockscreen, shade, and Quick Settings behaving like a scene-based SystemUI instead of fighting the old view hierarchy.
      </p>
      <p>
        With that work in, we turned on more blur flags that had to stay off in the first drop. Lockscreen notifications are blurred now — you can see it on the text-clock shot below, the one with the Telegram cards over the wallpaper.
      </p>
      <p>
        If something felt off after the first sync — shade transitions, lockscreen layout, Quick Settings on dual shade — this is the tree that is supposed to settle it. Keep reporting what still breaks.
      </p>

      <h2>A lockscreen clock that writes the time</h2>
      <p>
        First new feature we want to show: a custom lockscreen clock in the native AOSP theme picker. Open Wallpaper &amp; style, pick Clock, and one of the styles writes the time as words instead of digits — <em>It&apos;s Seventeen Nineteen</em>, not 17:19.
      </p>
      <p>
        Some people will remember that from much older Android. The clock is originally from{' '}
        <a href="https://github.com/FundamentalOS" target="_blank" rel="noopener noreferrer">
          Fundamental OS
        </a>
        . Their developer worked with us to bring it up on Android 17 with scene container enabled, so it actually lives in the new lockscreen instead of a leftover view.
      </p>
      <p>
        Style, color, and size are the usual Clock sheet tabs. Apply it and the lockscreen uses words for the time, including when notifications are on the shade — those cards are blurred now too.
      </p>

      <div className="flex justify-center py-2">
        <PhoneShot
          src="/img/5260283710454572854.jpg"
          alt="AOSP theme picker Clock sheet with the text clock selected, previewing It’s Seventeen Nineteen"
          caption="Clock in the theme picker — the text style, previewing It’s Seventeen Nineteen."
          wide
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-2">
        <PhoneShot
          src="/img/5267227113499075516.jpg"
          alt="DerpFest lock screen with a text clock reading It’s Two Fifty Three"
          caption="On the lockscreen: It’s Two Fifty Three."
        />
        <PhoneShot
          src="/img/5273879992070775175.jpg"
          alt="DerpFest lock screen with a text clock reading Twelve Thirty Three above blurred notification cards"
          caption="Same clock with notifications on the shade — Twelve Thirty Three. Lockscreen notification cards are blurred now."
        />
      </div>

      <h2>Pixel exclusives, from Fundamental OS</h2>
      <p>
        The text clock is not the only thing we took from{' '}
        <a href="https://github.com/FundamentalOS" target="_blank" rel="noopener noreferrer">
          Fundamental OS
        </a>
        . They reverse-engineered a lot of Pixel-only SystemUI. That work is in this tree now.
      </p>
      <p>
        Now Playing on the lockscreen — the song playing around you, not a media-player widget (will soon also be available for non-Pixels). Pixel&apos;s screenshot reveal animation. Calculator and Calendar as lockscreen quick affordances. A refresh-rate boost before you authenticate, so the lockscreen does not sit on a low panel. And Pixel&apos;s on-device back-gesture classifier, so an edge swipe decides back the way a Pixel does.
      </p>

      <h2>Color pickers, rewritten</h2>
      <p>
        We also rewrote our color pickers. The old ones looked like Android 7 — a leftover dialog with a hex field and not much else. They did the job. They did not look like they belonged on Android 17.
      </p>
      <p>
        They do now. Gradients, for example, gets a hue wheel, a value slider, and the hex sitting on the color you actually picked. Drag the wheel and those digits roll with the color instead of snapping to the new code. That shot is Gradient end color for Quick Settings tile backgrounds. Monet Personalization still lets you tap the wallpaper to pull an accent off the photo. We only redesigned the dialog.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-2">
        <PhoneShot
          src="/img/5291907004899204476.jpg"
          alt="DerpFest Gradients settings with a hue wheel, value slider, and hex field for the Quick Settings tile gradient end color"
          caption="Gradient end color — hue wheel, slider, hex that rolls with the color."
        />
        <PhoneShot
          src="/img/5274169159333912994.jpg"
          alt="DerpFest Monet Personalization picker letting you tap a wallpaper photo to choose an accent color"
          caption="Monet Personalization — same wallpaper tap, new dialog."
        />
      </div>

      <h2>A gradient for the dual-shade status chip</h2>
      <p>
        Dual shade puts a status chip in the Quick Settings header — connectivity on the right, date on the left. We added a gradient styling option for that chip, so it can follow the same look as the rest of the shade instead of sitting there as a flat pill.
      </p>

      <div className="py-2">
        <PhoneShot
          src="/img/5291907004899204560.jpg"
          alt="DerpFest dual-shade Quick Settings header with a gradient status chip showing 5G, signal, and a heart"
          caption="Dual shade Quick Settings — the status chip on a gradient."
          landscape
        />
      </div>

      <h2>HD calling and the Wi-Fi standard badge</h2>
      <p>
        Android 17&apos;s status bar is smaller. The HD calling mark and the Wi-Fi 4 / 5 / 6 / 7 badge were drawn for the old canvas, so they sat wrong on the new signal icons — HD in particular could vanish into the tighter mobile container.
      </p>
      <p>
        Thanks to{' '}
        <a href="https://github.com/AOSPA" target="_blank" rel="noopener noreferrer">
          AOSPA
        </a>
        . They redrew the Wi-Fi generation badges for Android 17 and put that overlay on the modern status bar pipeline. HD calling stays visible on the smaller signal icon instead of getting clipped off.
      </p>
      <p>
        We only had to adapt their Wi-Fi badge. DerpFest has always put it on the left of the icon; AOSPA puts it lower-right. The badge hides when there is no internet, so you do not get a generation number next to an exclamation.
      </p>

      <h2>Recovery, redesigned</h2>
      <p>
        Recovery still had the old logo. It sat like that for a long time. This drop finally puts current DerpFest branding on it — the owl, the wordmark, a Recovery pill, DerpFest v17 Official on the device line. It finally looks like it belongs on the same device as the rest of DerpFest.
      </p>

      <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-6 md:p-8 mt-10">
        <h2 className="!mt-0">Get the source</h2>
        <p>
          Initialize against the Android 17 branch of the official manifest:
        </p>
        <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 overflow-x-auto">
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
            <code>
{`repo init -u https://github.com/DerpFest-AOSP/android_manifest.git -b 17 --git-lfs
repo sync`}
            </code>
          </pre>
        </div>
        <p className="mb-0">
          From there it is the usual <code className="text-[#1de099]">. build/envsetup.sh</code>, lunch, and{' '}
          <code className="text-[#1de099]">m derp</code>. Full notes are on the <Link to="/build">Build</Link> page, and trees live under{' '}
          <a href="https://github.com/DerpFest-AOSP" target="_blank" rel="noopener noreferrer">
            DerpFest-AOSP
          </a>
          .
        </p>
      </div>
    </div>
  )
}

function Android17Body() {
  return (
    <div className="blog-prose text-gray-300 leading-relaxed text-lg space-y-6">
      <p>
        DerpFest&apos;s Android 17 source is public. Same project, same priorities — original features, Pixel-aligned design, and a tree you can actually build — now on AOSP 17.
      </p>
      <p>
        Official images will land as maintainers bring devices up. Until then the source is there for anyone who wants to compile it, port a device, or just see what we shipped. Start from the{' '}
        <a href="https://github.com/DerpFest-AOSP/android_manifest" target="_blank" rel="noopener noreferrer">
          official manifest
        </a>{' '}
        or follow the flow on our <Link to="/build">Build</Link> page.
      </p>

      <h2>What&apos;s new in theming</h2>
      <p>
        Android 17 is the platform jump. The extra color controls in Wallpaper &amp; style are Google&apos;s QPR2 work — we force-enabled them so they already show on our QPR0 tree. Icon packs and Pixel wallpaper effects in the same picker are ours.
      </p>

      <h2>QPR2 color options, already showing</h2>
      <p>
        Android 17 QPR2 Beta 3 coverage has been about more theming options: a hue slider and four main color styles for more granular color customization.{' '}
        <a href="https://9to5google.com/2026/08/14/android-17-qpr2-dynamic-color/" target="_blank" rel="noopener noreferrer">
          9to5Google
        </a>{' '}
        covered the Pixel side of that drop.
      </p>
      <p>
        That code is already in the public QPR0 source. It just was not turned on. We force-enabled the flags so Colors shows it now: Wallpaper &amp; style still gives you a live home preview and wallpaper-derived swatches, plus the slider to pick an exact hue and the four styles (Neutral, Soft, Bright, Bold) for how hard that color hits the chrome.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-2">
        <PhoneShot
          src="/img/5257988497111458122.jpg"
          alt="DerpFest Android 17 hue slider with a live lock screen and Quick Settings preview"
          caption="The hue slider — pick a color and the preview tiles update with you."
        />
        <PhoneShot
          src="/img/5257988497111458123.jpg"
          alt="DerpFest Android 17 color styles Neutral, Soft, Bright, and Bold with a live preview"
          caption="The four QPR2 styles: Neutral, Soft, Bright, and Bold."
        />
      </div>

      <h2>Icon packs, in the native picker</h2>
      <p>
        We moved Play Store icon pack selection into the native AOSP theme picker, under Icon style. Default and Minimal still live there, and so do packs you installed from Play — CandyCons, Pix Material, whatever you use.
      </p>
      <p>
        Style, shape, and names are tabs in the same Icons sheet. Theming is no longer split between a system picker and a separate Play Store icon-pack flow. You pick a pack, see it on the home preview, and apply it with everything else.
      </p>

      <div className="flex justify-center py-2">
        <PhoneShot
          src="/img/5258294741164564859.jpg"
          alt="DerpFest Android 17 Icons picker with Play Store icon packs in the native Style tab"
          caption="Icon style in the theme picker. Play Store packs sit next to Default and Minimal."
          wide
        />
      </div>

      <h2>Pixel wallpaper effects, from the theme picker</h2>
      <p>
        We dropped Axion Wallpaper Effects. In its place are the original Pixel wallpaper effects, launched directly from the AOSP theme picker — no extra app, no second entry point.
      </p>
      <p>
        Open Wallpaper &amp; style and you get Wallpaper Studio as Pixel ships it: Live effects, AI wallpaper, and Emoji Workshop, plus My photos and the usual collections (including DerpFest wallpapers). Same sheet as colors and icons. Theming stays in one place.
      </p>

      <div className="flex justify-center py-2">
        <PhoneShot
          src="/img/5258294741164564914.jpg"
          alt="DerpFest Android 17 Wallpaper picker with Pixel Wallpaper Studio live effects, AI wallpaper, and Emoji Workshop"
          caption="Pixel Wallpaper Studio in the native picker — Live effects, AI wallpaper, and Emoji Workshop."
          wide
        />
      </div>

      <h2>QPR1 Beta 6 wallpaper carousel, in our launcher</h2>
      <p>
        Android 17 QPR1 Beta 6 gave Pixel a new homescreen wallpaper carousel in the long-press Wallpaper &amp; style sheet: the current wallpaper sits in a wide pill, the rest are circles you can swipe through. That UI lives in closed Pixel Launcher. We ported the same style into our open Launcher3-based launcher.
      </p>
      <p>
        Long-press the home screen and you get the new carousel next to Widgets, Apps list, and Home settings. Pick a wallpaper there and it applies without bouncing into a separate Pixel-only app.
      </p>

      <div className="flex justify-center py-2">
        <PhoneShot
          src="/img/5257988497111458120.jpg"
          alt="DerpFest launcher long-press menu with the QPR1 Beta 6 wallpaper carousel: a wide selected pill and circular wallpaper thumbnails"
          caption="Wallpaper & style on the home screen — selected wallpaper as a pill, the rest as circles."
          wide
        />
      </div>

      <h2>Separate or combined Quick Settings</h2>
      <p>
        DerpFest on Android 17 has the dual shade and scene container flags enabled. That unlocks a new option page — Notifications &amp; Quick Settings — where you choose how the shade opens.
      </p>
      <p>
        <strong className="text-white">Separate</strong> splits the gestures: swipe down from the top right for Quick Settings, top left for notifications. <strong className="text-white">Combined (classic)</strong> keeps the single panel most people already know. Pick one and the rest of the shade follows.
      </p>
      <p>
        Our custom QS features still work on top of that — gradient tiles and sliders, data usage, a custom QS header image, tile shapes, and more. Dual shade is the platform plumbing. The extras you already use in DerpFest are still there.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-2">
        <PhoneShot
          src="/img/5258294741164564867.jpg"
          alt="DerpFest Android 17 Notifications and Quick Settings page with Separate and Combined panel options"
          caption="The new Panels page: Separate dual shade, or Combined (classic)."
        />
        <PhoneShot
          src="/img/5257988497111457610.jpg"
          alt="DerpFest Android 17 Quick Settings with gradient tiles and sliders, data usage, a custom header image, and custom tile shapes"
          caption="Custom QS on Android 17 — gradient tiles and slider, data usage, custom header image, tile shapes, and more."
        />
      </div>

      <h2>The QS layout editor, finished on QPR0</h2>
      <p>
        Coverage of Android 17 QPR2 Beta 3 has been about a new Quick Settings layout editor: tap the pencil, open the Layout tab, and reorder the shade to your liking — tiles, brightness, media player.{' '}
        <a href="https://9to5google.com/2026/08/14/customize-pixel-quick-settings/" target="_blank" rel="noopener noreferrer">
          9to5Google
        </a>{' '}
        walked through what Google is shipping there.
      </p>
      <p>
        DerpFest is based on Android 17 QPR0, which is the only public AOSP 17 source so far. That tree already had the editor — half-baked. We finished it. Same idea as the QPR2 story: drag the tile grid, media player, brightness slider, and volume slider into the order you want.
      </p>
      <p>
        We also moved our position options into the editor. Each block gets a chip; tap it and a blur bottom sheet opens with the choices. Brightness, for example: always (including Quick QS), only when expanded, or hidden. The extras stay next to the layout they belong to, not in a separate settings page.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-2">
        <PhoneShot
          src="/img/5195455890700574162.jpg"
          alt="DerpFest Android 17 Quick Settings layout editor with reorderable tiles, media player, brightness, and volume blocks"
          caption="Layout tab — drag tiles, media, brightness, and volume into the order you want."
        />
        <PhoneShot
          src="/img/5195455890700574173.jpg"
          alt="DerpFest Android 17 brightness slider chip opening a blur bottom sheet with position options"
          caption="A chip on the block opens a blur sheet — always, expanded only, or hidden."
        />
      </div>

      <h2>Style pickers, rebuilt</h2>
      <p>
        We went through the style picker preferences and made them actually look like something you want to tap. Same options as before — status bar clock chips, QS tile shapes, custom logos, notification icon modes — but every choice now has a preview in a denser, Material You dialog instead of a flat list of names.
      </p>
      <p>
        You see the chip, the shape, the logo, or the notification treatment before you hit OK. The pickers share one visual language, so Settings feels consistent instead of a pile of leftover dialogs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-2">
        <PhoneShot
          src="/img/5258294741164565200.jpg"
          alt="DerpFest Android 17 Background chip style picker with visual previews for status bar clock chips"
          caption="Background chip — each clock-chip style has a preview, not just a label."
        />
        <PhoneShot
          src="/img/5258294741164565201.jpg"
          alt="DerpFest Android 17 Classic tile icon shape picker with a grid of Quick Settings tile shapes"
          caption="Classic tile icon shape — a clear grid for QS tile geometry."
        />
        <PhoneShot
          src="/img/5258294741164565202.jpg"
          alt="DerpFest Android 17 Custom logo style picker with a grid of status bar logo options"
          caption="Logo style — pick a status bar mark from a themed icon grid."
        />
        <PhoneShot
          src="/img/5258294741164565203.jpg"
          alt="DerpFest Android 17 Notification icons picker with a preview on each option"
          caption="Notification icons — show icon, app icons, count, or hide, each with a preview."
        />
      </div>

      <h2>Qualcomm BoostFramework</h2>
      <p>
        Not everything in this tree has a screenshot. We implemented Qualcomm&apos;s BoostFramework on Snapdragon builds.
      </p>
      <p>
        BoostFramework is Qualcomm&apos;s vendor API for short, targeted frequency boosts. When something needs to feel immediate — an app launch, a fling, a window animation — the framework can raise CPU, GPU, and related system clocks for a moment, then drop them again. It is not a permanent overclock. It is a hint to the SoC that the next few frames matter.
      </p>
      <p>
        DerpFest now talks to that API so Snapdragon devices can use the same boost path OEM skins already rely on, instead of leaving those hints unused in an AOSP tree.
      </p>

      <h2>Smartspacer, in DerpFest Launcher</h2>
      <p>
        <a href="https://github.com/KieronQuinn/Smartspacer" target="_blank" rel="noopener noreferrer">
          Smartspacer
        </a>
        , by Kieron Quinn, is a drop-in At a Glance replacement: plugins, complications, and a requirements system that can surface a loyalty card at the store or a gym pass at the gym — without throwing away Google&apos;s own At a Glance data. On stock Pixel that usually means Shizuku and a widget.
      </p>
      <p>
        <a href="https://uwuaosp.uwuniverse.org/" target="_blank" rel="noopener noreferrer">
          uwuAOSP
        </a>{' '}
        did the actual work of wiring Smartspacer into AOSP Launcher3 as a native client. We ported that integration into DerpFest Launcher. Install Smartspacer, pick your targets, and At a Glance on the DerpFest home screen is the upgraded one.
      </p>

      <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-6 md:p-8 mt-10">
        <h2 className="!mt-0">Get the source</h2>
        <p>
          Initialize against the Android 17 branch of the official manifest:
        </p>
        <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 overflow-x-auto">
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
            <code>
{`repo init -u https://github.com/DerpFest-AOSP/android_manifest.git -b 17 --git-lfs
repo sync`}
            </code>
          </pre>
        </div>
        <p className="mb-0">
          From there it is the usual <code className="text-[#1de099]">. build/envsetup.sh</code>, lunch, and{' '}
          <code className="text-[#1de099]">m derp</code>. Full notes are on the <Link to="/build">Build</Link> page, and trees live under{' '}
          <a href="https://github.com/DerpFest-AOSP" target="_blank" rel="noopener noreferrer">
            DerpFest-AOSP
          </a>
          .
        </p>
      </div>
    </div>
  )
}

function PhoneShot({ src, alt, caption, wide = false, landscape = false }) {
  return (
    <figure className={wide ? 'w-full max-w-sm' : 'w-full'}>
      <div
        className={`bg-gradient-to-br from-[#33bbff] to-[#1de099] p-1 shadow-2xl ${
          landscape ? 'rounded-2xl' : 'rounded-3xl'
        }`}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto bg-black ${landscape ? 'rounded-[0.9rem]' : 'rounded-[1.35rem]'}`}
          draggable="false"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-white/50 leading-relaxed text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function PhoneVideo({ src, poster, label, caption }) {
  return (
    <figure className="w-full max-w-sm">
      <div className="bg-gradient-to-br from-[#33bbff] to-[#1de099] p-1 shadow-2xl rounded-3xl">
        <video
          src={src}
          poster={poster}
          aria-label={label}
          className="w-full h-auto bg-black rounded-[1.35rem]"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-white/50 leading-relaxed text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export default BlogPost
