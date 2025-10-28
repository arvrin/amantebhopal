import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import FileUpload from '@/components/ui/FileUpload';

describe('FileUpload Component', () => {
  it('renders file upload area', () => {
    render(<FileUpload />);
    expect(screen.getByText(/Click to upload/i)).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<FileUpload label="Upload Resume" />);
    expect(screen.getByText('Upload Resume')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    render(<FileUpload label="Required File" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<FileUpload helperText="Upload your resume in PDF format" />);
    expect(screen.getByText('Upload your resume in PDF format')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<FileUpload error="File is required" />);
    expect(screen.getByText('File is required')).toBeInTheDocument();
  });

  it('shows accepted formats and max size', () => {
    render(<FileUpload maxSize={10} acceptedFormats={['.pdf', '.doc']} />);
    expect(screen.getByText(/\.pdf, \.doc \(max 10MB\)/i)).toBeInTheDocument();
  });

  it('accepts file upload', async () => {
    const onFileSelect = vi.fn();
    const user = userEvent.setup();
    render(<FileUpload onFileSelect={onFileSelect} />);

    const file = new File(['resume content'], 'resume.pdf', { type: 'application/pdf' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(input, file);

    expect(onFileSelect).toHaveBeenCalledWith(file);
    expect(screen.getByText('resume.pdf')).toBeInTheDocument();
  });

  it('shows file size when file is selected', async () => {
    const user = userEvent.setup();
    render(<FileUpload />);

    const file = new File(['x'.repeat(1024)], 'test.pdf', { type: 'application/pdf' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(input, file);

    expect(screen.getByText(/KB/i)).toBeInTheDocument();
  });

  it('shows error when file size exceeds limit', async () => {
    const user = userEvent.setup();
    render(<FileUpload maxSize={1} />);

    // Create a 2MB file
    const file = new File(['x'.repeat(2 * 1024 * 1024)], 'large.pdf', { type: 'application/pdf' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(input, file);

    expect(screen.getByText(/File size must be less than 1MB/i)).toBeInTheDocument();
  });

  it('shows error when file format is not accepted', async () => {
    const user = userEvent.setup();
    render(<FileUpload acceptedFormats={['.pdf']} />);

    const file = new File(['content'], 'document.txt', { type: 'text/plain' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(input, file);

    expect(screen.getByText(/Please upload \.pdf files only/i)).toBeInTheDocument();
  });

  it('allows removing selected file', async () => {
    const onFileSelect = vi.fn();
    const user = userEvent.setup();
    render(<FileUpload onFileSelect={onFileSelect} />);

    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(input, file);
    expect(screen.getByText('test.pdf')).toBeInTheDocument();

    const removeButton = screen.getByRole('button');
    await user.click(removeButton);

    expect(onFileSelect).toHaveBeenCalledWith(null);
    expect(screen.queryByText('test.pdf')).not.toBeInTheDocument();
  });

  it('clears error when valid file is selected after error', async () => {
    const user = userEvent.setup();
    render(<FileUpload maxSize={1} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    // Upload large file
    const largeFile = new File(['x'.repeat(2 * 1024 * 1024)], 'large.pdf', { type: 'application/pdf' });
    await user.upload(input, largeFile);
    expect(screen.getByText(/File size must be less than/i)).toBeInTheDocument();

    // Upload valid file
    const validFile = new File(['content'], 'valid.pdf', { type: 'application/pdf' });
    await user.upload(input, validFile);
    expect(screen.queryByText(/File size must be less than/i)).not.toBeInTheDocument();
    expect(screen.getByText('valid.pdf')).toBeInTheDocument();
  });

  it('displays external error prop', () => {
    render(<FileUpload error="External error message" />);
    expect(screen.getByText('External error message')).toBeInTheDocument();
  });

  it('does not show helper text when error is present', () => {
    render(<FileUpload helperText="Helper text" error="Error message" />);
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});
