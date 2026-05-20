@echo off
cd /d "%~dp0"
set STREAMLIT_BROWSER_GATHER_USAGE_STATS=false
if not exist "%USERPROFILE%\.streamlit" mkdir "%USERPROFILE%\.streamlit"
if not exist "%USERPROFILE%\.streamlit\credentials.toml" (
  > "%USERPROFILE%\.streamlit\credentials.toml" echo [general]
  >> "%USERPROFILE%\.streamlit\credentials.toml" echo email = ""
)
python -m streamlit run specforge\streamlit_wrapper.py
if %ERRORLEVEL% EQU 0 goto :done
py -m streamlit run specforge\streamlit_wrapper.py
if %ERRORLEVEL% EQU 0 goto :done
echo.
echo [ERROR] Khong tim thay Streamlit trong moi truong Python hien tai.
echo Hay cai dat bang lenh:
echo   python -m pip install streamlit
echo Hoac:
echo   py -m pip install streamlit
:done
pause
