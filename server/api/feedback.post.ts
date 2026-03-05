interface FeedbackBody {
  rating?: string
  message?: string
  email?: string
  attachments?: unknown[]
}

export default defineEventHandler(async (event) => {
  const body = await readBody<FeedbackBody>(event)

  const message = body?.message?.trim() || ''
  const email = body?.email?.trim() || ''
  const rating = body?.rating || 'not-selected'

  if (!message || !email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message and email are required.',
    })
  }

  const runtimeConfig = useRuntimeConfig(event)
  const feedbackConfig = (runtimeConfig.feedback || {}) as {
    repoOwner?: string
    repo?: string
    project?: string
    githubToken?: string
  }

  const repoOwner = feedbackConfig.repoOwner || ''
  const repo = feedbackConfig.repo || ''
  const githubToken = feedbackConfig.githubToken || ''
  const project = feedbackConfig.project || ''

  const createdAt = new Date().toISOString()
  const title = `Feedback (${rating}) - ${email}`
  const issueBody = [
    `Project: ${project || 'n/a'}`,
    `Created: ${createdAt}`,
    '',
    `**Rating:** ${rating}`,
    `**Email:** ${email}`,
    '',
    '**Message**',
    message,
  ].join('\n')

  if (!githubToken || !repoOwner || !repo) {
    if (import.meta.dev) {
      console.info('[feedback] Local fallback: feedback accepted without GitHub issue.', {
        title,
        issueBody,
      })
      return { ok: true, simulated: true }
    }

    throw createError({
      statusCode: 503,
      statusMessage: 'Feedback service is not configured.',
    })
  }

  const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repo}/issues`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${githubToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'bs-dashboard-base-feedback',
    },
    body: JSON.stringify({
      title,
      body: issueBody,
    }),
  })

  if (!response.ok) {
    const responseText = await response.text()
    throw createError({
      statusCode: 502,
      statusMessage: `Feedback issue creation failed: ${responseText}`,
    })
  }

  const issue = await response.json() as { html_url?: string }
  return {
    ok: true,
    issueUrl: issue.html_url || null,
  }
})
