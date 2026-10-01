import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useAppStore from '../../../app/store';
import http from '../../../shared/lib/http';
import PostForm from './PostForm';

const fillAndSubmit = async (title, content) => {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Başlık'), title);
  await user.type(screen.getByLabelText('Açıklama'), content);
  await user.click(screen.getByRole('button', { name: 'Paylaş' }));
};

describe('PostForm', () => {
  beforeEach(() => {
    vi.spyOn(http, 'post');
  });

  it('does not submit an empty post', async () => {
    render(<PostForm />);

    await userEvent.click(screen.getByRole('button', { name: 'Paylaş' }));

    expect(screen.getByText('Başlık ve açıklama zorunlu.')).toBeInTheDocument();
    expect(http.post).not.toHaveBeenCalled();
  });

  it('creates the post, puts it first in the list and clears the form', async () => {
    const existing = { _id: '1', title: 'Eski gönderi' };
    const created = { _id: '2', title: 'Kahvaltı', content: 'Yulaf #kahvaltı' };
    useAppStore.setState({ posts: [existing] });
    http.post.mockResolvedValue({ data: created });
    render(<PostForm />);

    await fillAndSubmit('  Kahvaltı ', 'Yulaf #kahvaltı');

    expect(http.post).toHaveBeenCalledWith('/posts', {
      title: 'Kahvaltı',
      content: 'Yulaf #kahvaltı',
    });
    expect(useAppStore.getState().posts).toEqual([created, existing]);
    expect(screen.getByLabelText('Başlık')).toHaveValue('');
    expect(screen.getByLabelText('Açıklama')).toHaveValue('');
  });

  it('disables the submit button while the request is in flight', async () => {
    let finishRequest;
    http.post.mockReturnValue(new Promise((resolve) => (finishRequest = resolve)));
    render(<PostForm />);

    await fillAndSubmit('Kahvaltı', 'Yulaf');
    expect(screen.getByRole('button', { name: 'Paylaş' })).toBeDisabled();

    finishRequest({ data: { _id: '2' } });
    expect(await screen.findByRole('button', { name: 'Paylaş' })).toBeEnabled();
  });

  it('keeps the draft when the request fails', async () => {
    http.post.mockRejectedValue({ response: { data: { message: 'Sunucu hatası' } } });
    render(<PostForm />);

    await fillAndSubmit('Kahvaltı', 'Yulaf');

    expect(screen.getByLabelText('Başlık')).toHaveValue('Kahvaltı');
    expect(useAppStore.getState().posts).toEqual([]);
  });
});
