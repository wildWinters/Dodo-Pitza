import { HeaderWrapper } from './components/header-wrapper';
import { InputContainer } from './components/input-container';
import { LogoPanel } from './components/logo-panel';
import { RegistrationPanel } from './components/registation-panel';
export const Header = Object.assign(HeaderWrapper, {
        LogoPanel:LogoPanel,
        InputContainer:InputContainer,
        RegistrationPanel:RegistrationPanel,
});
