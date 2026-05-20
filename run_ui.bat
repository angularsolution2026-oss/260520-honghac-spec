@echo off
cd /d "%~dp0"
set STREAMLIT_BROWSER_GATHER_USAGE_STATS=false
if not exist "%USERPROFILE%\.streamlit" mkdir "%USERPROFILE%\.streamlit"
if not exist "%USERPROFILE%\.streamlit\credentials.toml" (
  > "%USERPROFILE%\.streamlit\credentials.toml" echo [general]
  >> "%USERPROFILE%\.streamlit\credentials.toml" echo email = ""
)
streamlit run tools\switchboard_ui.py
pause
