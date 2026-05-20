#!/usr/bin/env python3
"""Streamlit UI for tools/ai_switchboard.py.

Run:
    streamlit run tools/switchboard_ui.py
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

import streamlit as st

REPO_ROOT = Path(__file__).resolve().parents[1]
SWITCHBOARD = REPO_ROOT / "tools" / "ai_switchboard.py"
TASK_GRAPH = REPO_ROOT / ".ai" / "planning" / "TASK_GRAPH.md"


def list_tasks() -> list[str]:
    ids: list[str] = []
    if not TASK_GRAPH.exists():
        return ["P0-000"]
    for line in TASK_GRAPH.read_text(encoding="utf-8", errors="replace").splitlines():
        m = re.match(r"^\|\s*`?(P\d+-\d+|GOV-[A-Z0-9-]+)`?\s*\|", line)
        if m:
            tid = m.group(1)
            if tid not in ids:
                ids.append(tid)
    return ids or ["P0-000"]


def run_switchboard(args: list[str]) -> tuple[int, str]:
    cmd = [sys.executable, str(SWITCHBOARD), *args]
    proc = subprocess.run(
        cmd,
        cwd=str(REPO_ROOT),
        text=True,
        capture_output=True,
        encoding="utf-8",
        errors="replace",
    )
    output = (proc.stdout or "") + (("\n[stderr]\n" + proc.stderr) if proc.stderr else "")
    return proc.returncode, output


st.set_page_config(page_title="AI Switchboard", layout="wide")
st.title("AI Switchboard")
st.caption(f"Repo: `{REPO_ROOT}`")

if "output" not in st.session_state:
    st.session_state.output = ""
if "last_cmd" not in st.session_state:
    st.session_state.last_cmd = ""

tasks = list_tasks()

with st.sidebar:
    st.header("Chọn task")
    task = st.selectbox("Task ID", tasks, index=0)
    st.divider()
    st.header("Tham số tuỳ chọn")
    checkpoint = st.text_input("Checkpoint (để trống = auto)", value="")
    reason = st.text_input("Reason", value="")
    actor = st.text_input("Actor", value="human")
    run_after_approve = st.checkbox("Approve xong chạy luôn (--run)", value=False)

col1, col2, col3, col4 = st.columns(4)


def execute(label: str, args: list[str]) -> None:
    st.session_state.last_cmd = "python tools/ai_switchboard.py " + " ".join(args)
    with st.spinner(f"Đang chạy: {label}..."):
        code, out = run_switchboard(args)
    st.session_state.output = f"[exit={code}]\n{out}"


with col1:
    st.subheader("Xem")
    if st.button("Overview", use_container_width=True):
        execute("overview", ["overview"])
    if st.button("List tasks", use_container_width=True):
        execute("list", ["list"])
    if st.button("Status", use_container_width=True):
        execute("status", ["status", "--task", task])
    if st.button("Resume", use_container_width=True):
        execute("resume", ["resume", "--task", task])

with col2:
    st.subheader("Chạy thử")
    if st.button("Dry-run (an toàn)", use_container_width=True):
        execute("dry-run", ["dry-run", "--task", task])
    if st.button("Doctor (health check)", use_container_width=True):
        execute("doctor", ["doctor", "--task", task])
    if st.button("Prompt (in ra)", use_container_width=True):
        execute("prompt", ["prompt", "--task", task])
    if st.button("Prompt → ghi file", use_container_width=True):
        out_path = f".ai/evidence/prompts/{task}.MASTER_PROMPT.md"
        execute("prompt-write", ["prompt", "--task", task, "--out", out_path])

with col3:
    st.subheader("Runtime packet")
    if st.button("Xem RUNTIME_PACKET", use_container_width=True):
        execute("runtime-packet", ["runtime-packet", "--task", task])
    if st.button("Ghi RUNTIME_PACKET", use_container_width=True):
        execute("runtime-packet-write", ["runtime-packet", "--task", task, "--write"])

with col4:
    st.subheader("⚠️ Thay đổi state")
    st.caption("Chỉ approve sau khi human review xong.")
    if st.button("Approve", type="primary", use_container_width=True):
        args = ["approve", "--task", task, "--actor", actor]
        if checkpoint:
            args += ["--checkpoint", checkpoint]
        if reason:
            args += ["--reason", reason]
        if run_after_approve:
            args.append("--run")
        execute("approve", args)
    if st.button("Pause", use_container_width=True):
        args = ["pause", "--task", task, "--actor", actor]
        if checkpoint:
            args += ["--checkpoint", checkpoint]
        if reason:
            args += ["--reason", reason]
        execute("pause", args)
    if st.button("Run (cần đã approve)", use_container_width=True):
        execute("run", ["run", "--task", task])

st.divider()

if st.session_state.last_cmd:
    st.code(st.session_state.last_cmd, language="powershell")

st.subheader("Output")
st.code(st.session_state.output or "(chưa có output — bấm một nút bên trên)", language="text")
