import { useState } from 'react'
import { useRouter } from 'next/router'
import s from 'styles/wikiDoc/WikiDoc.module.scss'
import { useMutation, useQuery } from '@apollo/client'
import INSERT_NEW_DOC_MUTATION from 'graphql/mutation/wikiDoc/INSERT_NEW_DOC_MUTATION'
import INSERT_NEW_VERSION_MUTATION from 'graphql/mutation/wikiDoc/INSERT_NEW_VERSION_MUTATION'
import WIKI_DOC_QUERY from 'graphql/query/wikiDoc/WIKI_DOC_QUERY'
import Loading from 'components/system/Loading'
import Error from 'components/system/Error'

function EditDoc () {
  const [text, setText] = useState('')
  const router = useRouter()
  const { data, loading, error } = useQuery(WIKI_DOC_QUERY, {
    variables: {
      name: router.query.docName
    }
  })
  const [insertNewDoc] = useMutation(INSERT_NEW_DOC_MUTATION, {
    refetchQueries: [
      {
        query: WIKI_DOC_QUERY,
        variables: {
          name: router.query.docName
        }
      }
    ]
  })
  const [insertNewVersion] = useMutation(INSERT_NEW_VERSION_MUTATION, {
    refetchQueries: [
      {
        query: WIKI_DOC_QUERY,
        variables: {
          name: router.query.docName
        }
      }
    ]
  })

  if (loading) return <Loading />
  if (error) return <Error />

  const isNew = !data?.wiki_doc_by_pk

  const handleChange = (e) => {
    setText(e.nativeEvent.target.value)
  }

  const handleClick = async () => {
    try {
      if (isNew) {
        await insertNewDoc({
          variables: {
            name: router.query.docName,
            body: text
          }
        })

        router.push(`/w/${router.query.docName}`)
      } else {
        await insertNewVersion({
          variables: {
            object: {
              body: text,
              version: data?.wiki_doc_by_pk?.doc_versions[0].version + 1,
              wiki_doc_name: router.query.docName
            }
          }
        })

        router.push(`/w/${router.query.docName}`)
      }
    } catch (e) {
      console.error(e)
      alert('오류가 발생했습니다 다시 시도해 주세요')
    }
  }

  return (
    <div>
      <div className={s.body_container}>
        <div className={s.title}>{router.query.docName} {isNew ? '(새 문서 생성)' : `(v${data.wiki_doc_by_pk.doc_versions[0].version + 1})`}</div>
        <textarea
          defaultValue={data?.wiki_doc_by_pk?.doc_versions[0]?.body}
          className={s.textarea}
          placeholder='내용을 입력해 주세요'
          onChange={handleChange}
        />
        <div className={s.button_box}>
          <button className={s.button} onClick={handleClick}>저장</button>
        </div>
      </div>
    </div>
  )
}

export default EditDoc
