// import styled from 'styled-components';
import styled from "@emotion/styled";
import { Input } from "@chakra-ui/react";

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

export const SearchInput = styled(Input)`
  && {
    background: ${(props) => props.theme.colors.teal[50]};
    border-color: ${(props) => props.theme.colors.teal[400]};
    border-radius: ${(props) => props.theme.radii.md};
  }
  &:focus {
    border-color: ${(props) => props.theme.colors.teal[600]};
  }
  &:hover {
    border-color: ${(props) => props.theme.colors.teal[500]};
  }
`;