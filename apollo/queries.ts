import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($mobile: String!, $password: String!) {
    login(mobile: $mobile, password: $password) {
      token
      user {
        id
        mobile
        email
        birthday
        role
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register(
    $mobile: String!
    $email: String
    $password: String!
    $birthday: String
  ) {
    register(
      mobile: $mobile
      email: $email
      password: $password
      birthday: $birthday
    ) {
      token
      user {
        id
        mobile
        email
        birthday
        role
      }
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
      role
    }
  }
`;


export const USER_LIST_QUERY = gql`
  query UserList {
    userList {
      id
      mobile
      email
      role
      birthday
    }
  }
`;
