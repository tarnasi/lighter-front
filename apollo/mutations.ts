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

export const CATEGORY_DELETE_MUTATION = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

export const CATEGORY_CREATE_MUTATION = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      slug
      image
      description
    }
  }
`;

export const CATEGORY_UPDATE_MUTATION = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      id
      name
      slug
      image
      description
    }
  }
`;


export const BRAND_DELETE_MUTATION = gql`
  mutation DeleteBrand($id: ID!) {
    deleteBrand(id: $id)
  }
`;


export const BRAND_CREATE_MUTATION = gql`
  mutation CreateBrand($input: CreateBrandInput!) {
      createBrand(input: $input) {
        id
        name
        slug
        description
        image
        category {
          id
          name
          slug
        }
      }
    }
`;


export const BRAND_UPDATE_MUTATION = gql`
  mutation UpdateBrand($input: UpdateBrandInput!) {
      updateBrand(input: $input) {
        id
        name
        slug
        description
        image
        category {
          id
          name
          slug
        }
      }
    }
`;
