// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, {Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        const date = new Date();
        return (
            <html website="nextjs.org" date={date.toUTCString()} lang="zh-CN">
            <Head>
                {/*<title>next.js</title>*/}
                <style>{`body { margin: 0 } /* custom! */`}</style>
            </Head>
            <body className="custom_class">
            <Main/>
            <NextScript/>
            </body>
            </html>
        )
    }
}
