import React, { useState } from 'react';
import styled, { keyframes, css, createGlobalStyle } from 'styled-components';
import { authAPI } from '../api';

// Animations
const pulse = keyframes`
  from { filter: drop-shadow(0 0 20px rgba(0, 255, 136, 0.3)); }
  to { filter: drop-shadow(0 0 30px rgba(0, 255, 136, 0.6)); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33% { transform: translateY(-20px) translateX(10px); }
  66% { transform: translateY(10px) translateX(-10px); }
`;

const spin = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

const successPulse = keyframes`
  0% { transform: scale(0); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Styled Components
const LoginContainer = styled.div`
  width: 180%;
  max-width: 450px;
  position: relative;
  z-index: 10;
  margin-top: 30px;
`;

const LoginCard = styled.div`
  background: #151520;
  border: 1px solid #2a2a35;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(0, 255, 136, 0.1),
      0 0 40px rgba(0, 255, 136, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 24px;
    margin: 10px;
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const LogoIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #00ff88, #0099ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(0, 255, 136, 0.3));
  animation: ${pulse} 2s ease-in-out infinite alternate;
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: -0.02em;

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  color: #a0a0b0;
  font-size: 16px;
  font-weight: 400;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  position: relative;

  ${props => props.error && css`
    .input-wrapper input {
      border-color: #ff0080;
      background: rgba(255, 0, 128, 0.05);
      box-shadow: 0 0 0 3px rgba(255, 0, 128, 0.1);
      animation: ${shake} 0.5s ease-in-out;
    }
  `}
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  background: #1a1a25;
  border: 1px solid #2a2a35;
  border-radius: 6px;
  padding: 24px 16px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;

  &:focus {
    border-color: #00ff88;
    background: rgba(26, 26, 37, 0.8);
    box-shadow: 
      0 0 0 3px rgba(0, 255, 136, 0.1),
      0 4px 20px rgba(0, 255, 136, 0.1);
  }

  &:focus + label,
  &:valid + label {
    transform: translateY(-32px) translateX(4px) scale(0.85);
    color: #00ff88;
    font-weight: 500;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  left: 16px;
  top: 24px;
  color: #a0a0b0;
  font-size: 16px;
  font-weight: 400;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  transform-origin: left top;
`;

const InputLine = styled.span`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #00ff88, #0099ff);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-50%);
  border-radius: 2px;

  ${Input}:focus ~ & {
    width: 100%;
  }
`;

const PasswordWrapper = styled(InputWrapper)`
  input {
    padding-right: 50px;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #a0a0b0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 6px;

  &:hover {
    color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
  }
`;

const ToggleIcon = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a0a0b0' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'/%3e%3c/svg%3e");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1));

  ${PasswordToggle}:hover & {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300ff88' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'/%3e%3c/svg%3e");
  }

  ${props => props.showPassword && css`
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a0a0b0' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88'/%3e%3c/svg%3e");
  `}
`;

const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const RememberWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const CustomCheckbox = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid #2a2a35;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    background: #00ff88;
    border-radius: 1px;
    transform: scale(0);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  ${CheckboxInput}:checked + label & {
    border-color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }

  ${CheckboxInput}:checked + label &::after {
    transform: scale(1);
  }
`;

const CheckboxLabel = styled.label`
  color: #a0a0b0;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${RememberWrapper}:hover & {
    color: #ffffff;
  }
`;

const ForgotPassword = styled.a`
  color: #a0a0b0;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    color: #00ff88;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #00ff88, #0099ff);
  border: none;
  border-radius: 6px;
  padding: 24px 32px;
  color: #0a0a0f;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 
      0 10px 30px rgba(0, 255, 136, 0.3),
      0 0 40px rgba(0, 255, 136, 0.2);
  }

  &:hover .btn-glow {
    left: 100%;
  }

  &:active {
    transform: translateY(0);
  }

  ${props => props.disabled && css`
    pointer-events: none;
  `}
`;

const ButtonGlow = styled.span`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ButtonText = styled.span`
  transition: opacity 0.3s ease;

  ${LoginButton}.loading & {
    opacity: 0;
  }
`;

const ButtonLoader = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid #0a0a0f;
  border-radius: 50%;
  opacity: 0;
  animation: ${spin} 1s linear infinite;
  transition: opacity 0.3s ease;

  ${LoginButton}.loading & {
    opacity: 1;
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 32px 0 24px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #2a2a35, transparent);
    transform: translateY(-50%);
  }

  span {
    background: #151520;
    color: #a0a0b0;
    padding: 0 24px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    position: relative;
    z-index: 1;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const SocialButton = styled.button`
  background: #1a1a25;
  border: 1px solid #2a2a35;
  border-radius: 6px;
  padding: 16px 24px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  &:hover {
    background: rgba(26, 26, 37, 0.8);
    border-color: #00ff88;
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(0, 255, 136, 0.1);
  }
`;

const SocialIcon = styled.span`
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const GoogleIcon = styled(SocialIcon)`
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath fill='%23ea4335' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3e%3cpath fill='%2334a853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3e%3cpath fill='%23fbbc05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3e%3cpath fill='%23ea4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3e%3c/svg%3e");
`;

const AppleIcon = styled(SocialIcon)`
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3e%3cpath d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z'/%3e%3c/svg%3e");
`;

const SignupLink = styled.div`
  text-align: center;

  p {
    color: #a0a0b0;
    font-size: 14px;
  }

  a {
    color: #00ff88;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      color: #0099ff;
      text-shadow: 0 0 10px rgba(0, 153, 255, 0.5);
    }
  }
`;

const ErrorMessage = styled.span`
  color: #ff0080;
  font-size: 12px;
  font-weight: 500;
  margin-top: 8px;
  margin-left: 4px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 0, 128, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255, 0, 128, 0.2);
  display: ${props => props.show ? 'inline-block' : 'none'};
  opacity: ${props => props.show ? 1 : 0};
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(-10px)'};
`;

const SuccessMessage = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  text-align: center;
  padding: 40px 24px;
  opacity: ${props => props.show ? 1 : 0};
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00ff88, #0099ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #0a0a0f;
  margin: 0 auto 24px;
  animation: ${successPulse} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
`;

const SuccessTitle = styled.h3`
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 8px;
`;

const SuccessText = styled.p`
  color: #a0a0b0;
  font-size: 16px;
`;

const BackgroundEffects = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const GlowOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 255, 136, 0.1), transparent 70%);
  animation: ${float} 6s ease-in-out infinite;
  opacity: ${props => props.mobile ? 0.5 : 1};

  @media (min-width: 481px) {
    opacity: 1;
  }
`;

const GlowOrb1 = styled(GlowOrb)`
  width: 300px;
  height: 300px;
  top: 10%;
  left: -10%;
  background: radial-gradient(circle, rgba(0, 255, 136, 0.08), transparent 70%);
  animation-delay: 0s;
`;

const GlowOrb2 = styled(GlowOrb)`
  width: 200px;
  height: 200px;
  top: 60%;
  right: -5%;
  background: radial-gradient(circle, rgba(0, 153, 255, 0.06), transparent 70%);
  animation-delay: -2s;
`;

const GlowOrb3 = styled(GlowOrb)`
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 10%;
  background: radial-gradient(circle, rgba(255, 0, 128, 0.04), transparent 70%);
  animation-delay: -4s;
`;

// Main Component
const LoginForm = ({ onLogin, onPageChange }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    let valid = true;
    const newErrors = { email: '', password: '' };
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    
    setErrors(newErrors);
    
    if (valid) {
      try {
        // Make actual API call
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password
        });
        
        if (response.success) {
          // Store token and user data
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          
          setIsLoading(false);
          setIsSuccess(true);
          
          // Call onLogin with user data
          setTimeout(() => {
            onLogin(response.user);
          }, 2000);
        } else {
          setErrors({ email: '', password: response.message || 'Login failed' });
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Login error:', error);
        const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
        setErrors({ email: '', password: errorMessage });
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <LoginCard>
        {!isSuccess ? (
          <>
            <LoginHeader>
              <LogoIcon>⚡</LogoIcon>
              <Title>Sign In</Title>
              <Subtitle>Access your account</Subtitle>
            </LoginHeader>
            
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <FormGroup error={!!errors.email}>
                <InputWrapper>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    autoComplete="email"
                  />
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <InputLine />
                </InputWrapper>
                <ErrorMessage show={!!errors.email}>{errors.email}</ErrorMessage>
              </FormGroup>

              <FormGroup error={!!errors.password}>
                <PasswordWrapper>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    name="password" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                    autoComplete="current-password"
                  />
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <PasswordToggle 
                    type="button" 
                    onClick={togglePasswordVisibility}
                    aria-label="Toggle password visibility"
                  >
                    <ToggleIcon showPassword={showPassword} />
                  </PasswordToggle>
                  <InputLine />
                </PasswordWrapper>
                <ErrorMessage show={!!errors.password}>{errors.password}</ErrorMessage>
              </FormGroup>

              <FormOptions>
                <RememberWrapper>
                  <CheckboxInput 
                    type="checkbox" 
                    id="remember" 
                    name="remember" 
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <CheckboxLabel htmlFor="remember">
                    <CustomCheckbox />
                    Keep me signed in
                  </CheckboxLabel>
                </RememberWrapper>
                <ForgotPassword href="#">Forgot password?</ForgotPassword>
              </FormOptions>

                             <LoginButton type="submit" disabled={isLoading} className={isLoading ? 'loading' : ''}>
                 <ButtonText>{isLoading ? 'Signing In...' : 'Sign In'}</ButtonText>
                 {isLoading && <ButtonLoader />}
                 <ButtonGlow className="btn-glow" />
               </LoginButton>
             </form>

             <div style={{ textAlign: 'center', marginTop: '16px' }}>
               <p style={{ color: '#a0a0b0', fontSize: '14px' }}>
                 Don't have an account?{' '}
                                   <a 
                    href="#" 
                    style={{ 
                      color: '#00ff88', 
                      textDecoration: 'none', 
                      fontWeight: '500',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#0099ff';
                      e.target.style.textShadow = '0 0 10px rgba(0, 153, 255, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#00ff88';
                      e.target.style.textShadow = 'none';
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange('register');
                    }}
                  >
                    Register now
                  </a>
               </p>
             </div>

            <Divider>
              <span>or</span>
            </Divider>

            <SocialLogin>
              <SocialButton type="button" className="google-btn">
                <GoogleIcon className="social-icon" />
                <span>Continue with Google</span>
              </SocialButton>
              <SocialButton type="button" className="apple-btn">
                <AppleIcon className="social-icon" />
                <span>Continue with Apple</span>
              </SocialButton>
            </SocialLogin>


          </>
        ) : (
          <SuccessMessage show={isSuccess}>
            <SuccessIcon>✓</SuccessIcon>
            <SuccessTitle>Welcome back!</SuccessTitle>
            <SuccessText>Redirecting to your dashboard...</SuccessText>
          </SuccessMessage>
        )}
      </LoginCard>
      
      <BackgroundEffects>
        <GlowOrb1 mobile />
        <GlowOrb2 mobile />
        <GlowOrb3 mobile />
      </BackgroundEffects>
    </LoginContainer>
  );
};

// Global Styles (injected once)
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0a0a0f;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    line-height: 1.6;
    overflow: hidden;

    @media (max-width: 480px) {
      padding: 10px;
    }
  }
`;

const Login = ({ onLogin, onPageChange }) => (
  <>
    <GlobalStyles />
    <LoginForm onLogin={onLogin} onPageChange={onPageChange} />
  </>
);

export default Login;