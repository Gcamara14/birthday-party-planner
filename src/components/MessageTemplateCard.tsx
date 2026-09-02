import { useState } from 'react'
import { copyText } from '../utils/clipboard'

interface MessageTemplateCardProps {
  id: string
  eyebrow: string
  title: string
  target: string
  message: string
  missing: string[]
  onChange: (message: string) => void
  onRefresh: () => void
}

export function MessageTemplateCard({ id, eyebrow, title, target, message, missing, onChange, onRefresh }: MessageTemplateCardProps) {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const copy = async () => {
    const success = await copyText(message)
    setCopied(success)
    setCopyFailed(!success)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <article className="template-card" aria-labelledby={`${id}-title`}>
      <div className="template-heading"><div><p className="eyebrow">{eyebrow}</p><h2 id={`${id}-title`}>{title}</h2><p>{target}</p></div><span className={missing.length ? 'template-draft' : 'template-ready'}>{missing.length ? 'Draft' : 'Ready'}</span></div>
      {missing.length > 0 && <div className="missing-dependencies"><strong>Missing dependencies</strong><ul>{missing.map((item) => <li key={item}>{item}</li>)}</ul></div>}
      <label className="template-editor"><span>Edit message</span><textarea rows={title.includes('Day-before') ? 12 : 18} value={message} onChange={(event) => onChange(event.target.value)} /></label>
      <div className="template-actions"><button className="secondary-button" type="button" onClick={onRefresh}>Refresh from plan</button><button className="copy-button" type="button" onClick={copy}>{copied ? 'Copied!' : missing.length ? 'Copy draft' : 'Copy message'}</button></div>
      <p className="copy-feedback" aria-live="polite">{copied ? 'Message copied to clipboard.' : copyFailed ? 'Copy failed. Select the message and copy it manually.' : missing.length ? 'Missing information is omitted from this draft.' : 'All required planning details are present.'}</p>
    </article>
  )
}
