import { gql } from '@apollo/client'

const WIKI_DOC_QUERY = gql`
query wiki_doc_query($name: String!, $where: doc_version_bool_exp) {
  wiki_doc_by_pk(name: $name) {
    name
    doc_versions(
      order_by: {
        created_at: desc
      }
      limit: 1
      where: $where
    ) {
      id
      created_at
      body
      version
    }
  }
}
`

export default WIKI_DOC_QUERY
