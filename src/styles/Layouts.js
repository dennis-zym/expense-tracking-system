import styled from "styled-components";

export const MainLayout = styled.div`
  padding-top: 3rem;
  display: flex;
  gap: 1.3rem;
  
  header-style1 {
    font-size: 37px;
    font-weight: 605;
    color: #991d70;
  }
  header-style2 {
    font-size: 22px;
    font-weight: 605;
    color: #991d70;
    align-self: flex-end;
  }

`;

export const HeaderStyle1 = styled.div`
  font-size: 37px;
  font-weight: 605;
  color: #991d70;
`;

export const InnerLayout = styled.div`
    padding: 2rem 1.5rem;
    width: 100%;
`;

export const SignInContainer = styled.div`
  width: 100%;
  height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

export const NavStyled = styled.nav`
  padding: 2rem ;
  width: 180px;
  height: 565px;
`;
 
export const InnerContainer2 = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const Wrapper = styled.div`
display: flex;
  flex-direction: column;
  width: 260px; 
  margin: 15px;
`;

export const SignInWrapper = styled.div`
  margin: 7px;
  display: flex;
  align-items: center;
`;

export const EditHeader = styled.div`
  margin: 7px;
`;
export const HeadingWrapper = styled.div`
  margin: 50px;
`;
