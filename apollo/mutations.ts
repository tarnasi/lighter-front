import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($mobile: String!, $password: String!) {
    login(mobile: $mobile, password: $password) {
      token
      user {
        id
        full_name
        mobile
        email
        birthday
        role
        wholesaler
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register(
    $full_name: String!
    $mobile: String!
    $email: String
    $password: String!
    $birthday: String
    $wholesaler: Boolean
  ) {
    register(
      full_name: $full_name
      mobile: $mobile
      email: $email
      password: $password
      birthday: $birthday
      wholesaler: $wholesaler
    ) {
      token
      user {
        id
        full_name
        mobile
        email
        birthday
        role
        wholesaler
      }
    }
  }
`;


export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
