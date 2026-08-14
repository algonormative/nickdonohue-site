---
title: '23,662 tool calls: thirty days of agent traces from one machine'
description: 'A deterministic census of every tool call my coding agents made in 30 days — what they actually run, where they fail, what they reach for, and how little of it looks like the tool ecosystem being built for them.'
pubDate: 2026-08-14
draft: false
tags: [agents, claude-code, data, measurement]
agent: 'Claude Fable 5'
---

Public data on what AI agents *do* is thin in a specific way: the two best
instruments both measure something adjacent to behavior, and both say so
themselves. Anthropic's [Economic Index
"Cadences"](https://www.anthropic.com/research/economic-index-june-2026-report)
report (June 2026, ~9,700 users with linked sessions) classifies conversation
*outputs* and states plainly that it does not measure tool-calling patterns. A
UK AISI census of [177,000 MCP tools](https://arxiv.org/abs/2603.23802)
(arXiv:2603.23802, March 2026) maps the tool *supply* and notes its usage
proxy — package downloads — counts installs, "rather than individual tool
calls."

So here is the missing granularity at the smallest useful scale: every tool
call one power user's agents made on one machine over thirty days. n=1, but
it is the level of resolution the public instruments say they cannot see.

## What was run

A ~180-line Python script (stdlib only, no model calls) streamed every Claude
Code session transcript on this machine — 653 JSONL files, ~490 MB — and
counted tool-use and tool-result events with timestamps inside
2026-07-15 → 2026-08-14 (snapshot 15:00 UTC). Sessions spanned Claude Code
CLI and desktop across whatever model versions those thirty days actually
used (an Opus 4.x / Fable 5 mix; per-call model attribution was not
extracted). Error status comes from the harness's own `is_error` flag;
permission denials are matched by the harness's denial message strings;
Bash commands are grouped by first token after peeling `cd … &&` prefixes.

Excluded, honestly: cloud-scheduled agent runs, a household chat agent on
another machine, and anything another vendor's harness did. This is one
machine's local traces.

## The shape of a month

| Measure | Value |
|---|---|
| Main sessions active in window | 118 |
| Subagent transcripts | 153 |
| Project workspaces | 5 |
| Assistant turns | 46,812 |
| Tool calls | 23,662 |
| — made by subagents | 5,944 (25.1%) |
| Tool errors | 839 (3.5%) |
| Human permission denials | 91 (0.38%) |

## What the tools were

| Tool | Calls | Share | Error rate |
|---|---|---|---|
| Bash | 12,174 | 51.4% | 4.2% |
| Edit | 3,681 | 15.6% | 4.4% |
| Read | 2,903 | 12.3% | 0.7% |
| Write | 1,457 | 6.2% | 3.0% |
| Task tracking (create/update) | 1,204 | 5.1% | 0.0% |
| Agent (subagent spawn) | 394 | 1.7% | 0.0% |
| Web (fetch + search) | 462 | 2.0% | 8.2% |
| Browser automation (MCP) | 569 | 2.4% | 8.3% |
| Everything else | 818 | 3.5% | — |

Two-thirds of everything is the terminal plus file edits. **The single
biggest fact in the dataset is that the terminal is the agent's real
interface**: half of all tool calls are shell commands, and 86% of those are
composite (`&&`, pipes, subshells) — not "run this program" but small
programs in themselves.

What runs inside the shell is just as lopsided:

| Bash family | Calls |
|---|---|
| grep | 1,362 |
| git | 1,092 |
| echo | 1,001 |
| python3 | 891 |
| ls | 659 |
| br (a task-tracker CLI) | 614 |
| npm | 566 |
| sed | 460 |
| cat | 382 |
| npx | 354 |
| node | 279 |
| uv | 176 |
| gh | 167 |
| ssh | 164 |

The most-run command is `grep`. Add `ls`, `cat`, and the `Read` tool and a
large fraction of agent activity is *looking at things before touching
them*. The MCP census found the tool market shifting hard toward action
tools (27% → 65% of downloads in 16 months); the observed behavior on this
machine is perception-heavy — the actions are there, but they sit on a
large substrate of reading, searching, and checking.

Also notable: a bespoke task-tracker CLI (`br`) outranks `npm`. Deterministic
personal tooling, built to be driven by agents, gets more agent traffic than
the ecosystem's package manager.

## What almost never happens

**MCP tools: 2.8% of calls.** 669 total, and 85% of those are one server
(browser automation). Against an ecosystem that published 177,000 MCP tools
in sixteen months, one power user's agents touched MCP a handful of times a
day — and mostly to drive a browser. The supply is MCP-shaped; this usage is
terminal-shaped.

**Skills: 0.17% of calls.** From an installed base of roughly a hundred
available skills, model-invoked skill loads happened 41 times in a month,
and no single skill fired more than four times. (User-typed slash commands
enter sessions through a different channel and are not in this count — the
41 measures what the *model* reaches for.) A public tool called skillreaper
made "zero telemetry" its selling point precisely because nobody can see
firing rates; this is one firing rate, and it is low.

**Human intervention: 0.38%.** The human said no 91 times in 23,662 calls —
mostly to shell commands and web fetches. Combined with the 3.5% error rate,
the loop runs green ~96% of the time at this permission configuration.

## What agents reach for mid-task

This harness lazy-loads rarely-used tools; a loading call is a clean signal
of *wanting a capability that wasn't at hand*. It happened 212 times:
roughly half for web research (search + fetch), a quarter for task tracking,
the rest for agent-to-agent messaging, background monitors, and scheduling.
If you wanted a demand signal for what to build into an agent harness first,
this column is it: retrieval, todo state, and coordination — not payments,
not marketplaces.

## Delegation

394 subagent spawns produced 25% of all tool calls. A fifth of the spawns
are verification-shaped (code review and adversarial critique agents), which
matches how the sessions are configured — but the ratio is the interesting
part: for every four worker spawns, one skeptic.

## Caveats, all of them

One user, one machine, one harness vendor, thirty days, and a permission
configuration tuned over months — none of this generalizes on its own. The
window includes vacation-paced weeks. Session counts include some sessions
that were themselves *about* building agent tooling, which inflates the
self-referential families (`br`, `gh`). Denial detection is string-matching
and may undercount. The point is not that these numbers are the ecosystem's
— it is that numbers at this resolution are **obtainable in an afternoon
from data you already have**, and until the platforms publish call-level
aggregates, self-census is the only instrument that sees this layer at all.
