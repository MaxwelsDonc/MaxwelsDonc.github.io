---
title: "How I Think About LLM Testing"
date: 2025-05-28
excerpt: "A framework for reasoning about the reliability of large language models, and why traditional software testing approaches fall short."
keywords: ["LLM Testing", "Metamorphic Testing", "Software Reliability", "AI Safety"]
related: []
featured: false
---

<!--
  ============================================================
  FRONTMATTER CONVENTIONS (delete this block in your own posts)

  title     — 必填，文章标题，中英文均可
  date      — 必填，发布日期，格式 YYYY-MM-DD
  excerpt   — 可选，摘要，用于博客列表和 SEO description
  keywords  — 可选，标签数组，文章底部展示
              例: ["LLM Testing", "Metamorphic Testing"]
  related   — 可选，推荐阅读的文章 slug（不含 .md 后缀）
              例: ["2025-04-15-metamorphic-testing"]
  featured  — 可选，true 则博客列表顶部突出展示（仅第一篇生效）
  draft     — 可选，true 则构建时跳过，不发布

  文件命名: YYYY-MM-DD-slug.md
  中英文混写: 标题、摘要、正文均支持中文
  ============================================================
-->

Large language models are transforming how we build software. But as we integrate them into critical systems, a fundamental question emerges: **how do we know they're reliable?**

Traditional software testing relies on a clear contract: given input $x$, the correct output is $y$. If the program produces something else, it's a bug. This paradigm has served us well for decades.

LLMs break this contract.

## Why Testing LLMs is Different

Consider a code generation task. You ask an LLM to "write a function that sorts a list." There isn't one correct answer — there are dozens of valid implementations (quicksort, mergesort, timsort...), each with different trade-offs. Traditional testing, which compares against a single expected output, can't handle this multiplicity.

**The Oracle Problem** is the most fundamental challenge in testing AI systems. An *oracle* is a mechanism for determining whether a test has passed or failed. For deterministic software, the oracle is straightforward: compare the actual output to the expected output. For LLMs, no such oracle exists.

This doesn't mean we should give up on testing. It means we need different approaches.

> Metamorphic testing offers a way around the oracle problem by checking whether the system behaves consistently under transformations, rather than checking for a single correct output.

## Three Approaches I've Found Useful

### 1. Metamorphic Relations

A metamorphic relation is a property that should hold across multiple executions. For example:

- If an LLM correctly answers "What is the capital of France?", it should also correctly answer "Paris is the capital of which country?"
- If an LLM summarizes a document in 100 words, giving it the same document with irrelevant sentences appended should not change the summary's key points.

By checking these relations rather than exact outputs, we can detect inconsistencies without knowing the "right" answer.

$$
\text{MR}: \forall x, x'. \ \text{transform}(x) = x' \implies \text{relation}(f(x), f(x'))
$$

### 2. Differential Testing

Run the same prompt through multiple models (or multiple versions of the same model) and compare outputs. Disagreement doesn't necessarily mean a bug, but it flags areas worth investigating.

### 3. Invariant Checking

Define properties that should always hold:
- The output should be syntactically valid for the requested format
- The output should not contradict the input
- The output should be internally consistent

## Looking Ahead

As LLMs become more capable, testing them becomes both more important and more difficult. The approaches I've outlined here are a starting point — we need better tooling, better metrics, and better theoretical frameworks.

If you're working on these problems, I'd love to hear from you. The field of LLM testing is young, and the best ideas are probably still ahead of us.
