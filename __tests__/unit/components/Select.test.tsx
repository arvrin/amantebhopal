import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import Select from '@/components/ui/Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Select Component', () => {
  it('renders select field with options', () => {
    render(<Select options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select options={mockOptions} />);
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Select label="Choose Option" options={mockOptions} />);
    expect(screen.getByText('Choose Option')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    render(<Select label="Required Field" options={mockOptions} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders placeholder option', () => {
    render(<Select options={mockOptions} placeholder="Select an option" />);
    expect(screen.getByRole('option', { name: 'Select an option' })).toBeInTheDocument();
  });

  it('placeholder option is disabled', () => {
    render(<Select options={mockOptions} placeholder="Select an option" />);
    const placeholderOption = screen.getByRole('option', { name: 'Select an option' }) as HTMLOptionElement;
    expect(placeholderOption.disabled).toBe(true);
  });

  it('displays error message', () => {
    render(<Select options={mockOptions} error="Please select an option" id="select" />);
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Select options={mockOptions} helperText="Choose wisely" />);
    expect(screen.getByText('Choose wisely')).toBeInTheDocument();
  });

  it('does not show helper text when error is present', () => {
    render(
      <Select
        options={mockOptions}
        helperText="Helper text"
        error="Error message"
      />
    );
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('applies error styling when error is present', () => {
    render(<Select options={mockOptions} error="Error" />);
    const select = screen.getByRole('combobox');
    expect(select.className).toContain('border-error');
  });

  it('allows selecting an option', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    await user.selectOptions(select, 'option2');

    expect(select.value).toBe('option2');
  });

  it('calls onChange handler', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Select options={mockOptions} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'option1');

    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Select options={mockOptions} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Select options={mockOptions} className="custom-select" />);
    const select = screen.getByRole('combobox');
    expect(select.className).toContain('custom-select');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Select options={mockOptions} ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('sets aria-invalid when error is present', () => {
    render(<Select options={mockOptions} error="Error" />);
    const select = screen.getByRole('combobox');
    expect(select.getAttribute('aria-invalid')).toBe('true');
  });

  it('sets aria-describedby when error is present', () => {
    render(<Select options={mockOptions} id="test-select" error="Error message" />);
    const select = screen.getByRole('combobox');
    expect(select.getAttribute('aria-describedby')).toBe('test-select-error');
  });
});
