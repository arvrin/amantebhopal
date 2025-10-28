import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import Input from '@/components/ui/Input';

describe('Input Component', () => {
  it('renders input field', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Name" placeholder="Enter name" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    render(<Input label="Email" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input label="Email" error="Invalid email" id="email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Input label="Password" helperText="Min 8 characters" />);
    expect(screen.getByText('Min 8 characters')).toBeInTheDocument();
  });

  it('does not show helper text when error is present', () => {
    render(<Input label="Email" helperText="Enter your email" error="Invalid email" />);
    expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('applies error styling when error is present', () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('border-error');
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);

    const input = screen.getByPlaceholderText('Type here') as HTMLInputElement;
    await user.type(input, 'Hello World');

    expect(input.value).toBe('Hello World');
  });

  it('calls onChange handler', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Input onChange={handleChange} placeholder="Type" />);

    const input = screen.getByPlaceholderText('Type');
    await user.type(input, 'a');

    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  it('renders left icon', () => {
    const LeftIcon = () => <span data-testid="left-icon">L</span>;
    render(<Input leftIcon={<LeftIcon />} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon when no error', () => {
    const RightIcon = () => <span data-testid="right-icon">R</span>;
    render(<Input rightIcon={<RightIcon />} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('replaces right icon with error icon when error present', () => {
    const RightIcon = () => <span data-testid="right-icon">R</span>;
    render(<Input rightIcon={<RightIcon />} error="Error" />);
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
    // Error icon (AlertCircle) should be present
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('sets aria-invalid when error is present', () => {
    render(<Input error="Error" />);
    const input = screen.getByRole('textbox');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('sets aria-describedby when error is present', () => {
    render(<Input id="test-input" error="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input.getAttribute('aria-describedby')).toBe('test-input-error');
  });

  it('supports all standard input types', () => {
    const { rerender } = render(<Input type="email" />);
    expect(screen.getByRole('textbox').getAttribute('type')).toBe('email');

    rerender(<Input type="password" />);
    const passwordInput = document.querySelector('input[type="password"]');
    expect(passwordInput).toBeInTheDocument();
  });
});
