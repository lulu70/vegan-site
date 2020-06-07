import React from "react"
import { Link } from "gatsby"
import Logo from "../../content/assets/Logo.svg"
import SearchIcon from "../../content/assets/search.svg"
import { useSearchState, useSearchDispatch } from "../context/ContextProvider"
import { setSearchVisibility } from "../context/reducers/searchReducer"
import styled from "styled-components"
import MainMenu from "./MainMenu"
import { MAIN_COLOR, BG_COLOR, GREY } from "../constants"

const Container = styled.header`
  background-color: ${BG_COLOR};
  border-bottom: 1px solid ${GREY};
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${MAIN_COLOR};
  padding: 0 2rem;
  margin-bottom: 1rem;
  @media (max-width: 900px) {
    padding: 0 1rem;
  }
`

const TopRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const SearchButton = styled.button`
  background-color: transparent;
  border: 0;
  top: 1rem;
  display: flex;
  cursor: pointer;
  padding: 0;
  position: absolute;
  right: 2rem;
  @media (max-width: 900px) {
    padding: 0 1rem;
  }
`
const StyledLogo = styled(Logo)`
  path {
    fill: ${MAIN_COLOR};
  }
`
const StyledSearchIcon = styled(SearchIcon)`
  fill: ${MAIN_COLOR};
`

const Header = () => {
  const searchState = useSearchState()
  const searchDispatch = useSearchDispatch()
  const { searchVisibility } = searchState
  return (
    <Container>
      <TopRow>
        <Link to={`/`} aria-label="home">
          <StyledLogo />
        </Link>
        {!searchVisibility && (
          <SearchButton
            type="submit"
            aria-label="search"
            data-test-id="header__searchButton"
            onClick={() => {
              setSearchVisibility(searchDispatch, true)
            }}
          >
            <StyledSearchIcon />
          </SearchButton>
        )}
      </TopRow>
      <MainMenu />
    </Container>
  )
}

export default Header
