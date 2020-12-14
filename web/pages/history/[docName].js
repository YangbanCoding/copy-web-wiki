import Link from 'next/link'
import { useRouter } from 'next/router'
import s from 'styles/wikiDoc/WikiDoc.module.scss'
import WIKI_DOC_ALL_VERSION_QUERY from 'graphql/query/wikiDoc/WIKI_DOC_ALL_VERSION_QUERY'
import { useQuery } from '@apollo/client'
import Loading from 'components/system/Loading'
import Error from 'components/system/Error'

function DocHistory () {
  const router = useRouter()
  const { data, loading, error } = useQuery(WIKI_DOC_ALL_VERSION_QUERY, {
    variables: {
      name: router.query.docName
    }
  })

  if (loading) return <Loading />
  if (error) return <Error />

  return (
    <div>
      <div className={s.body_container}>
        <div className={s.title}>{router.query.docName} (문서 역사)</div>
        <ul>
          {data.wiki_doc_by_pk.doc_versions.map(ver => {
            const createdAt = new Date(ver.created_at).toLocaleString()
            return (
              <li key={ver.id}>{createdAt} v{ver.version}
                <Link href={`/w/${router.query.docName}?version=${ver.version}`}><a>보기</a></Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default DocHistory
