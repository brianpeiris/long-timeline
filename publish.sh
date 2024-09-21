git branch -D gh-pages
git checkout -b gh-pages
npm run build
mv dist/* .
rm -rf dist
git add .
git commit -m "publish $(date -Iseconds)"
git push origin gh-pages -f
git checkout main
