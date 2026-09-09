const companies = ["Northstar", "Morrow", "KIN", "Fieldwork", "Aster", "Goodland"];

export function LogoMarquee() {
  return <div className="logo-marquee" aria-label="Companies that trust Manus"><div className="logo-track">{[...companies, ...companies].map((company, index) => <span key={`${company}-${index}`}>{company}</span>)}</div></div>;
}
