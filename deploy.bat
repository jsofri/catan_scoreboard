git checkout gh-pages

git rm -r --cached .

xcopy /E /Y build .
