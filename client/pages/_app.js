import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Note Taker App 2.0</title>
            </Head>

            <div className='top-bar'>
                <div className='nav'>
                    <Link href="/">Home</Link>
                    <Link href="/new">Add Note</Link>
                </div>

                <div className='grid wrapper'>
                    <Component {...pageProps} />
                </div>
            </div>
        
        </>
    )
}

export default MyApp