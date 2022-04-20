import styled from "styled-components";

const ProfileContainerStyled = styled.header`
  width: 90%;
  max-width: 1200px;
  margin: 1rem auto;
  padding: 3rem 1rem;
  background-color: var(--color-120);
  color: var(--color-700);
  display: grid;
  gap: 1rem;
  border-radius: 4px;

  & img {
    width: min(50vw, 200px);
    height: min(50vw, 200px);
    object-fit: contain;
    display: block;
    border-radius: 50%;
  }

  & .w-md {
    max-width: 480px;
    margin: 1rem 0;
  }

  & .flex {
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, 180px));
    gap: 1rem;

    & div {
      display: grid;

      & span:nth-child(1) {
        font-weight: bold;
        font-size: 1.25rem;
      }
    }
  }

  @media (min-width: 760px) {
    grid-template-columns: 200px 1fr;
    gap: min(3rem, 10vw);
  }
`;

export default ProfileContainerStyled;
