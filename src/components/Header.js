import React from "react"
import { Link } from "gatsby"
import Logo from "../../content/assets/Logo.svg"
import SearchIcon from "../../content/assets/search.svg"
import { useSearchState, useSearchDispatch } from "../context/ContextProvider"
import { setSearchVisibility } from "../context/reducers/searchReducer"
import styled from "styled-components"
import MainMenu from "./MainMenu"
import { WIDTH, MAIN_COLOR, BG_COLOR } from "../constants"

const Container = styled.header`
  border-bottom: 1px solid grey;
  background-color: ${BG_COLOR};
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  color: ${MAIN_COLOR};
  max-width: ${WIDTH};
  @media (max-width: 900px) {
    margin: 0 1rem;
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
  right: 0;
`
const StyledLogo = styled(Logo)`
  path {
    fill: ${MAIN_COLOR};
  }
`
const StayledSearchIcon = styled(SearchIcon)`
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
            onClick={() => {
              setSearchVisibility(searchDispatch, true)
            }}
          >
            <StayledSearchIcon />
          </SearchButton>
        )}
      </TopRow>
      <MainMenu />
    </Container>
  )
}

export default Header
