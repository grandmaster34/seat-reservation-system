import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const PageContainer = styled.div`
  background: #0a0a0f;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow: hidden;
`;

const RegisterContainer = styled.div`
  width: 100%;
  max-width: 800px;
  position: relative;
  z-index: 10;
  margin: 2rem auto;
  animation: ${fadeIn} 0.5s ease-out;
  display: flex;
  justify-content: center;
`;

const RegisterCard = styled.div`
  background: #151520;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 80px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:before {
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

  &:hover {
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(0, 255, 136, 0.1),
      0 0 40px rgba(0, 255, 136, 0.1);
    transform: translateY(-2px);
    
    &:before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 60px;
  }
  
  @media (max-width: 480px) {
    padding: 40px 30px;
  }
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const LogoIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #00ff88, #0099ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(0, 255, 136, 0.3));
  animation: ${pulse} 2s ease-in-out infinite alternate;
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
  background: linear-gradient(to right, #ffffff, #00ff88);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  color: #a0a0b0;
  font-size: 1.4rem;
  font-weight: 400;
  margin-top: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 40px;
  position: relative;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 5px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(26, 26, 37, 0.7);
  border: 1px solid #2a2a35;
  border-radius: 8px;
  padding: 32px 24px 12px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 400;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  box-sizing: border-box;
  
  &:focus {
    border-color: #00ff88;
    background: rgba(26, 26, 37, 0.9);
    box-shadow: 
      0 0 0 3px rgba(0, 255, 136, 0.1),
      0 4px 20px rgba(0, 255, 136, 0.1);
  }

  @media (max-width: 480px) {
    padding: 28px 20px 10px;
    font-size: 16px;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  left: 24px;
  top: 24px;
  color: #a0a0b0;
  font-size: 18px;
  font-weight: 400;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  transform-origin: left top;

  ${Input}:focus + &,
  ${Input}:not(:placeholder-shown) + & {
    transform: translateY(-14px) scale(0.85);
    color: #00ff88;
    font-weight: 500;
  }
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
  position: relative;
`;

const ToggleButton = styled.button`
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
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
  }
`;

const ToggleIcon = styled.span`
  display: block;
  width: 22px;
  height: 22px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.3s ease;
`;

const RegisterButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #00ff88, #0099ff);
  border: none;
  border-radius: 8px;
  padding: 28px;
  color: #0a0a0f;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin: 40px 0 30px;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 15px 35px rgba(0, 255, 136, 0.4),
      0 0 50px rgba(0, 255, 136, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #2a2a35;
    cursor: not-allowed;
    color: #a0a0b0;
    box-shadow: none;
  }
`;

const ButtonGlow = styled.span`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${RegisterButton}:hover & {
    left: 100%;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 25px;

  p {
    color: #a0a0b0;
    font-size: 16px;
  }

  a {
    color: #00ff88;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    padding-bottom: 2px;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: #00ff88;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #0099ff;
      text-shadow: 0 0 10px rgba(0, 153, 255, 0.5);
      
      &:after {
        width: 100%;
      }
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff0080;
  font-size: 13px;
  font-weight: 500;
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(255, 0, 128, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(255, 0, 128, 0.2);
  animation: ${fadeIn} 0.3s ease;
`;

const PasswordStrength = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 8px;
  height: 5px;
`;

const StrengthBar = styled.div`
  flex: 1;
  height: 100%;
  background: #2a2a35;
  border-radius: 3px;
  overflow: hidden;
  
  &.active {
    background: ${props => {
      if (props.strength === 'weak') return '#ff0080';
      if (props.strength === 'medium') return '#ffcc00';
      return '#00ff88';
    }};
  }
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
  animation: ${float} 12s ease-in-out infinite;
  filter: blur(60px);
  opacity: 0.6;
`;

const GlowOrb1 = styled(GlowOrb)`
  width: 400px;
  height: 400px;
  top: 10%;
  left: -10%;
  background: radial-gradient(circle, rgba(0, 255, 136, 0.15), transparent 70%);
  animation-delay: 0s;
`;

const GlowOrb2 = styled(GlowOrb)`
  width: 300px;
  height: 300px;
  top: 60%;
  right: -5%;
  background: radial-gradient(circle, rgba(0, 153, 255, 0.12), transparent 70%);
  animation-delay: -4s;
`;

const GlowOrb3 = styled(GlowOrb)`
  width: 250px;
  height: 250px;
  bottom: 20%;
  left: 10%;
  background: radial-gradient(circle, rgba(255, 0, 128, 0.08), transparent 70%);
  animation-delay: -8s;
`;

const RegisterForm = ({ onPageChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'intern'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordStrength('');
      return;
    }
    
    if (password.length < 6) {
      setPasswordStrength('weak');
      return;
    }
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    
    const strength = [
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecial
    ].filter(Boolean).length;
    
    if (strength < 2) setPasswordStrength('weak');
    else if (strength < 4) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    } else if (!formData.email.endsWith('@slt.com')) {
      newErrors.email = 'Please use your company email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (passwordStrength === 'weak') {
      newErrors.password = 'Password is too weak';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      if (response.success) {
        alert('Registration successful! Please login to continue.');
        onPageChange('login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <RegisterContainer>
        <RegisterCard>
          <RegisterHeader>
            <LogoIcon>⚡</LogoIcon>
            <Title>Create Account</Title>
            <Subtitle>Register as an intern</Subtitle>
          </RegisterHeader>
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <InputWrapper>
                <Input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  autoComplete="name"
                />
                <InputLabel>Full Name</InputLabel>
                <InputLine />
              </InputWrapper>
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <InputWrapper>
                <Input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  autoComplete="email"
                />
                <InputLabel>Company Email</InputLabel>
                <InputLine />
              </InputWrapper>
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <PasswordWrapper>
                <Input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=" "
                  autoComplete="new-password"
                />
                <InputLabel>Password</InputLabel>
                <ToggleButton 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <ToggleIcon>
                    {showPassword ? "👁️" : "🔒"}
                  </ToggleIcon>
                </ToggleButton>
                <InputLine />
              </PasswordWrapper>
              
              <PasswordStrength>
                {[1, 2, 3, 4].map((_, index) => (
                  <StrengthBar 
                    key={index} 
                    strength={passwordStrength}
                    className={
                      passwordStrength && 
                      index < (
                        passwordStrength === 'weak' ? 1 : 
                        passwordStrength === 'medium' ? 3 : 4
                      ) ? 'active' : ''
                    } 
                  />
                ))}
              </PasswordStrength>
              
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <PasswordWrapper>
                <Input 
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder=" "
                  autoComplete="new-password"
                />
                <InputLabel>Confirm Password</InputLabel>
                <ToggleButton 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <ToggleIcon>
                    {showConfirmPassword ? "👁️" : "🔒"}
                  </ToggleIcon>
                </ToggleButton>
                <InputLine />
              </PasswordWrapper>
              {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
            </FormGroup>
            
            <input type="hidden" name="role" value="intern" />
            
            <RegisterButton 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'REGISTER'}
              <ButtonGlow className="btn-glow" />
            </RegisterButton>
          </Form>
          
          <LoginLink>
            <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('login'); }}>Sign in</a></p>
          </LoginLink>
        </RegisterCard>
      </RegisterContainer>
      
      <BackgroundEffects>
        <GlowOrb1 />
        <GlowOrb2 />
        <GlowOrb3 />
      </BackgroundEffects>
    </PageContainer>
  );
};

export default RegisterForm;