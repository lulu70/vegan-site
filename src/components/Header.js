import React from "react"
import { scale, rhythm } from "../utils/typography"
import { Link } from "gatsby"
import Logo from "../../content/assets/Logo.svg"
import SearchIcon from "../../content/assets/search.svg"
import { Context } from "../context/ContextProvider"
import { setSearchVisibility } from "../context/reducers/searchReducer"
import styled from "styled-components"

const MainHeader = styled.header`
  ${scale(0.1)};
  border-bottom: 1px solid grey;
  background-color: ${props => props.color};
`

const Container = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(40)};
  align-items: center;
  color: white;
  justify-content: space-between;
`

const StyledLogo = styled(Logo)`
  width: 200px;
`

const SearchButton = styled.button`
  background-color: transparent;
  border: 0;
  display: flex;
  cursor: pointer;
  padding: 0;
`

const Header = ({ color }) => {
  const { searchState, searchDispatch } = React.useContext(Context)
  const { searchVisibility } = searchState
  return (
    <MainHeader color={color}>
      <Container>
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
            <SearchIcon />
          </SearchButton>
        )}
      </Container>
    </MainHeader>
  )
}

export default Header
