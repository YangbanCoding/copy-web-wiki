import { gql } from '@apollo/client'

const WIKI_DOC_ALL_VERSION_QUERY = gql`
query wiki_doc_all_version($name: String!) {
  wiki_doc_by_pk(name: $name) {
    doc_versions(
      order_by: {
        created_at: desc
      }
    ) {
      id
      created_at
      version
    }
  }
}
`

export default WIKI_DOC_ALL_VERSION_QUERY
