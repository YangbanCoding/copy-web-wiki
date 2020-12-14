import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import WikiButton from 'components/WikiButton/WikiButton'
import WIKI_DOC_QUERY from 'graphql/query/wikiDoc/WIKI_DOC_QUERY'
import s from 'styles/wikiDoc/WikiDoc.module.scss'
import Loading from 'components/system/Loading'
import Error from 'components/system/Error'

function WikiDoc () {
  const router = useRouter()
  const { data, loading, error } = useQuery(WIKI_DOC_QUERY, {
    variables: {
      name: router.query.docName ? router.query.docName : '',
      where: router.query.version
        ? {
            version: {
              _eq: router.query.version
            }
          }
        : {}
    }
  })

  if (loading) return <Loading />
  if (error) return <Error />

  const DocBody = () => {
    return (
      <div className={s.margin_top16}>
        <div className={s.created_at}>최근 수정 시각: {new Date(data.wiki_doc_by_pk.doc_versions[0].created_at).toLocaleString()}</div>
        <div className={s.body}>{data.wiki_doc_by_pk.doc_versions[0].body}</div>
      </div>
    )
  }

  const DocEmpty = () => {
    return (
      <div className={s.margin_top16}>
        <div>해당 문서를 찾을 수 없습니다</div>
        <div className={s.margin_top16}>
          <Link href={`/edit/${router.query.docName}`}><a>[새 문서 만들기]</a></Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <WikiButton />
      <div className={s.body_container}>
        <div className={s.title}>{router.query.docName}</div>
        {data.wiki_doc_by_pk ? <DocBody /> : <DocEmpty />}
      </div>
    </div>
  )
}

export default WikiDoc
