import Head from 'next/head'

function Template({ tabTitle, children }) {
  return (
    <div>
      <Head>
        <title>{tabTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      { children }
    </div>
  )
}

export default Template
