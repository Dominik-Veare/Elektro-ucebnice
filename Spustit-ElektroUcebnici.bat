@echo off
title ElektroUcebnice 26-017-H
echo ========================================================
echo   ElektroUcebnice - Monter elektrickych instalaci
echo   Statni zkouska 26-017-H
echo ========================================================
echo.
echo Spoustim aplikaci...
start http://localhost:4173
call npm run preview
pause
