#!/bin/bash

# Minify JavaScript
terser src/js/app.js -o src/js/app.min.js

# Minify CSS
cssnano src/css/styles.css src/css/styles.min.css

# Minify components
terser src/components/tasks.js -o src/components/tasks.min.js

echo "Minification complete!"
