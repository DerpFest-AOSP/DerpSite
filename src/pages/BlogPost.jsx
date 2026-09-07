import { Link, Navigate, useParams } from 'react-router-dom'
import { formatPostDate, getPostBySlug } from '../data/blog'

const postBodies = {
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
          <span className="inline-flex items-center gap-2 text-white">
            <img src="/img/logo.png" alt="" className="h-7 w-7 rounded-full bg-white/10 p-1" />
            DerpFest Team
          </span>
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
        Our custom QS features still work on top of that — tile shapes, layout studio, gradient brightness and volume sliders, media card, the lot. Dual shade is the platform plumbing. The extras you already use in DerpFest are still there.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-2">
        <PhoneShot
          src="/img/5258294741164564867.jpg"
          alt="DerpFest Android 17 Notifications and Quick Settings page with Separate and Combined panel options"
          caption="The new Panels page: Separate dual shade, or Combined (classic)."
        />
        <PhoneShot
          src="/img/5257988497111457610.jpg"
          alt="DerpFest Android 17 Quick Settings with custom tile shapes, gradient sliders, and media card"
          caption="Custom QS on Android 17 — shaped tiles, gradient sliders, media card, still working."
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
          <code className="text-[#1de099]">mka derp</code>. Full notes are on the <Link to="/build">Build</Link> page, and trees live under{' '}
          <a href="https://github.com/DerpFest-AOSP" target="_blank" rel="noopener noreferrer">
            DerpFest-AOSP
          </a>
          .
        </p>
      </div>
    </div>
  )
}

function PhoneShot({ src, alt, caption, wide = false }) {
  return (
    <figure className={wide ? 'w-full max-w-sm' : 'w-full'}>
      <div className="bg-gradient-to-br from-[#33bbff] to-[#1de099] p-1 rounded-3xl shadow-2xl">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto rounded-[1.35rem] bg-black"
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
