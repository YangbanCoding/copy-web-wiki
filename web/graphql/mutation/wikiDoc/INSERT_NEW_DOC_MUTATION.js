import { gql } from '@apollo/client'

const INSERT_NEW_DOC_MUTATION = gql`
mutation insert_new_doc($name: String!, $body: String!) {
  insert_doc_version_one(
    object: {
      version: 1
      body: $body
      wiki_doc: {
        data: {
          name: $name
        }
      }
    }
  ) {
    id
  }
}
`

export default INSERT_NEW_DOC_MUTATION
