import { FC } from "react"
import Head from "next/head"


interface Props {
    title?: string,
}

 
const HeadJira: FC<Props> = ({ title = 'Jira' }) => {
  return (
    <Head>
        <title>{ title }</title>
    </Head>
  )
}

export default HeadJira