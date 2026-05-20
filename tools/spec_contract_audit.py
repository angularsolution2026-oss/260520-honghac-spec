#!/usr/bin/env python3
"""
Spec contract audit for AI-assisted implementation.

This tool checks whether the spec set contains the contracts that usually
prevent "code-only done" failures:
- data/API types, validation, delete policy, pagination, stale writes
- schema migration, index/query optimization, transaction/ACID rules
- UI loading/empty/error/offline/timeout/saving states
- optimistic UI, retry/backoff, focus/keyboard navigation, debounce/throttle
- RBAC/server-side authorization
- audit logs, feature flags, async job/cron idempotency, lock, retry, dead-letter
- third-party fallback/error handling
- spec drift: changelog, cross-reference drift, TODO debt, acceptance criteria, API contract SSOT

It is intentionally deterministic and text-based. It does not replace human
review, but it gives an AI coding agent a hard checklist before implementation.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Iterable


DEFAULT_SCAN_ROOTS = [
    "docs/spec",
]

AI_SCAN_ROOTS = [
    ".ai/core",
    ".ai/planning",
    "docs/ai",
]

DEFAULT_REPORT_MD = ".ai/evidence/spec-contract-audit.md"
DEFAULT_REPORT_JSON = ".ai/evidence/spec-contract-audit.json"


@dataclass(frozen=True)
class Finding:
    severity: str
    category: str
    path: str
    check: str
    evidence: str
    recommendation: str


@dataclass(frozen=True)
class GlobalContract:
    category: str
    path: str
    required_patterns: tuple[str, ...]
    recommendation: str
    severity: str = "FAIL"


GLOBAL_CONTRACTS = [
    GlobalContract(
        category="Data/API",
        path="docs/spec/05-database-schema.md",
        required_patterns=(
            r"Global validation rules",
            r"Pagination, Sort & Filter Standard",
            r"Delete / Archive Policy Matrix",
            r"Concurrency / Write Safety",
        ),
        recommendation="Patch 05 with field types, validation, pagination, delete/archive and stale-write rules.",
    ),
    GlobalContract(
        category="Migration",
        path="docs/spec/05-database-schema.md",
        required_patterns=(
            r"Migration Strategy|Schema Migration",
            r"rollback",
        ),
        recommendation="Patch 05 with schema migration strategy, migration ownership, rollback and data backfill rules.",
        severity="WARN",
    ),
    GlobalContract(
        category="Index/Query",
        path="docs/spec/05-database-schema.md",
        required_patterns=(
            r"Index|Query Optimization",
            r"sort|filter|search",
        ),
        recommendation="Patch 05 with required indexes for high-traffic filters/sorts/searches and query limits.",
        severity="WARN",
    ),
    GlobalContract(
        category="Transaction",
        path="docs/spec/05-database-schema.md",
        required_patterns=(
            r"Transaction|ACID|atomic",
        ),
        recommendation="Patch 05 with transaction/atomicity rules for multi-write operations.",
        severity="WARN",
    ),
    GlobalContract(
        category="API",
        path="docs/spec/06-app-router-structure.md",
        required_patterns=(
            r"API Response Envelope",
            r"Error Registry",
            r"validation_error",
            r"stale_write",
            r"dependency_unavailable",
        ),
        recommendation="Patch 06 with response envelope and canonical API error codes.",
    ),
    GlobalContract(
        category="UI State",
        path="docs/spec/07-ui-ux-design-system.md",
        required_patterns=(
            r"Global UI State Matrix",
            r"Loading",
            r"Empty",
            r"Offline",
            r"Timeout",
            r"Optimistic update rollback",
        ),
        recommendation="Patch 07 with loading, empty, error, offline, timeout, saving and rollback states.",
    ),
    GlobalContract(
        category="A11y",
        path="docs/spec/07-ui-ux-design-system.md",
        required_patterns=(
            r"Focus|Keyboard|WCAG|focus trap",
        ),
        recommendation="Patch 07 with focus management, keyboard navigation and modal focus-trap rules.",
        severity="WARN",
    ),
    GlobalContract(
        category="Retry/Backoff",
        path="docs/spec/07-ui-ux-design-system.md",
        required_patterns=(
            r"Retry|Backoff|exponential",
        ),
        recommendation="Patch 07 or 06 with retry/backoff rules for transient UI/API failures.",
        severity="WARN",
    ),
    GlobalContract(
        category="Debounce/Throttle",
        path="docs/spec/07-ui-ux-design-system.md",
        required_patterns=(
            r"Debounce|Throttle",
        ),
        recommendation="Patch 07 with debounce/throttle rules for search, filters and rapid input changes.",
        severity="WARN",
    ),
    GlobalContract(
        category="RBAC",
        path="docs/spec/03-user-roles-permissions.md",
        required_patterns=(
            r"Permission Clarifications",
            r"deny-by-default",
            r"server",
            r"PII reveal",
        ),
        recommendation="Patch 03 with deny-by-default RBAC and server-side permission rules.",
    ),
    GlobalContract(
        category="Async/Cron",
        path="docs/spec/02-tech-stack.md",
        required_patterns=(
            r"Async Job / Cron Contract",
            r"idempotency_key",
            r"locked_until",
            r"dead_letter",
        ),
        recommendation="Patch 02 with async job idempotency, lock, retry and dead-letter rules.",
    ),
    GlobalContract(
        category="Feature Flags",
        path="docs/spec/02-tech-stack.md",
        required_patterns=(
            r"Feature Flag|Toggle",
        ),
        recommendation="Patch 02 with feature flag/toggle strategy, ownership, default state and kill-switch behavior.",
        severity="WARN",
    ),
    GlobalContract(
        category="Webhook/Event",
        path="docs/spec/02-tech-stack.md",
        required_patterns=(
            r"Webhook|Event-driven|dead-letter",
        ),
        recommendation="Patch 02 with webhook/event retry, idempotency, ordering and dead-letter handling.",
        severity="WARN",
    ),
    GlobalContract(
        category="Launch Data",
        path="docs/spec/17-launch-data-readiness.md",
        required_patterns=(
            r"Data Source Routing Matrix",
            r"Public Launch Ready",
            r"approved_public",
            r"fallback",
        ),
        recommendation="Patch 17 with data source routing, run modes, approval gates and fallback states.",
    ),
    GlobalContract(
        category="Spec Drift",
        path=".ai/planning/DECISION_LOG.md",
        required_patterns=(
            r"Decision ID",
            r"Spec impact",
            r"Approved by",
        ),
        recommendation="Keep DECISION_LOG as changelog/version trail for spec changes.",
    ),
    GlobalContract(
        category="Spec Routing",
        path="docs/ai/CONTEXT_ROUTING_MATRIX.md",
        required_patterns=(
            r"CONTEXT|routing|Mandatory|Required|read",
        ),
        recommendation="Patch CONTEXT_ROUTING_MATRIX with mandatory read rules by task type.",
        severity="WARN",
    ),
    GlobalContract(
        category="Acceptance Criteria",
        path=".ai/core/done-criteria.md",
        required_patterns=(
            r"Given|When|Then|Acceptance Criteria|DONE",
        ),
        recommendation="Patch done criteria with acceptance criteria expectations, preferably Given-When-Then for feature tasks.",
        severity="WARN",
    ),
    GlobalContract(
        category="API Contract SSOT",
        path="docs/spec/06-app-router-structure.md",
        required_patterns=(
            r"OpenAPI|Swagger|API contract|SSOT",
        ),
        recommendation="Declare whether OpenAPI/Swagger is required or whether docs/spec/06 remains the API contract SSOT.",
        severity="WARN",
    ),
]


HEURISTIC_RULES = [
    {
        "category": "Data/API",
        "trigger": r"\b(POST|PATCH|PUT|DELETE)\s+/api|API Routes?|endpoint|request body|response",
        "required": r"validation|Zod|schema|field_errors|error code|idempotenc|request_id",
        "recommendation": "This file discusses APIs; ensure it references validation, error codes, idempotency and request_id.",
    },
    {
        "category": "Migration",
        "trigger": r"\b(schema|field|column|collection|table|migration|backfill)\b",
        "required": r"migration|rollback|backfill|version|migrate",
        "recommendation": "This file changes data shape; specify migration strategy, backfill and rollback behavior.",
    },
    {
        "category": "Index/Query",
        "trigger": r"\b(search|filter|sort|query|where|orderBy|index)\b",
        "required": r"index|composite|query limit|page_size|cursor|performance",
        "recommendation": "This file mentions query/search/filter/sort; specify indexes and query limits.",
    },
    {
        "category": "Transaction",
        "trigger": r"\b(multi-write|batch write|transaction|stock|inventory update|status update|audit log|score route|lead routing)\b",
        "required": r"transaction|atomic|ACID|rollback|batch write|consistency",
        "recommendation": "This flow appears to touch multiple records; specify transaction/atomicity guarantees.",
    },
    {
        "category": "Delete Policy",
        "trigger": r"\b(delete|xóa|archive|hard delete|soft delete)\b",
        "required": r"soft|hard|retention|audit|deleted_at|archive",
        "recommendation": "This file mentions deletion/archive; specify soft vs hard delete, retention and audit behavior.",
    },
    {
        "category": "Pagination",
        "trigger": r"\b(table|danh sách|Kanban|inbox|search|filter panel|filter UI)\b",
        "required": r"pagination|page_size|cursor|sort|empty|loading",
        "recommendation": "This file mentions list/table/search UI; specify pagination, default sort, empty/loading state.",
    },
    {
        "category": "UI State",
        "trigger": r"\b(form|button|submit|save|lưu|gửi|modal|drawer)\b",
        "required": r"loading|disabled|empty|offline|timeout|error|success|rollback",
        "recommendation": "This file mentions interactive UI; specify loading, disabled, error/offline/timeout and success states.",
    },
    {
        "category": "Optimistic UI",
        "trigger": r"\b(save|lưu|status update|drag|drop|Kanban|toggle|switch)\b",
        "required": r"optimistic|rollback|saving|disabled|stale|conflict",
        "recommendation": "This file mentions fast UI updates; specify optimistic vs wait-for-server behavior and rollback.",
    },
    {
        "category": "Retry/Backoff",
        "trigger": r"\b(retry|timeout|network|offline|API fail|fail|glitch)\b",
        "required": r"backoff|exponential|retry_after|max_attempts|delay",
        "recommendation": "This file mentions transient failure; specify retry count and backoff delays.",
    },
    {
        "category": "A11y",
        "trigger": r"\b(modal|drawer|dialog|keyboard|focus|tab|accessibility|WCAG)\b",
        "required": r"focus trap|keyboard|aria|tab order|WCAG|Escape",
        "recommendation": "This file mentions modal/drawer/accessibility; specify focus management and keyboard navigation.",
    },
    {
        "category": "Debounce/Throttle",
        "trigger": r"\b(search|filter|input|typing|gõ|slider)\b",
        "required": r"debounce|throttle|rate limit|delay|minimum characters",
        "recommendation": "This file mentions search/filter/input; specify debounce/throttle behavior.",
    },
    {
        "category": "RBAC",
        "trigger": r"\b(admin|role|permission|auth|login|super_admin|sales_agent|PII)\b",
        "required": r"permission|role|deny|forbidden|server|audit|2FA",
        "recommendation": "This file mentions admin/auth/PII; specify server-side RBAC, forbidden behavior and audit logging.",
    },
    {
        "category": "Async/Cron",
        "trigger": r"\b(cron|job|queue|export|webhook|Telegram|email|alert|revalidate)\b",
        "required": r"idempotenc|retry|lock|dead_letter|timeout|fallback|non-blocking|audit",
        "recommendation": "This file mentions background/third-party work; specify retry, lock, idempotency and failure behavior.",
    },
    {
        "category": "Idempotency",
        "trigger": r"\b(create|submit|send|payment|order|email|Telegram|webhook|retry)\b",
        "required": r"idempotenc|idempotency_key|client_request_id|dedupe|duplicate",
        "recommendation": "This file describes retryable side effects; specify idempotency key and duplicate prevention.",
    },
    {
        "category": "Audit Log",
        "trigger": r"\b(delete|archive|approve|publish|permission|role|PII|reveal|export|hard delete|security)\b",
        "required": r"audit|activity log|who|actor|ip|timestamp|reason",
        "recommendation": "This file mentions sensitive actions; specify audit/activity log fields and retention.",
    },
    {
        "category": "Feature Flags",
        "trigger": r"\b(release|rollout|enable|disable|hidden|deferred|experimental|A/B|ab test)\b",
        "required": r"feature flag|toggle|kill switch|default off|rollout|experiment",
        "recommendation": "This file mentions staged release/experiment; specify feature flag or toggle behavior.",
    },
    {
        "category": "Webhook/Event",
        "trigger": r"\b(webhook|event|queue|RabbitMQ|Kafka|revalidate|callback)\b",
        "required": r"retry|dead-letter|ordering|idempotenc|signature|timeout",
        "recommendation": "This file mentions events/webhooks; specify retry, ordering, signature verification and dead-letter handling.",
    },
    {
        "category": "Concurrency",
        "trigger": r"\b(two users|cùng edit|edit.*record|price|status|manual override|concurrent|race)\b",
        "required": r"optimistic lock|pessimistic lock|version|stale_write|conflict|transaction",
        "recommendation": "This file mentions concurrent editing; specify optimistic/pessimistic locking and conflict resolution.",
    },
    {
        "category": "Third-party",
        "trigger": r"\b(Firebase|Firestore|Payload|GCS|GA4|GTM|Turnstile|Telegram|Vercel|Sentry|Lighthouse)\b",
        "required": r"fallback|timeout|retry|error|blocked|degraded|no-store|audit",
        "recommendation": "This file mentions external services; specify timeout, fallback/degraded mode and error handling.",
    },
    {
        "category": "Acceptance Criteria",
        "trigger": r"\b(requirement|feature|task|phase|sprint|route|page)\b",
        "required": r"Given|When|Then|Acceptance Criteria|Done criteria|quality gate|evidence",
        "recommendation": "This file defines work; include acceptance criteria and evidence gates.",
    },
]


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return path.read_text(encoding="utf-8", errors="replace")


def iter_markdown_files(root: Path, scan_roots: Iterable[str]) -> Iterable[Path]:
    skip_dirs = {".git", "node_modules", ".next", "__pycache__"}
    for rel in scan_roots:
        base = root / rel
        if not base.exists():
            continue
        if base.is_file() and base.suffix.lower() == ".md":
            yield base
            continue
        for p in base.rglob("*.md"):
            if any(part in skip_dirs for part in p.parts):
                continue
            yield p


def relpath(root: Path, path: Path) -> str:
    return path.relative_to(root).as_posix()


def audit_global_contracts(root: Path) -> list[Finding]:
    findings: list[Finding] = []
    for contract in GLOBAL_CONTRACTS:
        p = root / contract.path
        if not p.exists():
            findings.append(
                Finding(
                    severity=contract.severity,
                    category=contract.category,
                    path=contract.path,
                    check="global_contract_file_exists",
                    evidence="file missing",
                    recommendation=contract.recommendation,
                )
            )
            continue

        text = read_text(p)
        for pattern in contract.required_patterns:
            if not re.search(pattern, text, flags=re.IGNORECASE):
                findings.append(
                    Finding(
                        severity=contract.severity,
                        category=contract.category,
                        path=contract.path,
                        check=f"required_pattern:{pattern}",
                        evidence="pattern not found",
                        recommendation=contract.recommendation,
                    )
                )
    return findings


def audit_heuristics(root: Path, files: Iterable[Path]) -> list[Finding]:
    findings: list[Finding] = []
    for p in files:
        text = read_text(p)
        if re.search(r"Global Implementation Contracts|Implementation Contract References", text, re.IGNORECASE):
            continue
        compact = re.sub(r"\s+", " ", text)
        for rule in HEURISTIC_RULES:
            trigger = rule["trigger"]
            required = rule["required"]
            trigger_matches = list(re.finditer(trigger, compact, flags=re.IGNORECASE))
            if not trigger_matches:
                continue
            if re.search(required, compact, flags=re.IGNORECASE):
                continue
            sample = trigger_matches[0].group(0)
            if len(sample) > 80:
                sample = sample[:77] + "..."
            findings.append(
                Finding(
                    severity="WARN",
                    category=rule["category"],
                    path=relpath(root, p),
                    check=f"trigger_without_contract:{sample}",
                    evidence=f"Found '{sample}' but no nearby/global keyword matching '{required}' in this file.",
                    recommendation=rule["recommendation"],
                )
            )
    return findings


def audit_todo_debt(root: Path, files: Iterable[Path]) -> list[Finding]:
    findings: list[Finding] = []
    pattern = re.compile(r"\b(TODO|FIXME|HACK|tạm|temporary|hardcode|chưa xử lý|sau này)\b", re.IGNORECASE)
    for p in files:
        text = read_text(p)
        matches = list(pattern.finditer(text))
        if not matches:
            continue
        has_backlog_link = re.search(r"backlog|task graph|TASK_GRAPH|gap register|GAP-|decision log", text, re.IGNORECASE)
        if has_backlog_link:
            continue
        sample = matches[0].group(0)
        findings.append(
            Finding(
                severity="WARN",
                category="Technical Debt",
                path=relpath(root, p),
                check=f"untracked_todo:{sample}",
                evidence=f"Found '{sample}' but no backlog/GAP/task tracking reference in this file.",
                recommendation="Convert TODO/temp/hardcode notes into tracked backlog, GAP register, or explicit deferred scope.",
            )
        )
    return findings


def audit_api_path_variants(root: Path, files: Iterable[Path]) -> list[Finding]:
    api_paths: dict[str, set[str]] = {}
    api_pattern = re.compile(r"(?<![\w-])/(?:api|portals|broker|[a-z0-9-]+)(?:/[a-zA-Z0-9_\-\[\]]+)+")
    for p in files:
        text = read_text(p)
        for match in api_pattern.finditer(text):
            value = match.group(0).rstrip(".,;)`]")
            normalized = re.sub(r"/\[?[a-zA-Z0-9_]*id\]?", "/:id", value.lower())
            normalized = normalized.replace("/list", "")
            api_paths.setdefault(normalized, set()).add(relpath(root, p))

    findings: list[Finding] = []
    singular_plural: dict[str, set[str]] = {}
    for path in api_paths:
        parts = path.split("/")
        stemmed = "/".join(part[:-1] if part.endswith("s") else part for part in parts)
        singular_plural.setdefault(stemmed, set()).add(path)

    for stemmed, variants in sorted(singular_plural.items()):
        if len(variants) < 2:
            continue
        involved_files = sorted({file for v in variants for file in api_paths.get(v, set())})
        findings.append(
            Finding(
                severity="WARN",
                category="Spec Drift",
                path=", ".join(involved_files[:4]) + (" ..." if len(involved_files) > 4 else ""),
                check="possible_route_name_drift",
                evidence=f"Similar route variants found: {', '.join(sorted(variants))}",
                recommendation="Confirm the canonical route/API name in docs/spec/06 and update stale cross-references.",
            )
        )
    return findings


def audit_spec_number_references(root: Path, files: Iterable[Path]) -> list[Finding]:
    spec_numbers = {
        match.group(1)
        for p in (root / "docs/spec").glob("[0-9][0-9]-*.md")
        for match in [re.match(r"([0-9]{2})-", p.name)]
        if match
    }
    findings: list[Finding] = []
    ref_pattern = re.compile(r"(?<!\d)([0-9]{2})\s*§")
    for p in files:
        text = read_text(p)
        for match in ref_pattern.finditer(text):
            ref = match.group(1)
            if ref in spec_numbers:
                continue
            findings.append(
                Finding(
                    severity="WARN",
                    category="Broken Cross-reference",
                    path=relpath(root, p),
                    check=f"unknown_spec_ref:{ref} §",
                    evidence=f"Reference '{ref} §' does not map to a docs/spec/{ref}-*.md file.",
                    recommendation="Fix the cross-reference or add the missing spec file intentionally.",
                )
            )
    return findings


def summarize(findings: list[Finding]) -> dict[str, object]:
    by_severity: dict[str, int] = {}
    by_category: dict[str, int] = {}
    for f in findings:
        by_severity[f.severity] = by_severity.get(f.severity, 0) + 1
        by_category[f.category] = by_category.get(f.category, 0) + 1
    status = "PASS" if not findings else ("FAIL" if any(f.severity == "FAIL" for f in findings) else "WARN")
    return {
        "status": status,
        "total_findings": len(findings),
        "by_severity": by_severity,
        "by_category": by_category,
    }


def render_markdown(root: Path, scan_roots: list[str], findings: list[Finding]) -> str:
    summary = summarize(findings)
    now = dt.datetime.now().isoformat(timespec="seconds")
    lines = [
        "# Spec Contract Audit",
        "",
        f"Generated: `{now}`",
        f"Root: `{root}`",
        f"Scan roots: `{', '.join(scan_roots)}`",
        "",
        "## Summary",
        "",
        f"- Status: **{summary['status']}**",
        f"- Findings: **{summary['total_findings']}**",
        f"- By severity: `{json.dumps(summary['by_severity'], ensure_ascii=False)}`",
        f"- By category: `{json.dumps(summary['by_category'], ensure_ascii=False)}`",
        "",
    ]

    if not findings:
        lines.extend(["## Findings", "", "No findings. Core spec contracts are present."])
        return "\n".join(lines) + "\n"

    lines.extend(["## Findings", ""])
    for i, f in enumerate(findings, start=1):
        lines.extend(
            [
                f"### {i}. {f.severity} · {f.category}",
                "",
                f"- File: `{f.path}`",
                f"- Check: `{f.check}`",
                f"- Evidence: {f.evidence}",
                f"- Recommendation: {f.recommendation}",
                "",
            ]
        )
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit spec files for implementation contract gaps.")
    parser.add_argument("--root", default=".", help="Repository root")
    parser.add_argument(
        "--scan-root",
        action="append",
        dest="scan_roots",
        help="Folder/file to scan. Can be repeated. Defaults to docs/spec.",
    )
    parser.add_argument("--include-ai", action="store_true", help="Also scan .ai/core, .ai/planning and docs/ai.")
    parser.add_argument("--write-report", action="store_true", help="Write markdown and json reports.")
    parser.add_argument("--report-md", default=DEFAULT_REPORT_MD)
    parser.add_argument("--report-json", default=DEFAULT_REPORT_JSON)
    parser.add_argument("--strict", action="store_true", help="Return non-zero on WARN as well as FAIL.")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    scan_roots = args.scan_roots or list(DEFAULT_SCAN_ROOTS)
    if args.include_ai:
        scan_roots.extend(AI_SCAN_ROOTS)
    files = list(iter_markdown_files(root, scan_roots))

    findings = audit_global_contracts(root)
    findings.extend(audit_heuristics(root, files))
    findings.extend(audit_todo_debt(root, files))
    findings.extend(audit_api_path_variants(root, files))
    findings.extend(audit_spec_number_references(root, files))
    summary = summarize(findings)

    print(f"Spec contract audit: {summary['status']} ({summary['total_findings']} findings)")
    print(f"By severity: {json.dumps(summary['by_severity'], ensure_ascii=False)}")
    print(f"By category: {json.dumps(summary['by_category'], ensure_ascii=False)}")

    if args.write_report:
        md_path = root / args.report_md
        json_path = root / args.report_json
        md_path.parent.mkdir(parents=True, exist_ok=True)
        json_path.parent.mkdir(parents=True, exist_ok=True)
        md_path.write_text(render_markdown(root, scan_roots, findings), encoding="utf-8")
        payload = {
            "summary": summary,
            "scan_roots": scan_roots,
            "findings": [asdict(f) for f in findings],
        }
        json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Wrote {md_path.relative_to(root).as_posix()}")
        print(f"Wrote {json_path.relative_to(root).as_posix()}")

    if summary["status"] == "FAIL":
        return 1
    if args.strict and findings:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
