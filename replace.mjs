import fs from "fs";
const file = "src/pages/TeamPage.tsx";
let code = fs.readFileSync(file, "utf8");

code = code.replace(/<div className="more-icon">↗<\/div>/g, '<div className="more-icon"><span className="desktop-icon">↗</span><span className="mobile-text">Подробнее</span></div>');

// Add onClick to all team-card-inner elements except join-card
// We can use a regex to inject onClick={() => toggleFlip(X)}
let index = 0;
code = code.replace(/<div className="team-card-inner(.*?)"(.*?)>/g, (match, classes, other) => {
  if (classes.includes("join-card")) {
     return match;
  }
  const currentIdx = index++;
  const extraClass = `\${flippedIndex === ${currentIdx} ? " is-flipped" : ""}`;
  
  // classes might already be ending with quote, e.g. "team-card-inner accent-gradient"
  // Let's replace className="..." with className={`... ${extraClass}`}
  let newMatch = match.replace(/className="(.*?)"/, `className={\`$1 ${extraClass}\`} onClick={() => toggleFlip(${currentIdx})}`);
  return newMatch;
});

fs.writeFileSync(file, code);
console.log("Updated TeamPage.tsx");
