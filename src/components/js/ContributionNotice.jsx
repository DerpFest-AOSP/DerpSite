import '../css/ContributionNotice.css'

const ContributionNotice = () => {
   return (
      <aside className="contribution-notice" aria-label="Stolen code documentation">
         <div className="contribution-notice-box">
            <p className="contribution-notice-title">Stolen Code Documentation</p>
            <p className="contribution-notice-text">
               We maintain a public record of DerpFest code being copied and misattributed.
            </p>
            <a
               href="https://www.pranavvashi.com"
               target="_blank"
               rel="noopener noreferrer"
               className="contribution-notice-link"
            >
               View the documentation
            </a>
         </div>
      </aside>
   )
}

export default ContributionNotice
