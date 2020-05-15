import Head from 'next/head'

function Template(props) {
  return (
    <div>
      <Head>
        <title>Invest</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      { props.children }
    </div>
  )
}

export default Template
