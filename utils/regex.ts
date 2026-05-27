export const skillMatchers: Record<string, RegExp[]> = {
    react: [/\breact(?:\.js)?\b/i],
    html: [/\bhtml(?:5)?\b/i],
    css: [/\bcss(?:3)?\b/i, /\bsass\b/i, /\bscss\b/i],
    javascript: [/\bjavascript\b/i, /\becmascript\b/i, /\bjs\b/i],
    typescript: [/\btypescript\b/i, /\bts\b/i],
    "next.js": [/\bnext(?:\.js)?\b/i],
    "node.js": [/\bnode(?:\.js)?\b/i, /\bexpress\b/i],
    tailwind: [/\btailwind(?:css)?\b/i],
    git: [/\bgit\b/i, /\bgithub\b/i, /\bgitlab\b/i],
    sql: [/\bsql\b/i, /\bpostgres(?:ql)?\b/i, /\bmysql\b/i, /\bsqlite\b/i],
};