import { Link } from 'react-router-dom'
import { formatPostDate, getSortedPosts } from '../data/blog'

const Blog = () => {
  const posts = getSortedPosts()
  const [featured, ...rest] = posts

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-8 w-72 h-72 bg-gradient-to-r from-[#33bbff] to-[#1de099] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-8 w-96 h-96 bg-gradient-to-r from-[#1de099] to-[#33bbff] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 py-12 px-4 max-w-5xl mx-auto">
        <header className="mb-14 md:mb-20">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-5">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33bbff] to-[#1de099] gradient-shift">DerpFest</span> Blog.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Source releases, feature deep dives, and what we are shipping next.
          </p>
        </header>

        {featured && <FeaturedCard post={featured} />}

        {rest.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function FeaturedCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl hover:shadow-[#33bbff]/20 hover:-translate-y-1 transition-all duration-500"
    >
      <div className="relative bg-black/40 min-h-[260px] md:min-h-[340px] flex items-end justify-center gap-3 md:gap-6 px-4 pt-10 pb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f23] via-transparent to-transparent pointer-events-none"></div>
        {(post.coverPair ?? [{ src: post.cover, alt: post.coverAlt }]).map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`relative z-10 w-[42%] max-w-[220px] rounded-2xl border border-white/15 shadow-2xl shadow-black/40 transition-transform duration-500 ${
              index === 0 ? 'group-hover:-rotate-2 -rotate-3 origin-bottom' : 'group-hover:rotate-2 rotate-3 origin-bottom'
            }`}
            draggable="false"
          />
        ))}
      </div>

      <div className="p-6 md:p-10">
        <PostMeta date={post.date} readMinutes={post.readMinutes} author={post.author} />
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#33bbff] group-hover:to-[#1de099] transition-colors duration-300">
          {post.title}
        </h2>
        <p className="mt-4 text-white/70 leading-relaxed text-lg max-w-3xl">{post.excerpt}</p>
        <span className="mt-8 inline-flex items-center gap-2 text-white font-semibold">
          Read Full Story
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}

function ArticleCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden shadow-xl hover:shadow-[#33bbff]/20 hover:-translate-y-1 transition-all duration-500"
    >
      <div className="relative bg-black/40 overflow-hidden">
        <img
          src={post.cover}
          alt={post.coverAlt}
          className="w-full h-56 object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
          draggable="false"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <PostMeta date={post.date} readMinutes={post.readMinutes} author={post.author} />
        <h3 className="mt-3 text-2xl font-semibold text-white">{post.title}</h3>
        <p className="mt-3 text-white/65 leading-relaxed flex-1">{post.excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-white font-medium">
          Read Article
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}

function PostMeta({ date, readMinutes, author }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/50">
      {author && (
        <span className="inline-flex items-center gap-2 text-white/80">
          <img
            src={author.avatar}
            alt=""
            className="h-6 w-6 rounded-full object-cover ring-1 ring-white/20"
          />
          {author.name}
        </span>
      )}
      <span className="inline-flex items-center gap-1.5 text-[#1de099]">
        <CalendarIcon />
        {formatPostDate(date)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ClockIcon />
        {readMinutes} min read
      </span>
    </div>
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

export default Blog
