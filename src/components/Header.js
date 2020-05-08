import React from "react"
import { Link } from "gatsby"
import Logo from "../../content/assets/Logo.svg"
import SearchIcon from "../../content/assets/search.svg"
import { useSearchState, useSearchDispatch } from "../context/ContextProvider"
import { setSearchVisibility } from "../context/reducers/searchReducer"
import styled from "styled-components"
import MainMenu from "./MainMenu"
import { WIDTH } from "../constants"
const MainHeader = styled.header`
  border-bottom: 1px solid grey;
  background-color: ${props => props.color};
`

const Container = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  max-width: ${WIDTH};
  align-items: center;
  color: white;
  @media (max-width: 900px) {
    margin: 0 1rem;
  }
`

const SearchButton = styled.button`
  background-color: transparent;
  border: 0;
  display: flex;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
`
const Header = ({ color }) => {
  const searchState = useSearchState()
  const searchDispatch = useSearchDispatch()
  const { searchVisibility } = searchState
  return (
    <MainHeader color={color}>
      <Container>
        <Link to={`/`} aria-label="home">
          <Logo />
        </Link>
        <MainMenu />
        {!searchVisibility && (
          <SearchButton
            type="submit"
            aria-label="search"
            onClick={() => {
              setSearchVisibility(searchDispatch, true)
            }}
          >
            <SearchIcon />
          </SearchButton>
        )}
      </Container>
    </MainHeader>
  )
}

export default Header
