import AdminNav from '../../components/Admim/AdminNav'
import RegistrationForm from '../../components/Admim/RegistrationForm'
import AccountList from '../../components/Admim/AccountList'
import {MainLayout} from '../../styles/Layouts'
import styled from 'styled-components';

import "./styles.css";

export const AdminPage = () => {
  return (
    <MainLayout>
        <AdminNav />
        <div>
          <Container>
            <p className='headerStyle1'> User Account Management </p>
          </Container>
          <Container>
          <RegistrationForm />
          <AccountList />
          </Container>
        </div>
      </MainLayout>
  );
};

const ACC = styled.nav `

`;
const Container = styled.nav `
  display: flex;
  justify-content: flex-end;
  gap: 1.3rem;
`;