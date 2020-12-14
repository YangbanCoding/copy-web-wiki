import { gql } from '@apollo/client'

const INSERT_NEW_VERSION_MUTATION = gql`
mutation insert_new_version_mutation($object: doc_version_insert_input!){
  insert_doc_version_one(
    object: $object
  ) {
    id
  }
}
`

export default INSERT_NEW_VERSION_MUTATION
