@echo off
REM Ensure you are on the main branch
git checkout main

REM Build your static site (assumes Flask-Freeze has been run already)
python freeze.py

REM Check if gh-pages branch exists
git rev-parse --verify gh-pages
IF %ERRORLEVEL% EQU 0 (
    REM Switch to the gh-pages branch if it exists
    git checkout gh-pages
) ELSE (
    REM Create an orphan gh-pages branch if it doesn't exist
    git checkout --orphan gh-pages
)

REM Remove all files from the gh-pages branch
git rm -rf .

REM Copy the contents of the build folder to the root of the gh-pages branch
xcopy build\* .\ /s /e /y

REM Commit and push the changes to the gh-pages branch
git add .
git commit -m "Deploy static site to GitHub Pages"
git push origin gh-pages --force

REM Switch back to the main branch
git checkout main
