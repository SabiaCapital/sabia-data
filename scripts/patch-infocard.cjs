const fs = require('fs')
const path = require('path')

const f = path.resolve(__dirname, '../src/components/info-card/index.tsx')
let c = fs.readFileSync(f, 'utf8')

// Detect line ending
const crlf = c.includes('\r\n')
const nl = crlf ? '\r\n' : '\n'

// Normalise to LF for matching
const norm = c.replace(/\r\n/g, '\n')

const old = `{items.map(({ label, value }) => (
							<span key={label} className='text-muted-foreground text-sm'>
								<span key={label} className='text-foreground font-medium'>
									{label}:{' '}
								</span>
								{value}
							</span>
						))}`

const neu = `{items.map(({ label, value }, i) => (
							<span key={label || i} className='text-muted-foreground text-sm'>
								{label && (
									<span className='text-foreground font-medium'>
										{label}:{' '}
									</span>
								)}
								{value}
							</span>
						))}`

if (norm.includes(old)) {
  const result = norm.replace(old, neu)
  fs.writeFileSync(f, crlf ? result.replace(/\n/g, '\r\n') : result)
  console.log('OK - InfoCard updated')
} else {
  const idx = norm.indexOf('items.map')
  console.log('NOT FOUND. Context around items.map:')
  console.log(JSON.stringify(norm.slice(idx, idx + 300)))
}
