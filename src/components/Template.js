import Head from 'next/head'
import Navbar from "../components/Navbar";

function Template({ tabTitle, children }) {
  return (
    <section>
    <Navbar></Navbar>
    <div className="container">
      <Head>
        <title>{tabTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      { children }
      <style>{`
        .container{
          width: 80%;
          float: right;
          margin-right: 5%;
        }
      `}</style>
    </div>
    </section>
  )
}

export default Template
