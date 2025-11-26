module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. **"Commit new file"** click

---

#### File 7: `.gitignore` Create

1. **"Add file"** → **"Create new file"**
2. File name: `.gitignore`
3. Code:
```
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

4. **"Commit new file"** click

---

### ✅ Final Structure Dekhte Hobe Emn:
```
stylehub-ecommerce/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md
