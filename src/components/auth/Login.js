import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Button } from 'react-bootstrap';
import { loginRequest } from '../../msalConfig';

export const Login = (props) => {
    const { instance } = useMsal();
    
    const handleLoginRedirect = () => {
        instance.loginRedirect(loginRequest).catch((error) => console.log(error));
    };

    const handleLogoutRedirect = () => {
        instance.logoutRedirect().catch((error) => console.log(error));
    };
    return (
        <>
            <AuthenticatedTemplate>
                <Button variant="warning" onClick={handleLogoutRedirect}>
                    Sign out
                </Button>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Button onClick={handleLoginRedirect}>Sign in</Button>
            </UnauthenticatedTemplate>
        </>
    );
}